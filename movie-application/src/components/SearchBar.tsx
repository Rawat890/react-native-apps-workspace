import { EvilIcons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import { scale } from 'react-native-size-matters';
import { COLORS } from '../utils/colors';


interface SearchBarProps {
    value:string,
    onChangeText:(text:string) =>void
    searchMovie: () =>void
}

export default function SearchBar({value,onChangeText,searchMovie}:SearchBarProps) {
  return (
        <View style={styles.container}>
        <EvilIcons name="search" size={30} color="black" />
        <TextInput
          value={value}
          onSubmitEditing={searchMovie}
          onChangeText={onChangeText}
          style={styles.input}
          placeholder='Enter movie name'
        />
      </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderColor: COLORS.grey,
    borderWidth: 1,
    borderRadius: scale(20),
    padding: scale(10),
    marginHorizontal: scale(5),
    alignItems: 'center',
    paddingLeft: scale(10),
    marginRight: scale(5),
  },
  input: {
    width: '100%',
    height: scale(30),
  },
})