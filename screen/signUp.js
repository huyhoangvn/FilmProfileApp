import { StyleSheet, View, KeyboardAvoidingView, Platform } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../components/SignUpComponent/Header';
import Body from '../components/SignUpComponent/Body';

export default function SignUp({ navigation }) {
  const [isSelected, setSelection] = useState(false);

  return (
    // <KeyboardAvoidingView
    //   behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    //   keyboardVerticalOffset={10}
    //   style={styles.container}
    // >
    <View style={styles.container}>

   
      <View style={styles.headerContainer}>
        <Header navigation={navigation} />
      </View>

      <View style={styles.bodyContainer}>
        <Body navigation={navigation} />
      </View>
      </View>
    // </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 4,
    backgroundColor: '#fff',
  },
  headerContainer: {
    flex: 0.6,
    zIndex: 1, // Đặt zIndex của Header thành 1
  },
  bodyContainer: {
    flex: 1.2,
    zIndex: 2, // Đặt zIndex của Body thành 2 (lớn hơn Header)
  },
});
