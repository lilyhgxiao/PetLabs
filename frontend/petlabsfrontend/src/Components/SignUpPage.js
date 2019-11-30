import React from 'react';
import '../CSS/LogInStyles.css';
import { Redirect } from 'react-router';
import Database from '../TempClasses/Database';
import User from '../TempClasses/User';

//statezero
import { signup, getUserByUsername } from "../actions/userhelpers"

import logo from '../Images/logo_placeholder.png';

class SignUpPage extends React.Component {
    state = {
        username: "",
        password: "",
        confirmPassword: "",
        signupSuccessful: false,
        backToLogin: false
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

    authPass = () => {
        if (this.state.password === this.state.confirmPassword) {
            return true;
        } else {
            return false;
        }
    }

    authEmpty = () => {
        if (this.state.username.length === 0 || this.state.password === 0 || this.state.confirmPassword === 0) {
            return false;
        }
        return true;
    }

    authSignup = () => {
        //authenticate

        //temp
        let success = true;

        if (!this.authEmpty()) {
            alert("Please fill in all fields.");
            success = false;
        } else if (!this.authPass()) {
            alert('Passwords do not match. Please try again.')
            success = false;
        } else {
            const checkUsernameReq = getUserByUsername(this.state.username);

            checkUsernameReq.then((user) => {
                if (user !== null) {
                    alert('Username already taken. Please try another username.');
                    success = false;
                } else {
                    const signupReq = signup(new User(this.state.username, this.state.password, false));

                    console.log(signupReq)

                    signupReq.then((result) => {
                        this.setState({
                            signupSuccessful: result
                        });
                    }).catch((error) => {
                        console.log(error)
                        alert("Login failed. Please try again.");
                    })
                }
            })
        }
    }

    backToLogin = () => {
        this.setState({
            backToLogin: true
        })
    }

    render() {

        if (this.state.signupSuccessful) {
            return (
                <Redirect push to={{
                    pathname: "/UserDashboardPage"
                }} />
            );
        }

        if (this.state.backToLogin) {
            return (
                <Redirect push to={{
                    pathname: "/"
                }} />
            );
        }

        return(
            <div className='center'>
                <img id='logo' src={logo} alt='logo'/>

                <div className='loginForm'>
                    <span className='title'>Create a new PetLabs account!</span>
                    <br/>
                    <br/>
                    <span className='signUpFieldTitle'>Username:</span>
                    <input name='username' 
                        value={ this.state.username } 
                        onChange={this.handleInputChange} 
                        type="text" 
                        placeholder="Username" />
                    <br/>
                    <span className='signUpFieldTitle'>Password:</span>
                    <input name='password' 
                        value={ this.state.password } 
                        onChange={this.handleInputChange} 
                        type="password" 
                        placeholder="Password" />
                    <br/>
                    <span className='signUpFieldTitle'>Confirm Password:</span>
                    <input name='confirmPassword' 
                        value={ this.state.confirmPassword } 
                        onChange={this.handleInputChange} 
                        type="password" 
                        placeholder="Confirm Password" />
                    <div className='buttons'>
                        <button onClick={ this.backToLogin }>Back to Login</button>
                        <button onClick={ this.authSignup }>Sign Up</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default SignUpPage;