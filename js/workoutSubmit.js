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

const handleWorkoutSubmit = (liftArray) => {
	// 1. Capture the form data
	const workoutId = firebase.database.ref(`workouts/users/${googleUser.uid}`).push;
	const workoutTitle = document.querySelector('#workoutTitle');
	const workoutDate = dateCreated.toDate().toDateString();

	// 2. Format the data and write it to our database
	const workoutInfo = {
		id: workoutId,
		title: workoutTitle.value,
		date: workoutDate
	}
	workoutId.push(workoutInfo);

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
        
        firebase.database().ref(`workouts/users/${googleUser.uid}/${workoutId}`).push({
            name: liftName,
			sets: liftSets,
            reps: liftReps,
            weight: liftWeight
        })
	});
}