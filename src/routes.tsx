
import React from 'react';
import { Redirect, Route, BrowserRouter } from 'react-router-dom';

import SignIn from './screens/SignIn';
import Statement from './components/statement/statement';

const Routes = () => (
  <div>
    <BrowserRouter>   
      <Route exact path="/login" component={SignIn} />
      <Route exact path="/extrato" component={Statement} />
      <Redirect from='/' to='/login' />
    </BrowserRouter>
  </div>
);

export default Routes;