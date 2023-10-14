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

import { ScrollView, TextInput } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';
import { getMovieTrending, detailMovies, getCastMovie, getListSave,editSaveList} from '../api/apiApp';
import { getDataStorage } from '../config/Storage';

// const uid = getDataStorage({nameData: 'idUser'})

//Header
function Header({ navigation }) {
  return (
    <View style={styles.headercontainer}>
      <View style={styles.headerTitleContainer}>
        <Text style={styles.headerTitle}>Trang bạn bè</Text>
      </View>
      <View style={styles.headerIcon}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('FriendSearchScreen');
          }}
        >
          <Icon name="user" size={25} color={'#19AFDF'}></Icon>
        </TouchableOpacity>
      </View>
    </View>
  );
}

//Main
export default function FriendPage({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <Header navigation={navigation}></Header>
      <Button
        title="ấn"
        onPress={async () => {
          const details = await editSaveList({
            idUser: '651b07d81b75b48fecf2016a',
            idMovie: '980489',
            like: -1,
            status: -1,
            point: -1,
          });
          console.log(details);
        }}
      ></Button>
    </SafeAreaView>
  );
}

//Styles
const styles = StyleSheet.create({
  container: {
    flex: 4,
    backgroundColor: '#313230',
    // alignItems: 'center',
    // justifyContent: 'center',
  },

  headercontainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'relative',
  },

  headerTitleContainer: {
    margin: 15,
  },
  headerTitle: {
    color: 'white',
    fontSize: 25,
    fontWeight: 'bold',
  },

  headerIcon: {
    margin: 15,
  },
});
