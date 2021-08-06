let googleUserId;
let googleDisplayName;
let googleEmailAddress;
let userHeightInches;
let userHeightFeet;
let userWeight;
let userBio;

const theNameInput = document.querySelector('#name-input');
const emailInput = document.querySelector('#email-input');
const heightInchesInput = document.querySelector('#height-feet');
const heightFeetInput = document.querySelector('#height-inches');
const weightInput = document.querySelector('#weight-input');
const bioInput = document.querySelector('#bio-input');
const submitButton = document.querySelector('#submit-button');

window.onload = (event) => {
  // Use this to retain user state between html pages.
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      console.log('Logged in as: ' + user.displayName);
      googleUserId = user.uid;
      googleDisplayName = user.displayName;
      googleEmailAddress = user.email;
      console.log("Email: " + googleEmailAddress);
      fillGoogleInfo();
      getUserInfo(googleUserId);
    } else {
      // If not logged in, navigate back to login page.
      window.location = 'index.html'; 
    };
  });
};

const fillGoogleInfo = () => {
    theNameInput.value = googleDisplayName;
    emailInput.value = googleEmailAddress;

};

const getUserInfo = (userId) => {
    const infoRef = firebase.database().ref(`userData/users/${userId}`);
    infoRef.on('value', (snapshot) => {
        const data = snapshot.val();
        fillDataToForm(data);
    });
};

const fillDataToForm = (data) => {
    for(const userInfo in data){
        const info = data[userInfo];
        const name = user.displayName;
        const email = user.email;
        console.log("Name: " + name);
        console.log("Email: " + email);
    }
};