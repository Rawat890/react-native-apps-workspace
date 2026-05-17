import React from 'react';
import { FlatList, Image, StyleSheet, Text, View } from 'react-native';
import { scale } from 'react-native-size-matters';
import { Movie } from '../api/types';

interface HorizontalViewProps {
  title: string;
  data: Movie[];
}

export default function HorizontalView({ title, data }: HorizontalViewProps) {
  const _renderItem = ({ item }: { item: Movie }) => {
    return (
      <View>
        <Image
          source={{ uri: item.poster_path }}
          style={styles.posterImage}
        />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <FlatList
        horizontal={true}
        renderItem={_renderItem}
        data={data}
        keyExtractor={item => item.id?.toString()}
        contentContainerStyle={styles.listContent}
        showsHorizontalScrollIndicator={false}
        nestedScrollEnabled={true}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  posterImage: {
    width: scale(200),
    height: scale(150),
    borderRadius: scale(15),
  },
  container: {
    paddingTop: scale(20),
    backgroundColor: 'white',
    paddingLeft: scale(15),
    marginBottom: scale(20),
  },
  title: {
    fontSize: scale(20),
    fontWeight: 'bold',
    marginBottom: scale(10),
  },
  listContent: {
    gap: scale(15),
  },
});