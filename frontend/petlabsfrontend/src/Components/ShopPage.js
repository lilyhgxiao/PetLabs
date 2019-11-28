import React from 'react';

import '../CSS/ShopPageStyle.css';

import UserSideMenu from './UserSideMenu';
import GoldDisplay from './GoldDisplay.js';
import mockDB from '../TempClasses/Database';

//statezero
import BaseReactComponent from "./../BaseReactComponent";
import { updateUserState } from "../actions/userhelpers"

//const log = console.log

class ShopPage extends BaseReactComponent {

    filterState({ currUser }) {
        return { currUser };
    }

    componentDidMount() {
        //this.populatePets();
        this.populateItems();
    }

    // Use DOM to populate items in the shop:
    populatePets() {
        let pList = mockDB.petTypes;
        for (let i = 0; i < pList.length; i++) {

            let allPets = document.querySelector("#petEntry");
            let tbodyComp = allPets.querySelector("tbody");
            let curPetType = pList[i];

            let newCell = document.createElement('td');
            
            // Put price on items:
            let price = document.createTextNode("Price: " + curPetType.price);
            newCell.appendChild(price);

            // Put pet image:
			let imgElement = document.createElement('img');
			imgElement.setAttribute("class", "shopImg");
            imgElement.setAttribute("src", curPetType.neutralImage);
            newCell.appendChild(imgElement);

            // Put pet type name:
            let nameElement = document.createElement('span');
            if (curPetType.name) {
                let pName = document.createTextNode(curPetType.name);
                nameElement.appendChild(pName);
            } else {
                let pName = document.createTextNode("--");
                nameElement.appendChild(pName);
            }
            newCell.appendChild(nameElement);

            // Create a button:
            let buttonElement = document.createElement('button');
            buttonElement.setAttribute("value", curPetType.id);
            buttonElement.addEventListener('click', this.purchase);

            let buyText = document.createTextNode("buy");
            buttonElement.appendChild(buyText);
            newCell.appendChild(buttonElement);

            // Put newCell under tbody of petEntry:
            tbodyComp.appendChild(newCell);
        }
    }

    populateItems() {
        let iList = mockDB.itemList;
        for (let i = 0; i < iList.length; i++) {

            //let tbodyComp = allItems.querySelector("tbody");
            let tbodyComp = document.querySelector("#itemEntryContainer");
            let curItem = iList[i];

            //let newCell = document.createElement('td');
            let newCell = document.createElement('div');
            newCell.className = "itemEntry";

            // Put price on items:
            let price = document.createElement('span');
            let priceText = document.createTextNode(curItem.price + "G");
            price.className = "itemPrice";
            price.appendChild(priceText);


            // Put item image:
			let imgElement = document.createElement('img');
			imgElement.setAttribute("class", "shopImg");
            imgElement.setAttribute("src", curItem.imgURL);
            newCell.appendChild(imgElement);

            // Put item type name:
            let nameElement = document.createElement('span');
            nameElement.className = "itemName";
            if (curItem.name) {
                let iName = document.createTextNode(curItem.name);
                nameElement.appendChild(iName);
            } else {
                let iName = document.createTextNode("--");
                nameElement.appendChild(iName);
            }
            newCell.appendChild(nameElement);
            newCell.appendChild(document.createElement('br'));
            newCell.appendChild(price);

            // Create a button:
            let buttonElement = document.createElement('button');
            buttonElement.className = "buyItemButton";
            buttonElement.setAttribute("value", curItem.id);
            buttonElement.addEventListener('click', this.purchase);

            let buyText = document.createTextNode("Buy This");
            buttonElement.appendChild(buyText);
            newCell.appendChild(document.createElement('br'));
            newCell.appendChild(buttonElement);

            // Put newCell under tbody of itemEntry:
            tbodyComp.appendChild(newCell);
        }
    }

    purchase = (e) => {
        let parentSearch = e.target.parentElement;
        console.log(e)
        let curUser = this.state.currUser;

        if (parentSearch.className === "itemEntry") {
            let entryId = e.target.value;

            let iList = mockDB.itemList;
            let i = 0;
            while (i < iList.length) {
                if (iList[i].id === entryId) {
                    if (!this.contains(entryId, curUser.itemIdList)){
                        if (curUser.gold >= iList[i].price) {
                            const itemIdListCopy = curUser.itemIdList.slice()
                            itemIdListCopy.push(entryId);
                            updateUserState({itemIdList: itemIdListCopy});
                            updateUserState({gold: curUser.gold - iList[i].price});
                            alert("Purchased " + iList[i].name + "!");
                        } else {
                            alert("Not enough Gold!");
                        }
                    } else {
                        alert("Already have that item!");
                    }
                    i += iList.length;
                }
                i++;
            }
        } else {
            // If it's not an item entry, it has to be a pet entry.
            let entryId = e.target.value;

            let pList = mockDB.petTypes;
            let i = 0;
            while (i < pList.length) {
                if (pList[i].id === entryId) {
                    if (!this.contains(entryId, curUser.itemIdList)){
                        if (curUser.gold >= pList[i].price) {
                            const petIdListCopy = curUser.petIdList.slice()
                            petIdListCopy.push(entryId);
                            updateUserState({petIdList: petIdListCopy});
                            updateUserState({gold: curUser.gold - pList[i].price});
                            alert("Purchased " + pList[i].name + "!");
                        } else {
                            alert("Not enough Gold!");
                        }
                    } else {
                        alert("Already have that pet!");
                    }
                    i += pList.length;
                } 
                i++;
            }
        }
    }

    contains(targetId, searchArray) {
        for (let i = 0; i < searchArray.length; i++) {
            if (searchArray[i] === targetId) {
                return true;
            }
        }
        return false;
    }

    render() {
        const { currUser } = this.state;

        return (
            <div>
                <UserSideMenu/>
                <GoldDisplay gold={ currUser.gold }/>
                <div className='main'>
                    
                    <div className='storeTitle'>Welcome to the Store!</div>
                    <div className='storeSubtitle'>Purchase items to raise your pet right!</div>
                    { /*
                    <div className='category'>
                        Purchase Pets
                    </div>
                    <table id="petEntry">
                        <tbody>

                        </tbody>
                    </table>
                    <div className='category'>
                        Purchase Items
                    </div>
                    
                    <div id="itemEntryContainer">
                        <table id="itemEntry">
                            <tbody>

                            </tbody>
                        </table>
                    </div>
                    */}

                    <div id="itemEntryContainer">
                    </div>
                </div>
            </div>
        );  
    }
}

export default ShopPage;