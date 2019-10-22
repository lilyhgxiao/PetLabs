import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import AdminDashboardPage from './Components/AdminDashboardPage';
import AdminUserListPage from './Components/AdminUserListPage';
import AdminPetListPage from './Components/AdminPetListPage';
import AdminItemListPage from './Components/AdminItemListPage';
import UserDashboardPage from './Components/UserDashboardPage';
import LogInPage from './Components/LogInPage';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={LogInPage} />
        <Route path="/AdminDashboardPage" exact component={AdminDashboardPage} />
        <Route path="/AdminUserListPage" component={AdminUserListPage} />
        <Route path="/AdminPetListPage" component={AdminPetListPage} />
        <Route path="/AdminItemListPage" component={AdminItemListPage} />

        <Route path="/UserDashboardPage" exact component={UserDashboardPage} />
      </Switch>
    </Router>
  );
}

export default App;
