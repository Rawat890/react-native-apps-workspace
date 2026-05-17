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
import { scale } from 'react-native-size-matters';
import { Movie } from '../api/types';
import { COLORS } from '../utils/colors';
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
            onDelete && <TouchableOpacity onPress={() => onDelete(item)}>
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
    padding: scale(12),
    backgroundColor: COLORS.orange,
    borderRadius: scale(10),
    flexDirection: 'row',
    elevation: 4,
    width: '100%',
  },
  posterImage: {
    width: scale(100),
    height: scale(150),
  },
  contentColumn: {
    flexDirection: 'column',
    gap: 10,
  },
  itemTitle: {
    marginLeft: scale(10),
    marginTop: scale(20),
    fontSize: scale(16),
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
    borderRadius: scale(10),
  },
  sectionTitle: {
    marginLeft: scale(10),
    marginBottom: scale(10),
    fontSize: scale(20),
    fontWeight: 'bold',
  },
  listContent: {
    gap: 15,
  },
});