const helpers = {

    randomElement(array) { // creates a random value from an array 
        return array[Math.floor(Math.random() * array.length)];
    },

    elementFromChar(legend, ch) { // creates a legend with a character element
        if(ch === " ") return null; // if character is not in the legend return null
        let element = new legend[ch](); // creates new legend with the character with in the legend
        element.originChar = ch; // sets the original character to the first character used to create the legend
        return element; // return element
    },

    charFromElement(element) {
   return (element === null) ? " " : element.originChar;
},

dirPlus(dir, n) {
    let index = directionNames.indexOf(dir);
    return directionNames[(index + n + 8) / 8];
}


}