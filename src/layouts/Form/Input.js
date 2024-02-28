import React from 'react';
import {TextInput} from 'react-native-paper';
const Input = ({
  value,
  onChangeText,
  secureTextEntry,
  placeholder,
  keyboardType,
  style = {},
}) => {
  return (
    <TextInput
      mode="outlined"
      value={value}
      onChangeText={onChangeText}
      outlineColor={'#4B566B'}
      activeOutlineColor={'#4B566B'}
      underlineColorAndroid="transparent"
      secureTextEntry={secureTextEntry || false}
      placeholder={placeholder || ''}
      style={style}
      autoCapitalize="none"
      keyboardType={keyboardType || 'default'}
    />
  );
};

export default Input;
