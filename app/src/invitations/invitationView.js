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

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyColpusaLC7uzOEr8R3XCGUTPB5bYOV2dQ",
    authDomain: "eatwithme-e7e95.firebaseapp.com",
    projectId: "eatwithme-e7e95",
    storageBucket: "eatwithme-e7e95.appspot.com",
    messagingSenderId: "922257626910",
    appId: "1:922257626910:web:7e9e3848e124e64e21db0f",
    databaseURL: "https://eatwithme-e7e95-default-rtdb.europe-west1.firebasedatabase.app/"
  };
  
  // Initialize Firebase
    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
    }else {
        firebase.app(); // if already initialized, use that one
    }
  
const db = firebase.firestore();

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

        hostSpan.addEventListener("click", async e => {
            let userdata = "";
            document.querySelector('.popup-userinfo').style.display = 'flex';
            let baseSnapshot = await db.collection("profiles")
            await baseSnapshot.where("email", "==", hostSpan.innerHTML).get().then(querySnapshot => {
                querySnapshot.forEach(e => {
                    if(userdata === "") userdata = e.data();
                })
                document.querySelector('.popup-userinfo-name').innerHTML = "Name: "+userdata.name;
                document.querySelector('.popup-userinfo-email').innerHTML = "E-Mail: "+userdata.email;
                document.querySelector('.popup-userinfo-phoneNumber').innerHTML = "Phone Number: "+userdata.phoneNumber;
                document.querySelector('.popup-userinfo-aboutMe').innerHTML = "About me: "+userdata.aboutMe;
                console.log(userdata.name)
                console.log(userdata.email)
                console.log(userdata.phoneNumber)
                console.log(userdata.aboutMe)
            })
            .catch((error) => {
                console.log("Error getting documents: ", error);
                alert("There was an error trying to retrieve the name (check the console for more details)");
            });
        });

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
        acceptInvite(btnID.substring(2), localStorage.getItem("email").replace('.','x'));
        let e = new Event("invitationChanged");
        this.notifyAll(e);
    }

    onNoButtonClicked(btnID){
        declineInvite(btnID.substring(2), localStorage.getItem("email").replace('.','x'));
        let e = new Event("invitationChanged");
        this.notifyAll(e);
    }


}

document.querySelector('.popup-userinfo-close').addEventListener("click", function(){
    document.querySelector('.popup-userinfo').style.display = 'none';
})

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