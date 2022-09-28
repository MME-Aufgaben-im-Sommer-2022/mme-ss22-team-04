import InvitationView from "./invitationView.js";
import InvitationManager from "./invitationManager.js";
import invitationType from "./invitation.js";


//let invitationView, invitationManager;



function init() {

    let invitationManager = new InvitationManager();
    let invitationView = new InvitationView();


    invitationManager.addEventListener("onInvitationCreated", () => {
        //console.log("new invitation created");
    });

    invitationManager.addEventListener("invitationsReadyToRender", () => {
        console.log("jop");
        //let i = invitationManager.getInvitation();
    });


    let invitationList =invitationManager.getInvitations("Lucas");
    invitationView.renderInvitations(invitationList);
    



    //invitationManager.createNewInvitation("Christina", "Noodles", "Rudelzhausen", "Wochenende", "Nudeln, vegan", 3, "Tom, Christina");

    //renderInvitations(invitationManager, invitationView);



}

function renderInvitations(manager, view){

        //view.renderInvitations(manager.getInvitations("Lucas"));    //@todo username

}

init();