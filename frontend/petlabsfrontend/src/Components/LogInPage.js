import React from 'react';
import '../CSS/LogInStyles.css';
import { Redirect } from 'react-router';
import Database from '../TempClasses/Database'

import logo from '../Images/logo_placeholder.png';

class LogInPage extends React.Component {
    state = {
        username: "",
        password: "",
        isAdmin: false,
        loginSuccessful: false,
        user: -1
    };

    handleInputChange = (event) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;
    
        // 'this' is bound to the component in this arrow function.
        this.setState({
          [name]: value  // [name] sets the object property name to the value of the 'name' variable.
        });
    }

    signup() {

    }

    login = () => {
        //authenticate

        //temp
        let success = false;
        let userToLogin = -1;
        const userList = Database.userList;

        for (let i = 0; i < userList.length; i ++) {
            if (this.state.username === userList[i].username && this.state.password === userList[i].password) {
                success = true;
                userToLogin = userList[i];
                break;
            }
        }
        //if login wasn't successful, show warning.
        if (!success) {
            alert('Invalid username/password combination. Please try again.');
        }
        //if login was a success, determine which dashboard to show.
        else {
            Database.currUser = userToLogin;
            this.setState({
                isAdmin: userToLogin.isAdmin,
                user: userToLogin,
                loginSuccessful: true
            })
        }
    }

    render() {

        if (this.state.loginSuccessful) {
            if (this.state.isAdmin) {
                return(
                    <Redirect push to={{
                        pathname: "/AdminDashboardPage",
                        state: { user: this.state.user }
                    }} />
                );
            } else {
                return(
                    <Redirect push to={{
                        pathname: "/UserDashboardPage",
                        state: { user: this.state.user }
                    }} />
                );
            }
            
        }

        return(
            <div className='center'>
                <img src={logo} alt='logo'/>

                <div className='loginForm'>
                    Login:
                    <br/>
                    <input name='username' 
                        value={ this.state.username } 
                        onChange={this.handleInputChange} 
                        type="text" 
                        placeholder="Username" />
                    <br/>
                    <input name='password' 
                        value={ this.state.password } 
                        onChange={this.handleInputChange} 
                        type="password" 
                        placeholder="Password" />
                    <div className='buttons'>
                    <button onClick={ this.signup }>Sign Up</button>
                    <button onClick={ this.login }>Log In</button>
                </div>
                </div>
            </div>
        );
    }
}

export default LogInPage;