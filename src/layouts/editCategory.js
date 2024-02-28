import React, {useState, useRef, useEffect, useContext} from 'react';
import {View, Text, ScrollView, TouchableOpacity, Image} from 'react-native';
import {TextInput, Button} from 'react-native-paper';
import GetImage from './../components/getImage';
import {showMessage} from 'react-native-flash-message';
import {AppContext} from '../context/AppContext';
const EditCategory = ({navigation, route}) => {
  const {updateCategory} = useContext(AppContext);
  const [name, setName] = useState(route.params.category.name);
  const [image, setImage] = useState(false);
  const [imagePath, setImagePath] = useState(route.params.category.image);
  const refRBSheet = useRef();
  useEffect(() => {
    if (image.hasOwnProperty('assets')) {
      setImagePath(image.assets[0].uri);
      refRBSheet.current.close();
    } else {
      setImagePath(route.params.category.image);
    }
  }, [image]);
  return (
    <ScrollView
      style={{
        backgroundColor: '#fff',
        flexGrow: 1,
        paddingLeft: '5%',
        paddingRight: '5%',
      }}>
      <View style={{marginTop: 20}}>
        <TextInput
          mode={'outlined'}
          outlineColor={'#4B566B'}
          activeOutlineColor={'#4B566B'}
          value={name}
          label="Category Name"
          onChangeText={text => setName(text)}
        />
        <TouchableOpacity
          onPress={() => {
            refRBSheet.current.open();
          }}>
          <Text
            style={{
              color: '#4B566B',
              borderWidth: 1,
              borderColor: '#4B566B',
              marginTop: 10,
              padding: 15,
              textAlign: 'center',
              borderRadius: 5,
            }}>
            Upload Image
          </Text>
        </TouchableOpacity>
        <Image
          source={{uri: imagePath}}
          style={{width: '100%', height: 200, marginTop: 10}}
          resizeMode={'stretch'}
        />
        <Button
          color={'#E94560'}
          style={{marginTop: 15}}
          mode="contained"
          uppercase={false}
          onPress={() => {
            if (name === '') {
              showMessage({
                message: 'Category Name is required',
                type: 'danger',
              });
            } else if (imagePath == null) {
              showMessage({
                message: 'Category Image is required',
                type: 'danger',
              });
            } else {
              updateCategory({
                name,
                image: imagePath,
                id: route.params.category.id,
                wantUpload: image,
              });
              //navigation.goBack();
            }
          }}>
          Update Category
        </Button>
      </View>
      <GetImage refRBSheet={refRBSheet} setImage={setImage} />
    </ScrollView>
  );
};
export default EditCategory;
