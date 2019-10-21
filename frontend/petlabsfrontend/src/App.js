import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import AdminDashboardPage from './Components/AdminDashboardPage';
import AdminUserListPage from './Components/AdminUserListPage';
import AdminPetListPage from './Components/AdminPetListPage';
import AdminItemListPage from './Components/AdminItemListPage';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={AdminDashboardPage} />
        <Route path="/AdminUserListPage" component={AdminUserListPage} />
        <Route path="/AdminPetListPage" component={AdminPetListPage} />
        <Route path="/AdminItemListPage" component={AdminItemListPage} />
      </Switch>
    </Router>
  );
}

export default App;
