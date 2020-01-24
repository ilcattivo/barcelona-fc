import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Layout from './hoc/layout';
import Home from './pages/home';
import Login from './pages/login';
import Dashboard from './pages/dashboard';
import PrivateRoute from './components/authRoutes/privateRoute';
import PublicRoute from './components/authRoutes/publicRoute';
import Matches from './pages/dashboard/components/matches';
import AddEditMatch from './pages/dashboard/components/addEditMatch';
import Players from './pages/dashboard/components/players';
import AddEditPlayer from './pages/dashboard/components/addEditPlayer';
import Squad from './pages/squad';

export default ({ user }) => {
  return (
    <Layout>
      <Switch>
        <PublicRoute path='/' exact component={Home} />
        <PublicRoute
          path='/login'
          exact
          component={Login}
          restricted
          user={user}
        />
        <PublicRoute path='/team_squad' exact component={Squad} />
        <PrivateRoute
          path='/dashboard'
          exact
          component={Dashboard}
          user={user}
        />
        <PrivateRoute
          path='/admin_matches'
          exact
          component={Matches}
          user={user}
        />
        <PrivateRoute
          path='/admin_matches/add'
          exact
          component={AddEditMatch}
          user={user}
        />
        <PrivateRoute
          path='/admin_matches/edit/:id'
          exact
          component={AddEditMatch}
          user={user}
        />
        <PrivateRoute
          path='/admin_players'
          exact
          component={Players}
          user={user}
        />
        <PrivateRoute
          path='/admin_players/add'
          exact
          component={AddEditPlayer}
          user={user}
        />
        <PrivateRoute
          path='/admin_players/edit/:id'
          exact
          component={AddEditPlayer}
          user={user}
        />
      </Switch>
    </Layout>
  );
};
