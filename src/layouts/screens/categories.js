import React, {useContext, useEffect, useState} from 'react';
import {FlatList} from 'react-native';
import {AppContext} from '../../context/AppContext';
import CategoryGrid from '../../components/CategoryGrid';
import Searchbar from '../../components/searchbar';

const Categories = ({navigation}) => {
  const {categories, getCategories} = useContext(AppContext);

  const [search, setSearch] = useState('');
  const [filteredCategories, setFilteredCategories] = useState([]);
  useEffect(() => {
    if (categories.length === 0) {
      getCategories();
    }
  }, []);
  useEffect(() => {
    setFilteredCategories(
      categories.filter(category => {
        return category.name.toLowerCase().includes(search.toLowerCase());
      }),
    );
  }, [search, categories]);
  return (
    <FlatList
      data={filteredCategories}
      ListHeaderComponent={
        <Searchbar placeholder="Search Category" onChange={setSearch} />
      }
      renderItem={({item}) => (
        <CategoryGrid navigation={navigation} category={item} />
      )}
      //Setting the number of column
      numColumns={1}
      style={{backgroundColor: '#fff'}}
      keyExtractor={(item, index) => index.toString()}
    />
  );
};

export default Categories;
