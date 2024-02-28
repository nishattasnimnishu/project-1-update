import React from 'react';
import {AppProvider} from './src/context/AppContext';
import Router from './src/Router';
import Activity from './src/resource/Activity';

const Application = () => {
  return (
    <AppProvider>
      <Activity />
      <Router />
    </AppProvider>
  );
};

export default Application;
