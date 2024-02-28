import React from 'react';

import {Image, StyleSheet, Text, View, TouchableOpacity} from 'react-native';

const CategoryGrid = ({navigation, category}) => {
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('CategoryServices', {
          category: category,
          title: category.name,
        });
      }}
      style={{
        flex: 1,
        margin: 5,
        padding: 10,
        flexDirection: 'row',
        backgroundColor: '#FBFBFB',
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
    </TouchableOpacity>
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

export default CategoryGrid;
