import React from 'react';
import Database from '../TempClasses/Database';
import AdminSideMenu from '../Components/AdminSideMenu';
import { Link } from 'react-router-dom';
import saveIcon from '../Images/Save_Icon.png';
import '../CSS/ItemView.css';
import SpriteComponent from '../Components/SpriteComponent';

class AdminPetPage extends React.Component {
    constructor(props) {
        super(props);
        this.petType = this.getPetReference();
        this.state = {
            name: this.petType.name,
            neutralImage: this.petType.neutralImage,
            happyImage: this.petType.happyImage,
            sadImage: this.petType.sadImage,
            strengthRate: this.petType.strengthRate,
            speedRate: this.petType.speedRate,
            intelligenceRate: this.petType.intelligenceRate,
            happinessRate: this.petType.happinessRate,
            fullnessRate: this.petType.fullnessRate,
            price: this.petType.price,
        };
    }

    getPetReference = () => {
        for (let i = 0; i < Database.petTypes.length; i++) {
            if (Database.petTypes[i].id === this.props.location.petTypeId) {
                return Database.petTypes[i];
            }
        }
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
        console.log(this.petType);
        this.petType.name = this.state.name;
        this.petType.strengthRate = this.state.strengthRate;
        this.petType.speedRate = this.state.speedRate;
        this.petType.intelligenceRate = this.state.intelligenceRate;
        this.petType.happinessRate = this.state.happinessRate;
        this.petType.fullnessRate = this.state.fullnessRate;
        this.petType.price = this.state.price;
        console.log(this.petType);
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
                        <h1>Pet Type ID: {this.petType.id}</h1>
                        <div className={'centerView'}>
                            <p className={'addItemLink'}>Name: <input className={'addItemLink'} type='Text' value={this.state.name} onChange={this.handleNameChange} /> </p> 
                            <p className={'centerLeft'}>Sprites:</p>
                            <ul className={'container'}>
                                <li>
                                    <SpriteComponent imgURL={this.petType .neutralImage} altText={'Neutral Image'} subtitle={'Neutral Image'} callback={this.placeHolderHandle}/>
                                </li>
                                <li>
                                    <SpriteComponent imgURL={this.petType .happyImage} altText={'Happy Image'} subtitle={'Happy Image'} callback={this.placeHolderHandle}/>
                                </li>
                                <li>
                                    <SpriteComponent imgURL={this.petType .sadImage} altText={'Sad Image'} subtitle={'Sad Image'} callback={this.placeHolderHandle}/>
                                </li>
                            </ul>
                            <br />
                            <table className={'item-view'}>
                                <tbody>
                                    {this.getTableRows()}
                                </tbody>
                        </table>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default AdminPetPage;