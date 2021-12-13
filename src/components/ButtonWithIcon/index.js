import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {PRIMARY_COLOR, TERTIARY_COLOR} from '../../assets/colors/';
import Icon from 'react-native-vector-icons/FontAwesome';

function ButtonWithIcon({...props}) {
  return (
    <TouchableOpacity style={styles.input} {...props}>
      <Icon name={props.iconName} size={30} color={TERTIARY_COLOR} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  input: {
    borderRadius: 10,
    backgroundColor: PRIMARY_COLOR,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 40,
    marginLeft: 5,
  },
});

export default ButtonWithIcon;
