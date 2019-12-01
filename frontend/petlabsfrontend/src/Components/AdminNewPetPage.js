import React from 'react';
import AdminSideMenu from '../Components/AdminSideMenu';
import '../CSS/ItemView.css';
import saveIcon from '../Images/Save_Icon.png';
import AddIcon from '../Images/add_new.png';
import SpriteComponent from '../Components/SpriteComponent';

import PetImageImporter from './PetImageImporter.js';

class AdminNewPetPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            neutralImage: AddIcon,
            happyImage: AddIcon,
            sadImage: AddIcon,
            strengthRate: 0,
            speedRate: 0,
            intelligenceRate: 0,
            happinessRate: 0,
            fullnessRate: 0,
            price: 0,
            importedImageN: AddIcon,
            importedImageH: AddIcon,
            importedImageS: AddIcon,
        };
    }

    addPetType() {
        if (this.state.name.length === 0) {
            alert('Item name cannot be blank :(');
            return;
        }

        if (!this.validateState()) {
            alert('One or more invalid inputs detected :(');
            return;
        }

        const url = "http://localhost:3001/pettypes/";

        const request = new Request(url, {
            method: 'post',
            body: JSON.stringify({
                name: this.formatName(),
                neutralImage: this.state.neutralImage,
                happyImage: this.state.happyImage,
                sadImage: this.state.sadImage,
                strengthRate: this.state.strengthRate,
                speedRate: this.state.speedRate,
                intelligenceRate: this.state.intelligenceRate,
                happinessRate: this.state.happinessRate,
                fullnessRate: this.state.fullnessRate,
                // imgURL: this.state.imgURL,
                price: this.state.price
            }),
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            }
        });

        fetch(request).then((result) => {
            if (result && result.status === 200) {
                alert('Added new pet type successfully :)');
            } else if (result && result.status === 409) {
                alert('Pet Type with chosen name already exists :(');
            }
        }).catch((error) => {
            alert('Failed to Save :(', error);
        })
    }

    handleEnter = (event) => {
        if (event.key === 'Enter' && this.state.name.length > 0) {
            this.addPetType();
        }
    }

    formatName = () => {
        return this.state.name.charAt(0).toUpperCase() + this.state.name.toLowerCase().slice(1);
    }

    getTableRows() {
        let key = 0;
        const result = [];
        const headerRow = (
            <tr key={key++} className={'item-view'}>
                <th className={'item-view'}>Properties</th>
                <th className={'item-view'}>Values</th>
            </tr>
        );
        const strength = (
            <tr key={key++} className={'item-view'}>
                <td className={'item-view'}>Strength Rate</td>
                <td className={'item-view'}><input className={'row'} type='Text' value={this.state.strengthRate} onChange={this.handleStrengthChange} /></td>
            </tr>
        );
        const speed = (
            <tr key={key++} className={'item-view'}>
                <td className={'item-view'}>Speed Rate</td>
                <td className={'item-view'}><input className={'row'} type='Text' value={this.state.speedRate} onChange={this.handleSpeedChange} /></td>
            </tr>
        );
        const intelligence = (
            <tr key={key++} className={'item-view'}>
                <td className={'item-view'}>Intelligence Rate</td>
                <td className={'item-view'}><input className={'row'} type='Text' value={this.state.intelligenceRate} onChange={this.handleIntelligenceChange} /></td>
            </tr>
        );
        const happiness = (
            <tr key={key++} className={'item-view'}>
                <td className={'item-view'}>Happiness Rate</td>
                <td className={'item-view'}><input className={'row'} type='Text' value={this.state.happinessRate} onChange={this.handleHappinessChange} /></td>
            </tr>
        );
        const fullness = (
            <tr key={key++} className={'item-view'}>
                <td className={'item-view'}>Fullness Rate</td>
                <td className={'item-view'}><input className={'row'} type='Text' value={this.state.fullnessRate} onChange={this.handleFullnessChange} /></td>
            </tr>
        );
        const price = (
            <tr key={key++} className={'item-view'}>
                <td className={'item-view'}>Price</td>
                <td className={'item-view'}><input className={'row'} type='Text' value={this.state.price} onChange={this.handlePriceChange} /></td>
            </tr>
        );
        result.push(headerRow);
        result.push(strength);
        result.push(speed);
        result.push(intelligence);
        result.push(happiness);
        result.push(fullness);
        result.push(price);
        return result;
    }

    handleNameChange = (event) => {
        this.setState({name: event.target.value});
    }
    handleStrengthChange = (event) => {
        this.setState({strengthRate: event.target.value});
    }
    handleSpeedChange = (event) => {
        this.setState({speedRate: event.target.value});
    }
    handleIntelligenceChange = (event) => {
        this.setState({intelligenceRate: event.target.value});
    }
    handleHappinessChange = (event) => {
        this.setState({happinessRate: event.target.value});
    }
    handleFullnessChange = (event) => {
        this.setState({fullnessRate: event.target.value});
    }
    handlePriceChange = (event) => {
        this.setState({price: event.target.value});
    }

    validateState = () => {
        return !isNaN(this.state.strengthRate) && !isNaN(this.state.speedRate) && !isNaN(this.state.intelligenceRate) && 
        !isNaN(this.state.happinessRate) && !isNaN(this.state.fullnessRate) && !isNaN(this.state.price);
    }

    handleSaveClick = () => {
        this.addPetType();
    }

    placeHolderHandle = () => {
        let pList = Array.from(PetImageImporter.keys());
        pList.splice(pList.indexOf("pet_dead"));
        const nameSelected = pList[Math.floor(Math.random() * pList.length)];
        const coreName = nameSelected.split("_")[0];
        this.setState({
            imgURL: nameSelected,
            neutralImage: coreName + "_neutral",
            happyImage: coreName + "_happy",
            sadImage: coreName + "_sad",
            importedImageN: PetImageImporter.get(coreName + "_neutral"),
            importedImageH: PetImageImporter.get(coreName + "_happy"),
            importedImageS: PetImageImporter.get(coreName + "_sad"),
        })
        alert("Pet image set '" + coreName + "' was selected");
    }
    
    render() {
        return(
            <div onKeyDown={this.handleEnter}>
                <input type={'image'} className={'saveIcon'} src={saveIcon} alt={'Save Icon'} onClick={this.handleSaveClick}></input>
            <AdminSideMenu />
                <div className='main'>
                    <div className='mainForm'>
                        <div className='itemTitle'>Add New Pet!</div>
                        <div className={'centerView'}>
                            <p className={'addItemLink'}>Name: <input className={'addItemLink'} type='Text' value={this.state.name} onChange={this.handleNameChange}/> </p> 
                            <p className={'centerLeft'}>Sprites:</p>
                            <ul className={'container'}>
                                <li>
                                    <SpriteComponent imgURL={this.state.importedImageN} altText={'Neutral Image'} subtitle={'Neutral Image'} callback={this.placeHolderHandle}/>
                                </li>
                                <li>
                                    <SpriteComponent imgURL={this.state.importedImageH} altText={'Happy Image'} subtitle={'Happy Image'} callback={this.placeHolderHandle}/>
                                </li>
                                <li>
                                    <SpriteComponent imgURL={this.state.importedImageS} altText={'Sad Image'} subtitle={'Sad Image'} callback={this.placeHolderHandle}/>
                                </li>
                            </ul>
                        </div>
                        <br /><br />
                        <table className={'item-view'}>
                            <tbody>
                                {this.getTableRows()}
                            </tbody>
                        </table>
                    </div>
                </div>
        </div>
        );
    }
}

export default AdminNewPetPage;