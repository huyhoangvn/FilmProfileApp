import { StyleSheet, View, Text, Image, Button, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import styles from './style';
import Icon from 'react-native-vector-icons/FontAwesome'; // Chọn một tên biểu tượng từ thư viện

export default function Header({navigation}) {
  return (
    <View>
   
    <View style ={styles.viewImg}>
      <Image
        style={styles.image_one}
        source={{
          uri: 'https://www.figma.com/file/Wy4Jt0kKo2DhXj7PUWEGbB/Film-profile?type=design&node-id=9-5&mode=design&t=RSDfWFKu8lLdTXws-4', // Thay đổi URL hình ảnh tại đây
        }}
      />

<Image
        style={styles.image_two}
        source={{
          uri: 'https://www.figma.com/file/Wy4Jt0kKo2DhXj7PUWEGbB/Film-profile?type=design&node-id=9-5&mode=design&t=RSDfWFKu8lLdTXws-4', // Thay đổi URL hình ảnh tại đây
        }}
      />
    </View>
      <View style={styles.viewText}>
        <TouchableOpacity
        onPress={() =>{
        navigation.navigate('Login')
        }}>
        <Icon style ={styles.icon_back} name='arrow-left' size={20} color={'#19AFDF'}> Login</Icon>
        </TouchableOpacity>
       
        <Text style={styles.text}>Tạo{'\n'}Tài Khoản</Text>
      </View>
    </View>
  );
}

