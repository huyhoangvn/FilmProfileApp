import { StyleSheet, View, Text, Image, Button, TouchableOpacity, SafeAreaView } from 'react-native';
import React, { useState } from 'react';
import { getMovieTrending } from '../api/flimsDB';
import Header from '../components/SearchComponent/Header';
import BodySearch from '../components/SearchComponent/bodySearch';


export default function SearchScreen({navigation}) {

  return (
    <SafeAreaView style={styles.container}>
    <View style={styles.header}>
        <Header navigation={navigation} />
    </View>
    <View style={styles.bodySearch}>
          <BodySearch navigation={navigation}/>
    </View>
  
    
</SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex:2,
    backgroundColor: '#313230',
},
bodySearch: {
    flex: 1,
 

},


});
