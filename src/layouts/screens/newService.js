import React, {useState, useRef, useEffect, useContext} from 'react';
import {View, Text, ScrollView, TouchableOpacity, Image} from 'react-native';
import {TextInput, Button} from 'react-native-paper';
import Select2 from 'react-select2-native';

import GetImage from '../../components/getImage';
import {showMessage} from 'react-native-flash-message';
import {createFormData} from '../../lib/requests';
import {AppContext} from '../../context/AppContext';
import {UP_KEY} from '../../lib/const';
const NewService = ({navigation}) => {
  const {addService, categories, getCategories} = useContext(AppContext);
  const [name, setName] = useState('');
  const [category, setCategory] = useState(null);
  const [price, setPrice] = useState(null);
  const [description, setDescription] = useState(null);
  const [image, setImage] = useState(false);
  const [imagePath, setImagePath] = useState(null);
  const refRBSheet = useRef();
  useEffect(() => {
    getCategories();
  }, []);
  useEffect(() => {
    if (image.hasOwnProperty('assets')) {
      setImagePath(image.assets[0].uri);
      refRBSheet.current.close();
    } else {
      setImagePath(null);
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
          label="Service Name"
          onChangeText={text => setName(text)}
        />
        <Select2
          isSelectSingle
          style={{borderRadius: 5, marginTop: 10}}
          colorTheme="blue"
          popupTitle="Select Category"
          title="Category"
          data={categories}
          onSelect={data => {
            categories.find(item => {
              if (item.id === data.find(() => true)) {
                setCategory(item);
              }
            });
          }}
        />
        <TextInput
          mode={'outlined'}
          outlineColor={'#4B566B'}
          activeOutlineColor={'#4B566B'}
          value={price}
          label="Price"
          keyboardType={'numeric'}
          onChangeText={text => setPrice(text)}
        />
        <TextInput
          multilines={true}
          numberOfLines={4}
          mode={'outlined'}
          outlineColor={'#4B566B'}
          activeOutlineColor={'#4B566B'}
          value={description}
          label="Description"
          onChangeText={text => setDescription(text)}
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
        {imagePath && (
          <Image
            source={{uri: imagePath}}
            style={{width: '100%', height: 200, marginTop: 10}}
            resizeMode={'stretch'}
          />
        )}
        <Button
          color={'#E94560'}
          style={{marginTop: 15}}
          mode="contained"
          uppercase={false}
          onPress={() => {
            if (name === '') {
              showMessage({
                message: 'Service name is required',
                type: 'danger',
              });
            } else if (category == null) {
              showMessage({
                message: 'Category is required',
                type: 'danger',
              });
            } else if (price == null || price < 0) {
              showMessage({
                message: 'Price is invalid',
                type: 'danger',
              });
            } else if (description == null) {
              showMessage({
                message: 'Service description is required',
                type: 'danger',
              });
            } else if (imagePath == null) {
              showMessage({
                message: 'Service image is required',
                type: 'danger',
              });
            } else {
              addService(
                createFormData(image.assets[0], {
                  name: name,
                  key: UP_KEY,
                }),
                name,
                category,
                price,
                description,
              );
            }
          }}>
          Add Service
        </Button>
      </View>
      <GetImage refRBSheet={refRBSheet} setImage={setImage} />
    </ScrollView>
  );
};
export default NewService;
