


var id, food, location;
var keywords = [];
var state = {
    open: 1,
    accept: 2,
    reject:3
};

class Invitation {

    constructor(host, food, location, date, keywords){
        this.id = Date.now()
        this.host = host
        this.food = food;
        this.location = location;
        this.date = date;
        this.keywords = keywords;
        this.state = state.open;
    }

    // sets the invitation state to accept
    accept(){
        this.state = state.accept;
    }

    //sets the invitation state to reject
    reject(){
        this.state = state.reject;
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

}

export default Invitation;