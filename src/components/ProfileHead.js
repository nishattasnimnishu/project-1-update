import {Text, View} from 'react-native';
import {Avatar} from 'react-native-paper';
import React from 'react';

const ProfileHead = ({user, color = null}) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
      }}>
      <View style={{flex: 1}}>
        <Avatar.Image
          size={70}
          source={{
            uri:
              user?.photoURL ??
              'https://ps.w.org/user-avatar-reloaded/assets/icon-256x256.png?rev=2540745',
          }}
        />
      </View>
      <View style={{flex: 3, marginLeft: 15}}>
        <Text style={{color: color ?? '#0F3460', fontSize: 20}}>
          {user?.displayName ?? 'Name'}
        </Text>
        <Text style={{color: color ?? '#E94560'}}>{user?.email ?? 'email'}</Text>
      </View>
    </View>
  );
};
export default ProfileHead;
