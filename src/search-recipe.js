import {returnCurrentRecipe} from "../resources/js/recipeBrowser/RecipeSearch.js";
import { getExample, signOut } from "./FirebaseLogin.js";
import { generateTags } from "./TagGenerator.js";
import InvitationManager from "./invitations/invitationManager.js";

const ALERTBOX_RECIPE = document.getElementById("recipesearch-alertbox"),
    ALERT_TIMER = 8000,
    EVERYONE = 1,
    SPECIFIC_PEOPLE = 3;

// peopleGroup works as follows: 1 = public, 3 = specific people
var selectedRecipe, peopleGroup, personName, location, datetime, hostName, tags;

// it shows the email address of the actual user

document.querySelector("#userEmailAddress").innerHTML = "Signed in as " + getExample();

let timeout,
 personTextbox = document.getElementById("name-bar"),
 locationTextbox = document.getElementById("location-bar"),
 dateTextbox = document.getElementById("date-bar"),
 sendBtn = document.querySelector(".send-invitation-button"),
 inviteBtn = document.querySelector(".invite-friends-button"),
 cancelBtn = document.querySelector(".cancel-button"),
 publicBtn = document.querySelector(".public"),
 oneFriendBtn = document.querySelector(".one-friend"),
 signOutButton = document.querySelector("#signOut"),

// mobile-nav div, on click listener so that the div is shown or not
 menuIcon = document.querySelector(".menu-icon");
menuIcon.addEventListener("click", function() {
    let mobileNav = document.querySelector(".mobile-nav_menu-elements-container");
    mobileNav.style.display = (mobileNav.style.display === "none") ? "block" : "none";
});

// shows popup
inviteBtn.addEventListener("click", function() {
    document.querySelector(".popup").style.display = "flex";
    selectedRecipe = returnCurrentRecipe();
});

// cancels request, closing the menu
cancelBtn.addEventListener("click", function() {
    document.querySelector(".popup").style.display = "none";
});

publicBtn.addEventListener("click", function() {
    publicBtn.style.backgroundColor = "#018371";
    oneFriendBtn.style.backgroundColor = "#00d3b7";
    peopleGroup = EVERYONE;
    sendBtn.removeAttribute("disabled");
    personTextbox.setAttribute("disabled", "");
});

oneFriendBtn.addEventListener("click", function() {
    oneFriendBtn.style.backgroundColor = "#018371";
    publicBtn.style.backgroundColor = "#00d3b7";
    peopleGroup = SPECIFIC_PEOPLE;
    sendBtn.removeAttribute("disabled");
    personTextbox.removeAttribute("disabled");
});

//generates the invitation as soon as this button is pressed, and returns errors if the input is incomplete
sendBtn.addEventListener("click", function() {
    hostName = getExample();
    personName = personTextbox.value;
    location = locationTextbox.value;
    datetime = dateTextbox.value;
    let manager = new InvitationManager;
    if(personName === "" && peopleGroup === SPECIFIC_PEOPLE) {
        ALERTBOX_RECIPE.innerHTML = "Please insert at least 1 e-mail address.";
        clearAlertbox();
        return;
    }
    
    if(location === ""){
        ALERTBOX_RECIPE.innerHTML = "Please insert the location";
        clearAlertbox();
        return;
    }

    if(datetime === "") {
        ALERTBOX_RECIPE.innerHTML = "Please specify a time";
        clearAlertbox();
        return;
    }

    tags = generateTags(selectedRecipe);

    //send invitation to the InvitationManager
    manager.createNewInvitation(hostName, selectedRecipe.title, location, datetime, tags, peopleGroup, personName);
    
    ALERTBOX_RECIPE.innerHTML = "Invitation sent";
    clearAlertbox();
    
    document.querySelector(".popup").style.display = "none";
});

// signOut function
signOutButton.addEventListener("click", signOut);

function clearAlertbox(){
    clearTimeout(timeout);
    timeout = setTimeout(function(){
        ALERTBOX_RECIPE.innerHTML = "";
    }, ALERT_TIMER);
}
