class Invitation {

    constructor(id , host, food, location, date, keywords, invitationType){
        this.id = id;
        this.host = host;
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
            map.set(guests[i], "wait");
        }

        return map;
    }

    //turning a string with the guests (comma separated) into an array
    resolveGuests(guests){

        if(guests !== ""){
            let guestString = guests.replace(/\s/g, ""),
             guestArray = guestString.split(",");
            return guestArray;
        } 
            return null;
        
    }

    //checks, if a specific user u is invited (--> in the guests array)
    isInvited(userMail){

        let userMailShort = userMail.replace(".","x");

        if(this.invitationType === 1){
            return true;
        } else
        if(this.host === userMail){
            return true;
        } else
        if(this.guestList.has(userMailShort)){
            return true;
        }
        return false;
        
    }

    //======Getter======

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
        } 
            return null;
        
        //return Object.fromEntries(this.guestList);
    }

    getAcceptedGuests(){

        let count = 0,

         array = [];
        this.guestList.forEach((value) => array.push(value));
        
        for(let i = 0; i<array.length; i++){
            if(array[i] === "accepted"){
                count++;
            }
        }

        return count;
    }

    acceptInvite(email){
        this.guestList.set(email, "accepted");

    }

    declineInvite(email){
        this.guestList.set(email, "declined");
    }

    getKeyByValue(object, value) {
        return Object.keys(object).find(key => object[key] === value);
      }

}

export default Invitation;
