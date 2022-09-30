import {returnCurrentRecipe} from "../resources/js/recipeBrowser/RecipeSearch.js"
import { getExample, signOut } from "./FirebaseLogin.js";
import { generateTags } from "./TagGenerator.js";
import InvitationManager from "./invitations/invitationManager.js";

// peopleGroup works as follows: 1 = public, 3 = specific people
var selectedRecipe, peopleGroup, personName, location, datetime, hostName, tags;

// it shows the email address of the actual user

document.querySelector('#userEmailAddress').innerHTML = "Signed in as " + getExample();

let personTextbox = document.getElementById("name-bar");
let locationTextbox = document.getElementById("location-bar");
let dateTextbox = document.getElementById("date-bar");
let sendBtn = document.querySelector('.send-invitation-button');

// mobile-nav div, on click listener so that the div is shown or not
let menuIcon = document.querySelector('.menu-icon');
menuIcon.addEventListener('click', function() {
    let mobileNav = document.querySelector('.mobile-nav_menu-elements-container');
    mobileNav.style.display = (mobileNav.style.display == 'none') ? 'block' : 'none';
});

// shows popup
let inviteBtn = document.querySelector('.invite-friends-button');
inviteBtn.addEventListener('click', function() {
    document.querySelector('.popup').style.display = 'flex';
    selectedRecipe = returnCurrentRecipe();
});

// cancels request, closing the menu
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

//generates the invitation as soon as this button is pressed, and returns errors if the input is incomplete
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

    //send invitation to the InvitationManager
    let manager = new InvitationManager;
    manager.createNewInvitation(hostName, selectedRecipe.title, location, datetime, tags, peopleGroup, personName);
    
    document.querySelector('.popup').style.display = 'none';
})

// signOut function
let signOutButton = document.querySelector("#signOut");
signOutButton.addEventListener('click', signOut);