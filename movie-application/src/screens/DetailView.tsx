import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text } from 'react-native';
import WebView from 'react-native-webview';
import { watchURL } from '../api/config';
import { getVideoId } from '../api/tmdbAPI';
import { Movie } from '../api/types';
import { screenHeight } from '../utils/constants';

type RootStackParamList = {
  DetailView: { title: Movie | undefined };
};

type PropType = NativeStackScreenProps<RootStackParamList, 'DetailView'>;
export default function DetailView({ route }: PropType) {
  const { title } = route?.params || {};
  const [videoId, setVideoId] = useState('');

  const getId = async () => {
    try {
      const res = await getVideoId(title?.title);
    setVideoId(res?.items[0]?.id?.videoId)
    } catch (err) {
      console.log(err);
    }

   
  };

  useEffect(() => {
    getId();
  }, []);

  return (
      <ScrollView style={styles.scrollView}>
        <WebView
          source={{ uri: `${watchURL}?v=${videoId}` }}
          style={styles.webView}
        />
        <Text style={styles.title}>{title?.title}</Text>
        <Text style={styles.overview}>{title?.overview}</Text>
      </ScrollView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  webView: {
    width: '100%',
    height: screenHeight / 3,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 20,
    margin: 10,
  },
  overview: {
    fontWeight: '500',
    fontSize: 16,
    margin: 10,
  },
});