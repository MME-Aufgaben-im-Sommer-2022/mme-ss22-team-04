import { Event, Observable } from "../Observable.js";
import Invitation from "./invitation.js";
import invitationType from "./invitation.js";
import dbManger from "./dbManager.js";

let currentInvitationList;
let database;


class InvitationManager extends Observable{

    constructor(){
        super();  
        database = new dbManger();
        this.initListener();
    }

    initListener(){
        database.addEventListener("onInvitationListDownloaded", () => {
            currentInvitationList = database.getCurrentInvitationList();
            this.readyToRender();
        });
    }

    async getInvitations() {
        
        let userMail = localStorage.getItem("email");
        const invitations = await database.getInvitations();
        const filteredInvitations = this.filterInvitations(invitations, userMail);
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
            2: friends
            3: only invited users
    */
    createNewInvitation(host, food, location, date, keywords, invitationType, guests = ""){

        let i = new Invitation(Date.now(), host, food, location, date, keywords, invitationType);

        i.inviteGuests(guests.replace('.','x'));


        console.log(i.getGuestList);

        this.uploadInvitation(i);
    }


    filterInvitations(invitations, user){

        let filteredInvitations = [];

        for (var x = 0; x < invitations.length; x ++){
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
        console.log("updating db");
        console.log(currentInvitationList);

        currentInvitationList.forEach((invitation) => {
            this.uploadInvitation(invitation);
        });

    }
}


export function acceptInvite(inviteID, user){

    currentInvitationList.forEach((invitation) => {
        if(invitation.getID() == inviteID){
            invitation.acceptInvite(user);
        }
    })

    
}

export function declineInvite(inviteID, user){
    currentInvitationList.forEach((invitation) => {
        if(invitation.getID() == inviteID){
            invitation.declineInvite(user);
        }
    })
}


export default InvitationManager;