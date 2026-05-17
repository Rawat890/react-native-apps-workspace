import React, { useEffect, useState } from 'react';
import {
  ImageBackground,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import {
  getnowPlayingMovies,
  getPopularMovies,
  getTopRatedMovies,
  getUpcomingMovies,
} from '../api/tmdbAPI';
import { Movie } from '../api/types';
import HorizontalView from '../components/HorizontalView';
import { DETAIL_VIEW, screenHeight } from '../utils/constants';
import { updatedArr } from '../utils/helper';
import { downloadKeyStorage } from '../utils/storage';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { LinearGradient } from 'expo-linear-gradient';

type RootStackParamList = {
  [DETAIL_VIEW]: { title: Movie | undefined };
};


type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function Home() {
  const [popularMovies, setPopularMovies] = useState<Movie[]>([]);
  const [topRatedMovies, setTopRatedMovies] = useState<Movie[]>([]);
  const [upcomingMovies, setUpcomingMovies] = useState<Movie[]>([]);
  const [nowPlayingMovies, setNowPlayingMovies] = useState<Movie[]>([]);
  const [title, setTile] = useState<Movie>();
  const navigation = useNavigation<NavigationProp>();
  const [data, setData] = useState<string | null>(null);
  const onPlay = () => {
    navigation.navigate(DETAIL_VIEW, { title: title });
  };

  // ADD THIS useEffect
  useEffect(() => {
    async function loadDownloads() {
      const storedData = await AsyncStorage.getItem(downloadKeyStorage);
      setData(storedData);
    }

    loadDownloads();
  }, []);

  const setRandom = () => {
    setTile(
      nowPlayingMovies?.[Math.floor(Math.random() * upcomingMovies.length)],
    );
  };

  useEffect(() => {
    setRandom();
  }, [nowPlayingMovies]);

  const onDownload = async () => {
    let newData = [...JSON.parse(data || '[]')];

    newData.push(title);

    const updatedData = JSON.stringify(newData);

    await AsyncStorage.setItem(downloadKeyStorage, updatedData);

    setData(updatedData);

    setRandom();
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const popular = await getPopularMovies();
        const topRated = await getTopRatedMovies();
        const upcoming = await getUpcomingMovies();
        const nowPlaying = await getnowPlayingMovies();

        setPopularMovies(updatedArr(popular));
        setTopRatedMovies(updatedArr(topRated));
        setUpcomingMovies(updatedArr(upcoming));
        setNowPlayingMovies(updatedArr(nowPlaying));
      } catch (error) {
        console.error('Failed to fetch popular movies:', error);
      }
    }

    fetchData();
  }, []);

  return (
    <ScrollView
      nestedScrollEnabled={true}
      style={styles.scrollView}
      showsVerticalScrollIndicator={false}
    >
      <ImageBackground
        source={{
          uri: title?.poster_path,
        }}
        resizeMode="cover"
        style={styles.heroImage}
      >
        <LinearGradient
          colors={['transparent', 'rgba(255,255,255,0.8)']}
          style={styles.gradient}
        />

        <View style={styles.buttonRow}>
          <Pressable style={styles.primaryButton} onPress={onPlay}>
            <Text style={styles.buttonText}>Play</Text>
          </Pressable>

          <Pressable style={styles.primaryButton} onPress={onDownload}>
            <Text style={styles.buttonText}>Download</Text>
          </Pressable>
        </View>
      </ImageBackground>

      <HorizontalView title="Popular Movies" data={popularMovies} />
      <HorizontalView title="Top Rated Movies" data={topRatedMovies} />
      <HorizontalView title="Upcoming Movies" data={upcomingMovies} />
      <HorizontalView title="Now Playing Movies" data={nowPlayingMovies} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: 'white',
  },
  heroImage: {
    width: '100%',
    height: screenHeight * 0.8,
    justifyContent: 'flex-end',
  },
  gradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 150,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 20,
    justifyContent: 'center',
    marginBottom: 30,
    alignItems: 'center',
  },
  primaryButton: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 10,
  },
  buttonText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});