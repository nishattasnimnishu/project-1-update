import React from 'react';

import {
  Image,
  StyleSheet,
  Text,
  View,
  Alert,
  TouchableOpacity,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const StaffItem = ({staff, deleteItem, editItem}) => {
  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#fbfbfb',
        borderRadius: 5,
        margin: 5,
      }}>
      <View
        style={{
          flex: 1,
          padding: 10,
          flexDirection: 'row',
          borderRadius: 5,
        }}>
        <View
          style={{
            flexDirection: 'column',
            flex: 1,
          }}>
          <Text
            style={{
              color: '#2B3445',
              padding: 5,
              paddingLeft: 0,
              fontWeight: 'bold',
            }}>
            {staff?.name}
          </Text>
          <Text
            style={{
              color: '#626b7d',
              fontWeight: 'bold',
              fontSize: 12,
            }}>
            {staff?.email}
          </Text>
          <Text
            style={{
              color: '#626b7d',
              fontWeight: 'bold',
              fontSize: 12,
            }}>
            {staff?.phone}
          </Text>
        </View>
      </View>
      <View style={{alignItems: 'center', flexDirection: 'row'}}>
        {/* Delete Icon */}
        <TouchableOpacity
          onPress={() => {
            Alert.alert(
              'Delete',
              'Are you sure you want to delete this item?',
              [
                {
                  text: 'Cancel',
                  onPress: () => console.log('Cancel Pressed'),
                  style: 'cancel',
                },
                {text: 'OK', onPress: () => deleteItem(staff)},
              ],
            );
          }}
          s>
          <Ionicons
            name="trash-outline"
            size={20}
            color="#2B3445"
            style={{padding: 10}}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default StaffItem;
