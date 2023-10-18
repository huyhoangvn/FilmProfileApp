import { StyleSheet, View, Text, Image, Button, TouchableOpacity, SafeAreaView } from 'react-native';
import React, { useState } from 'react';

import { ScrollView, TextInput } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useRoute } from '@react-navigation/native';
import { getSearchMovie, image500 } from '../api/flimsDB';
import { addPost } from '../api/apiApp';

import { getMovieTrending, detailMovies, getCastMovie, getListSave, editSaveList } from '../api/apiApp';
import { getDataStorage } from '../config/Storage';

// const uid = getDataStorage({nameData: 'idUser'})

//Header
function Header({ navigation }) {
  return (
    <View style={styles.containerHeder}>
      <View style={styles.viewText}>
        <Text style={styles.text_two}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Đã Lưu');
            }}
          >
            <Icon name="arrow-left" size={25} color={'white'}></Icon>
          </TouchableOpacity>
        </Text>
      </View>

      <View style={styles.viewTitle}>
        <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}>Chia sẻ Phim</Text>
      </View>

      <View style={styles.viewIcon}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('SearchScreen');
          }}
        ></TouchableOpacity>
      </View>
    </View>
  );
}

//Main
export default function ShareScreen({ navigation }) {
  const route = useRoute();
  const { idUser, idReview, imageMovie, nameMovie } = route.params;
  console.log('idUser: ' + idUser )
  console.log('idReview: ' + idReview )

  const [title, setTitle] = useState();
  const [content, setContent] = useState();

  const handlerAddPost = async () => {
    if (!title || !content) {
      alert('Vui lòng nhập đầy đủ thông tin');
      return;
    }

    const result = await addPost({ idUser: idUser, idReview: idReview, title: title, content: content });
    if (result.message === 'Thêm bài đăng thành công') {
      alert(result.message);
    } else {
      return;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Header navigation={navigation}></Header>
      </View>
      <ScrollView>
        <View style={{ margin: 10 }}>
          <Text style={{ color: '#F8EE0D', fontSize: 20, fontWeight: 'bold', marginBottom: 10 }}>{nameMovie}</Text>
          <Image
            // source={require('../assets/images/moviePoster1.png')}
            source={{ uri: image500(imageMovie) }}
            style={{
              width: '100%',
              height: 270,
              borderRadius: 5,
              resizeMode: 'stretch',
              backgroundColor: 'red', //stretch
              // Sử dụng 'cover' để đảm bảo ảnh không bị biến dạng và không mất chi tiết
            }}
          />

          <Text style={styles.styleText}>Tiêu Đề</Text>
          <TextInput
            style={styles.textInput}
            onChangeText={(data) => {
              setTitle(data);
            }}
            placeholder="Nhập tiêu để"
            placeholderTextColor="white"
          />
          <Text style={styles.styleText}>Nội Dung</Text>
          <TextInput
            style={{
              width: '100%',
              height: 140,
              borderColor: '#909090',
              borderWidth: 0.5,
              alignSelf: 'center',
              marginTop: 10,
              paddingLeft: 10,
              borderRadius: 5,
              color: 'white',
            }}
            placeholder="Nhập nội dung"
            placeholderTextColor="white" // Đặt màu cho placeholder
            multiline={true} // Cho phép nhập nhiều dòng
            numberOfLines={4}
            onChangeText={(data) => {
              setContent(data);
            }}
          />
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              handlerAddPost();
            }}
          >
            <Text style={styles.buttonText}>Dăng bài</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
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

  containerHeder: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'relative',
  },

  viewText: {
    margin: 15,
  },
  text_one: {
    color: '#DFD719',
    fontSize: 25,
    fontWeight: 'bold',
  },
  text_two: {
    fontSize: 25,
    fontWeight: 'bold',
    color: 'white',
  },

  viewIcon: {
    margin: 15,
  },

  styleText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: 'white',
    marginTop: 20,
  },
  textInput: {
    width: '100%',
    height: 54,
    borderColor: '#909090',
    borderWidth: 0.5,
    alignSelf: 'center',
    marginTop: 10,
    paddingLeft: 10,
    borderRadius: 5,
    color: 'white',
  },
  button: {
    alignSelf: 'center',
    backgroundColor: '#19AFDF',
    width: 334,
    height: 43,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 25,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
