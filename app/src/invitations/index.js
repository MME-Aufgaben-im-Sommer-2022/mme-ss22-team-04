import InvitationView from "./invitationView.js";
import InvitationManager from "./invitationManager.js";
import invitationType from "./invitation.js";
import {Event, Observable} from "../Observable.js";


//let invitationView, invitationManager;


async function init() {

    let invitationManager = new InvitationManager();
    let invitationView = new InvitationView();

    invitationManager.addEventListener("onInvitationCreated", () => {
        console.log("new invitation created");
    });


    const invitations = await invitationManager.getInvitations();

    invitationView.renderInvitations(invitations);

    
    



    //invitationManager.createNewInvitation("Christina", "Noodles", "Rudelzhausen", "Wochenende", "Nudeln, vegan", 3, "Tom, Christina");

    //renderInvitations(invitationManager, invitationView);



}

export function renderInvitations(invitationList){

        console.log(invitationList);
        //renderInvitations(invitationList);    //@todo username
        let view = new InvitationView();
        view.renderInvitations(invitationList);

}

init();