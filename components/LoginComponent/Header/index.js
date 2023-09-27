import { StyleSheet, View, Text, Image, Button, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import styles from './style';

export default function Header() {
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
        <Text style={styles.text}>Xin Chào,{'\n'}Mời  Đăng Nhập</Text>
      </View>
    </View>
  );
}

