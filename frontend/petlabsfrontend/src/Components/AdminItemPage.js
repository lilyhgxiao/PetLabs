import React from 'react';
import Database from '../TempClasses/Database';
import AdminSideMenu from '../Components/AdminSideMenu';
import '../CSS/ItemView.css';
// import AddNew from '../Images/add_new.png';
import { Link } from 'react-router-dom';
import saveIcon from '../Images/Save_Icon.png';

class AdminItemPage extends React.Component {
    constructor(props) {
        super(props);
        this.item = this.getItemReference();
        this.state = {
            name: this.item.name,
            strength: this.item.strength,
            speed: this.item.speed,
            intelligence: this.item.intelligence,
            happiness: this.item.happiness,
            fullness: this.item.fullness
        };
    }
    getItemReference() {
        for (let i = 0; i < Database.itemList.length; i++) {
            if (Database.itemList[i].name === this.props.location.itemName) {
                console.log(Database.itemList[i]);
                return Database.itemList[i];
            }
        }
    }
    getTableRows() {
        const result = [];
        const headerRow = (
            <tr className={'item-view'}>
                <th className={'item-view'}>Properties</th>
                <th className={'item-view'}>Values</th>
            </tr>
        );
        const strength = (
            <tr className={'item-view'}>
                <td className={'item-view'}>Strength Rate</td>
                <td className={'item-view'}><input className={'row'} type='Text' value={this.state.strength} onChange={this.handleStrengthChange} /></td>
            </tr>
        );
        const speed = (
            <tr className={'item-view'}>
                <td className={'item-view'}>Speed Rate</td>
                <td className={'item-view'}><input className={'row'} type='Text' value={this.state.speed} onChange={this.handleSpeedChange} /></td>
            </tr>
        );
        const intelligence = (
            <tr className={'item-view'}>
                <td className={'item-view'}>Intelligence Rate</td>
                <td className={'item-view'}><input className={'row'} type='Text' value={this.state.intelligence} onChange={this.handleIntelligenceChange} /></td>
            </tr>
        );
        const happiness = (
            <tr className={'item-view'}>
                <td className={'item-view'}>Happiness Rate</td>
                <td className={'item-view'}><input className={'row'} type='Text' value={this.state.happiness} onChange={this.handleHappinessChange} /></td>
            </tr>
        );
        const fullness = (
            <tr className={'item-view'}>
                <td className={'item-view'}>Fullness Rate</td>
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
    render() {
        return (
        <div>
            <Link to={'./AdminDashboardPage'}>
                <img className={'saveIcon'} src={saveIcon} alt={'Save Icon'}></img>
            </Link>
            <AdminSideMenu />
                <div className='main'>
                    <div className='mainForm'>
                        <h1>Item ID: {this.getItemReference().id}</h1>
                        <div className={'centerView'}>
                            <p>Name: <input className={'addItemLink'} type='Text' value={this.state.name} onChange={this.handleNameChange}/> </p> 
                            <p className={'centerLeft'}>Sprite:</p>
                            <img className={'addItemLink'} src={this.getItemReference().imgURL} alt={'Add new Image'} />
                        </div>
                        <br /><br /><br /><br /><br /><br /><br />
                        <table className={'item-view'}>
                            <tbody>
                                {this.getTableRows()}
                            </tbody>
                        </table>
                        {/* <br />
                        <div className={'centerView'}>
                            <button className={'addItemLink'}>Save</button>
                        </div> */}
                    </div>
                </div>
        </div>
        );
    }
}

export default AdminItemPage;