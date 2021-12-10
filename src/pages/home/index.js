import React from 'react';
import {SafeAreaView, Text, StyleSheet, StatusBar, View} from 'react-native';
import {SECONDARY_COLOR, TERTIARY_COLOR} from '../../assets/colors/';
import SimpleInput from '../../components/SimpleInput';
import ButtonWithIcon from '../../components/ButtonWithIcon';

function Home() {
  return (
    <SafeAreaView style={styles.homeContainer}>
      <StatusBar
        animated={true}
        backgroundColor={SECONDARY_COLOR}
        barStyle="dark-content"
      />
      <View style={styles.header}>
        <Text style={styles.title}>Localize livros</Text>
      </View>
      <View style={styles.body}>
        <View style={styles.searchContainer}>
          <Text>Digite nome do autor ou livro</Text>
          <View style={styles.search}>
            <SimpleInput placeholder="Nome do autor ou livro" />
            <ButtonWithIcon iconName="search" />
          </View>
        </View>
      </View>
      <View style={styles.footer} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  homeContainer: {
    flex: 1,
    backgroundColor: SECONDARY_COLOR,
  },
  header: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  searchContainer: {
    margin: 15,
    marginTop: 30,
  },
  search: {
    flexDirection: 'row',
  },
  body: {
    flex: 12,
    backgroundColor: TERTIARY_COLOR,
    borderRadius: 40,
  },
  footer: {
    flex: 0.5,
  },
});

export default Home;
