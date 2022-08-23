import Invitation from "./invitation.js";


var currentID = 0;
var invitations = [];
var view;

class InvitationManager{

    constructor(){
        
    }

    //creates a new invitation.
    //keywordString is just 1 String with all the keywords (comma-separated). It will be converted to an Array here.
    newInvitation(food, location, date, keywordString){

        console.log("creating new invitation: ID: " + currentID + " | food: " + food + " | location: " + location + " | date: " + date + " | keywords: " + keywordString);

        //gets the current id, then increases the value for the next invitation
        let id = currentID ;
        currentID = currentID +1;

        let keywords = keywordString.split(',');
        //creating new invitation
        let i = new Invitation(id, food, location, date, keywords);
        invitations.push(i);

        console.log(invitations);

    }


    //this function deletes invitations, that are already over
    cleanUp(){
        //@TODO
    }
    



}


export default InvitationManager;