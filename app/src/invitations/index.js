import InvitationView from "./invitationView.js";
import InvitationManager from "./invitationManager.js";
import invitationType from "./invitation.js";
import {Event, Observable} from "../Observable.js";


async function init() {

    //creating new instances of view and manager
    let invitationManager = new InvitationManager();
    let invitationView = new InvitationView();


    const invitations = await invitationManager.getInvitations();
    invitationView.renderInvitations(invitations);

    //listener for changes on a invitation
    invitationView.addEventListener("invitationChanged", () => {
        invitationManager.updateDatabase();
    });



}

export function renderInvitations(invitationList){

        console.log(invitationList);
        let view = new InvitationView();
        view.renderInvitations(invitationList);

}

init();