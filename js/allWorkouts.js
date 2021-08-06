const username = document.getElementById("username-home");
let uniqueUID;
let cards = '';
window.onload = event => {
	console.log("viewWorkouts running")

	// Firebase authentication goes here.
	firebase.auth().onAuthStateChanged(user => {
		if (user) {
			// Console log the user to confirm they are logged in
			console.log("Logged in as: " + user.displayName);

			googleUserId = user.uid;
			uniqueUID = user.uid;
            console.log(uniqueUID)
			getWorkouts(googleUserId);
		} else {}
	});
};

const getWorkouts = userId => {
    const workoutsRef = firebase.database().ref(`workouts/users/`);

    //refreshes
    workoutsRef.on("value", snapshot => {
            const data = snapshot.val();
            for (const user in data) {
                const userRef = firebase.database().ref(`workouts/users/${user}`)
                console.log("firebase.database().ref(`workouts/users/"+user)
                userRef.on("value", snapshot => {
                    const newData = snapshot.val();
                    console.log("Rendering "+ user)
                    renderDataAsHtml(newData);
                });
            };
    });
}

		//Given a list of notes, render them in HTML
		const renderDataAsHtml = data => {
			console.log(data)
			for (const workoutItem in data) {
                console.log("Rendering "+ workoutItem)
				const workout = data[workoutItem];
				cards += createCard(workout, workoutItem);
			}

			document.querySelector("#app").innerHTML = cards;
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
					.ref(`workouts/users/${uniqueUID}/${workoutId}`)
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
                              <p class="title is-centered is-4">${liftObj.name}</p>
                            </div>
                            <div class="column">
                              <p class="subtitle is-6">
                                ${liftObj.sets} sets
                              </p>
                              <p class="subtitle is-6">
                                ${liftObj.reps} repetitions per set
                              </p>
                              <p class="subtitle is-6">
                                ${liftObj.weight} pounds per repetition
                              </p>
                            </div>
                          </div>
                        </div>`
			}
			return `<!-- view workouts Card template -->
                <div class="card mt-5">
                  <div class="card-content">
                    <p class="title is-3 has-text-centered is-underlined has-text-weight-bold">${workout.title}</p>
                    <!-- Lifts card template -->
                    <div class="card mt">
                      <div class="card-content">
                        ${liftCards}
                      </div>
                    </div>
                    <div class="content mt-5">
                      <div class="columns">
                        <div class="column">
                          <p class="subtitle is-5 has-text-centered">Workout from ${workout.date}</p>
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