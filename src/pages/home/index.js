import React, {useState} from 'react';
import {
  SafeAreaView,
  Text,
  StyleSheet,
  StatusBar,
  View,
  FlatList,
} from 'react-native';
import {SECONDARY_COLOR, TERTIARY_COLOR} from '../../assets/colors/';
import SimpleInput from '../../components/SimpleInput';
import ButtonWithIcon from '../../components/ButtonWithIcon';
import Api from '../../services/Api';
import BookCard from '../../components/BookCard';
import {getFormattedDateToPTBR} from '../../util/formatDate';

function Home() {
  const [searchTerm, setSearchTerm] = useState(null);
  const [booksData, setBooksData] = useState([]);

  function getBooksDataMutated(data) {
    const dataMutated = data.map(book => {
      const bookInfo = {
        id: book.id,
        authors:
          book.volumeInfo?.authors?.length > 1
            ? book.volumeInfo.authors.toString()
            : book.volumeInfo.authors,
        title: book.volumeInfo.title.substr(1, 30),
        publishedDate: getFormattedDateToPTBR(book.volumeInfo.publishedDate),
        publisher: book.volumeInfo.publisher,
        image: book?.volumeInfo?.imageLinks?.smallThumbnail,
      };
      return bookInfo;
    });

    return dataMutated;
  }

  async function getAndSetBooksData() {
    const response = await Api.get(`/volumes?q=${searchTerm}`);
    const bookDataMutated = getBooksDataMutated(response.data.items);
    setBooksData(bookDataMutated);
  }

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
            <SimpleInput
              placeholder="Nome do autor ou livro"
              value={searchTerm}
              onChangeText={e => {
                setSearchTerm(e);
              }}
            />
            <ButtonWithIcon
              iconName="search"
              onPress={() => {
                getAndSetBooksData();
              }}
            />
          </View>
          <FlatList
            style={styles.list}
            data={booksData}
            renderItem={BookCard}
            keyExtractor={item => item.id}
          />
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
  list: {
    marginTop: 10,
  },
  footer: {
    flex: 0.5,
  },
});

export default Home;
