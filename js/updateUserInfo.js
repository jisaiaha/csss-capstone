const userName = document.querySelector('#username-home')
const otherUserNames =  document.querySelector('.username')
const profilePic = document.querySelector('#profile-pic')
// Firebase authentication goes here.
 firebase.auth().onAuthStateChanged(user => {
   if (user) {
     // Console log the user to confirm they are logged in
     console.log("Logged in as: " + user.displayName);
 
     googleUserId = user.uid;
     uniqueUID = user.uid;
     userName.innerHTML = user.displayName;
     const userPicUrl = user.photoURL;
     profilePic.src=userPicUrl
     otherUserNames.innerHTML = user.displayName;
    } else {
   
    }
 });