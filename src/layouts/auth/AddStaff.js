import React, {useContext, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {APPS_COLOR, MENU_BG_COLOR, ROW_WIDTH} from '../../lib/const';
import {AppContext} from '../../context/AppContext.js';
import Input from '../Form/Input';

const Registration = ({navigation}) => {
  const {submitStaffRegistration} = useContext(AppContext);
  const [email, changeEmail] = useState('');
  const [phone, changePhone] = useState('');
  const [name, changeName] = useState('');
  const [password, changePassword] = useState('');
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
          Add New Staff
        </Text>
        <Input
          onChangeText={changeName}
          value={name}
          placeholder="Name"
          style={{marginBottom: 10}}
        />
        <Input
          onChangeText={changeEmail}
          value={email}
          placeholder="Email"
          style={{marginBottom: 10}}
        />
        <Input
          onChangeText={changePhone}
          value={phone}
          placeholder="Phone"
          keyboardType={'phone-pad'}
          style={{marginBottom: 10}}
        />
        <Input
          onChangeText={changePassword}
          value={password}
          secureTextEntry={true}
          placeholder="Password"
        />
        <TouchableOpacity
          onPress={() => submitStaffRegistration(name, email, phone, password)}
          style={{
            backgroundColor: APPS_COLOR,
            padding: 15,
            marginTop: 10,
            ...styles.inputContainer,
          }}>
          <Text style={{color: '#ffffff', alignSelf: 'center'}}>Add Staff</Text>
        </TouchableOpacity>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <TouchableOpacity onPress={() => navigation.navigate('Account')}>
            <Text style={{color: '#fff'}}>Back</Text>
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
