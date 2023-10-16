import { StyleSheet, View, Text, Image, Button, TouchableOpacity, SafeAreaView } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';

import { ScrollView, TextInput } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';
import { addLikePost, deleteLikePost, getLikePost, getPostFriend, getPointReview } from '../api/apiApp';
import { image185 } from '../api/flimsDB';
import { getDataStorage } from '../config/Storage';
import { LinearGradient } from 'expo-linear-gradient';

// const uid = getDataStorage({nameData: 'idUser'})

//Header
function Header({ navigation }) {
  return (
    <View style={styles.headercontainer}>
      <View style={styles.headerTitleContainer}>
        <Text style={styles.headerTitle}>Bài đăng bạn bè</Text>
      </View>
      <View style={styles.headerIcon}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('FriendSearchScreen');
          }}
        >
          <Icon name="user-plus" size={25} color={'#19AFDF'}></Icon>
        </TouchableOpacity>
      </View>
    </View>
  );
}

//Main
export default function FriendPage({ navigation }) {
  const [data, setData] = useState([]);
  const [liked, setLiked] = useState({});
  const [dataLiked, setDataLiked] = useState([]);
  const [dataPoint,setDataPoint] = useState();

  const getDataApi = async () => {
    try {
      const details = await getPostFriend({
        idUser: '6523a07b075e06d97c19dda0',
      });
      setData(details);
    } catch (error) {
      // Xử lý lỗi khi gọi API lấy dữ liệu
    }
  };

  const getLikeData = async () => {
    data.map(async (item) => {
      const result = await getLikePost({ idPost: item.idBaiDang });
      setDataLiked(result);
      console.log('aaaaa' + result);
    });
  };

  const getPointData = async () => {
    data.map(async (item) => {
      const result = await getPointReview({ idMovie: item.idPhim });
      setDataPoint(result.ketQuaDanhGia);
    });
  }

  useEffect(() => {
    getDataApi();
  }, []);

  useEffect(() => {
    getLikeData();
  });

  useFocusEffect(
    React.useCallback(() => {
      getPointData();
    }, [])
  );


  const handleLike = async (idUser, idPost) => {
    if (!liked[idPost]) {
      // Nếu chưa like, gọi hàm addLikePost
      await addLikePost({ idUser: idUser, idPost: idPost });
      getLikeData();
    } else {
      // Nếu đã like, gọi hàm deleteLikePost
      await deleteLikePost({ idUser: idUser, idPost: idPost });
      getLikeData();
    }

    // Cập nhật trạng thái liked của mục và màu của biểu tượng like
    setLiked((prevLiked) => ({
      ...prevLiked,
      [idPost]: !prevLiked[idPost],
    }));
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Header navigation={navigation}></Header>
      </View>
      <ScrollView contentContainerStyle={{ paddingHorizontal: 1 }}>
        {data.map((item, index) => {
          return (
            <View style={styles.viewList}>
              <View style={styles.header}>
                <Image
                  style={styles.imageAvatar}
                  // source={require('../assets/images/castImage1.png')}
                  source={{ uri: item.hinhAnhBanBe }}
                />
                <View style={{ alignSelf: 'center' }}>
                  <Text style={styles.styleTitle}>{item.hoTenBanBe}</Text>
                  <Text style={styles.styleContent}>Ngày tạo: {item.ngayTao}</Text>
                </View>
              </View>

              <View style={styles.body}>
                <Text style={styles.styleTitle}>{item.chuDe}</Text>
                <Text style={styles.styleContent}>{item.noiDung}</Text>

                <View style={styles.imageContainer}>
                  <Image style={styles.imagePoster} source={{ uri: image185(item.hinhAnhPhim) }} />

                  <View style={styles.nameMovieContainer}>
                    <Text style={styles.styleNameMovies}>{item.tenPhim}</Text>
                    <LinearGradient
                      colors={['rgba(255, 255, 255, 0.0)', 'rgba(255, 255, 255, 0.6)']}
                      style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        height: 44,
                        borderRadius: 5, // Điều chỉnh chiều cao của gradient theo mong muốn
                      }}
                    />
                  </View>
                </View>
              </View>

              <View style={styles.footer}>
                <View style={styles.leftIconContainer}>
                  <TouchableOpacity
                    onPress={() => {
                      handleLike('6523a07b075e06d97c19dda0', item.idBaiDang); // Truyền id hoặc thuộc tính duy nhất đại diện cho mục
                    }}
                  >
                    <Icon name="thumbs-up" size={20} color={dataLiked === 1 ? '#19AFDF' : 'white'} />
                  </TouchableOpacity>
                  <Text style={styles.iconText}>{dataLiked}</Text>
                </View>
                <View style={styles.rightIconContainer}>
                  <Text style={styles.iconText2}>{dataPoint}</Text>
                  <Icon name="star" size={20} color="#FFA800" />
                </View>
              </View>

              <View
                style={{
                  width: '100%',
                  height: 0.5,
                  backgroundColor: '#686868',
                  marginBottom: 10,
                  marginTop: 15,
                }}
              ></View>
            </View>
          );
        })}
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

  viewList: {},

  header: {
    flexDirection: 'row',
  },

  body: {
    marginLeft: 15,
    marginRight: 15,
  },

  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between', // This will push the two containers to the opposite ends
    paddingHorizontal: 15,
    marginTop: 10,
  },

  imageAvatar: {
    width: 70,
    height: 70,
    margin: 10,
    borderRadius: 50,
    backgroundColor: 'red',
  },
  imageContainer: {
    position: 'relative',
  },
  imagePoster: {
    width: '100%', // Set the width to take up the full width of the container
    height: 200,
    borderRadius: 5,
    marginTop: 5, // Set the height of the image as needed
  },
  nameMovieContainer: {
    padding: 10, // Add padding for spacing
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
  },
  styleNameMovies: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 20,
    zIndex: 2,
  },

  styleTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  styleContent: {
    color: 'white',
    fontSize: 14,
  },

  leftIconContainer: {
    flexDirection: 'row', // Align the icon and text horizontally
    alignItems: 'center', // Center items vertically
  },
  rightIconContainer: {
    flexDirection: 'row', // Align the icon and text horizontally
    alignItems: 'center', // Center items vertically
  },
  iconText: {
    color: 'white',
    marginLeft: 5,
    marginTop: 4 // Add margin between icon and text
  },
  iconText2: {
    color: 'white',
    marginRight: 5,
    marginTop: 4
    // Add margin between icon and text
  },
});
