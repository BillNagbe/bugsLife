import { directionNames } from "./directions";
import helpers from "./utilities";


class BouncingCritter {
    constructor() {
        this.direction = helpers.randomElement(directionNames); // sets the interal state of direction to a random direction
    }

    act(viewObj) {
        if(viewObj.look(this.direction) != " ") {
            this.direction = viewObj.find(" ") || "s";
        } // checks if the look property in the obj and see if the direction is not empty and calls the find method to look for an empty space or south

        return {type: "move", direction: this.direction} // returns an obj with a type called move with a direction property with a random direction
    }
}

export default BouncingCritter;