import Observable from "../Observable.js";
import Invitation from "./invitation.js";

let vegetarianBtn = document.querySelector('.vegetarian');
let porkBtn = document.querySelector('.pork');
let chickenBtn = document.querySelector('.chicken');
let saladBtn = document.querySelector('.salad');
let dessertBtn = document.querySelector('.dessert');

const LIST_ELEMENT = document.getElementById('invitation-list');
const INVITATION_ELEMENT = document.getElementById('invitation-element').content;



class InvitationView extends Observable{
    constructor() {
        super();
        console.log("starting InvitationView");

        this.buttons = document.querySelector(".filters");
        this.vegetarianBtn = this.buttons.querySelector(".vegetarian");
        initListeners(this);

        this.createDummyInvitation();
    }


    createDummyInvitation(){
        let i = new Invitation("Lucas", "richtig gutes Essen", "bei mir", "heute", "vegan", 0);
        this.showInvitation(i);
    }


    buildInvitationCard(invitation){
        const invitationEl = INVITATION_ELEMENT.querySelector(".invitations-container_elements");
        invitationEl.setAttribute("id", invitation.getID());
        invitationEl.querySelector(".invitation_name").innerHTML = invitation.getHostName();
        invitationEl.querySelector(".food_name").innerHTML = invitation.getFoodName();
        invitationEl.querySelector(".invitation_date").innerHTML = invitation.getDate();
        return invitationEl;
    }

    showInvitation(invitation){
        let card = this.buildInvitationCard(invitation);
        LIST_ELEMENT.appendChild(card);
    }

}


// Private Methods
function initListeners(view) {
    view.vegetarianBtn.addEventListener("click", () => {
        const event = new Event("onVegetarianBtnClicked");
        event.notifyAll();
    });
}


export default InvitationView;










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