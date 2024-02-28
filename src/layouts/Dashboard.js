import React, {useContext} from 'react';
import {Button, StatusBar, View} from 'react-native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {AppContext} from '../context/AppContext';
import {MENU_BG_COLOR, DRAWER_HEADER_OPTIONS} from '../lib/const';
import Home from './screens/home';

const Drawer = createDrawerNavigator();

function HomeScreen({navigation}) {
  const {submitLogout} = useContext(AppContext);

  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Button
        onPress={() => navigation.navigate('Notifications')}
        title="Go to notifications"
      />

      <Button onPress={submitLogout} title="Logout" />
    </View>
  );
}

function NotificationsScreen({navigation}) {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Button onPress={() => navigation.goBack()} title="Go back home" />
    </View>
  );
}

const Dashboard = () => {
  return (
    <>
      <StatusBar
        animated={true}
        backgroundColor={MENU_BG_COLOR}
        barStyle={'light-content'}
      />
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen
          options={DRAWER_HEADER_OPTIONS}
          name="Home"
          component={Home}
        />
        <Drawer.Screen name="Notifications" component={NotificationsScreen} />
      </Drawer.Navigator>
    </>
  );
};

export default Dashboard;
