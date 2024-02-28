import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
//
const SingleGrid = ({product, navigation}) => {
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('ServiceDetails', {
          product: product,
          title: product?.name,
        });
      }}
      style={{
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#fff',
        padding: 10,
        shadowColor: '#000000',
        margin: 5,
        borderRadius: 10,
        shadowOffset: {
          width: 0,
          height: 3,
        },
        shadowOpacity: 0.17,
        shadowRadius: 3.05,
        elevation: 4,
      }}>
      <Image style={styles.imageThumbnail} source={{uri: product.image}} />
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'flex-start',
        }}>
        <Text
          style={{
            textAlign: 'center',
            color: '#d2d2d2',
            fontSize: 12,
          }}>
          {product.category_name}
        </Text>
        <Text
          style={{
            textAlign: 'center',
            color: '#2B3445',
            fontSize: 16,
            fontWeight: 'bold',
          }}>
          {product.name}
        </Text>
        <Text
          style={{
            textAlign: 'center',
            color: '#E94560',
            fontSize: 12,
            fontWeight: 'bold',
          }}>
          Price: ৳{product.price}
        </Text>
      </View>
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
    height: 80,
    width: 80,
    alignSelf: 'center',
    marginRight: 10,
    borderRadius: 5,
  },
});

export default SingleGrid;
