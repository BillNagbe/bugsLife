var plan = ["############################",
            "#      #    #      o      ##",
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


//Common functions, objects

var directions = {
  "n":  new Vector( 0, -1),
  "ne": new Vector( 1, -1),
  "e":  new Vector( 1,  0),
  "se": new Vector( 1,  1),
  "s":  new Vector( 0,  1),
  "sw": new Vector(-1,  1),
  "w":  new Vector(-1,  0),
  "nw": new Vector(-1, -1)
};

var directionNames = "n ne e se s sw w nw".split(" "); // places directions into an array

function randomElement(array){
      //Math.floor round number to integer
      return array[Math.floor(Math.random() * array.length)]; // returns a random number based on the length of the array
}

function elementFromChar(legend, ch){ // goal to create an object that is empty or with the character the object is based on.
      if(ch == " ")
            return null; // if character is empty return null

      var element = new legend[ch](); // creates new class of each legend with character inside of it, if empty it creates an empty class and calls it 
      element.originChar = ch; // assigns to the origin character to the originchar property
      return element;
}

function charFromElement(element){ // goal to get an character from an element
      if (element == null) // if empty return an empty string
            return " ";
      else    
            
            return element.originChar; // returns the element at the property orginChar // contains an # if wall or o if bouncingCritter
}

//Vector

function Vector(x , y){ // goal to get the (x, y) coordinates 
      this.x = x; // stores internal state of x
      this.y = y; // stores internal state of y
}
Vector.prototype.plus = function(other){ // goal to add a passed vector (x, y) values to the internal state of (x, y) values
      return new Vector(this.x + other.x, this.y + other.y); // returns and updates the internal state of (x, y) values 
}

//Grid

function Grid(width, height){ // goal to create a grid with the an internal state and methods 
      this.space = new Array(width * height); // creates an array with the size set to the value of the width * the height stores in this.space
      this.width = width; // stores internal width 
      this.height = height; // stores internal height
}
Grid.prototype.isInside = function(vector){ // goal to check if the vector (x, y) coordinates are within the grid space
      return vector.x >= 0 && vector.x < this.width &&
             vector.y >= 0 && vector.y < this.height; // returns true if the vector (x, y) coordinate are within the grids space
};
Grid.prototype.get = function(vector){ // goal to return the space(width*height) or an array of the numeric value of (width*height)
      return this.space[vector.x + this.width * vector.y]; // returns an array of the numeric value of the passed vectors (x, y) values (x, y) = (x + grid.width * y)
};
Grid.prototype.set = function(vector, value){  // goal to set the passed value to the vectors (x, y) coordinates
      this.space[vector.x + this.width * vector.y] = value; // sets the vectors space to the passed character 
};
Grid.prototype.forEach = function(f, context){ // goal to loop thru the height & width, checks of the space if empty or not 
      for(var y = 0; y < this.height; y++){ // loops thru height
            for(var x = 0; x < this.width; x++){ // loops thru width
                  var value = this.space[x + y * this.width]; // value is set to the numeric value of the character at the grids (x, y)
                  if(value != null) // if a character is found
                        f.call(context, value, new Vector(x, y)); // call the passed function with the context = character, value = number in array, vector(x, y);
            }
      }
};

//World

function World(map, legend) { // goal to create the world in which of javascript code lives
  var grid = new Grid(map[0].length, map.length); // creates the grid our coordinates will live in
  this.grid = grid; // stores internal state of grid 
  this.legend = legend; // stores internal state legend

  map.forEach(function(line, y) { // loops thru the map or our plan array 
    for (var x = 0; x < line.length; x++) // 
      grid.set(new Vector(x, y),
               elementFromChar(legend, line[x]));
  });
}
World.prototype.toString = function(){
      var output = "";
      for(var y = 0; y < this.grid.height; y++){
            for(var x = 0; x < this.grid.width; x++){
                  var element = this.grid.get(new Vector(x, y));
                  output += charFromElement(element);
            }
            output += "\n";
      }
      return output;
}



//BouncingCritter (basic world)
function BouncingCritter(){
      this.direction = randomElement(directionNames);
}
BouncingCritter.prototype.act = function(view){
      if(view.look(this.direction) != " ")
            this.direction = view.find(" ") || "s";
      return {type: "move", direction: this.direction}
}


//Wall
function Wall(){}


const world = new World(plan, {"#": Wall, "o": BouncingCritter});

console.log(world.toString());