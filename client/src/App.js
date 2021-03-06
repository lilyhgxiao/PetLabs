import React from 'react';
import './App.css';

import BaseReactComponent from "./BaseReactComponent";

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import AdminDashboardPage from './Components/AdminDashboardPage';
import AdminUserListPage from './Components/AdminUserListPage';
import AdminPetListPage from './Components/AdminPetListPage';
import AdminItemListPage from './Components/AdminItemListPage';
import AdminPetPage from './Components/AdminPetPage'
import AdminItemPage from './Components/AdminItemPage';
import AdminNewItemPage from './Components/AdminNewItemPage';
import AdminNewPetPage from './Components/AdminNewPetPage';
import AdminUserPage from './Components/AdminUserPage';

import UserDashboardPage from './Components/UserDashboardPage';
import LogInPage from './Components/LogInPage';
import SignUpPage from './Components/SignUpPage';
import UserPetCarePage from './Components/UserPetCarePage';
import ShopPage from './Components/ShopPage';
import HelpPage from './Components/HelpPage';
import UserSettingsPage from './Components/UserSettingsPage';
import UserCreatePetPage from './Components/UserCreatePetPage';
import RedirectComponent from './Components/RedirectComponent';

import { readCookie } from "./actions/userhelpers";
import { setState } from "./actions/helpers";

class App extends BaseReactComponent {
  // Access the global state paths required by your component
  // using filterState. filterState puts these state paths on
  // this.state.
  // Note: all available global state paths are initialized in
  // setEmptyState() in actions/helpers.js
  filterState({ currUser }) {
      return { currUser };
  }

  constructor(props) {
      super(props);
      readCookie();
  }

  render() {
    return (
      <Router>
          <Switch>
              <Route path="/" exact component={RedirectComponent} />
              <Route path="/login" exact component={LogInPage} />
              <Route path="/SignUp" exact component={SignUpPage} />
              <Route path="/AdminDashboardPage" exact component={AdminDashboardPage} />
              <Route path="/AdminUserListPage" component={AdminUserListPage} />
              <Route path="/AdminPetListPage" component={AdminPetListPage} />
              <Route path="/AdminItemListPage" component={AdminItemListPage} />
              <Route path="/AdminUserPage" component={AdminUserPage} />
              <Route path="/AdminPetPage" component={AdminPetPage} />
              <Route path="/AdminItemPage" component={AdminItemPage} />
              <Route path="/AdminNewItemPage" component={AdminNewItemPage} />
              <Route path="/AdminNewPetPage" component={AdminNewPetPage} />
      
              <Route path="/UserDashboardPage" exact component={UserDashboardPage} />
              <Route path="/UserSettingsPage" exact component={UserSettingsPage} />
              <Route path="/UserPetCarePage" exact component={UserPetCarePage} />
              <Route path="/ShopPage" exact component={ShopPage} />
              <Route path="/HelpPage" exact component={HelpPage} />
              <Route path="/UserCreatePetPage" exact component={UserCreatePetPage} />
          </Switch>
      </Router>
);
  }
}

export default App;
