import { Event, Observable } from "../Observable.js";
import Invitation from "./invitation.js";
import InvitationView from "./invitationView.js";
import invitationType from "./invitation.js";

let invitations = [];


class InvitationManager extends Observable{

    constructor(){
        super();  
        console.log("starting InvitationManager");
    }



    //creates a new invitation.
    //keywords is just 1 String, separated by commas, with all the keywords
    createInvitation(id, host, food, location, date, keywords, invitationType){
        /*
        let i = new Invitation(host, food, location, date, keywords, invitationType);
        let e = new Event("onInvitationCreated");
        this.notifyAll(e);
        console.log(i);
        this.uploadInvitation(i);
        */
    }

    //creating new invitation -> ID will be generated
    createNewInvitation(){

        let i = new Invitation(Date.now(), host, food, location, date, keywords, invitationType, guests);
        let e = new Event("onInvitationCreated");
        this.notifyAll(e);
        console.log(i);
        this.uploadInvitation(i);
        //@todo
    }

    getInvitations(){
        let invitations = this.downloadInvitations();
        return invitations;
    }

    downloadInvitations(){
        //@todo download invitations

        let invitations = [];

        invitations.push(new Invitation(1, "Lucas", "Nudeln", "Regensbur", "heute", "vegan, vegetarisch, Nudeln", invitationType.open));
        invitations.push(new Invitation(2, "Lucas", "Pizza", "Regensbur", "heute", "vegan, vegetarisch, Nudeln", invitationType.open));
        //invitations.push(new Invitation("Lucas", "Nudeln", "Regensbur", "heute", "vegan, vegetarisch, Nudeln", invitationType.open));
        //invitations.push(new Invitation("Lucas", "Burger", "Regensbur", "heute", "vegan, vegetarisch, Nudeln", invitationType.open));
    
        return invitations;

    }

    //uploads the invitation to the database
    uploadInvitation(invitation){
        //@todo upload invitation
    }


    //this function deletes invitations, that are already over
    cleanUp(){
        //@TODO
    }
    



}


export default InvitationManager;