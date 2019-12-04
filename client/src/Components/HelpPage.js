import React from 'react';
import { Redirect } from 'react-router';

import UserSideMenu from './UserSideMenu';

import '../CSS/HelpStyle.css';

//const log = console.log

//statezero
import BaseReactComponent from "./../BaseReactComponent";
import {setLastPage} from "../actions/userhelpers"

class HelpPage extends BaseReactComponent {

    filterState({currUser}) {
        return {currUser};
    }

    componentDidMount() {
        setLastPage("/HelpPage")
    }

	render() {
        if (this.state.currUser === null) {
            return(
                <Redirect push to={{
                    pathname: "/"
                }} />
            );
        }
        return (
            <div>
                <UserSideMenu/>
                <div className='main'>
                    <div className='helpTitle'>
                    	WELCOME TO PETLABS !
                    </div>
                    <div className='helpContent'>
                    	<div className='helpTopicBlue'>
                            ABOUT THIS GAME
                            </div>
                        <div className='helpText'>
                            Create! Feed! Train! And most importantly, PLAY with your pets! <br/>
                            When you're bored, spend time with your own virtual pet on this web-game!
                        </div>
                        <div className='helpTopicGreen'>
                            Creating your own pet
                        </div>
                        <div className='helpText'>
                            On your dashboard, click on "Add new" option.  <br/>
                            Choose your pet type from available options and name your pet however you'd like.<br/> 
                            (Note that creating a pet costs gold.)<br/> 
                            Finally, have fun with your pet!
                        </div>
                        <div className='helpTopicBlue'>
                            Feeding your own pet
                        </div>
                        <div className='helpText'>
                            On your dashboard, click on your pet. <br/>
                            Be careful! Once you start interacting with your pet, your pet will get hungrier!<br/>
                            Make sure your pet doesn't starve or get sad.<br/>
                        </div>
                        <div className='helpTopicGreen'>
                            Playing with your own pet
                        </div>
                        <div className='helpText'>
                            On your dashboard, click on your pet. <br/>
                            You can start playing with your pet using "play" button! <br/>
                            The more you play with your pet, your pet's happiness will increase! <br/>
                            Also, playing with your pet is you main source of income! <br/>
                        </div>
                        <div className='helpTopicBlue'>
                            Using item on your own pet
                        </div>
                        <div className='helpText'>
                            On your dashboard, click on your pet. <br/>
                            You can select an item you bought from the shop and use it on your pet! <br/>
                            No need to worry about your items though!<br/>
                            They are not one time use!<br/>
                        </div>
                        <div className='helpTopicGreen'>
                            Shopping
                        </div>
                        <div className='helpText'>
                            Click on "Store" on the side menu to access shop! <br/>
                            This is the only place where you can access items. <br/>
                            Make sure you have enough gold if you want to buy something! <br/>
                        </div>
                        <div className='helpTopicBlue'>
                            Setting
                        </div>
                        <div className='helpText'>
                            Click on "Settings" on the side menu to access settings! <br/>
                            You can change your password on this screen. However, make sure to remember your old password! <br/>
                        </div>
                        <br/>
                    </div>
                </div>
            </div>
        );  
    }
}

export default HelpPage;