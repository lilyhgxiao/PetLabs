import React from 'react';
import Database from '../TempClasses/Database';
import AdminSideMenu from '../Components/AdminSideMenu';
import { Link } from 'react-router-dom';
import saveIcon from '../Images/Save_Icon.png';

import '../CSS/ItemView.css';

class AdminUserPage extends React.Component {
    targetUserName = this.props.location.username;
    petChanges = [];
    itemChanges = [];

    state = {
        username: this.targetUserName,
        password: "",
        isAdmin: false,
        gold: 0,
        userInd: 0
    };

    componentDidMount() {
        this.findUserInfo();
        this.populatePets();
        this.populateItems();
    }

    findUserInfo() {
        let uList = Database.userList;
        let i = 0;
        while (i < uList.length) {
            if (uList[i].username === this.targetUserName) {
                this.setState({
                    password: uList[i].password,
                    isAdmin: uList[i].isAdmin,
                    gold: uList[i].gold,
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
            let pId = document.createTextNode("Pet id: " + pidList[i] + '   ')
            nDiv.appendChild(pId);

            // Put remove button:
            let rButton = document.createElement('button');
            rButton.setAttribute("value", pidList[i]);
            rButton.addEventListener('click', this.markForRemovalP);

            let bText = document.createTextNode('REMOVE');
            rButton.appendChild(bText);
            nDiv.appendChild(rButton);

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
                    let pNameReturn = this.AddTR("Pet Name", pList[j].petName, 
                                                this.handlePetNameChange, pidList[i]);
                    tbodyPart.appendChild(pNameReturn);
                    innerArray.push(pList[j].petName);
                    
                    // Add Pet Hunger entry:
                    let pHungerReturn = this.AddTR("Pet Hunger", pList[j].fullness, 
                                                this.handlePetHungerChange, pidList[i]);
                    tbodyPart.appendChild(pHungerReturn);
                    innerArray.push(pList[j].fullness);

                    // Add Pet Happniess entry:
                    let pHappinessReturn = this.AddTR("Pet Happniess", pList[j].happiness, 
                                                this.handlePetHappinessChange, pidList[i]);
                    tbodyPart.appendChild(pHappinessReturn);
                    innerArray.push(pList[j].happiness);

                    // Add Pet Intelligence entry:
                    let pIntelligenceReturn = this.AddTR("Pet Intelligence", pList[j].intelligence,
                                                this.handlePetIntelligenceChange, pidList[i]);
                    tbodyPart.appendChild(pIntelligenceReturn);
                    innerArray.push(pList[j].intelligence);

                    // Add Pet Strength entry:
                    let pStrengthReturn = this.AddTR("Pet Strength", pList[j].strength, 
                                                this.handlePetStrengthChange, pidList[i]);
                    tbodyPart.appendChild(pStrengthReturn);
                    innerArray.push(pList[j].strength);

                    // Add Pet Speed entry:
                    let pSpeedReturn = this.AddTR("Pet Speed", pList[j].speed, 
                                                this.handlePetSpeedChange, pidList[i]);
                    tbodyPart.appendChild(pSpeedReturn);
                    innerArray.push(pList[j].speed);

                    innerArray.push("keep");
                    
                    this.petChanges.push(innerArray);
                    j += pList.length;
                }
                j++;
            }
            nTable.appendChild(tbodyPart);
            nDiv.appendChild(nTable);
            nDiv.appendChild(document.createElement('br'));
            pEntries.appendChild(nDiv);

        }
    }

    populateItems() {
        let targetUser = Database.userList[this.state.userInd];
        let iEntries = document.querySelector("#itemEntries");
        let iidList = targetUser.itemIdList;
        for (let i = 0; i < iidList.length; i++) {
            // Create new div element:
            let nDiv = document.createElement('div');

            // Put item's id:
            let iId = document.createTextNode("Item id: " + iidList[i])
            nDiv.appendChild(iId);

            // Put remove button:
            let rButton = document.createElement('button');
            rButton.setAttribute("value", iidList[i]);
            rButton.addEventListener('click', this.markForRemovalI);

            let bText = document.createTextNode('REMOVE');
            rButton.appendChild(bText);
            nDiv.appendChild(rButton);

            // Create a table:
            let nTable = document.createElement('table');
            let tbodyPart = document.createElement('tbody');
            nTable.setAttribute('class', 'item-view');
            
            // Start populating:
            let iList = Database.itemList;
            let j = 0;
            while (j < iList.length) {
                if (iList[j].id == iidList[i]) {
                    let innerArray = [];
                    innerArray.push(iList[j].id);

                    // Add Name entry:
                    let pNameReturn = this.AddTR("Item Name", iList[j].name, 
                                            this.handleItemNameChange, iidList[i]);
                    tbodyPart.appendChild(pNameReturn);
                    
                    // Add Hunger entry:
                    let pHungerReturn = this.AddTR("Item Hunger", iList[j].fullness, 
                                                this.handleItemHungerChange, iidList[i]);
                    tbodyPart.appendChild(pHungerReturn);

                    // Add Happniess entry:
                    let pHappinessReturn = this.AddTR("Item Happniess", iList[j].happiness, 
                                                    this.handleItemHappinessChange, iidList[i]);
                    tbodyPart.appendChild(pHappinessReturn);

                    // Add Intelligence entry:
                    let pIntelligenceReturn = this.AddTR("Item Intelligence", iList[j].intelligence, 
                                                    this.handleItemIntelligenceChange, iidList[i]);
                    tbodyPart.appendChild(pIntelligenceReturn);

                    // Add Strength entry:
                    let pStrengthReturn = this.AddTR("Item Strength", iList[j].strength, 
                                                this.handleItemStrengthChange, iidList[i]);
                    tbodyPart.appendChild(pStrengthReturn);

                    // Add Speed entry:
                    let pSpeedReturn = this.AddTR("Item Speed", iList[j].speed, 
                                                this.handleItemSpeedChange, iidList[i]);
                    tbodyPart.appendChild(pSpeedReturn);

                    // Add Gold entry:
                    let pGoldReturn = this.AddTR("Item Cost", iList[j].price, 
                                            this.handleItemGoldChange, iidList[i]);
                    tbodyPart.appendChild(pGoldReturn);
                    
                    innerArray.push("keep");
                    
                    this.itemChanges.push(innerArray);
                    j += iList.length;
                }
                j++;
            }
            nTable.appendChild(tbodyPart);
            nDiv.appendChild(nTable);
            nDiv.appendChild(document.createElement('br'));
            iEntries.appendChild(nDiv);
        }
    }

    AddTR(atrName, atrValue, handler, itemId) {
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
        nInput.setAttribute('itemId', itemId)
        nInput.onchange = handler;

        trEntry.appendChild(nInput);
        return trEntry;
    }

    /* Event Handlers */

    handleSaveClick = () => {
        let targetUser = Database.userList[this.state.userInd];
        let userPetIdList = targetUser.petIdList;
        let userItemIdList = targetUser.itemIdList;
        targetUser.password = this.state.password;
        targetUser.gold = this.state.gold;

        // Changing pet information:
        let pList = Database.petList;
        let petToBeRemoved = [];
        for (let i = 0; i < this.petChanges.length; i++) {
            for (let j = 0; j < pList.length; j++) {
                if (this.petChanges[i][0] == pList[j].id) {
                    if (this.petChanges[i][7] === "remove") {
                        let innerArray = [];
                        innerArray.push(j)
                        // Find index of target pet in petIdList:
                        for (let k = 0; k < userPetIdList.length; k++) {
                            if (pList[j].id == userPetIdList[k]) {
                                innerArray.push(k);
                            }
                        }
                        petToBeRemoved.push(innerArray);
                    }
                    pList[j].petName = this.petChanges[i][1];
                    pList[j].fullness = this.petChanges[i][2];
                    pList[j].happiness = this.petChanges[i][3];
                    pList[j].intelligence = this.petChanges[i][4];
                    pList[j].strength = this.petChanges[i][5];
                    pList[j].speed = this.petChanges[i][6];
                }
            }
        }

        // Actually remove pet:
        for (let i = 0; i < petToBeRemoved.length; i++) {
            pList.splice(petToBeRemoved[i][0], 1);
            userPetIdList.splice(petToBeRemoved[i][1], 1);
        }

        // Changing item information:
        let iList = Database.itemList;
        let itemToBeRemoved = [];
        for (let i = 0; i < this.itemChanges.length; i++) {
            for (let j = 0; j < iList.length; j++) {
                if (this.itemChanges[i][0] == iList[j].id) {
                    if (this.itemChanges[i][1] === "remove") {
                        let innerArray = [];
                        innerArray.push(j)
                        // Find index of target pet in petIdList:
                        for (let k = 0; k < userItemIdList.length; k++) {
                            if (iList[j].id == userItemIdList[k]) {
                                innerArray.push(k);
                            }
                        }
                        itemToBeRemoved.push(innerArray);
                    }
                }
            }
        }

        // Actually remove item:
        for (let i = 0; i < itemToBeRemoved.length; i++) {
            iList.splice(itemToBeRemoved[i][0], 1);
            userItemIdList.splice(itemToBeRemoved[i][1], 1);
        }

    }

    handlePWChange = (e) => {
        this.setState({
            password: e.target.value
        });
    }

    handleGoldChange = (e) => {
        this.setState({
            gold: e.target.value
        });
    }

    /* For pet changes events */

    handlePetNameChange = (e) => {
        let petId = e.target.attributes.getNamedItem('itemId').value;
        for (let i = 0; i < this.petChanges.length; i++) {
            if (this.petChanges[i][0] == petId) {
                this.petChanges[i][1] = e.target.value;
            }
        }
    }

    handlePetHungerChange = (e) => {
        let petId = e.target.attributes.getNamedItem('itemId').value;
        for (let i = 0; i < this.petChanges.length; i++) {
            if (this.petChanges[i][0] == petId) {
                this.petChanges[i][2] = e.target.value;
            }
        }
    }

    handlePetHappinessChange = (e) => {
        let petId = e.target.attributes.getNamedItem('itemId').value;
        for (let i = 0; i < this.petChanges.length; i++) {
            if (this.petChanges[i][0] == petId) {
                this.petChanges[i][3] = e.target.value;
            }
        }
    }

    handlePetIntelligenceChange = (e) => {
        let petId = e.target.attributes.getNamedItem('itemId').value;
        for (let i = 0; i < this.petChanges.length; i++) {
            if (this.petChanges[i][0] == petId) {
                this.petChanges[i][4] = e.target.value;
            }
        }
    }

    handlePetStrengthChange = (e) => {
        let petId = e.target.attributes.getNamedItem('itemId').value;
        for (let i = 0; i < this.petChanges.length; i++) {
            if (this.petChanges[i][0] == petId) {
                this.petChanges[i][5] = e.target.value;
            }
        }
    }

    handlePetSpeedChange = (e) => {
        let petId = e.target.attributes.getNamedItem('itemId').value;
        for (let i = 0; i < this.petChanges.length; i++) {
            if (this.petChanges[i][0] == petId) {
                this.petChanges[i][6] = e.target.value;
            }
        }
    }

    markForRemovalP = (e) => {
        let petId = e.target.value;
        for (let i = 0; i < this.petChanges.length; i++) {
            if (this.petChanges[i][0] == petId) {
                this.petChanges[i][7] = "remove";
            }
        }
    }

    markForRemovalI = (e) => {
        let itemId = e.target.value;
        for (let i = 0; i < this.itemChanges.length; i++) {
            if (this.itemChanges[i][0] == itemId) {
                this.itemChanges[i][1] = "remove";
            }
        }
    }

    /* For pet changes events */

    handleItemNameChange = (e) => {}

    handleItemHungerChange = (e) => {}

    handleItemHappinessChange = (e) => {}

    handleItemIntelligenceChange = (e) => {}

    handleItemStrengthChange = (e) => {}

    handleItemSpeedChange = (e) => {}

    handleItemGoldChange = (e) => {}


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
                        <div className='itemTitle'>Id: {this.state.username}</div>
                        <p className={'addItemLink'}>
                            Password: 
                            <input className={'addItemLink'}
                                type='Text' 
                                value={this.state.password} 
                                onChange={(event)=>this.handlePWChange(event)} 
                            /> 
                        </p> 
                        <p className={'addItemLink'}>
                            Gold: 
                            <input className={'addItemLink'}
                                type='Text' 
                                value={this.state.gold} 
                                onChange={(event)=>this.handleGoldChange(event)} 
                            /> 
                        </p> 
                        
                        <div className='itemSubtitle'>List of pets</div>
                        <div id='petEntries'>

                        </div>
                        <div className='itemSubtitle'>List of Items</div>
                        <div id='itemEntries'>

                        </div>
                        <br/>
                        <br/>
                    </div>
                </div>
            </div>
        );
    }
}

export default AdminUserPage;