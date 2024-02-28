import React, {useEffect, useContext, useState} from 'react';

import {FlatList} from 'react-native';
import {AppContext} from '../context/AppContext';
import SearchBar from './searchbar';
import Slider from './slider';
import SingleGrid from './SingleGrid';

const ProductGrid = ({navigation}) => {
  const {products, getProducts} = useContext(AppContext);
  const [search, setSearch] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);
  useEffect(() => {
    getProducts();
  }, []);
  useEffect(() => {
    setFilteredProducts(
      products.filter(product =>
        product.name.toLowerCase().includes(search.toLowerCase()),
      ),
    );
  }, [search, products]);

  return (
    <FlatList
      data={filteredProducts}
      ListHeaderComponent={
        <>
          <SearchBar onChange={setSearch} />
          <Slider />
        </>
      }
      renderItem={({item}) => (
        <SingleGrid navigation={navigation} product={item} />
      )}
      style={{backgroundColor: '#fff'}}
      keyExtractor={(item, index) => index.toString()}
    />
  );
};
export default ProductGrid;
