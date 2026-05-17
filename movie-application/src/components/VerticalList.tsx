import { AntDesign } from '@expo/vector-icons';
import React from 'react';
import {
 FlatList,
 Image,
 StyleSheet,
 Text,
 TouchableOpacity,
 View,
} from 'react-native';
import { Movie } from '../api/types';
import { screenWidth } from '../utils/constants';

export default function VerticalList({
  title,
  data,
  onDelete,
}: {
  title?: string;
  data: Movie[];
  onDelete?: (item: Movie) => void;
}) {
  const _renderItem = ({ item }: { item: Movie }) => {
    return (
      <View style={styles.rowItem}>
        <Image
          source={{ uri: item.poster_path }}
          style={styles.posterImage}
        />
        <View style={styles.contentColumn}>
          <Text style={styles.itemTitle}>{item.title}</Text>
{
    onDelete &&<TouchableOpacity onPress={() =>  onDelete(item)}>
            <AntDesign
              name="delete"
              size={20}
              color="black"
              style={styles.deleteIcon}
            />
          </TouchableOpacity>
}
          
        </View>
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>{title}</Text>

      <FlatList
        renderItem={_renderItem}
        data={data}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={styles.listContent}
        bounces={false}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  rowItem: {
    minWidth: screenWidth - 20,
    padding: 20,
    backgroundColor: '#f57171',
    borderRadius: 10,
    flexDirection: 'row',
    width: '100%',
  },
  posterImage: {
    width: 100,
    height: 150,
  },
  contentColumn: {
    flexDirection: 'column',
    gap: 10,
  },
  itemTitle: {
    marginLeft: 10,
    marginTop: 20,
    fontSize: 16,
    fontWeight: 'bold',
    width: 200,
  },
  deleteIcon: {
    marginLeft: 10,
  },
  container: {
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5,
    borderRadius: 10,
  },
  sectionTitle: {
    marginLeft: 10,
    marginBottom: 10,
    fontSize: 16,
    fontWeight: 'bold',
  },
  listContent: {
    gap: 15,
  },
});