import React from 'react';
import { ActivityIndicator, View, StyleSheet } from 'react-native';

const Loading = () =>{
      return (
         <View style = {styles.container}>
            <ActivityIndicator
               animating = {true}
               color = '#1f84cc'
               size = "large"
               style = {styles.activityIndicator}/>
         </View>
      )
}
export default Loading;

const styles = StyleSheet.create ({
   container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      alignSelf:'center',
      height: 50
   },
   activityIndicator: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      height: 20
   }
});