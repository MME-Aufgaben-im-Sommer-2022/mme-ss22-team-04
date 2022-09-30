let id, host, food, location, date, keywords;
let acceptedCount;
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
            return guestArray;
        } else {
            return null;
        }
    }

    //checks, if a specific user u is invited (--> in the guests array)
    isInvited(u){
        
        if(guestList.get(u) == "declined"){
            console.log("found declined");
        }


        if(this.invitationType == 1){
            return true;
        } else {

            if(this.host == u){
                return true;
            } else {
                for(let i = 0; i < this.guestList.length; i++){
                    if(this.guestList.get(i) === u){
                        return true;
                    }
                }
            }
        }

        return false;

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
        if(this.invitationType !== 1){
            return Object.fromEntries(this.guestList);
        } else {
            return null;
        }
    }

    getAcceptedGuests(){


        return acceptedCount;
    }

    acceptInvite(email){
        guestList.set(email, 'accepted')
        console.log(guestList);
    }

    declineInvite(email){
        guestList.set(email, 'declined')
        console.log(guestList);
    }

}

export default Invitation;
