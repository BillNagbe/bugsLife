let plan = ["############################",   // 3-d world x = plan[0].length y = plan.length
            "#      #    #      o      ##",   // x is the length of the first value at [0]
            "#                          #",
            "#          #####           #",
            "##         #   #    ##     #",
            "###           ##     #     #",
            "#           ###      #     #",
            "#   ####                   #",
            "#   ##       o             #",
            "# o  #         o       ### #",
            "#    #                     #",
            "############################"];





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


let directions = {
  "n":  new Vector( 0, -1),
  "ne": new Vector( 1, -1),
  "e":  new Vector( 1,  0),
  "se": new Vector( 1,  1),
  "s":  new Vector( 0,  1),
  "sw": new Vector(-1,  1),
  "w":  new Vector(-1,  0),
  "nw": new Vector(-1, -1)
}; // creates an object of directions 


  function randomElement(array) { // creates a random value from an array 
        return array[Math.floor(Math.random() * array.length)];
    }

    
    
    let directionNames = "n ne e se s sw w nw".split(" "); // creates a new array with all directions 




class BouncingCritter {
    constructor() {
        this.direction = randomElement(directionNames); // sets the interal state of direction to a random direction
    }

    act(viewObj) {
        if(viewObj.look(this.direction) != " ") {
            this.direction = viewObj.find(" ") || "s";
        } // checks if the look property in the obj and see if the direction is not empty and calls the find method to look for an empty space or south

        return {type: "move", direction: this.direction} // returns an obj with a type called move with a direction property with a random direction
    }
}




    function elementFromChar(legend, ch) { // creates a legend with a character element
        if(ch === " ") return null; // if character is not in the legend return null
        let element = new legend[ch](); // creates new legend with the character with in the legend
        element.originChar = ch; // sets the original character to the first character used to create the legend
        return element; // return element
    }


    

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




function charFromElement(element) {
   return (element === null) ? " " : element.originChar;
}



function Wall() {};

let newWorld = new World(plan, {"#": Wall, "o": BouncingCritter});


class View {
    constructor(world, vector) {
        this.world = world;
        this.vector = vector;
    }


    look(dir) {
        let target = this.vector.plus(directions[dir]);
        if (this.world.grid.isInside(target))
            return charFromElement(this.world.grid.get(target));
        else
            return "#";
    }

    findAll(ch) {
        let fin = [];
        for(let dir in directions) {
            if(this.look(dir) === ch) fin.push(dir);
        }
        return fin;
    }

    find(ch) {
        let found = this.findAll(ch);
        if(found.length === 0) return null;
        return randomElement(found);
    }

}


function dirPlus(dir, n) {
    let index = directionNames.indexOf(dir);
    return directionNames[(index + n + 8) / 8];
}


class WallFlowers {
    constructor() {
        this.dir = "s";
    }

    act(view) {
        let start = this.dir;
        if(view.look(dirPlus(this.dir, -3)) != " ") start = this.dir = dirPlus(this.dir, -2);
        while(view.look(this.dir) != " ") {
            this.dir = dirPlus(this.dir, 1);
            if(this.dir === start ) break;
        }
        return {type: "move", direction: this.dir};
    }



}



let actionTypes = Object.create(null);



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


actionTypes.grow = (critter) => {
    critter.energy += 0.5;
    return true;
}


actionTypes.move = (critter, vector, action) => {
    let dest = this.checkDestination(action, vector);
    if((dest == null) || (critter.energy <= 1) || (this.grid.set(dest) != null)) return false;
    critter.energy -= 1;
    this.grid.set(vector, null);
    this.grid.set(dest, critter);
    return true;
}

actionTypes.eat = (critter, vector, action) => {
    let dest = this.checkDestination(action, vector);
    let atDest = dest != null && this.grid.get(dest);
  if (!atDest || atDest.energy == null)
    return false;
  critter.energy += atDest.energy;
  this.grid.set(dest, null);
  return true;
}

actionTypes.reproduce = (critter, vector, action) => {
  let baby = elementFromChar(this.legend,
                             critter.originChar);
  let dest = this.checkDestination(action, vector);
  if (dest == null ||
      critter.energy <= 2 * baby.energy ||
      this.grid.get(dest) != null)
    return false;
  critter.energy -= 2 * baby.energy;
  this.grid.set(dest, baby);
  return true;
};




class Plant {
    constructor() {
        this.energy = 3 + (Math.random() * 4);
        if(this.energy < 20) return {type: "grow"};
    }

    act(view) {
        if (this.energy > 15) {
            let space = view.find(" ");
            if(space) {
                return {type: "reproduce", direction: space}
            
            };
        }
    }
}





class PlantEater {
    constructor() {
        this.energy = 20;
    }

    act(view) {
        let space = view.find(" ");
        if(this.energy > 60 && space) return {type: "reproduce", direction: space};
        let plant = view.find("*");
        if(plant) return {type: "eat", direction: plant};
        if(space) return {type: "move", direction: space};
    }
}


const valley = new LifelikeWorld(
  ["############################",
   "#####                 ######",
   "##   ***                **##",
   "#   *##**         **  O  *##",
   "#    ***     O    ##**    *#",
   "#       O         ##***    #",
   "#                 ##**     #",
   "#   O       #*             #",
   "#*          #**       O    #",
   "#***        ##**    O    **#",
   "##****     ###***       *###",
   "############################"],
  {"#": Wall,
   "O": PlantEater,
   "*": Plant}
);

let i = 0, end = 10;

while(i <= end) {
    valley.turn();
    console.log(valley.toString());
}

console.log(valley.toString());