
import { getExample, signOut } from "./FirebaseLogin.js";

let signOutButton = document.querySelector("#signOut");
signOutButton.addEventListener('click', signOut);

document.querySelector('#userEmailAddress').innerHTML = "Signed in as " + getExample();

// mobile-nav
let menuIcon = document.querySelector('.menu-icon');
menuIcon.addEventListener('click', function() {
    let mobileNav = document.querySelector('.mobile-nav_menu-elements-container');
    mobileNav.style.display = (mobileNav.style.display == 'none') ? 'block' : 'none';
});