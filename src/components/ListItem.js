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

const ListItem = ({category, deleteItem, editItem}) => {
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
        <Image style={styles.imageThumbnail} source={{uri: category?.image}} />
        <Text
          style={{
            textAlign: 'center',
            color: '#2B3445',
            alignSelf: 'center',
            padding: 5,
            fontWeight: 'bold',
          }}>
          {category?.name}
        </Text>
      </View>
      <View style={{alignItems: 'center', flexDirection: 'row'}}>
        {/* Edit Icon */}
        <TouchableOpacity
          onPress={() => editItem(category)}
          style={{
            padding: 10,
            borderRadius: 5,
            margin: 5,
          }}>
          <Ionicons name="create-outline" size={20} color="#2B3445" />
        </TouchableOpacity>
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
                {text: 'OK', onPress: () => deleteItem(category)},
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
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  imageThumbnail: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
    width: 40,
    alignSelf: 'center',
  },
});

export default ListItem;
