import React from 'react';
import {SafeAreaView, Text, StyleSheet, StatusBar} from 'react-native';
import {SECONDARY_COLOR} from '../../assets/colors/';

function Home() {
  return (
    <SafeAreaView style={styles.homeContainer}>
      <StatusBar
        animated={true}
        backgroundColor={SECONDARY_COLOR}
        barStyle="dark-content"
      />
      <Text>Home</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  homeContainer: {
    flex: 1,
    backgroundColor: SECONDARY_COLOR,
  },
});

export default Home;
