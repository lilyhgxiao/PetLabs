import React from 'react';
import Database from '../TempClasses/Database';
import AdminSideMenu from '../Components/AdminSideMenu';
import { Link } from 'react-router-dom';
import saveIcon from '../Images/Save_Icon.png';

import '../CSS/ItemView.css';

class AdminUserPage extends React.Component {
	targetUserName = this.props.location.username;

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

  //   populatePets() {
		// let targetUser = Database.userList[this.state.userInd];
  //       let pEntries = document.querySelector("#petEntries");
  //       let pList = targetUser.petIdList;
  //       	console.log(pEntries)
  //       	console.log(pList)
  //       for (let i = 0; pList.length; i++) {
  //       	let idText = document.createTextNode("Pet id: " + pList[i])
  //       	pEntries.appendChild(idText);

  //       }
  //   }

    /* Event Handlers */

	handleSaveClick = () => {
		let targetUser = Database.userList[this.state.userInd];
        console.log(this.petType);
        targetUser.name = this.state.username;
        targetUser.strengthRate = this.state.password;
        targetUser.speedRate = this.state.isAdmin;
        targetUser.intelligenceRate = this.state.petIdList;
        targetUser.happinessRate = this.state.itemIdList;
        targetUser.happinessRate = this.state.gold;
    }

    handlePWChange = (e) => {
        this.setState({
        	name: e.target.value
        });
    }

    render() {
        console.log(this.props);
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
	                    <h1>Username: {this.state.username}</h1>
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

						        <tr className={'item-view'}>
						            <td className={'item-view'}>
						            	Pets
						            </td>
						            <td className={'item-view'} id="petEntries">
						            	
						            </td>
						        </tr>

                            </tbody>
                        </table>
	                </div>
	            </div>
            </div>
        );
    }
}

export default AdminUserPage;