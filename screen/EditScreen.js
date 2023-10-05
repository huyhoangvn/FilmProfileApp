import { StyleSheet, View, Text, Image, Button, TouchableOpacity, SafeAreaView } from 'react-native';
import React, { useState } from 'react';
import { getMovieTrending, detailMovies, getCastMovie, getSearchMovie} from '../api/flimsDB';
import {getDataStorage} from '../config/Storage'
import Header from '../components/EditComponent/Header';
import Body from '../components/EditComponent/Body';
export default function EditScreen({navigation}) {

  return (
    <SafeAreaView style={styles.container}>
       <View>
            <Header navigation={navigation}/>
       </View>
       <View>
            <Body/>
       </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 4,
    backgroundColor: '#313230',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
});
