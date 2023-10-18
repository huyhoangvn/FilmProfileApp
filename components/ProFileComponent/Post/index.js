import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { StyleSheet, View, Text, TouchableOpacity, FlatList, ScrollView, Image} from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { getDataStorage } from '../../../config/Storage';
import { getUserFriendsListApi,addLikePost,getPostUser, getPointReview,getLikePost,deleteLikePost } from '../../../api/apiApp';
import { Friend } from '../../FriendComponent/Friend';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome';
import { image185 } from '../../../api/flimsDB';

const Tab = createMaterialTopTabNavigator();

//Tab danh sách bài đăng
const MyPostList = () => {

  const [data, setData] = useState([])
  const [likes, setLikes] = useState({}); // Sử dụng một đối tượng để lưu dữ liệu likes
  const [points, setPoints] = useState({});



  const getDataApi = async () => {
    const idUser = await getDataStorage({ nameData: 'idUser' });
    try {
      const details = await getPostUser({
        idUser: idUser,
      });
      setData(details);
      const likesData = {};
      const pointsData = {};

      for (const item of details) {
        const result = await getLikePost({ idPost: item._id });
        likesData[item._id] = result;
        const pointResult = await getPointReview({ idMovie: item.idPhim });
        pointsData[item._id] = pointResult.ketQuaDanhGia;
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
  useEffect(() => {
    getDataApi()
  },[])
  useFocusEffect(
    React.useCallback(() => {
      getDataApi()
    }, []),
  );

  // useEffect(() => {
  //   getDataApi()
  // },[])
  return (
    <View style={styles.bodyContainer}>
    
      <ScrollView contentContainerStyle={{ paddingHorizontal: 1 }}>
        {data.map((item, index) => {
          return (
            <View style={styles.viewList} key={item._id}>
              <View style={styles.header}>
                <Image style={styles.imageAvatar} source={{ uri: item.hinhAnh }} />
                <View style={{ alignSelf: 'center' }}>
                  <Text style={styles.styleTitle}>{item.hoTen}</Text>
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
                      handleLike(item._id);
                    }}
                  >
                    <Icon name="thumbs-up" size={20} color={likes[item._id] === 1 ? '#19AFDF' : 'white'} />
                  </TouchableOpacity>
                  <Text style={styles.iconText}>{likes[item._id]}</Text>
                </View>
                <View style={styles.rightIconContainer}>
                  {points[item._id] === -1 ? (
                    <Icon name="star" size={20} color="#FFA800" />
                  ) : (
                    <React.Fragment>
                      <Text style={styles.iconText2}>{points[item._id]}</Text>
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
    </View>
  );
};

//Tab danh sách người dùng
const FriendList = () => {
  const [danhSachNguoiDung, setDanhSachNguoiDung] = useState();
  useEffect(() => {}, []);

  useFocusEffect(
    React.useCallback(() => {
      getDanhSachNguoiDung();
    }, []),
  );

  //Khi khởi động trang
  const getDanhSachNguoiDung = async () => {
    const id = await getDataStorage({ nameData: 'idUser' });
    const result = await getUserFriendsListApi(id);
    setDanhSachNguoiDung(result);
  };

  return (
    <View style={styles.bodyContainer}>
      <FlatList
        data={danhSachNguoiDung}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => <Friend id={item._id} hoTen={item.hoTen} ngaySinh={item.ngaySinh} moTa={item.moTa} hinhAnh={item.hinhAnh} trangThaiKetBan={item.trangThaiKetBan} />}
      />
    </View>
  );
};

export default function Post() {
  return (
    <Tab.Navigator
      initialRouteName="Bài đăng"
      screenOptions={{
        tabBarLabelStyle: { fontSize: 12 },
        tabBarPressColor: 'rgba(0, 0, 0, 0)',
        tabBarActiveTintColor: 'deepskyblue',
        tabBarIndicatorStyle: {
          backgroundColor: 'deepskyblue',
        },
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: { backgroundColor: 'rgba(0, 0, 0, 0)' },
        headerStyle: {
          elevation: 0,
          shadowOpacity: 0,
        },
      }}
    >
      <Tab.Screen name="Bài đăng" component={MyPostList} />
      <Tab.Screen name="Bạn bè" component={FriendList} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  bodyContainer: {
    flex: 1,
    backgroundColor: '#313230',
  },
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
    height: 130,
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
