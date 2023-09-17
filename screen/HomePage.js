import { StyleSheet, View, Text, Image, Button, TouchableOpacity, SafeAreaView } from 'react-native';
import React from 'react';

export default function HomePage() {


// const ontest = (test) =>{
//   alert(test)
// }

  return (
    <SafeAreaView style={styles.container}>
        <Text>Home</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 4,
    backgroundColor: '#fff',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
});
