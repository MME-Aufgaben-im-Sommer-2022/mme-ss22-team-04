
// Firebase configuration
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
  
  export function getExample() {
    return localStorage.getItem("email");
  }

// sign up function
export function signUp() {
    let email = document.querySelector('.signup-email');
    let password = document.querySelector('.signup-password');
    const promise = auth.createUserWithEmailAndPassword(email.value, password.value)
                      .then(() => {
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

  //active user to homepage
await firebase.auth().onAuthStateChanged((user)=>{
    if(user){
    } else {
    }
  })