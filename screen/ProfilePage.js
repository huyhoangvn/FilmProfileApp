import {
  StyleSheet,
  View,
  Text,
  Image,
  Button,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import React, { useState } from 'react';
import { getMovieTrending } from '../api/flimsDB';
import Header from '../components/ProFileComponent/Header';
import Post from '../components/ProFileComponent/Post';
import Profile from '../components/ProFileComponent/Profile';

export default function ProfilePage({navigation}) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.view_header}>
        <Header  navigation={navigation}/>
      </View>

      <View style={styles.view_Profile}>
      <Profile/>
      </View>

      <View style={styles.view_Post}>
        <Post/>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 4,
    backgroundColor: '#313230',
  },
  view_header: {
    flex: 0.2,

  },
  view_Profile: {
    flex: 1,

  },
  view_Post: {
    flex: 1,
  },
});
