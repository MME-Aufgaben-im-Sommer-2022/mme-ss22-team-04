import Observable from "../Observable.js";
import Invitation from "./invitation.js";
import { acceptInvite, declineInvite } from "./invitationManager.js";

/*
let vegetarianBtn = document.querySelector('.vegetarian');
let porkBtn = document.querySelector('.pork');
let chickenBtn = document.querySelector('.chicken');
let saladBtn = document.querySelector('.salad');
let dessertBtn = document.querySelector('.dessert');
*/

const LIST_ELEMENT = document.getElementById('invitation-list');
const INVITATION_ELEMENT = document.getElementById('invitation-element').content;
const INVITAION_TEMPLATE = INVITATION_ELEMENT.getElementById("template");


let currentInvitationList = [];



class InvitationView extends Observable{
    constructor() {
        super();

        this.filter = document.querySelector(".filters");
        //initListeners(this);

    }


    createDummyInvitation(){
        let i = new Invitation("Lucas", "richtig gutes Essen", "bei mir", "heute", "vegan", 0);
        this.showInvitation(i);
    }


    buildInvitationCard(invitation){

        const invitationDiv = document.createElement("div");
        invitationDiv.classList.add('invitations-container_elements');
        invitationDiv.setAttribute("id", invitation.getID());

        const hostSpan = document.createElement("span");
        hostSpan.innerHTML = invitation.getHostName();
        hostSpan.classList.add('invitation_name');
        invitationDiv.appendChild(hostSpan);

        const foodSpan = document.createElement("span");
        foodSpan.innerHTML = invitation.getFoodName();
        foodSpan.classList.add('food_name');
        invitationDiv.appendChild(foodSpan);

        const dateSpan = document.createElement("span");
        dateSpan.innerHTML = invitation.getDate();
        dateSpan.classList.add('invitation_date');
        invitationDiv.appendChild(dateSpan);
        

        if(invitation.getHostName() !== localStorage.getItem("email")){
            const yesBtn = document.createElement("button");
            yesBtn.innerHTML = "yes";
            yesBtn.classList.add('accept');
            yesBtn.setAttribute("id", "by"+invitation.getID())
            invitationDiv.appendChild(yesBtn);

            //yesBtns.push(yesBtn);

            const noBtn = document.createElement("button");
            noBtn.innerHTML = "no";
            noBtn.classList.add('decline');
            noBtn.setAttribute("id", "bn"+invitation.getID())
            invitationDiv.appendChild(noBtn);



        } else {
            const participantsField = document.createElement("span");
            participantsField.innerHTML = "guests: " + invitation.getAcceptedGuests();
            participantsField.classList.add('participants');
            invitationDiv.appendChild(participantsField);
        }

        return invitationDiv;

    }


    showInvitation(invitation){
        LIST_ELEMENT.appendChild(this.buildInvitationCard(invitation));
    }

    
    renderInvitations(invitations){

        currentInvitationList = invitations;
        
        invitations.forEach((invitation) => {
            this.showInvitation(invitation);
        });

        this.initListeners();

    }




    initListeners() {

        for(let i = 0; i < currentInvitationList.length; i++){
            if(currentInvitationList[i].getHostName() !== localStorage.getItem("email")){
                let btnYesID = "by"+currentInvitationList[i].getID();
                let btnNoID = "bn"+currentInvitationList[i].getID();
                
                let btnYes = document.getElementById(btnYesID);
                let btnNo = document.getElementById(btnNoID);
                //console.log(btnYes);
                //console.log(btnNo);
                
                //ClickListener
                btnYes.addEventListener("click", () => {
                    this.onYesButtonClicked(btnYesID);
                });

                btnNo.addEventListener("click", () => {
                    this.onNoButtonClicked(btnNoID);
                });
            }
        }
    }

    
    onYesButtonClicked(btnID){
        acceptInvite(btnID.substring(2), localStorage.getItem("email"));
        let e = new Event("invitationChanged");
        this.notifyAll(e);
    }

    onNoButtonClicked(btnID){
        declineInvite(btnID.substring(2), localStorage.getItem("email"));
        let e = new Event("invitationChanged");
        this.notifyAll(e);
    }


}


export default InvitationView;







/*


vegetarianBtn.addEventListener('click', function() {
    vegetarianBtn.style.backgroundColor = '#018371';
    porkBtn.style.backgroundColor = '#00d3b7';
    chickenBtn.style.backgroundColor = '#00d3b7';
    saladBtn.style.backgroundColor = '#00d3b7';
    dessertBtn.style.backgroundColor = '#00d3b7';
});

porkBtn.addEventListener('click', function() {
    vegetarianBtn.style.backgroundColor = '#00d3b7';
    porkBtn.style.backgroundColor = '#018371';
    chickenBtn.style.backgroundColor = '#00d3b7';
    saladBtn.style.backgroundColor = '#00d3b7';
    dessertBtn.style.backgroundColor = '#00d3b7';
});

chickenBtn.addEventListener('click', function() {
    vegetarianBtn.style.backgroundColor = '#00d3b7';
    porkBtn.style.backgroundColor = '#00d3b7';
    chickenBtn.style.backgroundColor = '#018371';
    saladBtn.style.backgroundColor = '#00d3b7';
    dessertBtn.style.backgroundColor = '#00d3b7';
});

saladBtn.addEventListener('click', function() {
    vegetarianBtn.style.backgroundColor = '#00d3b7';
    porkBtn.style.backgroundColor = '#00d3b7';
    chickenBtn.style.backgroundColor = '#00d3b7';
    saladBtn.style.backgroundColor = '#018371';
    dessertBtn.style.backgroundColor = '#00d3b7';
});

dessertBtn.addEventListener('click', function() {
    vegetarianBtn.style.backgroundColor = '#00d3b7';
    porkBtn.style.backgroundColor = '#00d3b7';
    chickenBtn.style.backgroundColor = '#00d3b7';
    saladBtn.style.backgroundColor = '#00d3b7';
    dessertBtn.style.backgroundColor = '#018371';
});

*/