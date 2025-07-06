import { Vector } from "./vector.js";


class Grid {
    constructor(width, height) {
        this.width = width; // stores state of width
        this.height = height; // stores state of height
        this.space = new Array(width * height); // creates new array with a single value
    }



    isInside(vector) {
         return vector.x >= 0 && vector.x < this.width &&
         vector.y >= 0 && vector.y < this.height; // checks if x, height and y, width is within the grid limits
    }

    get(vector) {
        return this.space[vector.x + this.width * vector.y]; // collects x, y values from a vector and gets the width of the grid
    }

    set(vector, value) {
        this.space[vector.x + this.width * vector.y] = value; // creates a new array from the vector and sets it equal to the value passed, updates grid state
    }

    forEach(f, context) {
        for(let y = 0; y < this.height; y++) {
            for(let x = 0; x < this.width; x++) {
                let value = this.space[x + y * this.width];
                if(value != null) f.call(context, value, new Vector(x, y));
            }
        }
    }

}




export default Grid;