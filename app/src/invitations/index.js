import InvitationView from "./invitationView.js";
import InvitationManager from "./invitationManager.js";

let invitationView, invitationManager;



function init() {

    invitationView = new InvitationView();
    invitationManager = new InvitationManager();

    invitationManager.createInvitation("a", "b", "c", "d");

    invitationView.addEventListener("onVegetarianBtnClicked", () => {
        // Do stuff when button is clicked;
        invitationManager.filterByVegetarian();
        
    });

    invitationManager.addEventListener("onInvitationCreated", () => {
        //hier vmtl nochmal ändern
        console.log("listener");
    });
}

init();