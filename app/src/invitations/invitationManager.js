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
    /*
        This function let's you create new invitations from other windows. Simply call this function with the following parameter:
        - host: mail adress of the user, which is hosting the invitation
        - food: name of the food (headline of the receipt probably)
        - location: adress, where the invitation is held
        - invitationType: simply insert a number between 1 and 3. 
            1: open: every user is invited
            2: friends
            3: only invited users
    */
    createNewInvitation(host, food, location, date, keywords, invitationType, guests){

        let i = new Invitation(Date.now(), host, food, location, date, keywords, invitationType, guests);
        let e = new Event("onInvitationCreated");
        this.notifyAll(e);
        console.log(i);
        this.uploadInvitation(i);
    }

    getInvitations(username){
        let invitations = this.downloadInvitations();
        let filteredInvitations = this.filterInvitations(invitations, username);
        console.log(filteredInvitations);
        return filteredInvitations;
    }


    filterInvitations(i, u){
        let filteredInvitations = [];

        for (var x = 0; x < i.length; x ++){
            if(i[x].isInvited(u)){
                filteredInvitations.push(i[x]);
            }
        }

        return filteredInvitations;
    }

    downloadInvitations(){
        //@todo download invitations

        let invitations = [];

        invitations.push(new Invitation(1, "Lucas", "Nudeln", "Regensburg", "heute", "vegan, vegetarisch, Nudeln", 1));
        invitations.push(new Invitation(2, "Tom", "Pizza", "Regensburg", "morgen", "vegetarisch, itatlienisch, Gemüse, Käse", 1));
        invitations.push(new Invitation(3, "Christina", "Burger", "Regensburg", "übermorgen", "Fleisch, Pommes", 1));
        invitations.push(new Invitation(4, "Tom", "Pfannkuchen", "Regensburg", "gestern", "vegetarisch, süß", 1));
        invitations.push(new Invitation(5, "Christina", "Spätzle mit Rahmschwammerl", "Regensburg", "heute abend", "vegetarisch, Pilze", 3, "Tom, Fabi"));
    
        console.log(invitations);
        return invitations;

    }

    //uploads the invitation to the database
    uploadInvitation(invitation){
        //@todo upload invitation
    }
    



}


export default InvitationManager;