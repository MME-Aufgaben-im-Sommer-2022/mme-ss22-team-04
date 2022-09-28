import Invitation from "./invitations/invitation.js";

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyColpusaLC7uzOEr8R3XCGUTPB5bYOV2dQ",
    authDomain: "eatwithme-e7e95.firebaseapp.com",
    projectId: "eatwithme-e7e95",
    storageBucket: "eatwithme-e7e95.appspot.com",
    messagingSenderId: "922257626910",
    appId: "1:922257626910:web:7e9e3848e124e64e21db0f",
    databaseURL: "https://eatwithme-e7e95-default-rtdb.europe-west1.firebasedatabase.app/"
  };
  
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  
  const db = firebase.firestore();
  const auth = firebase.auth();
  const database = firebase.database();
  
  
  export function getExample() {
    return localStorage.getItem("email");
  }


// sign up function
export function signUp() {
    let email = document.querySelector('.signup-email');
    let password = document.querySelector('.signup-password');
    const promise = auth.createUserWithEmailAndPassword(email.value, password.value)
                      .then((cred) => {
                        db.collection("profiles").doc(cred.user.uid).set({
                          name: cred.user.displayName || cred.user.email,
                          phoneNumber: cred.user.phoneNumber || "",
                          email: cred.user.email,
                          aboutMe: "",
                        })
                        alert("Sign up successfully");
                      }).catch((error) => {
                        const errorMessage = error.message;
                        alert(errorMessage);
                      });
    document.querySelector(".popup").style.display = "none";
}

 //signIN function
 export function signIn(){
    let email = document.getElementById("email");
    let password  = document.getElementById("password");
    const promise = auth.signInWithEmailAndPassword(email.value,password.value)
                      .then((userCredential) => {
                        localStorage.setItem("email", userCredential.user.email);
                        alert("Signed in as " + userCredential.user.email);
                        window.location.href = './search-recipe.html';
                      }).catch((error) => {
                        const errorMessage = error.message;
                        alert(errorMessage);
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
        alert(errorMessage);
      });
      window.location.href = './index.html';
  }


  //uploading an invitation to the realtime database
  export function uploadInvitationToDatabase(i){
/*
      database.ref('/invitations/' + i.getID()).set({
        id: i.getID(),
        host: i.getHostName(),
        food: i.getFoodName(),
        location: i.getLocationName(),
        date: i.getDate(),
        keywords: i.getKeywords(),
        invitationType: i.getInvitationType(),
        guests: i.getGuestString()
      });
      */
  } 


  export function downloadInvitationsFromDatabase(){

    const dbRef = firebase.database().ref();
    let data;

/*

    dbRef.child("invitations").get().then((snapshot) => {
      if (snapshot.exists()) {
        //handleDownloadedInvitations(snapshot.val());
        return snapshot.val();
      } else {
        console.log("No data available");
        return null;
      }
    }).catch((error) => {
      console.error(error);
      return null;
    });
*/

    let invitationList = [];

    firebase.database().ref("/invitations/").on('value', function(snap){

      snap.forEach(function(childNodes){

        let id = childNodes.val().id;
        let host = childNodes.val().host;
        let food = childNodes.val().food;
        let location = childNodes.val().location;
        let date = childNodes.val().date;
        let keywords = childNodes.val().keywords;
        let type = childNodes.val().type;
        let guests = childNodes.val().guests;
        let i = new Invitation(id, host, food, location, date, keywords, type, guests);

        invitationList.push(i);

      });
    });

    console.log(invitationList);
    renderInvitations(invitationList);

  }

  function renderInvitations (i){

    let e = new Event("onInvitationListDownloaded");
    //@todo


  }


  //active user to homepage
await firebase.auth().onAuthStateChanged((user)=>{
    if(user){
    } else {
    }
  })