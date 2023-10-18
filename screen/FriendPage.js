import { StyleSheet, View, Text, Image, Button, TouchableOpacity, SafeAreaView } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';

import { ScrollView, TextInput } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';
import { addLikePost, deleteLikePost, getLikePost, getPostFriend, getPointReview } from '../api/apiApp';
import { image185 } from '../api/flimsDB';
import { getDataStorage } from '../config/Storage';
import { LinearGradient } from 'expo-linear-gradient';

function Header({ navigation }) {
  return (
    <View style={styles.headercontainer}>
      <View style={styles.headerTitleContainer}>
        <Text style={styles.headerTitle}>Bài đăng người theo dõi</Text>
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

export default function FriendPage({ navigation }) {
  const [data, setData] = useState([]);
  const [likes, setLikes] = useState({}); // Sử dụng một đối tượng để lưu dữ liệu likes
  const [points, setPoints] = useState({}); // Sử dụng một đối tượng để lưu dữ liệu điểm đánh giá

  const getDataApi = async () => {
    const idUser = await getDataStorage({ nameData: 'idUser' });
    try {
      const details = await getPostFriend({
        idUser: idUser,
      });
      setData(details);

      const likesData = {};
      const pointsData = {};

      for (const item of details) {
        const result = await getLikePost({ idPost: item.idBaiDang });
        likesData[item.idBaiDang] = result;

        const pointResult = await getPointReview({ idMovie: item.idPhim });
        pointsData[item.idBaiDang] = pointResult.ketQuaDanhGia;
      }

      setLikes(likesData);
      setPoints(pointsData);
    } catch (error) {
      console.log('lỗi data mẹ rồi' + error);
    }
  };

  useEffect(() => {
    getDataApi();
  }, []);

  const handleLike = async (idPost) => {
    const idUser = await getDataStorage({ nameData: 'idUser' });
    if (!likes[idPost]) {
      // Nếu chưa like, gọi hàm addLikePost
      await addLikePost({ idUser: idUser, idPost: idPost });

      // Cập nhật trạng thái liked của mục và màu của biểu tượng like
      setLikes((prevLikes) => ({
        ...prevLikes,
        [idPost]: 1,
      }));
    } else {
      // Nếu đã like, gọi hàm deleteLikePost
      await deleteLikePost({ idUser: idUser, idPost: idPost });

      // Cập nhật trạng thái liked của mục và màu của biểu tượng like
      setLikes((prevLikes) => ({
        ...prevLikes,
        [idPost]: 0,
      }));
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Header navigation={navigation}></Header>
      </View>
      <ScrollView contentContainerStyle={{ paddingHorizontal: 1 }}>
        {data.map((item, index) => {
          return (
            <View style={styles.viewList} key={item.idBaiDang}>
              <View style={styles.header}>
                <Image style={styles.imageAvatar} source={{ uri: item.hinhAnhBanBe }} />
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
                        borderRadius: 5,
                      }}
                    />
                  </View>
                </View>
              </View>

              <View style={styles.footer}>
                <View style={styles.leftIconContainer}>
                  <TouchableOpacity
                    onPress={() => {
                      handleLike(item.idBaiDang);
                    }}
                  >
                    <Icon name="thumbs-up" size={20} color={likes[item.idBaiDang] === 1 ? '#19AFDF' : 'white'} />
                  </TouchableOpacity>
                  <Text style={styles.iconText}>{likes[item.idBaiDang]}</Text>
                </View>
                <View style={styles.rightIconContainer}>
                  {points[item.idBaiDang] === -1 ? (
                      <Icon name="star" size={20} color="#FFA800" />
                  ) : (
                    <React.Fragment>
                      <Text style={styles.iconText2}>{points[item.idBaiDang]}</Text>
                      <Icon name="star" size={20} color="#FFA800" />
                    </React.Fragment>
                  )}
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
    marginTop: 4, // Add margin between icon and text
  },
  iconText2: {
    color: 'white',
    marginRight: 5,
    marginTop: 4,
    // Add margin between icon and text
  },
});
