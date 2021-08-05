const nameInput = document.querySelector("#name-input");
const setsInput = document.querySelector("#reps-input");
const repsInput = document.querySelector("#sets-input");
const weightInput = document.querySelector("#weight-input");
const userWorkouts = document.querySelector("#user-workouts");
const addButton = document.querySelector("#addButton");
liftArray = new Array();

if(addButton){
    addButton.onclick = function() {
        console.log("Add button clicked")
        const curLift = new Array(
            nameInput.value,
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
            nameInput.value = "";
            setsInput.value = "";
            repsInput.value = "";
            weightInput.value = "";
        }else{
            alert("There are missing values. Please check your lift data and try again!")
        }
    };
}
	

let liftContents = "";
let liftNumber = 0;

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