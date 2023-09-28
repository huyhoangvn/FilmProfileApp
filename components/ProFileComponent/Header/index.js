import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import { TextInput } from 'react-native-gesture-handler';
// import styles from './style';
import { LoginApi } from '../../../api/apiApp';
import Icon from 'react-native-vector-icons/FontAwesome'; // Chọn một tên biểu tượng từ thư viện
import { getDataStorage , deleteDataStorage} from '../../../config/Storage';

export default function Header({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.viewText}>
        <Text style={styles.text}>Trang cá nhân</Text>
      </View>
      <View style={styles.viewIcon}>
        <TouchableOpacity onPress={() => {
          deleteDataStorage({nameData: 'idUser'})
          navigation.navigate('Login')
        }}>
          <Icon name="sign-out" size={25} color={'#19AFDF'}></Icon>
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
  text: {
    color: 'white',
    fontSize: 25,
    fontWeight: 'bold',
  },

  viewIcon: {
    margin: 15,
  },
});
