import { Event, Observable } from "../Observable.js";
import Invitation from "./invitation.js";
import InvitationView from "./invitationView.js";

let invitations = [];


class InvitationManager extends Observable{

    constructor(){
        super();  
        console.log("starting InvitationManager");
    }



    //creates a new invitation.
    //keywordString is just 1 String with all the keywords
    createInvitation(food, location, date, keywordString){
        let i = new Invitation("Lucas", "lecker Essen", "bei mir daheim", "gestern", "vegan");
        let e = new Event("onInvitationCreated", i);
        this.notifyAll(e);

    }


    //this function deletes invitations, that are already over
    cleanUp(){
        //@TODO
    }
    



}


export default InvitationManager;