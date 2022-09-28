import Observable from "../Observable.js";
import Invitation from "./invitation.js";

/*
let vegetarianBtn = document.querySelector('.vegetarian');
let porkBtn = document.querySelector('.pork');
let chickenBtn = document.querySelector('.chicken');
let saladBtn = document.querySelector('.salad');
let dessertBtn = document.querySelector('.dessert');
*/

const LIST_ELEMENT = document.getElementById('invitation-list');
const INVITATION_ELEMENT = document.getElementById('invitation-element').content;
//const INVITAION_TEMPLATE = INVITATION_ELEMENT.querySelector(".invitations-container_elements");
const INVITAION_TEMPLATE = INVITATION_ELEMENT.getElementById("template");



class InvitationView extends Observable{
    constructor() {
        super();

        this.filter = document.querySelector(".filters");
        initListeners(this);

    }


    createDummyInvitation(){
        let i = new Invitation("Lucas", "richtig gutes Essen", "bei mir", "heute", "vegan", 0);
        this.showInvitation(i);
    }


    buildInvitationCard(invitation){
        //const invitationEl = INVITATION_ELEMENT.querySelector(".invitations-container_elements");

        //console.log("abc");
        //console.log(INVITAION_TEMPLATE);

        /*
        let invitationEl = INVITAION_TEMPLATE; 

        console.log(invitationEl);

        invitationEl.setAttribute("id", invitation.getID());
        invitationEl.querySelector(".invitation_name").innerHTML = invitation.getHostName();
        invitationEl.querySelector(".food_name").innerHTML = invitation.getFoodName();
        invitationEl.querySelector(".invitation_date").innerHTML = invitation.getDate();

        return invitationEl;
        */

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
        
        const yesBtn = document.createElement("button");
        yesBtn.innerHTML = "yes";
        yesBtn.classList.add('accept');
        invitationDiv.appendChild(yesBtn);

        const noBtn = document.createElement("button");
        noBtn.innerHTML = "no";
        noBtn.classList.add('decline');
        invitationDiv.appendChild(noBtn);



        return invitationDiv;

    }

    showInvitation(invitation){

        //console.log(invitation);
        LIST_ELEMENT.appendChild(this.buildInvitationCard(invitation));
    }

    renderInvitations(invitations){

        console.log(invitations);
        console.log(invitations.length);
        console.log(invitations);

        for(var i = 0; i < invitations.length; i++){ 
            this.showInvitation(invitations[i]);
        }


        //this.createDummyInvitation();


    }

}


// Private Methods
function initListeners(view) {
    /*
    view.vegetarianBtn.addEventListener("click", () => {
        const event = new Event("onVegetarianBtnClicked");
        event.notifyAll();
    });
    */
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