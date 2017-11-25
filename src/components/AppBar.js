import React from 'react';
import HomeIcon from 'material-ui-icons/Home';
import ListIcon from 'material-ui-icons/List';
import SettingsIcon from 'material-ui-icons/Settings';
import ExitToAppIcon from 'material-ui-icons/ExitToApp';
import AccountBoxIcon from 'material-ui-icons/AccountBox';
import { connect } from 'react-redux';

import AppBar from './AppBar/index.js';

const actions = [
  { type: 'item', user: 'both', Icon: HomeIcon, to: '/', text: 'Home' },
  { type: 'item', user: 'in', Icon: ListIcon, to: '/items', text: 'Items' },
  {
    type: 'item',
    user: 'in',
    Icon: AccountBoxIcon,
    to: '/account',
    text: 'Account',
  },
  { type: 'divider', user: 'in' },
  {
    type: 'item',
    user: 'in',
    Icon: SettingsIcon,
    to: '/settings',
    text: 'Settings',
  },
  {
    type: 'item',
    user: 'out',
    Icon: AccountBoxIcon,
    to: '/login',
    text: 'Login',
  },
  {
    type: 'item',
    user: 'in',
    Icon: ExitToAppIcon,
    to: '/logout',
    text: 'Logout',
  },
];

const getActions = authed =>
  actions.filter(({ user }) => {
    if (authed) {
      return ['both', 'in'].includes(user);
    }
    return ['both', 'out'].includes(user);
  });

const AppBarExport = ({ authed }) => (
  <AppBar authed={authed} actions={getActions(authed)} />
);

const mapStateToProps = ({ user: { email: authed } }) => ({ authed });

export default connect(mapStateToProps)(AppBarExport);
