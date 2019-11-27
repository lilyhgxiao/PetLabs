import React from 'react';
import Database from '../TempClasses/Database';
import AdminSideMenu from '../Components/AdminSideMenu';
import '../CSS/ItemView.css';
import { Link } from 'react-router-dom';
import saveIcon from '../Images/Save_Icon.png';
import AddIcon from '../Images/add_new.png';

class AdminItemPage extends React.Component {
    constructor(props) {
        super(props);
        // this.item = this.getItemReference();
        this.state = {
            name: '',
            strength: 0,
            speed: 0,
            intelligence: 0,
            happiness: 0,
            fullness: 0,
            price: 0,
            id: 0,
            imgURL: AddIcon
        };
    }

    componentDidMount() {
        const url = 'http://localhost:3001/items/' + this.props.location.itemId;

        const request = new Request(url, {
            method: 'get',
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
                strength: result.strength,
                speed: result.speed,
                intelligence: result.intelligence,
                happiness: result.happiness,
                fullness: result.fullness,
                price: result.price,
                id: result._id
            })
        }).catch((error) => {
            alert('Failed to fetch items :(');
        });
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
    handlePriceChange = (event) => {
        this.setState({price: (parseInt(event.target.value) ? parseInt(event.target.value) : 0)});
    }

    placeHolderHandle = () => {
        alert("Prompt for image to upload");
    }

    /**
     * Update the properties of the reference
     */
    handleSaveClick = () => {
        if (this.state.name.length === 0) {
            alert('Item name cannot be blank');
            return;
        }

        const url = 'http://localhost:3001/items/' + this.props.location.itemId;

        const request = new Request(url, {
            method: 'PATCH',
            body: JSON.stringify({
                name: this.state.name,
                strength: this.state.strength,
                speed: this.state.speed,
                intelligence: this.state.intelligence,
                happiness: this.state.happiness,
                fullness: this.state.fullness,
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
                alert('Item updated successfully :)');
            }
        }).catch((error) => {
            alert('Failed to update item :(');
            console.log(error);
        })

    }

    handleEnter = (event) => {
        if (event.key === 'Enter' && this.state.name.length > 0) {
            this.handleSaveClick();
        } else if (event.key === 'Enter') {
            alert('Item name cannot be blank :(');
        }
    }

    render() {
        return (
        <div onKeyDown={this.handleEnter}>
            {/* <Link to={'./AdminDashboardPage'}> */}
                <input type={'image'} src={saveIcon} className={'saveIcon'} alt={'Save Icon'} onClick={this.handleSaveClick}></input>
            {/* </Link> */}
            <AdminSideMenu />
                <div className='main'>
                    <div className='mainForm'>
                        <div className='itemTitle'>Item ID: {this.state.id}</div>
                        <div className={'centerView'}>
                            <p className={'addItemLink'}>Name: <input className={'addItemLink'} type='Text' value={this.state.name} onChange={this.handleNameChange}/> </p> 
                            <p className={'centerLeft'}>Sprite:</p>
                            <input className={'imgAddItemLink'} type={'image'} src={this.state.imgURL} alt={'Add new Image'} onClick={this.placeHolderHandle} />
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

export default AdminItemPage;