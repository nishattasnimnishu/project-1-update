import RBSheet from 'react-native-raw-bottom-sheet';
import {PermissionsAndroid, Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import React from 'react';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

const GetImage = ({refRBSheet, setImage}) => {
  const requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'App Camera Permission',
          message: 'App needs access to your camera ',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        return await launchImageLibrary({
          mediaType: 'photo',
          includeBase64: false,
          maxHeight: 200,
          maxWidth: 200,
        });
      } else {
        return false;
      }
    } catch (err) {
      return false;
    }
  };
  return (
    <RBSheet
      ref={refRBSheet}
      closeOnDragDown={true}
      closeOnPressMask={true}
      height={120}
      customStyles={{
        wrapper: {
          backgroundColor: 'transparent',
        },
        draggableIcon: {
          backgroundColor: '#000',
        },
      }}>
      <View
        style={{
          padding: 20,
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          borderWidth: 0.5,
          borderColor: '#4B566B',
          borderBottomWidth: 0,
        }}>
        <TouchableOpacity
          onPress={async () => {
            const res = await launchImageLibrary({
              mediaType: 'photo',
              includeBase64: false,
            });
            setImage(res);
          }}
          style={{
            alignItems: 'center',
            borderWidth: 0.5,
            borderColor: '#4B566B',
            padding: 10,
            paddingLeft: 25,
            paddingRight: 25,
            borderRadius: 5,
          }}>
          <Icon name="image" size={24} color="#000" />
          <Text style={{fontSize: 18, color: '#000'}}>Open Gallery</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={async () => {
            const result = await launchCamera({
              mediaType: 'photo',
              includeBase64: false,
            });
            setImage(result);
          }}
          style={{
            alignItems: 'center',
            borderWidth: 0.5,
            borderColor: '#4B566B',
            padding: 10,
            paddingLeft: 25,
            paddingRight: 25,
            borderRadius: 5,
          }}>
          <Icon name="camera" size={24} color="#000" />
          <Text style={{fontSize: 18, color: '#000'}}>Open Camera</Text>
        </TouchableOpacity>
      </View>
    </RBSheet>
  );
};
export default GetImage;
