/* global firebase */

let saving = false,
    saveButton = document.getElementById("save-button");

const db = firebase.firestore(),
 auth = firebase.auth(),

 nameField = document.getElementById("settings-name"),
    emailField = document.getElementById("settings-email"),
    numberField = document.getElementById("settings-phone-number"),
    aboutMeField = document.getElementById("settings-about-me");
    
function markReadOnly (active){
    nameField.readOnly = active;
    emailField.readOnly = active;
    numberField.readOnly = active;
    aboutMeField.readOnly = active;
}

async function onAuthorized(user) {
    const snap = await db.collection("profiles").doc(user.uid).get(), //try catch use if no data
     data = snap.data();
    nameField.value = data.name;
    emailField.value = data.email;
    numberField.value = data.phoneNumber;
    aboutMeField.value = data.aboutMe;
    markReadOnly(false);
    saveButton.addEventListener("click", async () => {
        if(saving) {return;}
        saving = true;
        markReadOnly(true);
        saveButton.innerHTML = "Saving...";
        saveButton.classList.add("disabled");
        await db.collection("profiles").doc(user.uid).set({
            name: nameField.value,
            email: emailField.value,
            phoneNumber: numberField.value,
            aboutMe: aboutMeField.value,
        });
        markReadOnly(false);
        saving = false;
        saveButton.innerHTML = "Save Profile";
        saveButton.classList.remove("disabled");
    });
}

auth.onAuthStateChanged(user => {
    if(user) {onAuthorized(user);}
}); 

