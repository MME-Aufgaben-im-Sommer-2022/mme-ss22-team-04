
import { signOut } from "./FirebaseLogin.js";

let signOutButton = document.querySelector("#signOut");
signOutButton.addEventListener('click', signOut);