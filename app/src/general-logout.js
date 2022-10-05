// settings for the my-profile.html
import { getExample, signOut } from "./FirebaseLogin.js";

// signOut function
let signOutButton = document.querySelector("#signOut"),
    menuIcon = document.querySelector(".menu-icon");

signOutButton.addEventListener("click", signOut);

// it shows the email address of the actual user
document.querySelector("#userEmailAddress").innerHTML = "Signed in as " + getExample();

// mobile-nav div, on click listener so that the div is shown or not
menuIcon.addEventListener("click", function() {
    let mobileNav = document.querySelector(".mobile-nav_menu-elements-container");
    mobileNav.style.display = (mobileNav.style.display === "none") ? "block" : "none";
});