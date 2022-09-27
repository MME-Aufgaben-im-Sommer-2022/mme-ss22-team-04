let id, host, food, location, date, keywords;
const invitationType = {
    open: 1,
    friends: 2,
    specific: 3,
}

//Map for managing the guests
let guests = new Map();

class Invitation {

    constructor(id , host, food, location, date, keywords, invitationType, guests){
        this.id = id;
        this.host = host
        this.food = food;
        this.location = location;
        this.date = date;
        this.keywords = keywords;
        this.invitationType = invitationType;
        this.guests = this.resolveGuests(guests);
    }

    //turning a string with the guests (comma separated) into an array
    resolveGuests(g){

        if(g != null){
            let guestString = g.replace(/\s/g, '');
            let guestArray = guestString.split(",");
            return guestArray;
        } else {
            return null;
        }
    }

    //checks, if a specific user u is invited (--> in the guests array)
    isInvited(u){

        if(this.invitationType == 1){
            return true;
        } else {
            for(let i = 0; i < guests.length; i++){
                console.log(guests[i]);
                if(guests[i] == u){
                    return true;
                }
            }
        } 

        return false;

    }



    acceptGuest(name){

    }

    cancelGuest(name){

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

    getDate(){
        return this.date;
    }

    getKeywords(){
        return this.keywords;
    }

    getInvitationType(){
        return this.invitationType;
    }

}

export default Invitation;
