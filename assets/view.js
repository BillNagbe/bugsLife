import helpers from "./utilities";
import { directions } from "./directions";


class View {
    constructor(world, vector) {
        this.world = world;
        this.vector = vector;
    }


    look(dir) {
        let target = this.vector.plus(directions[dir]);
        if (this.world.grid.isInside(target))
            return helpers.charFromElement(this.world.grid.get(target));
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
        return helpers.randomElement(found);
    }

}


export default View;