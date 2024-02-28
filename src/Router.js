import React, {useContext} from 'react';
/*import SplashScreen from 'react-native-splash-screen';*/
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import LoginForm from './layouts/auth/Login';
import Registration from './layouts/auth/Registration';
import {AppContext} from './context/AppContext';
import Dashboard from './layouts/Dashboard';
import Loading from './resource/Loading';
import ProfileEdit from './layouts/screens/profileEdit';
import NewCategory from './layouts/screens/newCategory';
import {MENU_BG_COLOR} from './lib/const';
import CategoryList from './layouts/screens/categoryList';
import EditCategory from './layouts/editCategory';
import NewService from './layouts/screens/newService';
import ServiceList from './layouts/screens/serviceList';
import EditService from './layouts/screens/editService';
import CategoryServices from './layouts/screens/categroyServices';
import ServiceDetails from './layouts/screens/serviceDetails';
import OrderService from './layouts/screens/orderService';
import AddStaff from './layouts/auth/AddStaff';
import Review from './layouts/screens/Review';
import StaffList from './layouts/screens/staffList';

const AuthStack = createNativeStackNavigator();

const Router = () => {
  const {user, loading} = useContext(AppContext);
  /*  useEffect(() => {
    if (loading.apps_loaded) {
      SplashScreen.hide();
    }
  }, [loading.apps_loaded]);*/
  return (
    <>
      {loading.apps_loaded ? (
        <AuthStack.Navigator>
          <AuthStack.Screen
            options={{headerShown: false}}
            name="Dashboard"
            component={Dashboard}
          />
          <AuthStack.Screen
            options={{headerShown: false}}
            name="Registration"
            component={Registration}
          />
          <AuthStack.Screen
            options={{headerShown: false}}
            name="Login"
            component={LoginForm}
          />
          <AuthStack.Screen
            options={{
              headerShown: true,
              title: 'My Profile Info',
              headerStyle: {backgroundColor: MENU_BG_COLOR},
              headerTintColor: '#fff',
            }}
            name="ProfileEdit"
            component={ProfileEdit}
          />
          <AuthStack.Screen
            options={{
              headerShown: true,
              title: 'Add New Staff',
              headerStyle: {backgroundColor: MENU_BG_COLOR},
              headerTintColor: '#fff',
            }}
            name="NewStaff"
            component={AddStaff}
          />
          <AuthStack.Screen
            options={{
              headerShown: true,
              title: 'Staff List',
              headerStyle: {backgroundColor: MENU_BG_COLOR},
              headerTintColor: '#fff',
            }}
            name="StaffList"
            component={StaffList}
          />
          <AuthStack.Screen
            options={{
              headerShown: true,
              title: 'Add New Category',
              headerStyle: {backgroundColor: MENU_BG_COLOR},
              headerTintColor: '#fff',
            }}
            name="NewCategory"
            component={NewCategory}
          />
          <AuthStack.Screen
            options={{
              headerShown: true,
              title: 'Add New Service',
              headerStyle: {backgroundColor: MENU_BG_COLOR},
              headerTintColor: '#fff',
            }}
            name="NewService"
            component={NewService}
          />
          <AuthStack.Screen
            options={{
              headerShown: true,
              title: 'Service List',
              headerStyle: {backgroundColor: MENU_BG_COLOR},
              headerTintColor: '#fff',
            }}
            name="ListService"
            component={ServiceList}
          />
          <AuthStack.Screen
            options={{
              headerShown: true,
              title: 'Edit Category',
              headerStyle: {backgroundColor: MENU_BG_COLOR},
              headerTintColor: '#fff',
            }}
            name="EditCategory"
            component={EditCategory}
          />
          <AuthStack.Screen
            options={{
              headerShown: true,
              title: 'Edit Service',
              headerStyle: {backgroundColor: MENU_BG_COLOR},
              headerTintColor: '#fff',
            }}
            name="EditService"
            component={EditService}
          />
          <AuthStack.Screen
            options={{
              headerShown: true,
              title: 'Category List',
              headerStyle: {backgroundColor: MENU_BG_COLOR},
              headerTintColor: '#fff',
            }}
            name="ListCategory"
            component={CategoryList}
          />
          <AuthStack.Screen
            options={{
              headerShown: true,
              title: 'Review',
              headerStyle: {backgroundColor: MENU_BG_COLOR},
              headerTintColor: '#fff',
            }}
            name="Review"
            component={Review}
          />
          <AuthStack.Screen
            options={({route}) => ({
              headerShown: true,
              title: route.params.title,
              headerStyle: {backgroundColor: MENU_BG_COLOR},
              headerTintColor: '#fff',
            })}
            name="CategoryServices"
            component={CategoryServices}
          />
          <AuthStack.Screen
            options={({route}) => ({
              headerShown: true,
              title: route.params.title,
              headerStyle: {backgroundColor: MENU_BG_COLOR},
              headerTintColor: '#fff',
            })}
            name="ServiceDetails"
            component={ServiceDetails}
          />
          <AuthStack.Screen
            options={({route}) => ({
              headerShown: true,
              title: route.params.title,
              headerStyle: {backgroundColor: MENU_BG_COLOR},
              headerTintColor: '#fff',
            })}
            name="OrderService"
            component={OrderService}
          />
        </AuthStack.Navigator>
      ) : (
        <Loading />
      )}
    </>
  );
};
export default Router;
