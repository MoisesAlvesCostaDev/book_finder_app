import React from 'react';
import {View,Text} from 'react-native';
import LottieView from 'lottie-react-native';

export default function Load() {
  return (
    <View
      style={{
        height:'100%',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <LottieView
        source={require('../../assets/lottie/load.json')}
        autoPlay
        loop
        speed={2}
      />
      <Text style={{marginTop: 200}} >Aguarde...</Text>
    </View>
  );
}
