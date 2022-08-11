// function init() {
//     console.log("### Starting MME Project ###"); // eslint-disable-line no-console
// }

// init();

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAFDNuBXFMcPLeI_rKmCMlcVWgVtAnJRfo",
  authDomain: "eatwithme-646c4.firebaseapp.com",
  databaseURL: "https://eatwithme-646c4-default-rtdb.firebaseio.com",
  projectId: "eatwithme-646c4",
  storageBucket: "eatwithme-646c4.appspot.com",
  messagingSenderId: "1092918709670",
  appId: "1:1092918709670:web:ecbb9be08ce583550c1367"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();

let signUpButton = document.querySelector("#signUp");
signUpButton.addEventListener('click', function() {
  document.querySelector(".popup").style.display = "flex";
});

let signInButton = document.querySelector("#signIn");
signInButton.addEventListener('click', signIn);

let signOutButton = document.querySelector("#signOut");
signOutButton.addEventListener('click', signOut);

let cancelBtn = document.querySelector(".popup-cancelbtn");
cancelBtn.addEventListener('click', function() {
  document.querySelector(".popup").style.display = "none";
});

let registerUser = document.querySelector("#signup-button");
registerUser.addEventListener('click', signUp);


// sign up function
function signUp() {
    let email = document.querySelector('.signup-email');
    let password = document.querySelector('.signup-password');
    const promise = auth.createUserWithEmailAndPassword(email.value, password.value);
    promise.catch(e => alert(e.message));
    document.querySelector(".popup").style.display = "none";
    alert("Sign up successfully");
}

 //signIN function
 function  signIn(){
    let email = document.getElementById("email");
    let password  = document.getElementById("password");
    const promise = auth.signInWithEmailAndPassword(email.value,password.value)
                        .catch(alert("First try"));
    promise.catch(e=>alert(e.message));
    email.value = "";
    password.value = "";
  }


  //signOut
  function signOut(){
    auth.signOut();
    alert("SignOut Successfully from System");
  }

  //active user to homepage
  firebase.auth().onAuthStateChanged((user)=>{
    if(user){
      let email = user.email;
      alert("Active user "+email);

    }else{
      alert("No Active user Found")
    }
  })