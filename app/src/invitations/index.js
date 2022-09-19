import InvitationView from "./invitationView.js";
import InvitationManager from "./invitationManager.js";

let invitationView, invitationManager;



function init() {

    invitationView = new InvitationView();
    invitationManager = new InvitationManager();

    invitationView.createDummyInvitation();

    invitationView.addEventListener("onVegetarianBtnClicked", () => {
        // Do stuff when button is clicked;
        invitationManager.filterByVegetarian();
        
    });
}

init();