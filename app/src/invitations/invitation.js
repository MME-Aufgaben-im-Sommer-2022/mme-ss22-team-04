


var id, food, location;
var keywords = [];
var state = {
    open: 1,
    accept: 2,
    reject:3
};

class Invitation {

    constructor(id, food, location, date, keywords){
        this.food = food;
        this.location = location;
        this.date = date;
        this.keywords = keywords;
        this.id = id;
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

}

export default Invitation;