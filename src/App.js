import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import './App.css';
import Welcome from './screens/Welcome';
import Login from './screens/Login';
import Logout from './screens/Logout';
import Account from './screens/Account';
import Register from './screens/Register';
import Items from './screens/Items';
import Edit from './screens/Edit';
import Add from './screens/Add';
import Settings from './screens/Settings';
import Palette from './components/Palette';
import AppBar from './components/AppBar';
import StateTracker from './components/StateTracker';
import templateApp from './reducers';

const store = createStore(templateApp);

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <Palette>
            <StateTracker />
            <AppBar />
            <Route exact path="/" component={Welcome} />
            <Route exact path="/settings" component={Settings} />

            <Route exact path="/items" component={Items} />
            <Route exact path="/items/add" component={Add} />
            <Route exact path="/items/edit/:id" component={Edit} />

            <Route exact path="/register" component={Register} />
            <Route exact path="/account" component={Account} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/logout" component={Logout} />
          </Palette>
        </Router>
      </Provider>
    );
  }
}

export default App;
