import InvitationView from "./invitationView.js";
import InvitationManager from "./invitationManager.js";
import invitationType from "./invitation.js";


let invitationView, invitationManager;



function init() {

    invitationManager = new InvitationManager();
    invitationView = new InvitationView();


    invitationManager.addEventListener("onInvitationCreated", () => {
        //console.log("new invitation created");
    });


    invitationManager.createNewInvitation("Christina", "Noodles", "Rudelzhausen", "Wochenende", "Nudeln, vegan", 3, "Tom, Christina");

    renderInvitations(invitationManager, invitationView);



}

function renderInvitations(manager, view){

        view.renderInvitations(manager.getInvitations("Lucas"));    //@todo username

}

init();