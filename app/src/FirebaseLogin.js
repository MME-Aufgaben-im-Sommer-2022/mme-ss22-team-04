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

// sign up function
export function signUp() {
    let email = document.querySelector('.signup-email');
    let password = document.querySelector('.signup-password');
    const promise = auth.createUserWithEmailAndPassword(email.value, password.value);
    promise.catch(e => alert(e.message));
    document.querySelector(".popup").style.display = "none";
    alert("Sign up successfully");
}

 //signIN function
 export function signIn(){
    let email = document.getElementById("email");
    let password  = document.getElementById("password");
    const promise = auth.signInWithEmailAndPassword(email.value,password.value);
    promise.catch(e=>alert(e.message));
    alert("Signed in as " + email.value);
    email.value = "";
    password.value = "";
    window.location.href = './search-recipe.html'
  }

  //signOut
  export function signOut(){
      auth.signOut();
      window.location.href = './index.html';
  }

  //active user to homepage
  firebase.auth().onAuthStateChanged((user)=>{
    if(user){
    } else {
    }
  })