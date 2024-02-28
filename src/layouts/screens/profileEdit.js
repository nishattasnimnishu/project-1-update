import React, {useState, useEffect} from 'react';

import {View, Text, ScrollView} from 'react-native';
import ProfileHead from '../../components/ProfileHead';
import auth from '@react-native-firebase/auth';
import {MENU_BG_COLOR} from '../../lib/const';
import {TextInput, Button} from 'react-native-paper';

const ProfileEdit = () => {
  const [name, setName] = useState(auth().currentUser.displayName);
  const [email, setEmail] = useState(auth().currentUser.email);
  const [phone, setPhone] = useState(auth().currentUser.phoneNumber);
  const [password, setPassword] = useState('');
  const [confirmPassword, setCPassword] = useState('');
  const [error, setError] = useState('');
  return (
    <ScrollView
      style={{
        backgroundColor: '#fff',
        flexGrow: 1,
        paddingLeft: '5%',
        paddingRight: '5%',
        marginTop: '5%',
      }}>
      <View
        style={{
          backgroundColor: MENU_BG_COLOR,
          padding: '5%',
          borderRadius: 5,
        }}>
        <ProfileHead color={'#fff'} user={auth().currentUser} />
      </View>
      <View style={{marginTop: 20}}>
        <TextInput
          mode={'outlined'}
          outlineColor={'#4B566B'}
          activeOutlineColor={'#4B566B'}
          value={name}
          label="Name"
          onChangeText={text => setName(text)}
        />
        <TextInput
          mode={'outlined'}
          outlineColor={'#4B566B'}
          activeOutlineColor={'#4B566B'}
          value={email}
          label="Email Address"
          onChangeText={text => setEmail(text)}
        />
        <TextInput
          mode={'outlined'}
          outlineColor={'#4B566B'}
          activeOutlineColor={'#4B566B'}
          value={phone}
          label="Phone Number"
          onChangeText={text => setPhone(text)}
        />
        <TextInput
          mode={'outlined'}
          outlineColor={'#4B566B'}
          activeOutlineColor={'#4B566B'}
          value={password}
          secureTextEntry={true}
          label="New Password"
          onChangeText={text => setPassword(text)}
        />
        <TextInput
          mode={'outlined'}
          outlineColor={'#4B566B'}
          activeOutlineColor={'#4B566B'}
          value={confirmPassword}
          secureTextEntry={true}
          label="Confirm Password"
          onChangeText={text => setCPassword(text)}
        />
        <Button
          color={'#E94560'}
          style={{marginTop: 15}}
          mode="contained"
          uppercase={false}
          onPress={() => console.log('Pressed')}>
          Update Profile
        </Button>
      </View>
    </ScrollView>
  );
};
export default ProfileEdit;
