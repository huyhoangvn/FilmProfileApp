import { StyleSheet, View, KeyboardAvoidingView, Platform } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../components/LoginComponent/Header';
import Body from '../components/LoginComponent/Body';

export default function Login({ navigation }) {
  const [isSelected, setSelection] = useState(false);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={10}
      style={styles.container}
    >
      <View style={styles.headerContainer}>
        <Header navigation={navigation} />
      </View>

      <View style={styles.bodyContainer}>
        <Body navigation={navigation} />
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 4,
    backgroundColor: '#fff',
  },
  headerContainer: {
    flex: 0.9,
    zIndex: 1, // Đặt zIndex của Header thành 1
  },
  bodyContainer: {
    flex: 1.5,
    zIndex: 2, // Đặt zIndex của Body thành 2 (lớn hơn Header)
  },
});
