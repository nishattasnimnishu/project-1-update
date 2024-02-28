import React, {useContext, useState} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {AirbnbRating} from 'react-native-ratings';
import {AppContext} from '../../context/AppContext';

const Review = props => {
  const [currentRating, setRating] = useState(0);
  const {user, addReview} = useContext(AppContext);
  const {order} = props.route.params;
  return (
    <View>
      <View
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text style={{color: '#000', fontSize: 18}}>Review</Text>
        <Text style={{color: '#000', fontSize: 18}}>{order?.orderId}</Text>
        <Text style={{color: '#000', fontSize: 18}}>
          {order?.service?.name}
        </Text>
      </View>
      <View
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <AirbnbRating
          onFinishRating={rating => setRating(rating)}
          count={5}
          reviews={['Terrible', 'Bad', 'Okay', 'Good', 'Great']}
          defaultRating={currentRating}
          size={20}
        />
      </View>
      <TouchableOpacity
        onPress={() => {
          // props.navigation.navigate('Home');
          addReview(order?.service?.id, currentRating, user.email);
          props.navigation.goBack();
        }}
        style={{
          backgroundColor: '#000',
          padding: 5,
          borderRadius: 5,
          margin: 10,
          marginTop: 40,
        }}>
        <Text style={{color: '#fff', textAlign: 'center'}}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};
export default Review;
