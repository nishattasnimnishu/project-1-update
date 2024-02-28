import React, {useState, useEffect, useContext} from 'react';
import {View, ScrollView} from 'react-native';
import {TextInput, Button} from 'react-native-paper';
import auth from '@react-native-firebase/auth';
import {AppContext} from '../../context/AppContext';
const OrderService = ({navigation, route}) => {
  const {service} = route.params;
  const {makeOrder} = useContext(AppContext);
  const [userName, setUserName] = useState(null);
  const [userEmail, setUserEmail] = useState(null);
  const [address, setAddress] = useState(null);
  const [phone, setPhone] = useState(null);
  const [uuid, setUid] = useState(null);

  useEffect(() => {
    auth().onAuthStateChanged(user => {
      if (user) {
        setUid(user.uid);
        setUserName(user.displayName);
        setUserEmail(user.email);
      }
    });
  });

  return (
    <ScrollView
      style={{
        backgroundColor: '#fff',
        flexGrow: 1,
        paddingLeft: '5%',
        paddingRight: '5%',
      }}>
      <View style={{marginTop: 20}}>
        <TextInput
          mode={'outlined'}
          outlineColor={'#4B566B'}
          activeOutlineColor={'#4B566B'}
          value={userName}
          label="Full Name"
          onChangeText={text => setUserName(text)}
        />
        <TextInput
          mode={'outlined'}
          outlineColor={'#4B566B'}
          activeOutlineColor={'#4B566B'}
          value={userEmail}
          label="Email Address"
          keyboardType={'email-address'}
          onChangeText={text => setUserEmail(text)}
        />
        <TextInput
          mode={'outlined'}
          outlineColor={'#4B566B'}
          activeOutlineColor={'#4B566B'}
          value={phone}
          label="Phone Number"
          keyboardType={'phone-pad'}
          onChangeText={text => setPhone(text)}
        />
        <TextInput
          multilines={true}
          numberOfLines={4}
          mode={'outlined'}
          outlineColor={'#4B566B'}
          activeOutlineColor={'#4B566B'}
          value={address}
          label="Address"
          onChangeText={text => setAddress(text)}
        />
        <Button
          color={'#E94560'}
          style={{marginTop: 15}}
          mode="contained"
          uppercase={false}
          onPress={async () => {
            const order = {
              uuid,
              userName,
              userEmail,
              phone,
              address,
              service,
            };
            await makeOrder(order);
            navigation.reset({
              index: 0,
              routes: [{name: 'Home'}],
            });
            navigation.navigate('Home');
          }}>
          Order
        </Button>
      </View>
    </ScrollView>
  );
};
export default OrderService;
