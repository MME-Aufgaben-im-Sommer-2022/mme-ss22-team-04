// TODO I: API-request for the recipes - Solved in RecipeSearch.js
// TODO II: add functionality to "Send invitation" - Probably will be made by sending out a JSON object as an event or something

import {returnCurrentRecipe} from "../resources/js/recipeBrowser/RecipeSearch.js"
import { getExample, signOut } from "./FirebaseLogin.js";

// peopleGroup works as follows: 0 = public, 1 = friends, 2 = one person
var selectedRecipe, peopleGroup, personName;

document.querySelector('#userEmailAddress').innerHTML = "Signed in as " + getExample();
=======
let inviteTextbox = document.getElementById("name-bar");
let sendBtn = document.querySelector('.send-invitation-button');

// mobile-nav
let menuIcon = document.querySelector('.menu-icon');
menuIcon.addEventListener('click', function() {
    let mobileNav = document.querySelector('.mobile-nav_menu-elements-container');
    mobileNav.style.display = (mobileNav.style.display == 'none') ? 'block' : 'none';
});

let inviteBtn = document.querySelector('.invite-friends-button');
inviteBtn.addEventListener('click', function() {
    document.querySelector('.popup').style.display = 'flex';
    selectedRecipe = returnCurrentRecipe();
});

let cancelBtn = document.querySelector('.cancel-button');
cancelBtn.addEventListener('click', function() {
    document.querySelector('.popup').style.display = 'none';
});

let publicBtn = document.querySelector('.public');
publicBtn.addEventListener('click', function() {
    publicBtn.style.backgroundColor = '#018371';
    friendsBtn.style.backgroundColor = '#00d3b7';
    oneFriendBtn.style.backgroundColor = '#00d3b7';
    peopleGroup = 0;
    sendBtn.removeAttribute("disabled");
});

let friendsBtn = document.querySelector('.friends');
friendsBtn.addEventListener('click', function() {
    friendsBtn.style.backgroundColor = '#018371';
    publicBtn.style.backgroundColor = '#00d3b7';
    oneFriendBtn.style.backgroundColor = '#00d3b7';
    peopleGroup = 1;
    sendBtn.removeAttribute("disabled");
});

let oneFriendBtn = document.querySelector('.one-friend');
oneFriendBtn.addEventListener('click', function() {
    oneFriendBtn.style.backgroundColor = '#018371';
    publicBtn.style.backgroundColor = '#00d3b7';
    friendsBtn.style.backgroundColor = '#00d3b7';
    peopleGroup = 2;
    sendBtn.removeAttribute("disabled");
});

sendBtn.addEventListener('click', function() {
    personName = inviteTextbox.value;
    if(personName === "" && peopleGroup === 2) {
        alert("Please insert his/her name");
        return;
    }
    let returnText =    '{ "peopleGroup" : '+ peopleGroup +', '+ 
                        '"selectedRecipe" : '+ JSON.stringify(selectedRecipe) +', '+
                        '"personName" : "'+ personName +'"}';
    let returnJSON = JSON.parse(returnText);

    console.log(returnJSON); //TODO: Replace with appropriate event function

    document.querySelector('.popup').style.display = 'none';
})

let signOutButton = document.querySelector("#signOut");
signOutButton.addEventListener('click', signOut);