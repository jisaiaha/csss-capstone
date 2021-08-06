const nameInputField = document.querySelector("#name-input");
const setsInput = document.querySelector("#reps-input");
const repsInput = document.querySelector("#sets-input");
const weightInput = document.querySelector("#weight-input");
const userWorkouts = document.querySelector("#user-workouts");
const addButton = document.querySelector("#addButton");
const submitButton = document.querySelector('#save-workout');
let liftContents = "";
let liftNumber = 0;
liftArray = new Array();

let googleUser;

// let firebase = firebase;

window.onload = (event) => {
	// Use this to retain user state between html pages.
	firebase.auth().onAuthStateChanged(function(user) {
		if (user) {
			console.log('Logged in as: ' + user.displayName);
			googleUser = user;
		} else {
			window.location = 'index.html'; // If not logged in, navigate back to login page.
		}
	});
};

if(submitButton){
    submitButton.onclick = function(){
        handleWorkoutSubmit(liftArray);
        liftContents = "";
        userWorkouts.innerHTML = liftContents;
    }   
}

if(addButton){
    addButton.onclick = function() {
        pullInputValues()
    };
}

const pullInputValues = () => {
    const curLift = new Array(
        nameInputField.value,
        setsInput.value,
        repsInput.value,
        weightInput.value
    );
    if(
        curLift[0] != "" &&
        curLift[1] != "" &&
        curLift[2] != "" &&
        curLift[3] != "" 
    ){
        liftArray.push(curLift);
        handleLiftSubmit(curLift);
        nameInputField.value = "";
        setsInput.value = "";
        repsInput.value = "";
        weightInput.value = "";
        console.log(liftArray);
    }else{
        alert("There are missing values. Please check your lift data and try again!")
    }
}

const handleLiftSubmit = (curLift) => {
	liftContents += `
    <div class="card" id="workout-#${liftNumber}">
        <div class="card-content">
            <div class="content">
                <div class="columns">
                    <div class="column" id="workout-#-image">
                        <figure class="image is-48x48">
                        <img
                            src="https://bulma.io/images/placeholders/128x128.png"
                        />
                        </figure>
                    </div>
                    <div class="column">
                        <p class="title is-4" id="workout-#-name">${curLift[0]}</p>
                    </div>
                    <div class="column">
                        <p class="subtitle is-6" id="workout-#-sets">
                            ${curLift[1]} sets
                        </p>
                        <p class="subtitle is-6" id="workout-#-reps">
                            ${curLift[2]} reps
                        </p>
                        <p class="subtitle is-6" id="workout-#-weight">
                            ${curLift[3]} pounds
                        </p>
                    </div>
                    <div class="column">
                        <button class="button is-danger" id="workout-remove">
                            Delete
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    `;
    liftNumber++;

    userWorkouts.innerHTML = liftContents;
};


const handleWorkoutSubmit = (liftArray) => {
	// 1. Capture the form data
    let workoutId;
    const workoutTitle = document.querySelector('#workout-title-input');
    const currentDate = new Date();
    const currentDayOfMonth = currentDate.getDate();
    const currentMonth = currentDate.getMonth(); 
    const currentYear = currentDate.getFullYear();
    const workoutDate = (currentMonth + 1) + "/" + currentDayOfMonth + "/" + currentYear;

    // 2. Format the data and write it to our database
    let workoutRef = firebase.database().ref(`workouts/users/${googleUser.uid}`);
    workoutRef.push({
        'title': workoutTitle.value,
		'date': workoutDate
    })
    .then(res =>{
        workoutId = res.getKey()

        // 3. Handle the array of lifts
	let liftName;
	let liftWeight;
	let liftReps;
	let liftSets;

	/*
	 * Info is passed in as _(Type of Lift)_ :___ sets of ___ at ____ lbs
	 * [liftName], [liftSets], [liftReps], [liftWeight]
	 */

	liftArray.forEach(lift => {
		liftName = lift[0];
		liftSets = lift[1];
		liftReps = lift[2];
		liftWeight = lift[3];
        
        firebase.database().ref(`workouts/users/${googleUser.uid}/${workoutId}/lifts`).push({
            name: liftName,
			sets: liftSets,
            reps: liftReps,
            weight: liftWeight
        })
	});
    })
    .catch(error => console.log(error));

	
}