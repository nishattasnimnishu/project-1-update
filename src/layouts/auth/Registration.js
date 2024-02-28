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
import {
  CHANGE_EMAIL,
  CHANGE_NAME,
  CHANGE_PASSWORD,
  CHANGE_PHONE,
} from '../../context/ReducerConst';
import Input from '../Form/Input';

const Registration = ({navigation}) => {
  const {user, changeUserData, submitRegistration} = useContext(AppContext);
  const changeEmail = value => {
    changeUserData(CHANGE_EMAIL, value);
  };

  const changePhone = value => {
    changeUserData(CHANGE_PHONE, value);
  };

  const changeName = value => {
    changeUserData(CHANGE_NAME, value);
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
          Registration to continue
        </Text>
        <Input
          onChangeText={changeName}
          value={user.name}
          placeholder="Name"
          style={{marginBottom: 10}}
        />
        <Input
          onChangeText={changeEmail}
          value={user.email}
          placeholder="Email"
          style={{marginBottom: 10}}
        />
        <Input
          onChangeText={changePhone}
          value={user.phone}
          placeholder="Phone"
          keyboardType={'phone-pad'}
          style={{marginBottom: 10}}
        />
        <Input
          onChangeText={changePassword}
          value={user.password}
          secureTextEntry={true}
          placeholder="Password"
        />
        <TouchableOpacity
          onPress={() => submitRegistration()}
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
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={{color: '#fff'}}>Already have account</Text>
          </TouchableOpacity>
          {/*<TouchableOpacity onPress={() => navigation.navigate('Registration')}>
            <Text>Forget Password</Text>
          </TouchableOpacity>*/}
        </View>
      </View>
      <View
        style={{
          flex: 1.5,
          width: ROW_WIDTH,
          justifyContent: 'flex-end',
        }}
      />
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
    paddingLeft: 10,
    borderRadius: 10,
    borderWidth: 0.01,
    borderColor: '#c9c9c9',
    marginBottom: 15,
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 1,
  },
});
export default Registration;
