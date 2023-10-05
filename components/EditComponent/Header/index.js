import { StyleSheet, View, Text, Image, Button, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { TextInput } from 'react-native-gesture-handler';
import CheckBox from 'expo-checkbox';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/FontAwesome'; // Chọn một tên biểu tượng từ thư viện
// import styles from './style';

export default function Header({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.viewText}>
        <Text style={styles.text_two}>
        <TouchableOpacity onPress={() => {navigation.navigate('Profile')}}>
          <Icon name="arrow-left" size={25} color={'white'}></Icon>
        </TouchableOpacity>
        </Text>
      </View>

      <View style={styles.viewTitle}>
          <Text style = {{color: 'white', fontSize: 20, fontWeight: 'bold'}}>Chi tiết Phim</Text>
      </View>
      
      <View style={styles.viewIcon}>
        <TouchableOpacity onPress={() => {navigation.navigate('SearchScreen')}}>
          <Icon name="plus" size={25} color={'#19AFDF'}></Icon>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'relative',
  },

  viewText: {
    margin: 15,
  },
  text_one: {
    color: '#DFD719',
    fontSize: 25,
    fontWeight: 'bold',
  },
  text_two: {
    fontSize: 25,
    fontWeight: 'bold',
    color: 'white',
  },

  viewIcon: {
    margin: 15,
  },
});