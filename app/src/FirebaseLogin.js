/* global firebase */

// General data and functions of the Firebase

// Initialize Firebase
  if (!firebase.apps.length) {
    firebase.initializeApp({
        apiKey: "AIzaSyColpusaLC7uzOEr8R3XCGUTPB5bYOV2dQ",
        authDomain: "eatwithme-e7e95.firebaseapp.com",
        projectId: "eatwithme-e7e95",
        storageBucket: "eatwithme-e7e95.appspot.com",
        messagingSenderId: "922257626910",
        appId: "1:922257626910:web:7e9e3848e124e64e21db0f",
        databaseURL: "https://eatwithme-e7e95-default-rtdb.europe-west1.firebasedatabase.app/",
    });
}else {
    firebase.app(); // if already initialized, use that one
}
// Firebase configuration
const db = firebase.firestore(),
      auth = firebase.auth(),
      alertbox = document.getElementById("index-alertbox"),
      ALERT_TIMER = 8000;
  
  
  export function getExample() {
    return localStorage.getItem("email");
  }

// sign up function
export function signUp() {
    let email = document.querySelector(".signup-email"),
     password = document.querySelector(".signup-password");
    auth.createUserWithEmailAndPassword(email.value, password.value)
                      .then((cred) => {
                        db.collection("profiles").doc(cred.user.uid).set({
                          name: cred.user.displayName || cred.user.email,
                          phoneNumber: cred.user.phoneNumber || "",
                          email: cred.user.email,
                          aboutMe: "",
                        });
                        alertbox.innerHTML = "Signed up successfully";
                        clearAlertbox();
                      }).catch((error) => {
                        const errorMessage = error.message;
                        alertbox.innerHTML = errorMessage;
                        clearAlertbox();
                      });
    document.querySelector(".popup").style.display = "none";
}

 //signIN function
 export function signIn(){
    let email = document.getElementById("email"),
     password = document.getElementById("password");
    auth.signInWithEmailAndPassword(email.value,password.value)
                      .then((userCredential) => {
                        localStorage.setItem("email", userCredential.user.email);
                        alertbox.innerHTML = `Signed in as ${userCredential.user.email}`;
                        clearAlertbox();
                        window.location.href = "./search-recipe.html";
                      }).catch((error) => {
                        const errorMessage = error.message;
                        alertbox.innerHTML = errorMessage;
                        clearAlertbox();
                      });
    email.value = "";
    password.value = "";
  }

  //signOut
  export function signOut(){
      auth.signOut().then(() => {
        localStorage.removeItem("email");
      }).catch((error) => {
        const errorMessage = error.message;
        alertbox.innerHTML = errorMessage;
        clearAlertbox();
      });
      window.location.href = "./index.html";
  }

  //active user to homepage
/*await firebase.auth().onAuthStateChanged((user)=>{
    if(user){
    } else {
    }
  });*/

let timeout;

function clearAlertbox(){
  clearTimeout(timeout);
  timeout = setTimeout(function(){
      alertbox.innerHTML = "";
  }, ALERT_TIMER);
}