import React from 'react';
import '../CSS/LogInStyles.css';
import { Redirect } from 'react-router';
import Database from '../TempClasses/Database';
import User from '../TempClasses/User';

import logo from '../Images/logo_placeholder.png';

class SignUpPage extends React.Component {
    state = {
        username: "",
        password: "",
        confirmPassword: "",
        signupSuccessful: false,
        user: null
    };

    componentDidMount() {
        Database.currUser = null;
        this.setState({
            username: "",
            password: "",
            confirmPassword: "",
            signupSuccessful: false,
            user: null
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

    authUser = () => {
        const userList = Database.userList;
        for (let i = 0; i < userList.length; i ++) {
            if (this.state.username === userList[i].username) {
                return false;
            }
        }
        return true;
    }

    authPass = () => {
        if (this.state.password === this.state.confirmPassword) {
            return true;
        } else {
            return false;
        }
    }

    createUser = () => {
        const newUser = new User(this.state.username, this.state.password, false);
        Database.userList.push(newUser);
        return newUser;
    }

    authSignup = () => {
        //authenticate

        //temp
        let success = true;
        let newUser = null;
        
        if (!this.authUser()) {
            alert('Username already taken. Please try another username.');
            success = false;
        }
        if (!this.authPass()) {
            alert('Passwords do not match. Please try again.')
            success = false;
        }

        //if signup was successful, create new user entry in database and log in.
        if (success) {
            newUser = this.createUser()
            Database.currUser = newUser;
            this.setState({
                user: newUser,
                signupSuccessful: true
            })
        }
    }

    render() {

        if (this.state.signupSuccessful) {
            return (
                <Redirect push to={{
                    pathname: "/UserDashboardPage",
                    state: { user: this.state.user }
                }} />
            );
        }

        return(
            <div className='center'>
                <img src={logo} alt='logo'/>

                <div className='loginForm'>
                    Create a new PetLabs account:
                    <br/>
                    <br/>
                    Username:
                    <input name='username' 
                        value={ this.state.username } 
                        onChange={this.handleInputChange} 
                        type="text" 
                        placeholder="Username" />
                    <br/>
                    Password:
                    <input name='password' 
                        value={ this.state.password } 
                        onChange={this.handleInputChange} 
                        type="password" 
                        placeholder="Password" />
                    <br/>
                    Confirm Password:
                    <input name='confirmPassword' 
                        value={ this.state.confirmPassword } 
                        onChange={this.handleInputChange} 
                        type="password" 
                        placeholder="Confirm Password" />
                    <div className='buttons'>
                        <button onClick={ this.authSignup }>Sign Up</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default SignUpPage;