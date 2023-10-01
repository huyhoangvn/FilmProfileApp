import { StyleSheet, View, Text, Image, Button, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
// import StylesHomePage from '../Style/StyleHomePage';
// import Header from '../components/SlideIMG';
import { TextInput } from 'react-native-gesture-handler';
import CheckBox from 'expo-checkbox';
import { SafeAreaView } from 'react-native-safe-area-context';
import styles from './style';
import { registerApi } from '../../../api/apiApp';

export default function Body({ navigation }) {
  const [name, setName] = useState('');
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [re_password, setRe_Password] = useState('');

  const handlerRigiter = async () => {
    if (name.length > 35) {
      alert('Tên quá dài');
      return;
    }

    if (name.length > 20) {
      alert('userName quá dài');
      return;
    }

    if (password.length < 8 || password.length < 6) {
      alert('Mật khẩu phải từ 6-8 ký tự');
      return;
    }

    if (!name || !password || !re_password || !userName) {
      // Nếu một trong các trường dữ liệu trống, hiển thị thông báo lỗi và không gọi LoginApi
      alert('Vui lòng điền đầy đủ thông tin');
      return;
    }

    if (password === re_password) {
      const result = await registerApi({ name: name, userName: userName, password: password });
      if(result.message === 'Tai khoan da ton tai') {
        alert('Tài khoản đã tồn tại');
          return
       }
       else{
        navigation.navigate('Login');
        alert('Đăng ký thành công');
       }
    } else {
      alert('mật khẩu không khớp');
    }
  };

  return (
    <View>
      <Text style={{ marginLeft: 25, fontSize: 22, fontWeight: 'bold' }}> Tên: </Text>
      <TextInput
        style={styles.textInput}
        placeholder="Nhập tên"
        onChangeText={(data) => {
          setName(data);
        }}
      />

      <Text style={{ marginLeft: 25, marginTop: 15, fontSize: 22, fontWeight: 'bold' }}>
        {' '}
        Tài khoản:
      </Text>
      <TextInput
        style={styles.textInput}
        placeholder="Nhập tài khoản"
        onChangeText={(data) => {
          setUserName(data);
        }}
      />

      <Text style={{ marginLeft: 25, marginTop: 15, fontSize: 22, fontWeight: 'bold' }}>
        {' '}
        Mật khẩu:
      </Text>
      <TextInput
        style={styles.textInput}
        placeholder="Nhập mật khẩu"
        secureTextEntry={true}
        onChangeText={(data) => {
          setPassword(data);
        }}
      />

      <Text style={{ marginLeft: 25, marginTop: 15, fontSize: 22, fontWeight: 'bold' }}>
        {' '}
        Nhập lại mật khẩu :
      </Text>
      <TextInput
        style={styles.textInput}
        placeholder="Nhập lại mật khẩu"
        secureTextEntry={true}
        onChangeText={(data) => {
          setRe_Password(data);
        }}
      />

      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          // navigation.navigate('Login');
          handlerRigiter();
        }}
      >
        <Text style={styles.buttonText}>SignUp</Text>
      </TouchableOpacity>
    </View>
  );
}
