import InvitationView from "./invitationView.js";
import InvitationManager from "./invitationManager.js";
import invitationType from "./invitation.js";


let invitationView, invitationManager;



function init() {

    invitationManager = new InvitationManager();
    invitationView = new InvitationView();


    invitationView.addEventListener("onInvitationCreated", () => {
        // Do stuff when a new invitation is created;
        console.log("new invitation was created");
    });

    invitationManager.addEventListener("onInvitationCreated", () => {
        console.log("new invitation created");
    })

    renderInvitations(invitationManager, invitationView);



}

function renderInvitations(manager, view){

        view.renderInvitations(manager.getInvitations());

}

init();