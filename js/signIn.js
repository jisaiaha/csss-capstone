const signIn = () => {
    var provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth()
  .signInWithPopup(provider)
  .then((result) => {
    /** @type {firebase.auth.OAuthCredential} */
    var credential = result.credential;
    var token = credential.accessToken;

    //The signed-in user info.
    //try document.cookie = true {}
    if(!document.cookie.includes('landingPage')) {
        window.location.href = "home.html";
        console.log(document.cookie)
        console.log("Cookie Exists")
   } else {
        window.location.href = 'info.html'; 
        console.log("Cookie Never Existed")
        document.cookie = "landingPage=visited; expires=Fri, 31 Dec 9999 23:59:59 GMT"; 
        console.log(document.cookie);
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

// const LogOut = () => {
// let firebase = new firebase;
//   firebase.auth()
//   .signOut()
//   .then(() => {
//     window.location.href = "index.html"
//     console.log("Logged Out")
//   }).catch((error) => {
//     // An error happened.
//   });
// }
