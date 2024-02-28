import React, {useEffect, useContext, useState} from 'react';

import {FlatList} from 'react-native';
import {AppContext} from '../../context/AppContext';
import SingleGrid from '../../components/SingleGrid';

const CategoryServices = ({navigation, route}) => {
  const {products, getProducts} = useContext(AppContext);
  const [categoryProducts, setCategoryProducts] = useState([]);
  const {category} = route.params;
  useEffect(() => {
    getProducts();
  }, []);
  useEffect(() => {
    const filteredProducts = products.filter(
      product => product.category_id === category.id,
    );
    setCategoryProducts(filteredProducts);
  }, [category.id, products]);

  return (
    <FlatList
      data={categoryProducts}
      renderItem={({item}) => (
        <SingleGrid navigation={navigation} product={item} />
      )}
      style={{backgroundColor: '#fff'}}
      keyExtractor={(item, index) => index.toString()}
    />
  );
};
export default CategoryServices;
