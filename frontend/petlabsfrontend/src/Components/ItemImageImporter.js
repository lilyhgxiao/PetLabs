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

const ItemImageImporter = new Map();

ItemImageImporter.set("blob_happy", blob_happy);
ItemImageImporter.set("blob_neutral", blob_neutral);
ItemImageImporter.set("blob_sad", blob_sad);

ItemImageImporter.set("flower_happy", flower_happy);
ItemImageImporter.set("flower_neutral", flower_neutral);
ItemImageImporter.set("flower_sad", flower_sad);

ItemImageImporter.set("fireball_happy", fireball_happy);
ItemImageImporter.set("fireball_neutral", fireball_neutral);
ItemImageImporter.set("fireball_sad", fireball_sad);

ItemImageImporter.set("petrock_happy", petrock_neutral);
ItemImageImporter.set("petrock_neutral", petrock_neutral);
ItemImageImporter.set("petrock_sad", petrock_neutral);

ItemImageImporter.set("pet_dead", pet_dead);

export default ItemImageImporter;