/* global firebase*/

import Observable from "../Observable.js";
import Invitation from "./invitation.js";
import { acceptInvite, declineInvite } from "./invitationManager.js";

// Firebase configuration
const db = firebase.firestore(),
    LIST_ELEMENT = document.getElementById("invitation-list"),
    ALERT_INVITATION = document.getElementById("alert-invitation"),
    ALERT_TIMER = 8000;
  
  // Initialize Firebase
    if (!firebase.apps.length) {
        firebase.initializeApp(
            {
            apiKey: "AIzaSyColpusaLC7uzOEr8R3XCGUTPB5bYOV2dQ",
            authDomain: "eatwithme-e7e95.firebaseapp.com",
            projectId: "eatwithme-e7e95",
            storageBucket: "eatwithme-e7e95.appspot.com",
            messagingSenderId: "922257626910",
            appId: "1:922257626910:web:7e9e3848e124e64e21db0f",
            databaseURL: "https://eatwithme-e7e95-default-rtdb.europe-west1.firebasedatabase.app/",
            },
          );
    }else {
        firebase.app(); // if already initialized, use that one
    }

let currentInvitationList = [],
    timeout;

class InvitationView extends Observable{
    constructor() {
        super();

        this.filter = document.querySelector(".filters");
        //initListeners(this);

    }

    //for support reasons only
    createDummyInvitation(){
        let i = new Invitation("Lucas", "richtig gutes Essen", "bei mir", "heute", "vegan", 0);
        this.showInvitation(i);
    }

    //building an HTML Element representing one invitation
    buildInvitationCard(invitation){

        const invitationDiv = document.createElement("div"),
            hostSpan = document.createElement("span"),
            foodSpan = document.createElement("span"),
            dateSpan = document.createElement("span"),
            locationSpan = document.createElement("span");

        invitationDiv.classList.add("invitations-container_elements");
        invitationDiv.setAttribute("id", invitation.getID());

        hostSpan.innerHTML = invitation.getHostName();
        hostSpan.classList.add("invitation_name");
        invitationDiv.appendChild(hostSpan);

        hostSpan.addEventListener("click", async function(){
            let userdata = "",
                baseSnapshot = await db.collection("profiles");
            document.querySelector(".popup-userinfo").style.display = "flex";
            await baseSnapshot.where("email", "==", hostSpan.innerHTML).get().then(querySnapshot => {
                querySnapshot.forEach(e => {
                    if(userdata === "") {userdata = e.data();}
                });
                document.querySelector(".popup-userinfo-name").innerHTML = "Name: "+userdata.name;
                document.querySelector(".popup-userinfo-email").innerHTML = "E-Mail: "+userdata.email;
                document.querySelector(".popup-userinfo-phoneNumber").innerHTML = "Phone Number: "+userdata.phoneNumber;
                document.querySelector(".popup-userinfo-aboutMe").innerHTML = "About me: "+userdata.aboutMe;
            })
            .catch(function(){
                ALERT_INVITATION.innerHTML = "There was an error trying to retrieve the name.";
                clearAlertbox();
            });
        });

        foodSpan.innerHTML = invitation.getFoodName();
        foodSpan.classList.add("food_name");
        invitationDiv.appendChild(foodSpan);

        dateSpan.innerHTML = invitation.getDate();
        dateSpan.classList.add("invitation_date");
        invitationDiv.appendChild(dateSpan);

        locationSpan.innerHTML = invitation.getLocationName();
        locationSpan.classList.add("location");
        invitationDiv.appendChild(locationSpan);        

        if(invitation.getHostName() !== localStorage.getItem("email")){
            const yesBtn = document.createElement("button"),
                noBtn = document.createElement("button");

            yesBtn.innerHTML = "yes";
            yesBtn.classList.add("accept");
            yesBtn.setAttribute("id", "by"+invitation.getID());
            invitationDiv.appendChild(yesBtn);

            noBtn.innerHTML = "no";
            noBtn.classList.add("decline");
            noBtn.setAttribute("id", "bn"+invitation.getID());
            invitationDiv.appendChild(noBtn);

        } else {
            const participantsField = document.createElement("span");
            participantsField.innerHTML = "guests: " + invitation.getAcceptedGuests();
            participantsField.classList.add("participants");
            invitationDiv.appendChild(participantsField);
        }

        return invitationDiv;

    }

    //show single invitation
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
                let btnYesID = "by"+currentInvitationList[i].getID(),
                 btnNoID = "bn"+currentInvitationList[i].getID(),
                
                 btnYes = document.getElementById(btnYesID),
                 btnNo = document.getElementById(btnNoID);
                
                //ClickListener
                btnYes.addEventListener("click", () => {
                    this.onYesButtonClicked(btnYesID);
                    ALERT_INVITATION.innerHTML = "Accepted invitation.";
                    clearAlertbox();
                });

                btnNo.addEventListener("click", () => {
                    this.onNoButtonClicked(btnNoID);
                    ALERT_INVITATION.innerHTML = "Declined invitation.";
                    clearAlertbox();
                });
            }
        }
    }
    onYesButtonClicked(btnID){
        let substringNum = 2,
            e = new Event("invitationChanged");
        acceptInvite(btnID.substring(substringNum), localStorage.getItem("email").replace(".","x"));
        this.notifyAll(e);
    }

    onNoButtonClicked(btnID){
        let substringNum = 2,
            e = new Event("invitationChanged");
        declineInvite(btnID.substring(substringNum), localStorage.getItem("email").replace(".","x"));
        this.notifyAll(e);
    }

}

document.querySelector(".popup-userinfo-close").addEventListener("click", function(){
    document.querySelector(".popup-userinfo").style.display = "none";
});

function clearAlertbox(){
    clearTimeout(timeout);
    timeout = setTimeout(function(){
        ALERT_INVITATION.innerHTML = "";
    }, ALERT_TIMER);
}

export default InvitationView;
