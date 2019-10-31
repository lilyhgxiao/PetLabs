import React from 'react';
import ReactDOMServer from 'react-dom/server';

// import '../CSS/__.css';

import UserSideMenu from './UserSideMenu';
import mockDB from '../TempClasses/Database';

import petHappy from '../Images/pet_happy_placeholder.png';
import petNeutral from '../Images/pet_neutral_placeholder.png';
import petSad from '../Images/pet_sad_placeholder.png';

const log = console.log

class ShopPage extends React.Component {

	componentDidMount() {
        this.populatePets()
        this.populateItems() 
    }

	// Use DOM to populate items in the shop:
    populatePets() {
        let pList = mockDB.petTypes;
        for (let i = 0; i < pList.length; i++) {

        	let allPets = document.querySelector("#petEntry");
        	let tbodyComp = allPets.querySelector("tbody");
            let curPetType = pList[i];

            let newCell = document.createElement('td');

            // Put pet image:
            let imgElement = document.createElement('img');
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
            buttonElement.setAttribute("onClick", this.purchase());

            let buyText = document.createTextNode("buy");
            buttonElement.appendChild(buyText);
            newCell.appendChild(buttonElement);

            // Put newCell under tbody of petEntry:
            tbodyComp.appendChild(newCell)
        }
    }

    populateItems() {
        let iList = mockDB.itemList;
        for (let i = 0; i < iList.length; i++) {

        	let allItems = document.querySelector("#itemEntry");
        	let tbodyComp = allItems.querySelector("tbody");
            let curItem = iList[i];

        	let newCell = document.createElement('td');

            // Put item image:
            let imgElement = document.createElement('img');
            imgElement.setAttribute("src", curItem.imgURL);
            newCell.appendChild(imgElement);

            // Put item type name:
            let nameElement = document.createElement('span');
            if (curItem.name) {
            	let iName = document.createTextNode(curItem.name);
            	nameElement.appendChild(iName);
            } else {
            	let iName = document.createTextNode("--");
            	nameElement.appendChild(iName);
            }
            newCell.appendChild(nameElement);

            // Create a button:
            let buttonElement = document.createElement('button');
            buttonElement.setAttribute("onClick", this.purchase());

            let buyText = document.createTextNode("buy");
            buttonElement.appendChild(buyText);
            newCell.appendChild(buttonElement);

            // Put newCell under tbody of itemEntry:
            tbodyComp.appendChild(newCell)
        }
    }

    purchase() {

    }


	render() {
        return (
            <div>
                <UserSideMenu/>
                <div className='main'>
                    { /* Shop entries for pets */ }
                    <table id="petEntry">
			            <tbody>

			            </tbody>
			        </table>
			        <table id="itemEntry">
			            <tbody>

			            </tbody>
			        </table>
                </div>
            </div>
        );  
    }
}

export default ShopPage;