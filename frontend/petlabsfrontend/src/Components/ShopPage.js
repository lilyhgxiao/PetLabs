import React from 'react';
import UserSideMenu from './UserSideMenu';
import GoldDisplay from './GoldDisplay.js';
import '../CSS/ShopPageStyle.css';

class ShopPage extends React.Component {
    // Change to specific user after deciding on how to pass info.
    // Currently getting user named "user" as placeholder
    targetUserId = "5ddae5c6c78e20500452976e";
    curUser;
    iList = [];
    state = {
        userGold: 0
    }

    componentDidMount() {
        this.getUser();
        this.getItems();
    }

    getUser() {
        const url = "http://localhost:3001/users/" + this.targetUserId;
        const request = new Request(url, {
            method: "get",
            headers: { 
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            }
        });

        fetch(request)
        .then((res) => {
            if (res.status === 200) {
                return res.json();
            }
        }).then((user) => {
            this.curUser = user;
            this.setState({
                userGold: this.curUser.gold
            });
        }).catch((error) => {
            console.log(error);
        })
    }

    getItems() {
        const url = "http://localhost:3001/items";
        const request = new Request(url, {
            method: "get",
            headers: { 
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            }
        });

        fetch(request)
        .then((res) => {
            if (res.status === 200) {
                return res.json();
            }
        }).then((items) => {
            this.iList = items;
            this.populateItems();
        }).catch((error) => {
            console.log(error);
        })
    }

    populateItems() {
        for (let i = 0; i < this.iList.length; i++) {
            let tbodyComp = document.querySelector("#itemEntryContainer");
            let curItem = this.iList[i];

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
            // imgURL field does not exist in item (yet).
            // imgElement.setAttribute("src", curItem.imgURL);
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
    }

    purchase = (e) => {
        const currUser = this.curUser

        let parentSearch = e.target.parentElement;
        if (parentSearch.className === "itemEntry") {
            let entryId = e.target.value;
            let i = 0;
            while (i < this.iList.length) {
                if (this.iList[i]._id === entryId) {
                    if (!this.contains(entryId, currUser.itemIdList)){
                        if (currUser.gold >= this.iList[i].price) {
                            currUser.gold -= this.iList[i].price;
                            currUser.itemIdList.push(entryId);
                            this.setState({
                                userGold: currUser.gold
                            })
                            this.purchaseUpdate();  
                            alert("Purchased " + this.iList[i].name + "!");
                        } else {
                            alert("Not enough Gold!");
                        }
                    } else {
                        alert("Already have that item!");
                    }
                    i += this.iList.length;
                }
                i++;
            }
        }
    }

    purchaseUpdate() {
        const url = "http://localhost:3001/users/" + this.targetUserId;
        const request = new Request(url, {
            method: "PATCH",
            body: JSON.stringify(this.curUser),
            headers: { 
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            }
        });

        fetch(request)
        .then((res) => {
            if (res.status === 200) {
                console.log("Changes made to server db")
            }
        }).catch((error) => {
            console.log(error);
        })
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
        return (
            <div>
                <UserSideMenu/>
                <GoldDisplay gold={ this.state.userGold }/>
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