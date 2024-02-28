import React, {useEffect, useContext, useState} from 'react';
import {FlatList} from 'react-native';
import {AppContext} from '../../context/AppContext';
import Searchbar from '../../components/searchbar';
import ListItem from '../../components/ListItem';
import StaffItem from '../../components/Stafftem';
const StaffList = ({navigation}) => {
  const {staffs, getStaffs, deleteStaff} = useContext(AppContext);
  const [search, setSearch] = useState('');
  const [filteredCategories, setFilteredCategories] = useState([]);
  useEffect(() => {
    getStaffs(true, true);
  }, []);
  useEffect(() => {
    setFilteredCategories(
      staffs.filter(staff => {
        return (
          staff.name.toLowerCase().includes(search.toLowerCase()) ||
          staff.email.toLowerCase().includes(search.toLowerCase()) ||
          staff.phone.toLowerCase().includes(search.toLowerCase())
        );
      }),
    );
  }, [search, staffs]);
  const deleteItem = staff => {
    deleteStaff(staff);
  };

  return (
    <FlatList
      data={filteredCategories}
      style={{flex: 1, backgroundColor: 'white'}}
      ListHeaderComponent={
        <Searchbar
          placeholder="Search Staff"
          onChange={text => setSearch(text)}
        />
      }
      renderItem={({item}) => (
        <StaffItem staff={item} deleteItem={deleteItem} />
      )}
      //Setting the number of column
      numColumns={1}
      keyExtractor={(item, index) => index.toString()}
    />
  );
};
export default StaffList;
