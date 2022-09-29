// TODO I: API-request for the recipes - Solved in RecipeSearch.js
// TODO II: add functionality to "Send invitation" - Probably will be made by sending out a JSON object as an event or something

import {returnCurrentRecipe} from "../resources/js/recipeBrowser/RecipeSearch.js"
import { getExample, signOut } from "./FirebaseLogin.js";
import { generateTags } from "./TagGenerator.js";
import InvitationManager from "./invitations/invitationManager.js";

// peopleGroup works as follows: 0 = public, 1 = friends, 2 = one person
var selectedRecipe, peopleGroup, personName, location, datetime, hostName, tags;

document.querySelector('#userEmailAddress').innerHTML = "Signed in as " + getExample();

let personTextbox = document.getElementById("name-bar");
let locationTextbox = document.getElementById("location-bar");
let dateTextbox = document.getElementById("date-bar");
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
    oneFriendBtn.style.backgroundColor = '#00d3b7';
    peopleGroup = 1;
    sendBtn.removeAttribute("disabled");
    personTextbox.setAttribute("disabled", "");
});

let oneFriendBtn = document.querySelector('.one-friend');
oneFriendBtn.addEventListener('click', function() {
    oneFriendBtn.style.backgroundColor = '#018371';
    publicBtn.style.backgroundColor = '#00d3b7';
    peopleGroup = 3;
    sendBtn.removeAttribute("disabled");
    personTextbox.removeAttribute("disabled");
});

sendBtn.addEventListener('click', function() {
    hostName = getExample();
    personName = personTextbox.value;
    location = locationTextbox.value;
    datetime = dateTextbox.value;
    if(personName === "" && peopleGroup === 3) {
        alert("Please insert at least 1 e-mail address");
        return;
    }
    
    if(location === "") {
        alert("Please insert the location");
        return;
    }

    if(datetime === "") {
        alert("Please specify a time");
        return;
    }

    tags = generateTags(selectedRecipe);

    //does this need a rework?
    /*let returnText =    '{ "peopleGroup" : '+ peopleGroup +', '+ 
                        '"selectedRecipe" : '+ JSON.stringify(selectedRecipe) +', '+
                        '"personName" : "'+ personName +'"}';
    let returnJSON = JSON.parse(returnText);*/

    //TODO: AAAAAAAAAAAAAAAAAAAAAAA

    let manager = new InvitationManager;
    manager.createNewInvitation(hostName, selectedRecipe.title, location, datetime, tags, peopleGroup, personName);

    console.log(hostName)
    console.log(selectedRecipe.title)
    console.log(location)
    console.log(datetime)
    console.log(tags)
    console.log(peopleGroup)
    console.log(personName)
    

    document.querySelector('.popup').style.display = 'none';
})

let signOutButton = document.querySelector("#signOut");
signOutButton.addEventListener('click', signOut);