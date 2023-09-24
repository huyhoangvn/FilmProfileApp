import { StyleSheet, View, Text, Image, Button, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
// import StylesHomePage from '../Style/StyleHomePage';
// import Header from '../components/SlideIMG';
import { TextInput } from 'react-native-gesture-handler';
import CheckBox from 'expo-checkbox';
import { SafeAreaView } from 'react-native-safe-area-context';
import styles from './style';

export default function Body({ navigation }) {
  const [isSelected, setSelection] = useState(false);
  
  return (
    <View>
      <Text style={{ marginLeft: 21, fontSize: 22, fontWeight: 'bold' }}> Email: </Text>
      <TextInput style={styles.textInput} placeholder="Enter your email" />

      <Text style={{ marginLeft: 21, marginTop: 15, fontSize: 22, fontWeight: 'bold' }}>
        {' '}
        Password:
      </Text>
      <TextInput
        style={styles.textInput}
        placeholder="Enter your password"
        secureTextEntry={true}
      />

      {/* <View style={styles.checkboxContainer}>
          <CheckBox value={isSelected} onValueChange={setSelection} style={styles.checkbox} />
          <Text style={styles.label}>Ghi nhớ đăng nhập</Text>
        </View> */}

      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          navigation.navigate('HomeScreen');
        }}
      >
        <Text style={styles.buttonText}>SIGN IN</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() =>{
        navigation.navigate('SignUp');
      }}>
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
