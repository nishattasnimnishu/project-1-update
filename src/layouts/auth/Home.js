import React, {useContext, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {APPS_COLOR, LOGO, ROW_WIDTH} from '../../lib/const';
import {AppContext} from '../../context/AppContext.js';
import {CHANGE_EMAIL, CHANGE_PASSWORD} from '../../context/ReducerConst';
import Input from '../Form/Input';

const Home = ({navigation}) => {
  return (
    <ScrollView
      style={{backgroundColor: '#ffffff'}}
      contentContainerStyle={{
        flexGrow: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#ffffff',
      }}>
      <View
        style={{
          flex: 3,
          alignItems: 'center',
          width: ROW_WIDTH,
          justifyContent: 'center',
        }}>
        <Image
          style={{width: 100, height: 100, borderRadius: 5}}
          source={LOGO}
        />
      </View>
      <View style={{flex: 3, width: ROW_WIDTH}}>
        <Text
          style={{
            color: APPS_COLOR,
            fontSize: 20,
            padding: 10,
            alignSelf: 'center',
          }}>
          WeCarry Fastest Delivery
        </Text>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Login');
          }}
          style={{
            backgroundColor: APPS_COLOR,
            padding: 10,
            ...styles.inputContainer,
          }}>
          <Text style={{color: '#ffffff', alignSelf: 'center'}}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Registration');
          }}
          style={{
            backgroundColor: APPS_COLOR,
            padding: 10,
            ...styles.inputContainer,
          }}>
          <Text style={{color: '#ffffff', alignSelf: 'center'}}>
            Registration
          </Text>
        </TouchableOpacity>
      </View>

      <View style={{flex: 1.5, width: ROW_WIDTH, justifyContent: 'flex-end'}}>
        <Text
          style={{
            color: '#444444',
            textAlign: 'center',
            fontSize: 12,
            padding: 10,
          }}>
          Development by ThemeHappy
        </Text>
      </View>
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
export default Home;
