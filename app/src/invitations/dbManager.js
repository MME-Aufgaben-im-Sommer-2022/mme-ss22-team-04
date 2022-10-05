/* global firebase*/

import Observable from "../Observable.js";
import Invitation from "./invitation.js";
  
  // Initialize Firebase
    if (!firebase.apps.length) {
        firebase.initializeApp({
          apiKey: "AIzaSyColpusaLC7uzOEr8R3XCGUTPB5bYOV2dQ",
          authDomain: "eatwithme-e7e95.firebaseapp.com",
          projectId: "eatwithme-e7e95",
          storageBucket: "eatwithme-e7e95.appspot.com",
          messagingSenderId: "922257626910",
          appId: "1:922257626910:web:7e9e3848e124e64e21db0f",
          databaseURL: "https://eatwithme-e7e95-default-rtdb.europe-west1.firebasedatabase.app/",
        });
    }else {
        firebase.app(); // if already initialized, use that one
    }
    
const database = firebase.database();

  let currentInvitationList;

class dbManger extends Observable{

    constructor(){
        super();
    }

    //uploading an invitation to the realtime database
    uploadInvitationToDatabase(i){
              database.ref("/invitations/" + i.getID()).set({
                id: i.getID(),
                host: i.getHostName(),
                food: i.getFoodName(),
                location: i.getLocationName(),
                date: i.getDate(),
                keywords: i.getKeywords(),
                invitationType: i.getInvitationType(),
                guests: i.getGuestList(),
              });
              
          } 
        
    //downloading invitations from database
    async getInvitations(){
      let invitationList = [];
      const dbRef = firebase.database().ref(),

       snapshot = await dbRef.child("invitations").get();
      if (snapshot.exists()) {
        const data = snapshot.val();

        Object.keys(data).map((key) => {
          const childNode = data[key];
          let id = childNode.id,
           host = childNode.host,
           food = childNode.food,
           location = childNode.location,
           date = childNode.date,
           keywords = childNode.keywords,
           type = childNode.invitationType,

          //building new invitation
           i = new Invitation(id, host, food, location, date, keywords, type);

          if(childNode.guests !== undefined){
            let guests = childNode.guests;
            const guestMap = new Map();

            Object.keys(guests).forEach((email) => {
              guestMap.set(email, guests[email]);
            });
            //console.log(guestMap);

            i.setGuestList(guestMap);
          } else {
            let emptyMap = new Map();
            i.setGuestList(emptyMap);
          }

          invitationList.push(i);
        });
      }

      return invitationList; 
    }

    getCurrentInvitationList(){
        return currentInvitationList;
    }

}

export default dbManger;