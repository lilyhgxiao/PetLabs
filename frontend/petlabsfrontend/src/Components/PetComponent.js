import React from 'react';
import '../CSS/PetComponentStyle.css';

import { getPetType } from '../actions/pettypehelpers';

import PetImageImporter from './PetImageImporter.js';

class PetComponent extends React.Component {
    
    state = {
        imgURL: ''
    };

    componentDidMount() {
        const { pet } = this.props;
        const imgURLReq = retrieveImgURL(pet);

        imgURLReq.then((img) => {
            this.setState({
                imgURL: img
            })
        })
    }
    
    render() {
        const { pet, goToPetPage } = this.props;

        return(
            <div className='petComponent' onClick={ goToPetPage.bind(this, pet) }>
                <img className='petImg' src={PetImageImporter.get(this.state.imgURL)} alt={pet.petName}/>
                <div className='info'>
                    <span id='name'>
                        {pet.petName}
                    </span>
                    <span id='happiness'>
                        <span className='statusName'>Happiness: </span><span className='statusValue'>{ pet.happiness }%</span>
                    </span>
                    <br/>
                    <span id='fullness'>
                        <span className='statusName'>Fullness: </span><span className='statusValue'>{pet.fullness}%</span>
                    </span>
                    <br/>
                </div>
            </div>
        );
    }
}

function retrieveImgURL(pet) {

    const typePromise = getPetType(pet.type);
    

    return typePromise.then((petType) => {
        if (pet.alive) {
            if (pet.happiness >= 80) {
                return petType.happyImage;
            } else if (pet.happiness < 80 && pet.happiness >= 30) {
                return petType.neutralImage;
            } else {
                return petType.sadImage;
            }
        } else {
            return "pet_dead";
        }
    })

}

export default PetComponent;