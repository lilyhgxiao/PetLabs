# team11

# App Description
Our web app is an online pet care game in similar fashion to the old tamagotchi toys. Users can play with their pets, purchase new pets, and purchase items for their pets. Administrators can add and edit pets and items, as well as edit regular user information.

We added a few simple classes that help us temporarily keep track of changes in the app while it is running, allowing us to emulate some sort of backend server. However, no backend server code exists in this iteration of the app.

# Some game terminology:
-	Pet Type: a pet type represents a particular type of pet that the user can own. For example, a blob. Each pet type has a name and a set of attributes that dictate how fast their attributes (such as strength or speed) will grow when a particular item is applied to them.
-	Pet: a pet is an instance of a pet type that is owned by a user. For example, a user owns a pet of type ‘Fireball’ named Lily.
-	Item: an item is something that can be applied to a pet to train, feed, or play with the pet. For example, a book can train the pet’s intelligence.

# Running the App
Our web app was deployed online through Heroku.<br />
Use the following link to access the app.<br />
https://evening-beyond-09613.herokuapp.com/<br />

The login page should now be visible.<br />

# How To Use The App

## Admin Views
- To login as an administrator type in ‘admin’ for username and ‘admin’ for password and click the ‘Log in’ button.
- You should now enter the admin dashboard page. Here the admin can edit user data (including the pets they own such as editing their attributes or deleting them entirely. More about this is in the Editing an Existing User section), edit different pet types, add new pet types, edit exiting pet items, and add new pet items.

## Adding A New Item
- To add a new item, click on the ‘items’ picture.
- Then in the items list page add click on the ‘plus’ icon at the top right corner of the page.
- Type in the name of the new item and edit the item’s attribute in the table below.
- Then click on 'plus' icon to randomly select sprite for the new item.
- Note: if the name of the item or if the sprite is not specified, an item cannot be create.
- When you are happy with your new item click the ‘save’ icon at the top right corner of the page.

## Editing an Existing Item
- To edit an existing item click on the ‘items’ picture. This will take you to the item list page.
- In the search bar, type in the name of the item that you wish to edit. You can even choose the newly created item from above.
- Once the correct name is typed in, press enter key. This will redirect you to the item edit page.
- Note: the search bar is case insensitive, but if an incorrect name is typed in, no redirection will occur. Instead an alert message will appear informing you that no such item exists.
- Another way to select an item to edit is clicking on specific item on the item list. This will redirect you to the item edit page.
- In the item edit page you can change the name, price, and item properties by typing in different values in the textboxes. 
- Once you are happy with your changes you can click the ‘save’ icon at the top right-hand corner of the page. 
- You can always return to the item list page and select the edited item to review the changes you made above. 

## Creating a New Pet Type
- To create a new pet in the user admin dashboard page, click on the ‘Pets’ image. This will take you to the pet list page.
- In the pet list page click on the ‘plus’ icon located at the top of the right-hand corner of the screen. This will take you to the create new pet page.
- In the create new pet page, enter the name of the new pet type, as well as the growth rate of each attribute and the price of the pet.
- Then click on 'plus' icon to randomly select sprite for the new pet type.
- Note: if the name of the item or if the sprite is not specified, an item cannot be create.
- Once you are happy with your choices click the ‘save’ icon located at the top right-hand corner of the screen. 

## Editing an Existing Pet Type
- In the admin dashboard page go to the pet type list page by clicking on the ‘Pets’ picture. 
- In the search bar, type in the name of the pet type that you wish to edit. You can even choose the newly created pet type from above.
- Once the correct name is typed in, press enter key. This will redirect you to the pet type edit page.
- Note: the search bar is case insensitive, but if an incorrect name is typed in, no redirection will occur. Instead an alert message will appear informing you that no such pet type exists.
- Another way to select a pet type to edit is clicking on specific pet type on the pet type list. 
- In the edit pet type view you can rename the pet type, change its associated attributes and the cost of the pet in the store. 
- Once you are happy with your changes you can click the save icon located on top right corner.

## Editing an Existing User
- In the admin dashboard page, go to the user list page by clicking on the ‘Users’ picture.
- In the user list page, type in the name of the user that you wish to edit and press enter key. This will redirect you from the admin view to the edit user view.
- Note: the search bar is case insensitive, but if an incorrect name is typed in, no redirection will occur. Instead an alert message will appear informing you that no such user exists.
- Another way to select an user to edit is clicking on specific user on the user list. This will redirect you to the user edit page.
- In the edit user view, you are provided with selected user's password and gold balance. Values for these fields could be modified.
- You are also provided with the list of pets owned by the selected user along with each individual pet's stats. Stats of user owned pets could be modified.
- You could remove a pet from the user. To do so, click on remove button beside pet's id. This will mark the pet for removal. Then click on the "save" icon located at top right-hand corner of the screen.
- You are also provided with the list of items owned by the selected user, along with bonuses each item gives to user's pets. These bonus values can't be modified in this view. They could only be changed at item list page.
- However, you could remove an item from the user. To do so, click on remove button beside item's id. This will mark the item for removal. Then click on the "save" icon located at top right-hand corner of the screen.
- To save the changes made to selected user's password, gold, and user's individual pets, click on the "save" icon located at top right-hand corner of the screen.

## Admin Side Menu
- Every admin page view also has an admin side menu. Clicking on the logo redirects to the admin dashboard; clicking on the users, pets, and items texts will redirect to their respective admin list views. Clicking the logout button will logout from the admin profile and redirect to the login page. 

## User Views
- To login as an user, type in ‘user’ for username and ‘user’ for password and click the ‘Log in’ button.
- You may also sign up with a new username. Usernames must be unique, so an existing username will not work.
- You should now enter the user dashboard page. Here the user can choose a pet to interact with, and use the side menu to access store to buy items, setting to change personal information, or access help menu to open a manual.
- You can also access the Create Pet view from the user dashboard page with the "Add New" component.

## Creating a Pet
- You can create a pet if you have enough gold. Each pet type costs a different amount of gold in order to acquire it.
- You can see all of the choices for pet types. Click on one to select it.
- To see the selected pet type, it will appear at the top. 
- Enter a name to create the pet.

## Interacting With Pets
- To interact with a specific pet, click on one of the available pets from user dashboard page. You will be redirected to user pet care view.
- Once in user pet care view, selected pet will start to starve. A pet that's been left to starve for a long time will not only grow unhappier, but also die from starvation. 
- To prevent your pet from starving, you need to feed your pet. To do so, you must click on "feed" button.
- To increase your pet's happiness, you need to play with your pet. To do so, you must click on "play" button.
- Playing with your pet will also grant you gold, which you can use to buy items from the store. Your current gold is displayed on the screen for convenience. 
- You could use items you bought from the store on your pet. To do so, you must choose one of the available items from the drop down menu, and click on "Use item" button. 
- Depending on your item, one or more of three stats (intelligence, speed, or strength) will increase. Items could also increase your pet's happiness or fullness.
- Your items will not be consumed. That is, it could be used as much as you would like to.

## Purchasing an Item
- To purchase an item, click on "Store" option from the side menu located at left-hand side of the screen. You will be redirected to store view.
- Once in store, you could select on one of the available items and purchase them by clicking on "Buy This" button.
- Note that you cannot buy an item if you do not have enough gold balance. When you try to buy an item that costs more than your current gold balance, you will be reminded that you do not have enough money.
- Note that you cannot buy same item. When you try to buy an item you already own, you will be reminded about this fact.
-  When an item is bought, the amount will be deducted from your total gold balance.

## Accessing Help When Lost
- To access guidance or manual for this game, click on "help" option from the side menu located at left-hand side of the screen. You will be redirected to help view.
- The help view will provide you very condensed, yet concise version of this manual.

## Settings
- Here you may view your username and a censored version of your password.
- You can change your password on this view. Enter the old password and new password, and confirm it in order to change. An alert will show if you have successfully changed your password.

# Overview of the Routes

All of the routes are defined in server.js

## Item Routes
The following routes allow the app to modify item information in the database.

### POST Request to /items
This route is used to add an item to the database. <br />
The required fields are "name" (string), "strength" (number), "speed" (number), "intelligence" (number), "happiness" (number), "fullness" (number), "imgURL" (string), and "price" (number).<br />
Note that "imgURL" must be either of "Dumbbell", "Book", or "Treadmill". <br />

An example of valid JSON could be the following. <br />
{<br />
    "name": "Book",<br />
    "strength": 0,<br />
    "speed": 0,<br />
    "intelligence": 5,<br />
    "happiness": 2,<br />
    "fullness": 0,<br />
    "price": 2000,<br />
    "imgURL": "Book"<br />
}<br />

There are more JSON samples in folder ModelTestInputs/Items/.<br />

The following are response codes you could recieved from POST. <br />
- 200: OK
- 400: Bad request.
- 409: Conflict. Item already exists.


### GET Request to /items
This route is used to get all of the items from the database. <br />

The following are response codes you could recieved from GET. <br />
- 200: OK
- 500: Internal server error.

