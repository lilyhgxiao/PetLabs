import React from 'react';
import { Redirect } from 'react-router';
import AdminSideMenu from '../Components/AdminSideMenu';
import saveIcon from '../Images/Save_Icon.png';
import '../CSS/ItemView.css';
import SpriteComponent from '../Components/SpriteComponent';
import AddIcon from '../Images/add_new.png';

import PetImageImporter from './PetImageImporter.js';

//statezero
import BaseReactComponent from "./../BaseReactComponent";
import {setLastPage} from "../actions/userhelpers"

class AdminPetPage extends BaseReactComponent {
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
            id: 0
        };
    }

    filterState({currUser}) {
        return {currUser};
    }

    fetchPetType(url) {
        const request = new Request(url, {
            method: 'GET',
            headers: { 
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            }
        });

        fetch(request)
        .then((result) => {
            if (result.status === 200) {
                return result.json();
            }
        }).then((result) => {
            this.setState({
                name: result.name,
                neutralImage: PetImageImporter.get(result.neutralImage),
                happyImage: PetImageImporter.get(result.happyImage),
                sadImage: PetImageImporter.get(result.sadImage),
                strengthRate: result.strengthRate,
                speedRate: result.speedRate,
                intelligenceRate: result.intelligenceRate,
                happinessRate: result.happinessRate,
                fullnessRate: result.fullnessRate,
                price: result.price,
                id: result.id
            })
        }).catch((error) => {
            console.log(error);
            alert('Unable to fetch pet type :(', error);
        })
    }

    componentDidMount() {
        // const url = 'http://localhost:3001/pettypes/' + this.props.location.petTypeId;
        // const url = '/pettypes/' + this.props.location.petTypeId;

        if (!this.props.location.petTypeId) {
            fetch('/cookie/petTypeId')
                .then(res => {
                    if (res.status === 200) {
                    return res.json();
                }
            })
            .then(json => {
                if (json && json.petTypeId) {
                    this.fetchPetType('/pettypes/' + json.petTypeId);
                }
            })
            .catch(error => {
                console.log(error);
            });
        } else {
            this.fetchPetType('/pettypes/' + this.props.location.petTypeId);
        }
        setLastPage("/AdminPetPage");
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

    handleSaveClick = () => {
        if (this.state.name.length === 0) {
            alert('Pet Type name cannot be blank');
            return;
        }

        if (!this.validateState()) {
            alert('One or more invalid inputs detected :(');
            return;
        }

        // const url = 'http://localhost:3001/pettypes/' + this.props.location.petTypeId;
        const url = '/pettypes/' + this.props.location.petTypeId;

        const request = new Request(url, {
            method: 'PATCH',
            body: JSON.stringify({
                name: this.state.name,
                strengthRate: this.state.strengthRate,
                speedRate: this.state.speedRate,
                intelligenceRate: this.state.intelligenceRate,
                happinessRate: this.state.happinessRate,
                fullnessRate: this.state.fullnessRate,
                price: this.state.price,
            }),
            headers: { 
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            }
        });

        fetch(request)
        .then((result) => {
            if (result.status === 200) {
                alert('Pet Type updated successfully :)');
            }
        }).catch((error) => {
            alert('Failed to update pet type :(');
            console.log(error);
        });
    }

    placeHolderHandle = () => {
        // alert("Prompt for image to upload");
    }

    validateState = () => {
        return !isNaN(this.state.strengthRate) && !isNaN(this.state.speedRate) && !isNaN(this.state.intelligenceRate) && 
        !isNaN(this.state.happinessRate) && !isNaN(this.state.fullnessRate) && !isNaN(this.state.price);
    }

    handleEnter = (event) => {
        if (event.key === 'Enter' && this.state.name.length > 0) {
            this.handleSaveClick();
        } else if (event.key === 'Enter') {
            alert('Pet Type name cannot be blank :(');
        }
    }

    render() {

        if (this.state.currUser === null) {
            return(
                <Redirect push to={{
                    pathname: "/"
                }} />
            );
        }
        return(
            <div onKeyDown={this.handleEnter}>
                <input type={'image'} className={'saveIcon'} src={saveIcon} alt={'Save Icon'} onClick={this.handleSaveClick}></input>
                <AdminSideMenu />
                <div className='main'>
                    <div className='mainForm'>
                        <div className='itemTitle'>Pet Type ID: {this.state.id}</div>
                        <div className={'centerView'}>
                            <p className={'addItemLink'}>Name: <input className={'addItemLink'} type='Text' value={this.state.name} onChange={this.handleNameChange} /> </p> 
                            <p className={'centerLeft'}>Sprites:</p>
                            <ul className={'container'}>
                                <li>
                                    <SpriteComponent imgURL={this.state.neutralImage} altText={'Neutral Image'} subtitle={'Neutral Image'} callback={this.placeHolderHandle}/>
                                </li>
                                <li>
                                    <SpriteComponent imgURL={this.state.happyImage} altText={'Happy Image'} subtitle={'Happy Image'} callback={this.placeHolderHandle}/>
                                </li>
                                <li>
                                    <SpriteComponent imgURL={this.state.sadImage} altText={'Sad Image'} subtitle={'Sad Image'} callback={this.placeHolderHandle}/>
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