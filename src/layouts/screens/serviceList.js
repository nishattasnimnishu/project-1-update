import React, {useEffect, useContext, useState} from 'react';
import {FlatList} from 'react-native';
import {AppContext} from '../../context/AppContext';
import Searchbar from '../../components/searchbar';
import ListItem from '../../components/ListItem';
const ServiceList = ({navigation}) => {
  const {products, getProducts, deleteService} = useContext(AppContext);
  const [search, setSearch] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);
  useEffect(() => {
    if (products.length === 0) {
      getProducts();
    }
  }, []);
  useEffect(() => {
    setFilteredProducts(
      products.filter(product => {
        return product.name.toLowerCase().includes(search.toLowerCase());
      }),
    );
  }, [search, products]);
  const deleteItem = category => {
    deleteService(category);
  };
  const editItem = service => {
    navigation.navigate('EditService', {service});
  };
  return (
    <FlatList
      data={filteredProducts}
      style={{flex: 1, backgroundColor: 'white'}}
      ListHeaderComponent={
        <Searchbar
          placeholder="Search Products"
          onChange={text => setSearch(text)}
        />
      }
      renderItem={({item}) => (
        <ListItem category={item} deleteItem={deleteItem} editItem={editItem} />
      )}
      //Setting the number of column
      numColumns={1}
      keyExtractor={(item, index) => index.toString()}
    />
  );
};
export default ServiceList;
