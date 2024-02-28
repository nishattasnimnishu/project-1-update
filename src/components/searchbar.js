import React from 'react';
import {View} from 'react-native';
import {Searchbar as SearchTop} from 'react-native-paper';

const SearchBar = ({placeholder = 'Search shops', onChange}) => {
  return (
    <View
      style={{
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 10,
        paddingBottom: 10,
        backgroundColor: '#fff',
      }}>
      <SearchTop
        style={{
          borderWidth: 1,
          borderColor: 'gray',
          borderRadius: 15,
          backgroundColor: '#fff',
        }}
        onChangeText={text => onChange(text)}
        placeholder={placeholder}
      />
    </View>
  );
};

export default SearchBar;
