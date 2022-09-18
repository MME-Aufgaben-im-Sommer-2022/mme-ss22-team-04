//function init() {
//     console.log("### Starting MME Project ###"); // eslint-disable-line no-console
//}

// init();

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyColpusaLC7uzOEr8R3XCGUTPB5bYOV2dQ",
  authDomain: "eatwithme-e7e95.firebaseapp.com",
  projectId: "eatwithme-e7e95",
  storageBucket: "eatwithme-e7e95.appspot.com",
  messagingSenderId: "922257626910",
  appId: "1:922257626910:web:7e9e3848e124e64e21db0f"
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

let changePasswordBtn = document.querySelector('#changePassword');
changePasswordBtn.addEventListener('click', function() {
  document.querySelector('.popup-password').style.display = 'flex';
})

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
 function signIn(){
    let email = document.getElementById("email");
    let password  = document.getElementById("password");
    const promise = auth.signInWithEmailAndPassword(email.value,password.value);
    promise.catch(e=>alert(e.message));
    alert("Signed in as " + email.value);
    email.value = "";
    password.value = "";
  }

  //signOut
  function signOut(){
      auth.signOut();
      alert("SignOut Successfully from System");
      window.location.href = './index.html';
  }

  //active user to homepage
  firebase.auth().onAuthStateChanged((user)=>{
    if(user){
      // window.location.href = './search-recipe.html'
    } else {
      alert("No Active user Found")
    }
  })