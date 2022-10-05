import {signUp, signIn} from "./FirebaseLogin.js";

let signUpButton = document.querySelector("#signUp"),
    signInButton = document.querySelector("#signIn"),
    cancelBtn = document.querySelector(".popup-cancelbtn"),
    registerUser = document.querySelector("#signup-button"),
    cancelBtnPassword = document.querySelector(".popup-cancelbtn-password");

// opens the popup div on the Login Interface
signUpButton.addEventListener("click", function() {
  document.querySelector(".popup").style.display = "flex";
});

// signIn function for the Login Interface
signInButton.addEventListener("click", signIn);

// on click listener for the "Cancel" button in the popup div on the Login Interface (when signing up)
cancelBtn.addEventListener("click", function() {
  document.querySelector(".popup").style.display = "none";
});

// signUp Function
registerUser.addEventListener("click", signUp);

cancelBtnPassword.addEventListener("click", function() {
  document.querySelector(".popup-password").style.display = "none";
});
