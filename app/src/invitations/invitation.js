let id, host, food, location, date, keywords;
const invitationType = {
    open: 1,
    friends: 2,
    specific: 3,
}

//Map for managing the guests
let guestList = new Map();
const guests = [];

class Invitation {

    constructor(id , host, food, location, date, keywords, invitationType){
        this.id = id;
        this.host = host
        this.food = food;
        this.location = location;
        this.date = date;
        this.keywords = keywords;
        this.invitationType = invitationType;
 
    }

    inviteGuests(guestString){

        console.log("asd");
        console.log(guestString);

        this.guests = this.resolveGuests(guestString);

        if(this.invitationType !== 1){
            this.guestList = this.createGuestList(this.guests);
            console.log(this.guestList);
        }
    }

    setGuestList(guestMap){
        this.guestList = guestMap;
        //const guestObj = Object.fromEntries(guestMap);
        //const names = Object.keys(guestObj);

    }

    createGuestList(guests){
 
        let map = new Map();

        for(let i = 0; i < guests.length; i++){
            map.set(guests[i], 'wait');
        }

        return map;
    }

    //turning a string with the guests (comma separated) into an array
    resolveGuests(guests){

        if(guests != null){
            let guestString = guests.replace(/\s/g, '');
            let guestArray = guestString.split(",");
            console.log(guestArray);
            return guestArray;
        } else {
            return null;
        }
    }

    //checks, if a specific user u is invited (--> in the guests array)
    isInvited(userMail){

        let userMailShort = userMail.replace('.','x');

        if(this.invitationType == 1){
            return true;
        } else {
        
            if(this.host == userMail){
                return true;
            } else {
                if(this.guestList.has(userMailShort)){
                    return true;
                }
            }
        
        }
    }





    getID(){
        return this.id;
    }

    getHostName(){
        return this.host;
    }

    getFoodName(){
        return this.food;
    }

    getLocationName(){
        return this.location;
    }

    getDate(){
        return this.date;
    }

    getKeywords(){
        return this.keywords;
    }

    getInvitationType(){
        return this.invitationType;
    }

    getGuestList(){
        
        if(this.guestList !== undefined){
            return Object.fromEntries(this.guestList);
        } else {
            return null;
        }
        
        //return Object.fromEntries(this.guestList);
    }

    getAcceptedGuests(){

        let count = 0;

        let array = [];
        this.guestList.forEach((value) => array.push(value));
        
        for(let i = 0; i<array.length; i++){
            if(array[i] == "accepted"){
                console.log("acception found");
                count++;
            }
        }

        console.log(count);

        return count;
    }

    acceptInvite(email){
        this.guestList.set(email, 'accepted');

    }

    declineInvite(email){
        this.guestList.set(email, 'declined');
    }


    getKeyByValue(object, value) {
        return Object.keys(object).find(key => object[key] === value);
      }

}

export default Invitation;
