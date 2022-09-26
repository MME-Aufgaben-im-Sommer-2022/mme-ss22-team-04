const firebaseConfig = {
    apiKey: "AIzaSyColpusaLC7uzOEr8R3XCGUTPB5bYOV2dQ",
    authDomain: "eatwithme-e7e95.firebaseapp.com",
    projectId: "eatwithme-e7e95",
    storageBucket: "eatwithme-e7e95.appspot.com",
    messagingSenderId: "922257626910",
    appId: "1:922257626910:web:7e9e3848e124e64e21db0f"
};

let saving = false;

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const auth = firebase.auth();

const nameField = document.getElementById("settings-name"),
    emailField = document.getElementById("settings-email"),
    numberField = document.getElementById("settings-phone-number"),
    aboutMeField = document.getElementById("settings-about-me");

let saveButton = document.getElementById("save-button");
    
function markReadOnly (active){
    nameField.readOnly = active;
    emailField.readOnly = active;
    numberField.readOnly = active;
    aboutMeField.readOnly = active;
}

async function onAuthorized(user) {
    console.log("on", user)
    const snap = await db.collection("profiles").doc(user.uid).get() //try catch use if no data
    const data = snap.data()
    nameField.value = data.name;
    emailField.value = data.email;
    numberField.value = data.phoneNumber;
    aboutMeField.value = data.aboutMe;
    markReadOnly(false);
    saveButton.addEventListener('click', async () => {
        if(saving) return;
        saving = true;
        markReadOnly(true);
        saveButton.innerHTML = "Saving...";
        saveButton.classList.add("disabled");
        await db.collection("profiles").doc(user.uid).set({
            name: nameField.value,
            email: emailField.value,
            phoneNumber: numberField.value,
            aboutMe: aboutMeField.value,
        })
        markReadOnly(false);
        saving = false;
        saveButton.innerHTML = "Save Profile";
        saveButton.classList.remove("disabled");
    });
}

function onUnAuthorized() {
    
}

auth.onAuthStateChanged(user => {
    if(user) onAuthorized(user);
    else onUnAuthorized();
}) 





