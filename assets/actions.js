


let actionTypes = Object.create(null);

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


export default actionTypes;