import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import ProductGrid from '../../components/ProductGrid';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {TAB_ACTIVE_COLOR, TAB_COLOR} from '../../lib/const';
import Categories from './categories';
import Orders from './orders';
import Account from './account';

const Tab = createBottomTabNavigator();

const TabOptions = {
  tabBarInactiveTintColor: TAB_COLOR,
  tabBarActiveTintColor: TAB_ACTIVE_COLOR,
  headerShown: false,
};

const Home = ({navigation}) => {
  return (
    <Tab.Navigator initialRouteName="Home">
      <Tab.Screen
        options={{
          ...TabOptions,
          title: 'Home',
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons
              name="home-outline"
              color={color}
              size={size}
            />
          ),
        }}
        name="HomeScreen"
        component={ProductGrid}
      />
      <Tab.Screen
        options={{
          ...TabOptions,
          title: 'Category',
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons name="apps" color={color} size={size} />
          ),
        }}
        name="Category"
        component={Categories}
      />
      <Tab.Screen
        options={{
          ...TabOptions,
          title: 'Orders',
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons
              name="purse-outline"
              color={color}
              size={size}
            />
          ),
        }}
        name="Orders"
        component={Orders}
      />
      <Tab.Screen
        options={{
          ...TabOptions,
          title: 'Account',
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons
              name="account-outline"
              color={color}
              size={size}
            />
          ),
        }}
        name="Account"
        component={Account}
      />
    </Tab.Navigator>
  );
};

export default Home;
