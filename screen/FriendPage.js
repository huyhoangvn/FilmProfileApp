import { StyleSheet, View, Text, Image, Button, TouchableOpacity, SafeAreaView } from 'react-native';
import React, { useState } from 'react';
import { getMovieTrending, detailMovies, getCastMovie} from '../api/flimsDB';
import {getDataStorage} from '../config/Storage'


export default function FriendPage() {

  return (
    <SafeAreaView style={styles.container}>
        <Button title='ấn' onPress={async () => {
            const details = await getCastMovie('565770');
            console.log(details);
        }}>
          
        </Button>
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
