import { View, Text, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { TextInput } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './style';
import {setDataStorages,getDataStorage} from '../../../config/Storage'
import { LoginApi } from '../../../api/apiApp';

export default function Body({ navigation }) {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = async () => {
    // Lấy giá trị tài khoản và mật khẩu từ state
    const user = userName
    // .toLowerCase();
    const pass = password
    // .toLowerCase(); // chữ hoa thành chữ thường

    if (user.length > 35) {
      alert('Tên quá dài');
      return;
    }
    
    if (pass.length < 8 || pass.length < 6) {
      alert('Mật khẩu phải từ 6-8 ký tự');
      return;
    }    
    if (!user || !pass) {
      // Nếu một trong các trường dữ liệu trống, hiển thị thông báo lỗi và không gọi LoginApi
      alert('Vui lòng điền đầy đủ thông tin tài khoản và mật khẩu.');
      return;
    }

    const result = await LoginApi({ userName: user, password: pass });
    
    console.log(result.data.id);
  
    try {
      if (result.message === 'dang nhap thanh cong') {
        const id = result.data.id
        setDataStorages({nameData: 'idUser', data:id})
        // await AsyncStorage.setItem('userId', id.toString());
        navigation.navigate('HomeScreen');
        // console.log(result);
      } else {
        alert('Thông tin tài khoản mật khẩu không chính xác');
      }
    } catch (error) {
      console.error('Lỗi đăng nhập:', error);
    }

    // Sau khi gọi LoginApi, bạn có thể điều hướng tới màn hình khác nếu cần
    // navigation.navigate('HomeScreen');
  };


  

  return (
    <View>
      <Text style={{ marginLeft: 21, fontSize: 22, fontWeight: 'bold' }}> Tài Khoản </Text>
      <TextInput
        style={styles.textInput}
        placeholder="Nhập tài khoản"
        onChangeText={(data) => {
          setUserName(data);
        }}
      />

      <Text style={{ marginLeft: 21, marginTop: 15, fontSize: 22, fontWeight: 'bold' }}>
        {' '}
        Mật Khẩu:
      </Text>
      <TextInput
        style={styles.textInput}
        placeholder="Nhập Mật Khẩu"
        secureTextEntry={true}
        onChangeText={(data) => {
          setPassword(data);
        }}
      />

   



      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          handleSignIn();
          // navigation.navigate('HomeScreen');

        }}
      >
        <Text style={styles.buttonText}>SIGN IN</Text>
      </TouchableOpacity>




      {/* <TouchableOpacity
        style={styles.button}
        onPress={() => {
          getDataStorage({nameData:'idUser'})
          // navigation.navigate('HomeScreen');

        }}
      >
        <Text style={styles.buttonText}>SIGN IN</Text>
      </TouchableOpacity> */}

      <TouchableOpacity
        onPress={() => {
          navigation.navigate('SignUp');
        }}
      >
        <Text
          style={{
            alignSelf: 'center',
            marginTop: 20,
            fontSize: 15,
            textDecorationLine: 'underline',
          }}
        >
          Don't have account ? sign up here
        </Text>
      </TouchableOpacity>
    </View>
  );
}
