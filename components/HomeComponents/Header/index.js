import { StyleSheet, View, Text, Image, Button, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
// import StylesHomePage from '../Style/StyleHomePage';
// import Header from '../components/SlideIMG';
import { TextInput } from 'react-native-gesture-handler';
import CheckBox from 'expo-checkbox';
import { SafeAreaView } from 'react-native-safe-area-context';
import styles from './style';

export default function Header(props) {
  const [isSelected, setSelection] = useState(false);

  return (
    <View>
        <Text style = {{fontWeight: 'bold', color: 'red', fontSize: 30}}>{props.name}</Text>
    </View>
  );
}

// const styles = StyleSheet.create({
  
//   });
  
