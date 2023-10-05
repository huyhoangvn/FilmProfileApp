import { StyleSheet, View, Text, Image, Button, TouchableOpacity, SafeAreaView } from 'react-native';
import React, { useState } from 'react';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import { } from '../api/flimsDB';
import { } from '../config/Storage'

export default function FriendSearchScreen({navigation}) {
    return(
      <SafeAreaView style={styles.container}>
      </SafeAreaView>
    );
};

const styles = StyleSheet.create({
  container: {
    flex: 4,
    backgroundColor: '#313230',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
});