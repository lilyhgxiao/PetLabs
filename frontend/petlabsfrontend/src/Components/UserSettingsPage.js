import React from 'react';
import UserSideMenu from './UserSideMenu';

//statezero
import BaseReactComponent from "./../BaseReactComponent";
import { updateUserPassword } from "../actions/userhelpers"

//temporary
import '../CSS/SettingsStyle.css';
import Database from '../TempClasses/Database';

class UserSettingsPage extends BaseReactComponent {
    state = {
        oldPass: "",
        newPass: "",
        confirmPass: ""
    };

    filterState({ currUser }) {
        return { currUser };
    }

    componentDidMount() {
        this.setState({
            oldPass: "",
            newPass: "",
            confirmPass: ""
        });
    }

    handleInputChange = (event) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;
    
        // 'this' is bound to the component in this arrow function.
        this.setState({
          [name]: value  // [name] sets the object property name to the value of the 'name' variable.
        });
    }

    authOldPass = () => {
        if (this.state.oldPass === this.state.currUser.password) {
            return true;
        } else {
            return false;
        }
    }

    authNewPass = () => {
        if (this.state.newPass === this.state.confirmPass) {
            return true;
        } else {
            return false;
        }
    }

    authEmpty = () => {
        if (this.state.oldPass.length === 0 || this.state.newPass === 0 || this.state.confirmPass === 0) {
            return false;
        }
        return true;
    }

    //temporary, will be deleted later
    changePassword = (password) => {
        const userList = Database.userList;
        const currUser = this.state.currUser;
        
        for (let i = 0; i < userList.length; i ++) {
            if (currUser.username === userList[i].username) {
                console.log(userList[i])
                userList[i].password = password;
            }
        }
    }

    tryChange = () => {
        console.log("tryChange")
        let success = true;
        if (!this.authEmpty()) {
            alert("Please fill in all fields.");
            success = false;
        } else if (!this.authOldPass()) {
            alert("The old password does not match your current password. Please try again.");
            success = false;
        } else if (!this.authNewPass()) {
            alert('Passwords do not match. Please try again.');
            success = false;
        }

        if (success) {
            this.changePassword(this.state.newPass); //delete later

            updateUserPassword(this.state.newPass);
            alert('Password changed successfully.')
        }
    }

    render() {
        const { currUser } = this.state;

        return(
            <div>
                <UserSideMenu/>

                <div className='main'>
                    <span className="settingsTitle">Settings</span>
                    <br/>
                    <div className="settingsContainer">
                        <span className='userSettingName'>Username:</span> <span className='userSettingValue'>{ currUser.username }</span>
                        <br/>
                        <span className='userSettingName'>Password:</span> <span className='userSettingValue'>{ new Array(currUser.password.length + 1).join('*') }</span>

                        <div className='changePassword'>
                            <span className="changePasswordTitle">Change Password?</span>
                            <br/>
                            <span className="inputName">Old Password:</span>
                            <br/>
                            <input name='oldPass' 
                                value={ this.state.oldPass } 
                                onChange={this.handleInputChange} 
                                type="password" 
                                placeholder="Old Password" />
                            <br/>
                            <span className="inputName">New Password:</span>
                            <br/>
                            <input name='newPass' 
                                value={ this.state.newPass } 
                                onChange={this.handleInputChange} 
                                type="password" 
                                placeholder="New Password" />
                            <br/>
                            <span className="inputName">Confirm Password:</span>
                            <br/>
                            <input name='confirmPass' 
                                value={ this.state.confirmPass } 
                                onChange={this.handleInputChange} 
                                type="password" 
                                placeholder="Confirm New Password" />
                            <br/>
                            <button onClick={ this.tryChange }>Change Password</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}

export default UserSettingsPage;