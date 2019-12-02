import blob_happy from '../Images/blob_happy.png';
import blob_neutral from '../Images/blob_neutral.png';
import blob_sad from '../Images/blob_sad.png';

import flower_happy from '../Images/flower_happy.png';
import flower_neutral from '../Images/flower_neutral.png';
import flower_sad from '../Images/flower_sad.png';

import fireball_happy from '../Images/fireball_happy.png';
import fireball_neutral from '../Images/fireball_neutral.png';
import fireball_sad from '../Images/fireball_sad.png';

import petrock_neutral from '../Images/petrock_neutral.png';

import pet_dead from '../Images/pet_dead.png';

const PetImageImporter = new Map();

PetImageImporter.set("blob_happy", blob_happy);
PetImageImporter.set("blob_neutral", blob_neutral);
PetImageImporter.set("blob_sad", blob_sad);

PetImageImporter.set("flower_happy", flower_happy);
PetImageImporter.set("flower_neutral", flower_neutral);
PetImageImporter.set("flower_sad", flower_sad);

PetImageImporter.set("fireball_happy", fireball_happy);
PetImageImporter.set("fireball_neutral", fireball_neutral);
PetImageImporter.set("fireball_sad", fireball_sad);

PetImageImporter.set("petrock_happy", petrock_neutral);
PetImageImporter.set("petrock_neutral", petrock_neutral);
PetImageImporter.set("petrock_sad", petrock_neutral);

PetImageImporter.set("pet_dead", pet_dead);

export default PetImageImporter;