import React from 'react';
import Database from '../TempClasses/Database';
import AdminSideMenu from '../Components/AdminSideMenu';
import '../CSS/ItemView.css';
import { Link } from 'react-router-dom';
import saveIcon from '../Images/Save_Icon.png';
import Item from '../TempClasses/Item';
import AddIcon from '../Images/add_new.png';

class AdminNewItemPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            strength: 0,
            speed: 0,
            intelligence: 0,
            happiness: 0,
            fullness: 0,
            imgURL: AddIcon,
        };
    }

    addItem() {
        console.log(Database.itemList);
        Database.itemList.push(new Item(
            this.state.name,
            this.state.strength,
            this.state.speed,
            this.state.intelligence,
            this.state.happiness,
            this.state.fullness,
            this.state.imgURL,
        ));
        console.log(Database.itemList);
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
                <td className={'item-view'}>Strength</td>
                <td className={'item-view'}><input className={'row'} type='Text' value={this.state.strength} onChange={this.handleStrengthChange} /></td>
            </tr>
        );
        const speed = (
            <tr key={key++} className={'item-view'}>
                <td className={'item-view'}>Speed</td>
                <td className={'item-view'}><input className={'row'} type='Text' value={this.state.speed} onChange={this.handleSpeedChange} /></td>
            </tr>
        );
        const intelligence = (
            <tr key={key++} className={'item-view'}>
                <td className={'item-view'}>Intelligence</td>
                <td className={'item-view'}><input className={'row'} type='Text' value={this.state.intelligence} onChange={this.handleIntelligenceChange} /></td>
            </tr>
        );
        const happiness = (
            <tr key={key++} className={'item-view'}>
                <td className={'item-view'}>Happiness</td>
                <td className={'item-view'}><input className={'row'} type='Text' value={this.state.happiness} onChange={this.handleHappinessChange} /></td>
            </tr>
        );
        const fullness = (
            <tr key={key++} className={'item-view'}>
                <td className={'item-view'}>Fullness</td>
                <td className={'item-view'}><input className={'row'} type='Text' value={this.state.fullness} onChange={this.handleFullnessChange} /></td>
            </tr>
        );
        result.push(headerRow);
        result.push(strength);
        result.push(speed);
        result.push(intelligence);
        result.push(happiness);
        result.push(fullness);
        return result;
    }

    handleNameChange = (event) => {
        this.setState({name: event.target.value});
    }
    handleStrengthChange = (event) => {
        this.setState({strength: (parseInt(event.target.value) ? parseInt(event.target.value) : 0)});
    }
    handleSpeedChange = (event) => {
        this.setState({speed: (parseInt(event.target.value) ? parseInt(event.target.value) : 0)});
    }
    handleIntelligenceChange = (event) => {
        this.setState({intelligence: (parseInt(event.target.value)) ? parseInt(event.target.value) : 0});
    }
    handleHappinessChange = (event) => {
        this.setState({happiness: (parseInt(event.target.value) ? parseInt(event.target.value) : 0)});
    }
    handleFullnessChange = (event) => {
        this.setState({fullness: (parseInt(event.target.value) ? parseInt(event.target.value) : 0)});
    }

    handleSaveClick = () => {
        this.addItem();
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
                        <h1>Add New Item!</h1>
                        <div className={'centerView'}>
                            <p className={'addItemLink'}>Name: <input className={'addItemLink'} type='Text' value={this.state.name} onChange={this.handleNameChange}/> </p> 
                            <p className={'centerLeft'}>Sprite:</p>
                            {/* <img className={'addItemLink'} src={AddIcon} alt={'Add new Image'} onClick={this.placeHolderHandle} /> */}
                            <input className={'imgAddItemLink'} type={'image'} src={AddIcon} alt={'Add new Image'} onClick={this.placeHolderHandle} />
                        </div>
                        <br /><br /><br /><br /><br /><br /><br />
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

export default AdminNewItemPage;