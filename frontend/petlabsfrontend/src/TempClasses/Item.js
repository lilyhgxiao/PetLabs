import Database from './Database';

class Item {
    constructor(name, strength, speed, intelligence, happiness, fullness, imgURL) {
        if (typeof(Item.nextId) === 'undefined') {
            Item.nextId = 0;
        } else {
            Item.nextId++;
        }
        // console.log(Item.nextId);
        this.id = Item.nextId;
        // this.type = type;
        this.name = name;
        this.strength = strength;
        this.speed = speed;
        this.intelligence = intelligence;
        this.happiness = happiness;
        this.fullness = fullness;
        this.imgURL = imgURL;
    }
}

export default Item;