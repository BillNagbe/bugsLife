class Vector {
    constructor(x, y) {
        this.x = x; // stores the state of x on the instances
        this.y = y; // stores the state of y on the instances
    }

    plus(vector) {
        let x = vector.x + this.x; // adds the new value of x from the vector passed to the current value of x
        let y = vector.y + this.y; // adds the new value of y from the vector passed to the current value of y
        return new Vector(x, y); // updates vectors state and returns that new state 
    }
}
