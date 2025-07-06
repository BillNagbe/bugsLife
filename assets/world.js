class World {
    constructor(map, legend) {
        let grid = new Grid(map[0].length, map.length); // new grid with x and y lengths
        this.grid = grid; // stores internal state of grid
        this.legend = legend; // stores inrernal state of legend
        map.forEach((line, y) => {
        for(let i = 0; i < line.length; i++) { // loops thru line variable or x / width
            grid.set(new Vector(i, y), elementFromChar(legend, line[i])); // updates the internal grid by loops thru the width and waiting for changes
        }
    });

    };

    toString() {
    let output = "";
        for (let y = 0; y < this.grid.height; y++) { // loops thru height 
        for (let x = 0; x < this.grid.width; x++) {  // loops thru width
            let element = this.grid.get(new Vector(x, y)); // gets the x * y value in an array 
            output += charFromElement(element); // gets each character from the two upper loops and adds them to an array
        }
        output += "\n"; // new line character on height of grid
  }
  return output; // returns output of new world 
};


        turn() {
            let acted = [];
            this.grid.forEach((critter, vector) => {
                if(critter.act && acted.indexOf(critter) === -1) {
                    acted.push(critter);
                    this.letAct(critter, vector);
                }
            }, this)
        }


        letAct(critter, vector) {
            let action = critter.act(new View(this, vector));
            if(action && action.type == "move") {
                let dest = this.checkDestination(action, vector);
                if(dest && this.grid.get(dest) == null) {
                    this.grid.set(vector, null);
                    this.grid.set(dest, critter);
                }
            }
        };

        checkDestination(action, vector) {
            if(directions[action.direction]) {
                let dest = vector.plus(directions[action.direction]);
                if(this.grid.isInside(dest)) return dest;
            }
        }

}



class LifelikeWorld extends World {
    constructor(map, legend) {
        super(map, legend);
        this.map = map;
        this.legend = legend;
    }

    letAct(critter, vector) {
        let action = critter.act(new View(this, vector));
        let handled = action &&  this.actionTypes[action.type] && this.actionTypes[action.type].call(this, critter, vector, action);
        if(!handled) {
            critter.energy -= 0.2;
            if(critter.energy <= 0) this.grid.set(vector, null);
        }
    }


}



