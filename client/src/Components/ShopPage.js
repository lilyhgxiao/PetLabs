import React from 'react';
import { Redirect } from 'react-router';

import '../CSS/ShopPageStyle.css';

import UserSideMenu from './UserSideMenu';
import GoldDisplay from './GoldDisplay.js';

import ItemImageImporter from './ItemImageImporter.js';

//statezero
import BaseReactComponent from "./../BaseReactComponent";
import { updateUserState } from "../actions/userhelpers"
import { getAllItems, getItemById } from "../actions/itemhelpers"
import { setLastPage } from '../actions/userhelpers';

//const log = console.log

class ShopPage extends BaseReactComponent {

    filterState({ currUser }) {
        return { currUser };
    }

    componentDidMount() {
        this.populateItems();
        setLastPage("/ShopPage")
    }

    populateItems() {
        const itemsPromise = getAllItems();

        itemsPromise.then((iList) => {
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
                imgElement.setAttribute("src", ItemImageImporter.get(curItem.imgURL));
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
                buttonElement.setAttribute("value", curItem._id);
                buttonElement.addEventListener('click', this.purchase);
    
                let buyText = document.createTextNode("Buy This");
                buttonElement.appendChild(buyText);
                newCell.appendChild(document.createElement('br'));
                newCell.appendChild(buttonElement);
    
                // Put newCell under tbody of itemEntry:
                tbodyComp.appendChild(newCell);
            }
        });
        
    }

    purchase = (e) => {
        let parentSearch = e.target.parentElement;
        console.log(e)
        let curUser = this.state.currUser;

        if (parentSearch.className === "itemEntry") {
            let entryId = e.target.value;
            
            console.log(entryId)

            const itemReq = getItemById(entryId);

            itemReq.then((item) => {
                if (!this.contains(entryId, curUser.itemIdList)){
                    if (curUser.gold >= item.price) {
                        const itemIdListCopy = curUser.itemIdList.slice()
                        itemIdListCopy.push(entryId);

                        const updateReq = updateUserState({
                                                itemIdList: itemIdListCopy,
                                                gold: curUser.gold - item.price }, 
                                                curUser._id);
                        
                        updateReq.then((result) => {
                            if (result) {
                                alert("Purchased " + item.name + "!");
                            } else {
                                alert("Couldn't purchase item.")
                            }
                        }).catch((error) => {
                            console.log((error));
                        })
                        
                        
                    } else {
                        alert("Not enough Gold!");
                    }
                } else {
                    alert("Already have that item!");
                }
            })
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

        if (this.state.currUser === null) {
            return(
                <Redirect push to={{
                    pathname: "/"
                }} />
            );
        }

        return (
            <div>
                <UserSideMenu/>
                <GoldDisplay gold={ currUser.gold }/>
                <div className='main'>
                    
                    <div className='storeTitle'>Welcome to the Store!</div>
                    <div className='storeSubtitle'>Purchase items to raise your pet right!</div>
                    <div id="itemEntryContainer">
                    </div>
                </div>
            </div>
        );  
    }
}

export default ShopPage;