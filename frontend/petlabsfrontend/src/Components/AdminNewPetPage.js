import React from 'react';
import Database from '../TempClasses/Database';
import AdminSideMenu from '../Components/AdminSideMenu';
import '../CSS/ItemView.css';
import { Link } from 'react-router-dom';
import saveIcon from '../Images/Save_Icon.png';
import PetType from '../TempClasses/PetType';
import AddIcon from '../Images/add_new.png';
import SpriteComponent from '../Components/SpriteComponent';

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
        };
    }

    addPetType() {
        console.log(Database.petTypes);
        Database.petTypes.push(new PetType(
            this.state.name,
            this.state.neutralImage,
            this.state.happyImage,
            this.state.sadImage,
            this.state.strengthRate,
            this.state.speedRate,
            this.state.intelligenceRate,
            this.state.happinessRate,
            this.state.fullnessRate,
            this.state.price,
        ));
        console.log(Database.petTypes);
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
        this.setState({strengthRate: (parseInt(event.target.value) ? parseInt(event.target.value) : 0)});
    }
    handleSpeedChange = (event) => {
        this.setState({speedRate: (parseInt(event.target.value) ? parseInt(event.target.value) : 0)});
    }
    handleIntelligenceChange = (event) => {
        this.setState({intelligenceRate: (parseInt(event.target.value)) ? parseInt(event.target.value) : 0});
    }
    handleHappinessChange = (event) => {
        this.setState({happinessRate: (parseInt(event.target.value) ? parseInt(event.target.value) : 0)});
    }
    handleFullnessChange = (event) => {
        this.setState({fullnessRate: (parseInt(event.target.value) ? parseInt(event.target.value) : 0)});
    }
    handlePriceChange = (event) => {
        this.setState({price: (parseInt(event.target.value) ? parseInt(event.target.value) : 0)});
    }

    handleSaveClick = () => {
        this.addPetType();
    }

    placeHolderHandle = () => {
        alert("Prompt for image to upload");
    }
    
    render() {
        return(
            <div>
            <Link to={'./AdminDashboardPage'}>
                <img className={'saveIcon'} src={saveIcon} alt={'Save Icon'} onClick={this.handleSaveClick}></img>
            </Link>
            <AdminSideMenu />
                <div className='main'>
                    <div className='mainForm'>
                        <div className='itemTitle'>Add New Pet!</div>
                        <div className={'centerView'}>
                            <p className={'addItemLink'}>Name: <input className={'addItemLink'} type='Text' value={this.state.name} onChange={this.handleNameChange}/> </p> 
                            <p className={'centerLeft'}>Sprites:</p>
                            <ul className={'container'}>
                                <li>
                                    <SpriteComponent imgURL={AddIcon} altText={'Neutral Image'} subtitle={'Neutral Image'} callback={this.placeHolderHandle}/>
                                </li>
                                <li>
                                    <SpriteComponent imgURL={AddIcon} altText={'Happy Image'} subtitle={'Happy Image'} callback={this.placeHolderHandle}/>
                                </li>
                                <li>
                                    <SpriteComponent imgURL={AddIcon} altText={'Sad Image'} subtitle={'Sad Image'} callback={this.placeHolderHandle}/>
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