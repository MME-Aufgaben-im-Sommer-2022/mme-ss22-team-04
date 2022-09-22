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
        this.guests = guests;
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
