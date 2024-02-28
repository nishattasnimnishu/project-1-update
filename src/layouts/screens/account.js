import React, {useContext, useEffect} from 'react';
import {ScrollView, Text, TouchableOpacity, View} from 'react-native';
import {AppContext} from '../../context/AppContext';
import LoginForm from '../auth/Login';
import auth from '@react-native-firebase/auth';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ProfileHead from '../../components/ProfileHead';
import {ADMIN_EMAILS} from '../../lib/const';

const Account = ({navigation}) => {
  const {
    user,
    categories,
    submitLogout,
    getCategories,
    products,
    getProducts,
    getOrders,
    orders,
    staffs,
    getStaffs,
  } = useContext(AppContext);
  useEffect(() => {
    if (categories.length === 0) {
      getCategories();
    }
    if (products.length === 0) {
      getProducts();
    }
    if (orders.length === 0) {
      getOrders();
    }
    if (staffs.length === 0) {
      getStaffs();
    }
  }, []);
  if (!user?.is_signed_in) {
    return <LoginForm navigation={navigation} />;
  }
  return (
    <View
      style={{
        backgroundColor: '#fff',
        flex: 1,
        paddingLeft: '5%',
        paddingRight: '5%',
      }}>
      <ProfileHead user={auth().currentUser} />
      <ScrollView>
        <View style={{backgroundColor: '#F3F5F9', marginTop: 10}}>
          <Text
            style={{
              color: '#000',
              fontSize: 18,
              fontWeight: 'bold',
              padding: 10,
            }}>
            Dashboard
          </Text>
        </View>
        <InfoSection
          title={'Dashboard'}
          icon={'purse-outline'}
          info={'Orders'}
          number={orders.length?.toString() || ''}
          color={'#2B3445'}
          onPress={() => {
            navigation.navigate('Orders');
          }}
        />
        {auth().currentUser &&
          ADMIN_EMAILS.includes(auth().currentUser?.email) && (
            <>
              <InfoSection
                icon={'purse-outline'}
                info={'Add New Category'}
                color={'#2B3445'}
                onPress={() => {
                  navigation.navigate('NewCategory');
                }}
              />
              <InfoSection
                icon={'purse-outline'}
                info={'Category List'}
                number={categories.length?.toString() || ''}
                color={'#2B3445'}
                onPress={() => {
                  navigation.navigate('ListCategory');
                }}
              />
              <InfoSection
                icon={'purse-outline'}
                info={'Add New Service'}
                color={'#2B3445'}
                onPress={() => {
                  navigation.navigate('NewService');
                }}
              />
              <InfoSection
                icon={'account'}
                info={'Add New Staff'}
                color={'#2B3445'}
                onPress={() => {
                  navigation.navigate('NewStaff');
                }}
              />
              <InfoSection
                icon={'account'}
                info={'Staff List'}
                number={staffs.length?.toString() || ''}
                color={'#2B3445'}
                onPress={() => {
                  navigation.navigate('StaffList');
                }}
              />
              <InfoSection
                icon={'purse-outline'}
                info={'All Service List'}
                number={products.length?.toString() || ''}
                color={'#2B3445'}
                onPress={() => {
                  navigation.navigate('ListService');
                }}
              />
              <InfoSection
                icon={'purse-outline'}
                info={'All Order List'}
                number={orders.length?.toString() || ''}
                color={'#2B3445'}
                onPress={() => {
                  navigation.navigate('Orders');
                }}
              />
            </>
          )}
        <View style={{backgroundColor: '#F3F5F9', marginTop: 10}}>
          <Text
            style={{
              color: '#000',
              fontSize: 18,
              fontWeight: 'bold',
              padding: 10,
            }}>
            Account Settings
          </Text>
        </View>
        <InfoSection
          title={'Account Settings'}
          icon={'account-outline'}
          info={'Profile Info'}
          color={'#2B3445'}
          onPress={() => {
            navigation.navigate('ProfileEdit');
          }}
        />
        <TouchableOpacity onPress={() => submitLogout()}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '5%',
            }}>
            <Text style={{color: '#E94560', fontSize: 18}}>Logout</Text>
            <MaterialCommunityIcons
              name={'logout'}
              size={30}
              color={'#E94560'}
            />
          </View>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const InfoSection = ({title, icon, info, color, onPress, number = false}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          margin: 3,
          borderBottomColor: '#2B3445',
          borderBottomWidth: 0.2,
          paddingBottom: 10,
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            margin: 3,
          }}>
          <MaterialCommunityIcons name={icon} color={color} size={22} />
          <Text style={{color: color, fontSize: 18, marginLeft: 5}}>
            {info}
          </Text>
        </View>
        {number && <Text style={{color: color, fontSize: 18}}>{number}</Text>}
      </View>
    </TouchableOpacity>
  );
};

export default Account;
