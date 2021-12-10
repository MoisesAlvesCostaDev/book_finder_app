import React from 'react';
import {StyleSheet, TextInput} from 'react-native';

function SimpleInput({...props}) {
  return <TextInput style={styles.input} {...props} />;
}

const styles = StyleSheet.create({
  input: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#DFDFDF',
  },
});

export default SimpleInput;
