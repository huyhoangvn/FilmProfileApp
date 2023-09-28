import { StyleSheet, View, Text, Image, Button, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { TextInput } from 'react-native-gesture-handler';
import CheckBox from 'expo-checkbox';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/FontAwesome'; // Chọn một tên biểu tượng từ thư viện
// import styles from './style';

export default function Header(props) {
  return (
    <View style = {styles.container} >
      <View style = {styles.viewText}>
        <Text style={styles.text_two}>
          <Text style={styles.text_one}>F</Text>ilm Profile
        </Text>
      </View>
      <View style = {styles.viewIcon}>
        <Icon name='search' size={25} color={'#19AFDF'}></Icon>
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

  viewText : {
      margin: 15
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
    margin: 15
  }
});
