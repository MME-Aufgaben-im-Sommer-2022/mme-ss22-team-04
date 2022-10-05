import InvitationView from "./invitationView.js";
import InvitationManager from "./invitationManager.js";

//let invitationView, invitationManager;


async function init() {

    //creating new instances of view and manager
    let invitationManager = new InvitationManager(),
     invitationView = new InvitationView();

    const invitations = await invitationManager.getInvitations();
    invitationView.renderInvitations(invitations);
    invitationView.addEventListener("invitationChanged", () => {
        invitationManager.updateDatabase();
    });

}

export function renderInvitations(invitationList){

        let view = new InvitationView();
        view.renderInvitations(invitationList);

}

init();