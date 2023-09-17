import { StyleSheet, View, Text, Image, Button, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../components/LoginComponent/Header';
import Body from '../components/LoginComponent/Body';


export default function Login({ navigation }) {
  const [isSelected, setSelection] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ flex: 0.8 ,}}>
          <Header/>
      </View>

      <View style={{ flex: 1.5 }}>
        <Body navigation={navigation}/>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 4,
    backgroundColor: '#fff',
  },
});
