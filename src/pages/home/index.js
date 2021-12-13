import React, {useState} from 'react';
import {
  SafeAreaView,
  Text,
  StyleSheet,
  StatusBar,
  View,
  FlatList,
  Keyboard,
} from 'react-native';
import {SECONDARY_COLOR, TERTIARY_COLOR} from '../../assets/colors/';
import SimpleInput from '../../components/SimpleInput';
import ButtonWithIcon from '../../components/ButtonWithIcon';
import Api from '../../services/Api';
import BookCard from '../../components/BookCard';
import {getFormattedDateToPTBR} from '../../util/formatDate';
import Load from '../../components/Load';
import {SUCCESS} from '../../misc/httpResponsesStatus';
let booksIndex = 0;

function Home() {
  const [searchTerm, setSearchTerm] = useState(null);
  const [booksData, setBooksData] = useState([]);
  const [isload, setIsload] = useState(false);
  const [message, setMessage] = useState('Clique em localizar');
  const maxResults = 10;

  function getBooksDataMutated(data) {
    const dataMutated = data.map(book => {
      const bookInfo = {
        id: book.id,
        authors:
          book.volumeInfo?.authors?.length > 1
            ? book.volumeInfo.authors.toString()
            : book.volumeInfo.authors,
        title: book.volumeInfo.title.substr(1, 30),
        publishedDate:
          book?.volumeInfo?.publishedDate &&
          getFormattedDateToPTBR(book?.volumeInfo?.publishedDate),
        publisher: book.volumeInfo.publisher,
        image: book?.volumeInfo?.imageLinks?.smallThumbnail,
      };
      return bookInfo;
    });

    return dataMutated;
  }

  async function getAndSetBooksData() {
    try {
      const response = await Api.get(
        `/volumes?q='${searchTerm}' &maxResults=${maxResults}&startIndex=${booksIndex}`,
      );
      if (response.status === SUCCESS) {
        const bookDataMutated = getBooksDataMutated(response.data.items);

        if (response.data.items.length <= 0) {
          setMessage('Lista vazia');
        }
        setBooksData([...booksData, ...bookDataMutated]);
      } else {
        setMessage('Erro ao obter livros ');
        setBooksData([]);
      }
    } catch (error) {
      setMessage('Erro ao obter livros ');
      setBooksData([]);
    }
  }

  function addMorBooks() {
    booksIndex = booksIndex + maxResults + 1;
    getAndSetBooksData();
  }

  const renderIsEmpty = () => {
    return (
      <View style={styles.emptyListContainer}>
        <Text>{message}</Text>
      </View>
    );
  };

  async function findBooks() {
    setIsload(true);
    booksIndex = 0;
    await getAndSetBooksData();
    setIsload(false);
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
                Keyboard.dismiss();
                findBooks();
              }}
            />
          </View>
          {isload ? (
            <Load></Load>
          ) : (
            <FlatList
              style={styles.list}
              data={booksData}
              renderItem={BookCard}
              keyExtractor={item => item.id}
              ListEmptyComponent={isload ? null : renderIsEmpty}
              onEndReachedThreshold={0.7}
              onEndReached={() => {
                addMorBooks();
              }}
            />
          )}
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
    height: '90%',
  },
  footer: {
    flex: 0.5,
  },
  emptyListContainer: {
    flex: 1,
    height: 200,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Home;
