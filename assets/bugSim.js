import { LifelikeWorld } from "./world";
import Wall from "./wall";
import BouncingCritter from "./critters";

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