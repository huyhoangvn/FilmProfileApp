import { View, Text, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { TextInput } from 'react-native-gesture-handler';
import styles from './style';
import { LoginApi } from '../../../api/apiApp';

export default function Post({ navigation }) {
  return (
    <View>
      <View>
        <Text style={{ marginLeft: 40, color: '#19AFDF', fontSize: 20 }}>Bài Đăng</Text>
        <View
          style={{ width: 128, height: 1, borderWidth: 1, borderColor: '#19AFDF', marginLeft: 15 }}
        />
      </View>

      <View>
        
      </View>
    </View>
  );
}
