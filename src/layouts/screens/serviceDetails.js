import React, {useContext, useEffect} from 'react';
import auth from '@react-native-firebase/auth';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {AppContext} from '../../context/AppContext';
import {Rating} from 'react-native-ratings';

const ServiceDetails = ({navigation, route}) => {
  const {product} = route.params;
  const {rating, getReview} = useContext(AppContext);
  useEffect(() => {
    getReview(product.id);
  }, [product.id]);

  return (
    <ScrollView
      contentContainerStyle={{
        flex: 1,
        backgroundColor: '#fff',
      }}>
      <View style={{flex: 1}}>
        <Image source={{uri: product.image}} style={styles.image} />
        <View style={styles.details}>
          <Text style={styles.title}>{product.name}</Text>
          {rating > 0 && (
            <Rating
              type="star"
              ratingCount={5}
              imageSize={20}
              readonly
              startingValue={rating}
              style={{paddingVertical: 10}}
            />
          )}
          <View style={{flexDirection: 'row'}}>
            <Text style={styles.price}>৳{product.price}</Text>
            <Text style={{color: 'gray', marginTop: 6}}> only</Text>
          </View>
          <Text
            style={{
              color: 'gray',
              marginTop: 6,
              fontSize: 16,
            }}>
            Stock Available
          </Text>
        </View>
        <View>
          <Text
            style={{
              borderBottomWidth: 1,
              borderBottomColor: 'gray',
              color: '#000',
              fontSize: 20,
              fontWeight: 'bold',
              padding: 5,
              paddingBottom: 0,
            }}>
            Description
          </Text>
          <Text style={styles.description}>{product.description}</Text>
        </View>
      </View>
      <TouchableOpacity
        style={{backgroundColor: '#E94560', justifyContent: 'flex-end'}}
        onPress={() => {
          if (auth().currentUser) {
            navigation.navigate('OrderService', {
              service: product,
              title: `Order ${product.name} service`,
            });
          } else {
            navigation.navigate('Login');
          }
        }}>
        <Text
          style={{
            fontSize: 20,
            padding: 10,
            color: '#fff',
            textAlign: 'center',
          }}>
          Booking Now
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  details: {
    padding: 20,
    backgroundColor: '#fff',
  },
  image: {
    width: '100%',
    height: 200,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#000',
  },
  description: {
    fontSize: 20,
    marginBottom: 10,
    color: '#333',
    margin: 5,
  },
  price: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#D23F57',
  },
});

export default ServiceDetails;
