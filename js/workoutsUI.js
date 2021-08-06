const username = document.getElementById("username-home");
 
window.onload = event => {
   console.log("viewWorkouts running")
 
 // Firebase authentication goes here.
 firebase.auth().onAuthStateChanged(user => {
   if (user) {
     // Console log the user to confirm they are logged in
     console.log("Logged in as: " + user.displayName);
 
     googleUserId = user.uid;
     username.innerHTML = user.displayName;

     getWorkouts(googleUserId);
   } else {
   }
 });
};
 
const getWorkouts = userId => {
 const workoutsRef = firebase.database().ref(`workouts/users/${userId}`);
 //refreshes
 workoutsRef.on("value", snapshot => {
   const data = snapshot.val();
   renderDataAsHtml(data);
 });
};
 
//Given a list of notes, render them in HTML
const renderDataAsHtml = data => {
   console.log(data)
 let cards = "";
 for (const workoutItem in data) {
   const workout = data[workoutItem];
   cards += createCard(workout, workoutItem);
 }
 
document.querySelector("#posts").innerHTML = cards;
};
 
const deleteWorkout = workoutId => {
 const modal = document.getElementById("alert-modal");
 const cancelDeletion = document.getElementById("alert-cancel");
 const deleteConfirm = document.getElementById("alert-confirm");
 modal.classList.add("is-active"); //show modal
 deleteConfirm.addEventListener("click", e => {
   //deleted
   firebase
     .database()
     .ref(`users/${googleUserId}/${workoutId}`)
     .remove();
   modal.classList.remove("is-active"); //hide modal
 });
 cancelDeletion.addEventListener("click", e => {
   //cancel
   modal.classList.remove("is-active");
 });
};

let numOfCards = 0;
// Return a note object converted into an HTML card
const createCard = (workout, workoutId) => {
 lifts = workout.lifts;
 let liftCards = "";
 for (const lift in lifts) {
     let liftObj = lifts[lift];
     liftCards += `<div class="content">
                          <div class="columns">
                            <div class="column">
                              <p class="title is-4">${liftObj.name}</p>
                            </div>
                            <div class="column">
                              <p class="subtitle is-6">
                                ${liftObj.reps}
                              </p>
                              <p class="subtitle is-6">
                                ${liftObj.sets}
                              </p>
                              <p class="subtitle is-6">
                                ${liftObj.weight}
                              </p>
                            </div>
                          </div>
                        </div>`
 }
 return `<!-- view workouts Card template -->
                <div class="card">
                  <div class="card-content">
                    <p class="title is-3">${workout.title}</p>
                    <!-- Lifts card template -->
                    <div class="card">
                      <div class="card-content">
                        ${liftCards}
                      </div>
                    </div>
                    <div class="content">
                      <div class="columns">
                        <div class="column">
                          <p class="subtitle is-5">${workout.date}</p>
                        </div>
                        <div class="column">
                          <button
                            class="button is-danger is-large"
                            id="${workoutId}"
                            onclick="deleteWorkout(this.id)"
                          >
                            Delete workout
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <!--  -->`;
};













