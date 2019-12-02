import React from 'react';
import '../CSS/LogInStyles.css';
import { Redirect } from 'react-router';

import { login, logout, updateLoginForm } from "../actions/userhelpers"

import logo from '../Images/logo_placeholder.png';

class LogInPage extends React.Component {
    state = {
        username: "",
        password: "",
        isAdmin: false,
        loginSuccessful: false,
        user: null,
        signup: false
    };

    componentDidMount() {
        logout()
        this.setState({
            username: "",
            password: "",
            isAdmin: false,
            loginSuccessful: false,
            user: null,
            signup: false
        });
    }

    handleInputChange = (event) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        updateLoginForm(target)
    
        // 'this' is bound to the component in this arrow function.
        this.setState({
          [name]: value  // [name] sets the object property name to the value of the 'name' variable.
        });
    }

    goToSignup = () => {
        this.setState({
            signup: true
        }); 
    }

    tryLogin = () => {
        const loginReq = login();

        loginReq.then((result) => {
            const { isAdmin, loginSuccessful } = result;
            this.setState({
                isAdmin: isAdmin,
                loginSuccessful: loginSuccessful
            })
        })
    }

    render() {

        if (this.state.loginSuccessful) {
            if (this.state.isAdmin) {
                return(
                    <Redirect push to={{
                        pathname: "/AdminDashboardPage",
                        state: { username: this.state.username }
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

        if (this.state.signup) {
            return(
                <Redirect push to={{
                    pathname: "/SignUp"
                }} />
            );
        }

        return(
            <div className='center'>
                <img id='logo' src={logo} alt='logo'/>

                <div className='loginForm'>
                    <span className='title'>Login:</span>
                    <br/>
                    <br/>
                    <input name='username' 
                        value={ this.state.username } 
                        onChange={ this.handleInputChange } 
                        type="text" 
                        placeholder="Username" />
                    <br/>
                    <input name='password' 
                        value={ this.state.password } 
                        onChange={ this.handleInputChange } 
                        type="password" 
                        placeholder="Password" />
                    <div className='buttons'>
                    <button onClick={ this.goToSignup } >Sign Up</button>
                    <button onClick={ this.tryLogin }>Log In</button>
                </div>
                </div>
            </div>
        );
    }
}

export default LogInPage;