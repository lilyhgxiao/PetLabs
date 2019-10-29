class PetType {
    constructor(name, neutralImage, happyImage, sadImage, 
        hungerSpeed, fullnessSpeed, happinessSpeed, sadnessSpeed, 
        intelligenceSpeed, strengthSpeed, speedSpeed) {
        
        if (typeof(PetType.nextId) === 'undefined') {
            PetType.nextId = 1;
        } else {
            PetType.nextId++;
        }
        this.id = PetType.nextId;

        this.name = name;
        this.neutralImage = neutralImage;
        this.happyImage = happyImage;
        this.sadImage = sadImage;
        this.hungerSpeed = hungerSpeed;
        this.fullnessSpeed = fullnessSpeed;
        this.happinessSpeed = happinessSpeed;
        this.sadnessSpeed = sadnessSpeed;
        this.intelligenceSpeed = intelligenceSpeed;
        this.strengthSpeed = strengthSpeed;
        this.speedSpeed = speedSpeed;
    }
}

export default PetType;