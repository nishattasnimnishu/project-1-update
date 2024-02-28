import React, {useEffect, useContext, useState} from 'react';
import {FlatList} from 'react-native';
import {AppContext} from '../../context/AppContext';
import Searchbar from '../../components/searchbar';
import ListItem from '../../components/ListItem';
const CategoryList = ({navigation}) => {
  const {categories, getCategories, deleteCategory} = useContext(AppContext);
  const [search, setSearch] = useState('');
  const [filteredCategories, setFilteredCategories] = useState([]);
  useEffect(() => {
    if (categories.length === 0) {
      getCategories();
    }
  }, []);
  useEffect(() => {
    setFilteredCategories(
      categories.filter((category) => {
        return category.name.toLowerCase().includes(search.toLowerCase());
      }),
    );
  }, [search, categories]);
  const deleteItem = category => {
    deleteCategory(category);
  };
  const editItem = category => {
    navigation.navigate('EditCategory', {category});
  };
  return (
    <FlatList
      data={filteredCategories}
      style={{flex: 1, backgroundColor: 'white'}}
      ListHeaderComponent={
        <Searchbar
          placeholder="Search Categories"
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
export default CategoryList;
