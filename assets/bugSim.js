import { LifelikeWorld } from "./world.js";
import Wall from "./wall.js";
import BouncingCritter from "./critters.js";

const world = new LifelikeWorld( 
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

   {"#": Wall, "o": BouncingCritter} 

)

console.log(world);