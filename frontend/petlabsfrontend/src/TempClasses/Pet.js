class Pet {
    constructor(petName, ownerName, type) {
        if (typeof(Pet.nextId) === 'undefined') {
            Pet.nextId = 0;
        } else {
            Pet.nextId++;
        }
        this.petId = Pet.nextId;
        this.ownerName = ownerName;
        this.petName = petName;
        this.type = type;
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