let googleUserId;
let workoutArray = [];

window.onload = (event) => {
  // Use this to retain user state between html pages.
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      console.log('Logged in as: ' + user.displayName);
      googleUserId = user.uid;
      getAllWorkouts();
      renderWorkouts();
    } else {
      // If not logged in, navigate back to login page.
      window.location = 'index.html'; 
    };
  });
};

const renderWorkouts = () => {
    const cards = '';
    workoutArray.forEach(workout => {
        cards += createCard(workout);
    });
    document.querySelector('#posts').innerHTML = cards;
}

const createCard = (workout) => {
    const cardHTML = `
    
    `;
}

const getAllWorkouts = () => {
    const dataRef = firebase.database().ref(`workouts/users`);
    dataRef.on('value', (snapshot) => {
        const data = snapshot.val();
        for(const user in data){
            const userRef = firebase.database().ref(`workouts/users/${user}`);
            userRef.on('value', (snapshot) =>{
                const userData = snapshot.val();
                for(const workout in userData){
                    const workoutRef = firebase.database().ref(`workouts/users/${user}/${workout}`);
                    workoutRef.on('value',(snapshot) => {
                        const curWorkoutData = snapshot.val();
                        const curWorkoutTitle = curWorkoutData.title;
                        const curWorkoutDate = curWorkoutData.date;
                        let curWorkoutLifts = [];
                        for(const lift in curWorkoutData.lifts){
                            const liftRef = firebase.database().ref(`workouts/users/${user}/${workout}/lifts`)
                            liftRef.on('value', (snapshot) => {
                                const curLiftData = snapshot.val();
                                const curLift = curLiftData[lift]
                                const curLiftName = curLift.name;
                                const curLiftSets = curLift.sets;
                                const curLiftReps = curLift.reps;
                                const curLiftWeight = curLift.weight;
                                curLiftArray = {
                                    curLiftName,
                                    curLiftSets,
                                    curLiftReps,
                                    curLiftWeight
                                }
                                curWorkoutLifts.push(curLiftArray);
                            });
                        }
                        curWorkoutArray = {
                            curWorkoutTitle,
                            curWorkoutDate,
                            curWorkoutLifts
                        }
                        workoutArray.push(curWorkoutArray);
                    });
                };
            });
        }
    });
    console.log(workoutArray)
}

