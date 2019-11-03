# team11

# App Description
Our web app is an online pet care game in similar fashion to the old tamagotchi toys. Users can play with their pets, purchase new pets, and purchase items for their pets. Administrators can add and edit pets and items, as well as edit regular user information.

We added a few simple classes that help us temporarily keep track of changes in the app while it is running, allowing us to emulate some sort of backend server. However, no backend server code exists in this iteration of the app.

# Some game terminology:
-	Pet Type: a pet type represents a particular type of pet that the user can own. For example, a blob. Each pet type has a name and a set of attributes that dictate how fast their attributes (such as strength or speed) will grow when a particular item is applied to them.
-	Pet: a pet is an instance of a pet type that is owned by a user. For example, a user owns a pet of type ‘Fireball’ named Lily.
-	Item: an item is something that can be applied to a pet to train, feed, or play with the pet. For example, a book can train the pet’s intelligence.

# Running the App
Our web app is a relies on the React Framework to run.
We used the yarn package manager to build and run the web app: https://yarnpkg.com/lang/en/
To run the app:
-	Open a command line in team11\frontend\petlabsfrontend
-	run yarn
-	run yarn start
-	in Google Chrome in the URL bar type in http://localhost:3000/

The login page should now be visible.

# User Views
- To login as an user, type in ‘user’ for username and ‘user’ for password and click the ‘Log in’ button.
- You should now enter the user dashboard page. Here the user can choose a pet to interact with, and use the side menu to access store to buy items, setting to change personal information, or access help menu to open a manual.



# Admin Views
- To login as an administrator type in ‘admin’ for username and ‘admin’ for password and click the ‘Log in’ button.
- You should now enter the admin dashboard page. Here the admin can edit user data, edit different pet types, add new pet types, edit exiting pet items, and add new pet items.

# Adding A New Item
- To add a new item, click on the ‘items’ picture.
- Then in the items list page add click on the ‘plus’ icon at the top right corner of the page.
- Type in the name of the new item and edit the item’s attribute in the table below.
- We currently do not support the ability to upload new item images, that is a task we left for the backend phase of the project.
- When you are happy with your new item click the ‘save’ icon at the top right corner of the page. This will take you back to the admin dashboard page.

# Editing an Existing Item
- To edit an existing item click on the ‘items’ picture. This will take you to the item list page.
- In the search bar type in the name of the item that you wish to edit. You can even choose the newly created item from above.
- Once the correct name is typed in, click the ‘Go!’ button. This will redirect you to the item edit page.
- Note: if an incorrect name is typed in no redirection will occur. Instead an alert message will appear informing you that no such item exists. 
- Note: the search bar is case insensitive.
- In the item edit page you can change the name, price, and item properties by typing in different values in the textboxes. 
- Once you are happy with your changes you can click the ‘save’ icon at the top right-hand corner of the page. This will redirect you back to the admin dashboard page.
- You can always return to the item list page and select the edited item to review the changes you made above. 

# Creating a New Pet Type
- To create a new pet in the user admin dashboard page, click on the ‘Pets’ image. This will take you to the pet list page.
- In the pet list page click on the ‘plus’ icon located at the top of the right-hand corner of the screen. This will take you to the create new pet page.
- In the create new pet page, enter the name of the new pet type, as well as the growth rate of each attribute and the price of the pet.
Once you are happy with your choices click the ‘save’ icon located at the top right-hand corner of the screen. This will save your changes and take you back to the admin dashboard page.

# Editing an Existing Pet
- In the admin dashboard page go to the pet type list page by clicking on the ‘Pets’ picture. 
- In the pet types list page type in the name of the pet that you wish to edit and click go. This will redirect you from the admin view to the edit pet type view.
- Note that the search is case insensitive but typing in a name of a pet that does not exit and clicking go will not redirect, and instead provide the admin with an alert message informing them of the incorrect input.
- In the edit pet type view you can rename the pet type, change its associated attributes and the cost of the pet in the store. 
Once you are happy with your changes you can click the save icon located on top right corner.

# Editing an Existing User
- In the admin dashboard page, go to the user list page by clicking on the ‘Users’ picture.
- In the user list page, type in the name of the user that you wish to edit and click "go". This will redirect you from the admin view to the edit user view.
- Note that the search is case insensitive but typing in a name of a non-existing user and clicking "go" will provide the admin with an alert message informing them of the incorrect input.
- In the edit user view, you are provided with selected user's password and gold balance. Values for these fields could be modified.
- You are also provided with the list of pets owned by the selected user along with each individual pet's stats. Stats of user owned pets could be modified.
- You are also provided with the list of items owned by the selected user, along with bonuses each item gives to user's pets. These bonus values can't be modified in this view. They could only be changed at item list page.
- To save the changes made to selected user's password, gold, and user's individual pets, click on the "save" icon located at top right-hand corner of the screen.

# Admin Side Menu
- Every admin page view also has an admin side menu. Clicking on the logo redirects to the admin dashboard; clicking on the users, pets, and items texts will redirect to their respective admin list views. Clicking the logout button will logout from the admin profile and redirect to the login page. 


