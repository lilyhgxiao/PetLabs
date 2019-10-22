import React from 'react';
import '../CSS/LogInStyles.css';
import { Redirect } from 'react-router';

import logo from '../Images/logo_placeholder.png';

class LogInPage extends React.Component {
    state = {
        username: "",
        password: "",
        redirect: ""
    };

    constructor(props) {
        super(props);
    }

    handleInputChange = (event) => {
        const target = event.target
        const value = target.value
        const name = target.name
        
        // log(name)
    
        // 'this' is bound to the component in this arrow function.
        this.setState({
          [name]: value  // [name] sets the object property name to the value of the 'name' variable.
        })
    
    }

    signup() {

    }

    login = () => {
        //authenticate
        console.log("login(): " + this.state.username)
        //temp
        if (!(this.state.username === 'user' || this.state.username === 'admin')) {
            alert('Wrong username/password combination. Please try again.');
        }
        else {
            this.setState({
                redirect: this.state.username
            })
        }
    }

    render() {

        if (this.state.redirect === 'user') {
            return(
                <Redirect push to={{
                    pathname: "/UserDashboardPage",
                    state: { username: this.state.username }
                }} />
            );
        }
        if (this.state.redirect === 'admin') {
            return(
                <Redirect push to={{
                    pathname: "/AdminDashboardPage",
                    state: { username: this.state.username }
                }} />
            );
        }
        

        return(
            <div className='center'>
                <img src={logo}/>

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