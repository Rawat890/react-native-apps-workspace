import { EvilIcons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import { screenWidth } from '../utils/constants';


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
        />
      </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    minWidth: screenWidth - 20,
    borderColor: '#423f3f',
    borderWidth: 1,
    borderRadius: 20,
    alignItems: 'center',
    paddingLeft: 10,
  },
  input: {
    width: '100%',
    height: 40,
  },
})