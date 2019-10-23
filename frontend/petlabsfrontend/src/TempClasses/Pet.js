class Pet {
    constructor(petId, owner) {
        this.petId = petId;
        this.owner = owner;
        this.petName = "";
        // Default values for status:
        this.hunger = 50;
        this.happiness = 50;
        this.intelligence = 0;
        this.strength = 0;
        this.speed = 0;
        this.alive = true;
    }
}

export default Pet;