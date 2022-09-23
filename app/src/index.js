import {signUp, signIn} from "./FirebaseLogin.js"


let signUpButton = document.querySelector("#signUp");
signUpButton.addEventListener('click', function() {
  document.querySelector(".popup").style.display = "flex";
});

let signInButton = document.querySelector("#signIn");
signInButton.addEventListener('click', signIn);

let cancelBtn = document.querySelector(".popup-cancelbtn");
cancelBtn.addEventListener('click', function() {
  document.querySelector(".popup").style.display = "none";
});

let registerUser = document.querySelector("#signup-button");
registerUser.addEventListener('click', signUp);

let cancelBtnPassword = document.querySelector('.popup-cancelbtn-password');
cancelBtnPassword.addEventListener('click', function() {
  document.querySelector('.popup-password').style.display = 'none';
})

const resetPasswordFunction = () => {
  const email = document.querySelector('.email-for-new-password').value;
  auth.sendPasswordResetEmail(email)
  .then(() => {
    console.log('Password reset email sent successfully!');
    document.querySelector('.popup-password').style.display = 'none';
  })
  .catch(error => {
    console.error(error);
  })
}

let sendNewPasswordBtn = document.querySelector('.send-password');
sendNewPasswordBtn.addEventListener('click', resetPasswordFunction);
