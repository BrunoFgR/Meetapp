import React from 'react';
import { Switch } from 'react-router-dom';

import Route from './Route';

import SignIn from '~/pages/SignIn';
import SignUp from '~/pages/SignUp';
import Dashboard from '~/pages/Dashboard';
import Profile from '~/pages/Profile';
import New from '~/pages/New';
import Details from '~/pages/Details';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />
      <Route path="/register" component={SignUp} />

      <Route path="/new" component={New} isPrivate />
      <Route path="/profile" component={Profile} isPrivate />
      <Route path="/dashboard" component={Dashboard} isPrivate />
      <Route path="/details/:id" component={Details} isPrivate />
      <Route path="/edit/:id" component={New} isPrivate />
    </Switch>
  );
}
