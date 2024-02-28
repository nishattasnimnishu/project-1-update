import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {SafeAreaView, StatusBar} from 'react-native';
import FlashMessage from 'react-native-flash-message';
import Application from './Application';
import {DefaultTheme, Provider as PaperProvider} from 'react-native-paper';

import {navigationRef} from './src/layouts/RootNavigation';

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: 'tomato',
    accent: 'yellow',
  },
};
const App = () => {
  return (
    <PaperProvider theme={theme}>
      <NavigationContainer ref={navigationRef}>
        <StatusBar backgroundColor="#ffffff" barStyle="dark-content" />
        <SafeAreaView style={{flex: 1}}>
          <Application />
        </SafeAreaView>
        <FlashMessage autoHide={false} hideStatusBar={false} position="top" />
      </NavigationContainer>
    </PaperProvider>
  );
};

export default App;
