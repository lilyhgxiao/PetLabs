class PetType {
    constructor(name, neutralImage, happyImage, sadImage, 
        strengthRate, speedRate, intelligenceRate, 
        fullnessRate, happinessRate) {
        
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
        this.strengthRate = strengthRate;
        this.speedRate = speedRate;
        this.intelligenceRate = intelligenceRate;
        this.fullnessRate = fullnessRate;
        this.happinessRate = happinessRate;
    }
}

export default PetType;