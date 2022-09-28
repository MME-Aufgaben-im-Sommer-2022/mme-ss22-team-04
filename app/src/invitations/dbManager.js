import Observable from "../Observable.js";
import Invitation from "./invitation.js";
import InvitationView from "./invitationView.js";

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
  const auth = firebase.auth();
  const database = firebase.database();
  let currentInvitationList;


class dbManger extends Observable{

    constructor(){
        super();
    }

    //uploading an invitation to the realtime database
    uploadInvitationToDatabase(i){
        
              database.ref('/invitations/' + i.getID()).set({
                id: i.getID(),
                host: i.getHostName(),
                food: i.getFoodName(),
                location: i.getLocationName(),
                date: i.getDate(),
                keywords: i.getKeywords(),
                invitationType: i.getInvitationType(),
                guests: i.getGuestString()
              });
              
          } 
        
        
    downloadInvitationsFromDatabase(){
        
            const dbRef = firebase.database().ref();
            let data;
        
        /*
        
            dbRef.child("invitations").get().then((snapshot) => {
              if (snapshot.exists()) {
                //handleDownloadedInvitations(snapshot.val());
                return snapshot.val();
              } else {
                console.log("No data available");
                return null;
              }
            }).catch((error) => {
              console.error(error);
              return null;
            });
        */
        
            let invitationList = [];
        
            firebase.database().ref("/invitations/").on('value', function(snap){
        
              snap.forEach(function(childNodes){
        
                let id = childNodes.val().id;
                let host = childNodes.val().host;
                let food = childNodes.val().food;
                let location = childNodes.val().location;
                let date = childNodes.val().date;
                let keywords = childNodes.val().keywords;
                let type = childNodes.val().type;
                let guests = childNodes.val().guests;
                let i = new Invitation(id, host, food, location, date, keywords, type, guests);
        
                invitationList.push(i);
        
              });
            });
            

            currentInvitationList = invitationList;
            
            setTimeout(this.renderInvitations(currentInvitationList), 1000);
        
    }
        
    renderInvitations (i){
            //console.log("ledl");
            let e = new Event("onInvitationListDownloaded");
            this.notifyAll(e);
        
    }

    getCurrentInvitationList(){
        return currentInvitationList;
    }


}

export default dbManger;