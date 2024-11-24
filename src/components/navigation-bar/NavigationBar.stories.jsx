import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import NavigationBar from './NavigationBar';

export default {
  title: 'NavigationBar',
  component: NavigationBar,
  decorators: [(Story) => <BrowserRouter><Story /></BrowserRouter>]
};

export const LoggedOut = () => <NavigationBar />;

export const LoggedIn = () => <NavigationBar user={{ username: 'testuser' }} />;

