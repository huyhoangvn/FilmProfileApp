import { StyleSheet, View, Text, Image, Button, TouchableOpacity, SafeAreaView } from 'react-native';
import React, { useState } from 'react';
import { getMovieTrending } from '../api/flimsDB';


export default function ProfilePage() {

  return (
    <SafeAreaView style={styles.container}>
        <Text>Profile</Text>
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