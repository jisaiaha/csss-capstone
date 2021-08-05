const signIn = () => {
    var provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth()
  .signInWithPopup(provider)
  .then((result) => {
    /** @type {firebase.auth.OAuthCredential} */
    var credential = result.credential;
    var token = credential.accessToken;

    // The signed-in user info.
    var user = result.user;
    //window.location = 'info.html'; 
    //Sign-In sending location
    if(document.cookie.includes('landingPage')) {
        window.location.href = "home.html";
        console.log(document.cookie)
   } else {
        window.location.href = 'info.html'; 
   }
    
  }).catch((error) => {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // The email of the user's account used.
    var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    var credential = error.credential;
    const err = {
      errorCode,
      errorMessage,
      email,
      credential
    };
    console.log(err);
  });
}

const LogOut = () => {
  firebase.auth()
  .signOut()
  .then(() => {
    window.location.href = "index.html"
    console.log("Logged Out")
  }).catch((error) => {
    // An error happened.
  });
}