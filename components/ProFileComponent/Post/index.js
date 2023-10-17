import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { StyleSheet, View, Text, TouchableOpacity, FlatList} from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { getDataStorage} from '../../../config/Storage';
import { getUserFriendsListApi } from '../../../api/apiApp';
import { Friend } from '../../FriendComponent/Friend';
const Tab = createMaterialTopTabNavigator();

//Tab danh sách bài đăng
const MyPostList = ()=>{
  return (
    <View style={style.bodyContainer}>

    </View>
  );
}

//Tab danh sách người dùng
const FriendList = ()=>{
  const [danhSachNguoiDung, setDanhSachNguoiDung] = useState();
  useEffect(() => {
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      getDanhSachNguoiDung();
    }, [])
  );

  //Khi khởi động trang
  const getDanhSachNguoiDung = async ()=>{
    const id = await getDataStorage({ nameData: 'idUser' });
    const result = await getUserFriendsListApi(id);
    setDanhSachNguoiDung(result);
  }

  return(
    <View style={style.bodyContainer}>
      <FlatList
        data={danhSachNguoiDung}
        keyExtractor={item => item._id}
        renderItem={({item})=><Friend id={item._id} hoTen={item.hoTen} ngaySinh={item.ngaySinh} moTa={item.moTa} 
                                        hinhAnh ={item.hinhAnh} trangThaiKetBan={item.trangThaiKetBan}/>}
      />
    </View>
  )  
}

export default function Post() {
  return (
    <Tab.Navigator 
      initialRouteName="Bài đăng"
      screenOptions={{
        tabBarLabelStyle: { fontSize: 12 },
        tabBarPressColor: 'rgba(0, 0, 0, 0)',
        tabBarActiveTintColor: 'deepskyblue',
        tabBarIndicatorStyle: {
          backgroundColor: 'deepskyblue'
        },
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: { backgroundColor: 'rgba(0, 0, 0, 0)'},
        headerStyle: {
          elevation: 0,
          shadowOpacity: 0
        }
    }}>
      <Tab.Screen name="Bài đăng" component={MyPostList}/>
      <Tab.Screen name="Bạn bè" component={FriendList}/>
    </Tab.Navigator>
  );
}

const style = StyleSheet.create({
  bodyContainer: {
    flex: 1,
    backgroundColor: '#313230'
  },
});
