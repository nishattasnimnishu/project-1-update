import React, {useContext} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {APPS_COLOR, MENU_BG_COLOR, ROW_WIDTH} from '../../lib/const';
import {AppContext} from '../../context/AppContext.js';
import {CHANGE_EMAIL, CHANGE_PASSWORD} from '../../context/ReducerConst';
import Input from '../Form/Input';

const LoginForm = ({navigation}) => {
  const {user, changeUserData, submitLogin} = useContext(AppContext);
  const changeEmail = value => {
    changeUserData(CHANGE_EMAIL, value);
  };
  const changePassword = value => {
    changeUserData(CHANGE_PASSWORD, value);
  };
  return (
    <ScrollView
      style={{backgroundColor: MENU_BG_COLOR}}
      contentContainerStyle={{
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: MENU_BG_COLOR,
      }}>
      <View
        style={{
          flex: 2,
          alignItems: 'center',
          width: ROW_WIDTH,
          justifyContent: 'center',
        }}>
        <Text
          style={{
            color: '#ffffff',
            alignSelf: 'center',
            fontWeight: 'bold',
            fontSize: 40,
          }}>
          All Services
        </Text>
      </View>
      <View
        style={{
          flex: 1,
          width: ROW_WIDTH,
          justifyContent: 'center',
        }}>
        <Text
          style={{
            color: '#ffffff',
            fontSize: 20,
            padding: 10,
            alignSelf: 'center',
          }}>
          Login to continue
        </Text>
        <Input
          onChangeText={changeEmail}
          value={user.email}
          placeholder="Email"
          style={{marginBottom: 10}}
        />
        <Input
          onChangeText={changePassword}
          value={user.password}
          secureTextEntry={true}
          placeholder="Password"
        />
        <TouchableOpacity
          onPress={() => submitLogin()}
          style={{
            backgroundColor: APPS_COLOR,
            padding: 15,
            marginTop: 10,
            ...styles.inputContainer,
          }}>
          <Text style={{color: '#ffffff', alignSelf: 'center'}}>Login</Text>
        </TouchableOpacity>
        <View
          style={{
            marginTop: 10,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <TouchableOpacity onPress={() => navigation.navigate('Registration')}>
            <Text style={{color: '#fff'}}>Create new account</Text>
          </TouchableOpacity>
          {/*<TouchableOpacity onPress={() => navigation.navigate('Registration')}>
            <Text style={{color: '#fff'}}>Forget Password</Text>
          </TouchableOpacity>*/}
        </View>
      </View>
      <View
        style={{
          flex: 1.5,
          width: ROW_WIDTH,
          justifyContent: 'flex-end',
        }}/>
      {/*<View
        style={{
          flex: 1.5,
          width: ROW_WIDTH,
          justifyContent: 'flex-end',
        }}>
        <Text
          style={{
            color: '#444444',
            textAlign: 'center',
            fontSize: 12,
            padding: 10,
          }}>
          Development by ThemeHappy
        </Text>
      </View>*/}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  inputContainer: {
    elevation: 1,
  },
  box: {
    paddingLeft: 10,
    borderRadius: 10,
    borderWidth: 0.01,
    marginBottom: 15,
  },
});
export default LoginForm;
