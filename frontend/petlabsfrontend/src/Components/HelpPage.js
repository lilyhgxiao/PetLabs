import React from 'react';
import ReactDOMServer from 'react-dom/server';

// import '../CSS/__.css';

import UserSideMenu from './UserSideMenu';

const log = console.log

class HelpPage extends React.Component {

	render() {
        return (
            <div>
                <UserSideMenu/>
                <div className='main'>
                    <h1>
                    	WELCOME TO PETLABS !
                    </h1>
                    <div>
                    	<h2>
                            ABOUT THIS GAME
                        </h2>
                        <div>
                            Create!, Feed!, Train!, and most importantly, PLAY with your pets! <br/>
                            When your bored, spend time with your own virtual pet on this web-game!
                        </div>
                        <h2>
                            Creating your own pet
                        </h2>
                        <div>
                            On your dashboard, click on "Add new" option.  <br/>
                            Choose your pet type from available options and name your pet however you'd like.<br/> 
                            Finally, have fun with your pet!
                        </div>
                        <h2>
                            Feeding your own pet
                        </h2>
                        <div>
                            On your dashboard, click on your pet. <br/>
                            Becareful! Once you start interacting with your pet, your pet will get hungrier!<br/>
                            Make sure your pet doesn't starve! Otherwise, there will be a grave consequence! <br/>
                        </div>
                        <h2>
                            Playing with your own pet
                        </h2>
                        <div>
                            On your dashboard, click on your pet. <br/>
                            You can start playing with your pet using "play" button! <br/>
                            The more you play with your pet, your pet's happiness will increase! <br/>
                            Also, playing with your pet is you main source of income! <br/>
                        </div>
                        <h2>
                            Using item on your own pet
                        </h2>
                        <div>
                            On your dashboard, click on your pet. <br/>
                            You can select an item you bought from the shop and use it on your pet! <br/>
                            No need to worry about your items though!<br/>
                            They are not one time use!<br/>
                        </div>
                        <h2>
                            Shopping
                        </h2>
                        <div>
                            Click on "Store" on the side menu to access shop! <br/>
                        </div>
                        <h2>
                            Setting
                        </h2>
                        <div>
                            Click on "Settings" on the side menu to access settings! <br/>
                        </div>
                        <h2>
                            <br/>
                        </h2>
                    </div>
                </div>
            </div>
        );  
    }
}

export default HelpPage;