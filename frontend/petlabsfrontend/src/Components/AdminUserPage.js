import React from 'react';
import Database from '../TempClasses/Database';
import AdminSideMenu from '../Components/AdminSideMenu';
import { Link } from 'react-router-dom';
import saveIcon from '../Images/Save_Icon.png';

import '../CSS/ItemView.css';

class AdminUserPage extends React.Component {
	targetUserName = this.props.location.username;
	petChanges = [];

	state = {
        username: this.targetUserName,
        password: "",
        isAdmin: null,
        petIdList: [],
        itemIdList: [],
        gold: 0,
        userInd: 0
    };

	componentDidMount() {
        this.findUserInfo();
        this.populatePets();
    }

	findUserInfo() {
		let uList = Database.userList;
		let i = 0;
		while (i < uList.length) {
			if (uList[i].username === this.targetUserName) {
				this.setState({
					password: uList[i].password,
			        isAdmin: uList[i].isAdmin,
			        petIdList: uList[i].petIdList,
			        itemIdList: uList[i].itemIdList,
			        gold: 0,
			        userInd: i
				})
				this.targetUser = uList[i];
				i += uList.length;
			}
			i++;
		}
	}

    populatePets() {
		let targetUser = Database.userList[this.state.userInd];
        let pEntries = document.querySelector("#petEntries");
        let pidList = targetUser.petIdList;
        for (let i = 0; i < pidList.length; i++) {
        	// Create new div element:
        	let nDiv = document.createElement('div');

        	// Put pet's id:
        	let pId = document.createTextNode("Pet id: " + pidList[i])
        	nDiv.appendChild(pId);

        	// Create a table:
        	let nTable = document.createElement('table');
        	let tbodyPart = document.createElement('tbody');
        	nTable.setAttribute('class', 'item-view');
        	
        	// Start populating:
        	let pList = Database.petList;
        	let j = 0;
        	while (j < pList.length) {
        		if (pList[j].id == pidList[i]) {
        			let innerArray = [];
        			innerArray.push(pList[j].id);

        			// Add Pet Name entry:
		        	let pNameReturn = this.AddPetTR("Pet Name", 
		        							pList[j].petName, this.handlePetNameChange, pidList[i]);
		        	tbodyPart.appendChild(pNameReturn);
		        	innerArray.push(pList[j].petName);
		        	
		        	// Add Pet Hunger entry:
		        	let pHungerReturn = this.AddPetTR("Pet Hunger", 
		        							pList[j].hunger, this.handlePetHungerChange, pidList[i]);
		        	tbodyPart.appendChild(pHungerReturn);
		        	innerArray.push(pList[j].hunger);

		        	// Add Pet Happniess entry:
		        	let pHappinessReturn = this.AddPetTR("Pet Happniess", 
		        							pList[j].happiness, this.handlePetHappinessChange, pidList[i]);
		        	tbodyPart.appendChild(pHappinessReturn);
		        	innerArray.push(pList[j].happiness);

		        	// Add Pet Intelligence entry:
		        	let pIntelligenceReturn = this.AddPetTR("Pet Intelligence", 
		        							pList[j].intelligence, this.handlePetIntelligenceChange, pidList[i]);
		        	tbodyPart.appendChild(pIntelligenceReturn);
		        	innerArray.push(pList[j].intelligence);

		        	// Add Pet Strength entry:
		        	let pStrengthReturn = this.AddPetTR("Pet Strength", 
		        							pList[j].strength, this.handlePetStrengthChange, pidList[i]);
		        	tbodyPart.appendChild(pStrengthReturn);
		        	innerArray.push(pList[j].strength);

		        	// Add Pet Speed entry:
		        	let pSpeedReturn = this.AddPetTR("Pet Speed", 
		        							pList[j].speed, this.handlePetSpeedChange, pidList[i]);
		        	tbodyPart.appendChild(pSpeedReturn);
		        	innerArray.push(pList[j].speed);
		        	
		        	this.petChanges.push(innerArray);
        			j += pList.length;
        		}
        		j++;
        	}
        	nTable.appendChild(tbodyPart);
        	nDiv.appendChild(nTable);
        	pEntries.appendChild(nDiv);

        }
    }

    AddPetTR(atrName, atrValue, handler, index) {
    	// Create new tr:
		let trEntry = document.createElement('tr');
		trEntry.setAttribute('class', 'item-view');

		// Create td for attribute name:
		let atrN = document.createElement('td');
		atrN.setAttribute('class', 'item-view');

    	let atrTxt = document.createTextNode(atrName)
    	atrN.appendChild(atrTxt);
    	trEntry.appendChild(atrN);

    	// Create td for the field:
    	let nInput = document.createElement('input');
    	nInput.setAttribute('class', 'addItemLink');
    	nInput.setAttribute('type', 'Text');
    	nInput.setAttribute('value', atrValue);
    	nInput.setAttribute('petid', index)
    	nInput.onchange = handler;

    	trEntry.appendChild(nInput);
    	return trEntry;
    }

    /* Event Handlers */

	handleSaveClick = () => {
		let targetUser = Database.userList[this.state.userInd];
        targetUser.name = this.state.username;
        targetUser.strengthRate = this.state.password;
        targetUser.speedRate = this.state.isAdmin;
        targetUser.intelligenceRate = this.state.petIdList;
        targetUser.happinessRate = this.state.itemIdList;
        targetUser.happinessRate = this.state.gold;

    	let pList = Database.petList;
        for (let i = 0; i < this.petChanges.length; i++) {
        	for (let j = 0; j < pList.length; j++) {
        		if (this.petChanges[i][0] == pList[j].id) {
        			pList[j].petName = this.petChanges[i][1];
        			pList[j].hunger = this.petChanges[i][2];
        			pList[j].happiness = this.petChanges[i][3];
        			pList[j].intelligence = this.petChanges[i][4];
        			pList[j].strength = this.petChanges[i][5];
        			pList[j].speed = this.petChanges[i][6];
        		}
        	}
        }
    }

    handlePWChange = (e) => {
        this.setState({
        	name: e.target.value
        });
    }

    /* For pet changes events */

    handlePetNameChange = (e) => {
    	let petId = e.target.attributes.getNamedItem('petid').value;
    	for (let i = 0; i < this.petChanges.length; i++) {
    		if (this.petChanges[i][0] == petId) {
    			this.petChanges[i][1] = e.target.value;
    		}
    	}
    }

    handlePetHungerChange = (e) => {
        let petId = e.target.attributes.getNamedItem('petid').value;
    	for (let i = 0; i < this.petChanges.length; i++) {
    		if (this.petChanges[i][0] == petId) {
    			this.petChanges[i][2] = e.target.value;
    		}
    	}
    }

    handlePetHappinessChange = (e) => {
        let petId = e.target.attributes.getNamedItem('petid').value;
    	for (let i = 0; i < this.petChanges.length; i++) {
    		if (this.petChanges[i][0] == petId) {
    			this.petChanges[i][3] = e.target.value;
    		}
    	}
    }

    handlePetIntelligenceChange = (e) => {
        let petId = e.target.attributes.getNamedItem('petid').value;
    	for (let i = 0; i < this.petChanges.length; i++) {
    		if (this.petChanges[i][0] == petId) {
    			this.petChanges[i][4] = e.target.value;
    		}
    	}
    }

    handlePetStrengthChange = (e) => {
        let petId = e.target.attributes.getNamedItem('petid').value;
    	for (let i = 0; i < this.petChanges.length; i++) {
    		if (this.petChanges[i][0] == petId) {
    			this.petChanges[i][5] = e.target.value;
    		}
    	}
    }

    handlePetSpeedChange = (e) => {
        let petId = e.target.attributes.getNamedItem('petid').value;
    	for (let i = 0; i < this.petChanges.length; i++) {
    		if (this.petChanges[i][0] == petId) {
    			this.petChanges[i][6] = e.target.value;
    		}
    	}
    }

    render() {
        return(
            <div>
                <Link to={'./AdminDashboardPage'}>
                    <img 
                    	className={'saveIcon'} 
                    	src={saveIcon} 
                    	alt={'Save Icon'} 
                    	onClick={this.handleSaveClick}>
                    </img>
                </Link>

                <AdminSideMenu />

                <div className='main'>
	                <div className='mainForm'>
	                    <h1>Id: {this.state.username}</h1>
	                    <table className={'item-view'}>
                            <tbody>
                                <tr className={'item-view'}>
						            <td className={'item-view'}>
						            	Password
						            </td>
						            <td className={'item-view'}>
						            	<input 
				                    		className={'addItemLink'} 
				                    		type='Text' 
				                    		value={this.state.password} 
				                    		onChange={this.handlePWChange} 
				                    	/>
						            </td>
						        </tr>

						        <tr className={'item-view'}>
						            <td className={'item-view'}>
						            	Gold
						            </td>
						            <td className={'item-view'}>
						            	<input 
				                    		className={'addItemLink'} 
				                    		type='Text' 
				                    		value={this.state.gold} 
				                    		onChange={this.handlePWChange} 
				                    	/>
						            </td>
						        </tr>
                            </tbody>
                        </table>
                        <h2>List of pets</h2>
                        <div id='petEntries'>

                        </div>
	                </div>
	            </div>
            </div>
        );
    }
}

export default AdminUserPage;