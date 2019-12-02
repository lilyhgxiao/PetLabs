class Item {
    constructor(name, strength, speed, intelligence, happiness, fullness, imgURL, price) {
        if (typeof(Item.nextId) === 'undefined') {
            Item.nextId = 1;
        } else {
            Item.nextId++;
        }
        this.id = Item.nextId;
        this.name = name;
        this.strength = strength;
        this.speed = speed;
        this.intelligence = intelligence;
        this.happiness = happiness;
        this.fullness = fullness;
        this.imgURL = imgURL;
        this.price = price;
    }
}

export default Item;