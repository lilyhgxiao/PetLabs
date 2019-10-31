import React from 'react';
import Database from '../TempClasses/Database';
import UserSideMenu from './UserSideMenu';

//temporary
import '../CSS/LogInStyles.css';

class UserSettingsPage extends React.Component {
    state = {
        oldPass: "",
        newPass: "",
        confirmPass: "",
        user: Database.currUser
    };

    componentDidMount() {
        this.setState({
            oldPass: "",
            newPass: "",
            confirmPass: "",
            user: Database.currUser
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
        if (this.state.oldPass === this.state.user.password) {
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

    changePassword = () => {
        const userList = Database.userList;
        
        for (let i = 0; i < userList.length; i ++) {
            if (this.state.user.username === userList[i].username) {
                userList[i].password = this.state.newPass;
            }
        }
    }

    tryChange = () => {
        console.log("tryChange")
        let success = true;
        if (!this.authOldPass()) {
            alert("The old password does not match your current password. Please try again.");
            success = false;
        }
        if (!this.authNewPass()) {
            alert('Passwords do not match. Please try again.');
            success = false;
        }

        if (success) {
            this.changePassword();
            Database.currUser.password = this.state.newPass;
            this.setState({
                user: Database.currUser
            })
            alert('Password changed successfully.')
        }
    }

    render() {

        return(
            <div>
                <UserSideMenu/>

                <div className='main'>
                    <h1>Settings</h1>
                    <br/>
                    <h2 className='userSettingName'>Username:</h2> <span className='userSettingValue'>{ this.state.user.username }</span>
                    <br/>
                    <h2 className='userSettingName'>Password:</h2> <span className='userSettingValue'>{ new Array(this.state.user.password.length + 1).join('*') }</span>

                    <br/>
                    <br/>
                    Change Password?
                    <div className='changePassword'>
                        <input name='oldPass' 
                            value={ this.state.oldPass } 
                            onChange={this.handleInputChange} 
                            type="password" 
                            placeholder="Old Password" />
                        <br/>
                        <input name='newPass' 
                            value={ this.state.newPass } 
                            onChange={this.handleInputChange} 
                            type="password" 
                            placeholder="New Password" />
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
        );
    }

}

export default UserSettingsPage;