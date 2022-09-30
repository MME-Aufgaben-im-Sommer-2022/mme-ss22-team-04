import {signUp, signIn} from "./FirebaseLogin.js"

// opens the popup div on the Login Interface
let signUpButton = document.querySelector("#signUp");
signUpButton.addEventListener('click', function() {
  document.querySelector(".popup").style.display = "flex";
});

// signIn function for the Login Interface
let signInButton = document.querySelector("#signIn");
signInButton.addEventListener('click', signIn);

// on click listener for the "Cancel" button in the popup div on the Login Interface (when signing up)
let cancelBtn = document.querySelector(".popup-cancelbtn");
cancelBtn.addEventListener('click', function() {
  document.querySelector(".popup").style.display = "none";
});

// signUp Function
let registerUser = document.querySelector("#signup-button");
registerUser.addEventListener('click', signUp);

let cancelBtnPassword = document.querySelector('.popup-cancelbtn-password');
cancelBtnPassword.addEventListener('click', function() {
  document.querySelector('.popup-password').style.display = 'none';
})
