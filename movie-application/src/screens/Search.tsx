import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';


import { scale } from 'react-native-size-matters';
import { getnowPlayingMovies, searchMovies } from '../api/tmdbAPI';
import { Movie } from '../api/types';
import SearchBar from '../components/SearchBar';
import VerticalList from '../components/VerticalList';
import { updatedArr } from '../utils/helper';

export default function Search() {
  const [text, setText] = useState<string>("")
  const [data, setData] = useState<Movie[]>([]);
  const onSearch = (val: string) => {
    setText(val)
  }
  const searchMovie = async () => {
    const res = await searchMovies(text)
    setData(updatedArr(res));

  }
  useEffect(() => {
    async function fetchData() {
      try {

        const upcoming = await getnowPlayingMovies();
        setData(updatedArr(upcoming));

      } catch (error) {
        console.error('Failed to fetch upcoming movies:', error);
      }
    }

    fetchData();
  }, []);

  return (
    <>
      <View style={styles.header}>
        <Text style={styles.title}>Search movies</Text>
        <SearchBar value={text} onChangeText={onSearch} searchMovie={searchMovie} />
      </View>
      <VerticalList data={data} />
    </>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  header: {
    marginHorizontal: scale(10),
  },
  title: {
    fontSize: scale(20),
    textAlign: 'center',
    fontWeight: 'bold',
    marginVertical: scale(5),
  },
});