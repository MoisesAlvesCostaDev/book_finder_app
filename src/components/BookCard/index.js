import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import {CARD_BACK_GROUND_COLOR, SECONDARY_COLOR} from '../../assets/colors/';

function BookCard(cardData) {
  return (
    <View style={styles.cardContainer}>
      <Image
        style={styles.bookImage}
        source={{
          uri: cardData.item.image,
        }}
      />
      <View style={styles.dataContainer}>
        <Text style={styles.title}> {cardData.item.title} </Text>
        <Text> Autor: {cardData.item.title} </Text>
        <Text> Ano publicação: {cardData.item.title} </Text>
        <Text> Publicado por: {cardData.item.title} </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    borderRadius: 10,
    backgroundColor: CARD_BACK_GROUND_COLOR,
    height: 100,
    marginLeft: 5,
    marginTop: 5,
    borderColor: SECONDARY_COLOR,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  bookImage: {
    height: 80,
    width: 60,
    borderRadius: 8,
  },
  dataContainer: {
    height: 80,
    flex: 1,
    paddingLeft: 5,
  },
  title: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
});

export default BookCard;
