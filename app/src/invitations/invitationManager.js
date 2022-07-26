import { Observable } from "../Observable.js";
import Invitation from "./invitation.js";
import dbManger from "./dbManager.js";

let currentInvitationList,
 database;

class InvitationManager extends Observable{

    constructor(){
        super();  
        database = new dbManger();
        this.initListener();
    }

    //initing the Listener
    initListener(){
        database.addEventListener("onInvitationListDownloaded", () => {
            currentInvitationList = database.getCurrentInvitationList();
            this.readyToRender();
        });
    }

    //getting the invitations from the database manager
    async getInvitations() {
        
        let userMail = localStorage.getItem("email");
        const invitations = await database.getInvitations(),
         filteredInvitations = this.filterInvitations(invitations, userMail);
        //this.currentInvitationList = filteredInvitations;
        return filteredInvitations;
    }

    /*
        This function let's you create new invitations from other windows. Simply call this function with the following parameter:
        - host: mail adress of the user, which is hosting the invitation
        - food: name of the food (headline of the receipt probably)
        - location: adress, where the invitation is held
        - invitationType: simply insert a number between 1 and 3. 
            1: open: every user is invited
            2: friends --> not used in this state of implementation
            3: only invited users

            For database-reasons we have to replace the '.' with an 'x', so it can be stored
    */
    createNewInvitation(host, food, location, date, keywords, invitationType, guests = ""){

        let i = new Invitation(Date.now(), host, food, location, date, keywords, invitationType);

        i.inviteGuests(guests.replaceAll(".","x"));

        this.uploadInvitation(i);
    }

    //filters user for all invited users or the host.
    filterInvitations(invitations, user){

        let filteredInvitations = [];

        for (let x = 0; x < invitations.length; x ++){
            if(invitations[x].isInvited(user)){
                filteredInvitations.push(invitations[x]);
            }
        }

        currentInvitationList = filteredInvitations;
        return filteredInvitations;
    }

    //uploads the invitation to the database
    uploadInvitation(invitation){
        database.uploadInvitationToDatabase(invitation);
    }

    updateDatabase(){
        currentInvitationList.forEach((invitation) => {
            this.uploadInvitation(invitation);
        });
    }
}

export function acceptInvite(inviteID, user){

    currentInvitationList.forEach((invitation) => {
        if(invitation.getID() === inviteID){
            invitation.acceptInvite(user);
        }
    });
    
}

export function declineInvite(inviteID, user){
    currentInvitationList.forEach((invitation) => {
        if(invitation.getID() === inviteID){
            invitation.declineInvite(user);
        }
    });
}

export default InvitationManager;