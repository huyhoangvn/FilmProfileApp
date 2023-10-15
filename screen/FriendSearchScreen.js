import { FlatList, StyleSheet, View, Text, Image, Button, TouchableOpacity, SafeAreaView } from 'react-native';
import React, { useEffect, useState } from 'react';
import { TextInput } from 'react-native-gesture-handler';
import CheckBox from 'expo-checkbox';
import Icon from 'react-native-vector-icons/FontAwesome';
import { getDataStorage, deleteDataStorage } from '../config/Storage';
import { getUsersListApi } from '../api/apiApp';
import { Friend } from '../components/FriendComponent/Friend';

//Header
const Header = ({ navigation })=>{
  return (
    <View style={styles.headerContainer}>
      <View style={styles.headerViewText}>
        <Text style={styles.headertext}>
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}>
            <Icon name="arrow-left" size={25} color={'white'}></Icon>
          </TouchableOpacity>
        </Text>
      </View>

      <View style={styles.viewTitle}>
        <Text style={styles.viewTitle}>Danh sách người dùng</Text>
      </View>
    </View>
  );
}

//Body
const Body = ()=>{
  const [danhSachNguoiDung, setDanhSachNguoiDung] = useState();
  const [tenTimKiem, setTenTimKiem] = useState("");
  const [trang, setTrang] = useState(1);

  useEffect(() => {
    getDanhSachNguoiDung();
  }, [tenTimKiem, trang]);

  //Khi khởi động trang
  const getDanhSachNguoiDung = async ()=>{
    const id = await getDataStorage({ nameData: 'idUser' });
    const result = await getUsersListApi(id, tenTimKiem, trang);
    setDanhSachNguoiDung(result);
  }

  const onLeftPress = ()=>{
    if(trang > 1){
      setTrang(trang-1);
    }
  }

  const onRightPress = ()=>{
    if(trang >= 1){
      setTrang(trang+1);
    }
  }

  return (
    <View style={styles.bodyContainer}>
      <TextInput
        style={styles.input}
        onChangeText={setTenTimKiem}
        placeholderTextColor={"#fff"}
        value={tenTimKiem}
        placeholder="Tìm kiếm tên"
        keyboardType="default"
      />
      <View style={{flexDirection:'row', justifyContent:'space-between', marginLeft: 20, marginRight: 20, marginBottom: 10, alignItems: 'center'}}>
        <TouchableOpacity style={ {color: 'white'}} onPress={onLeftPress}>
            <Text style={{color:'white', fontSize: 20}}>{'<'}</Text>
        </TouchableOpacity>
        <Text style={{color: 'white'}}>{trang}</Text>
        <TouchableOpacity style={ {color: 'white'}} onPress={onRightPress}>
            <Text style={{color:'white', fontSize: 20}}>{'>'}</Text>
        </TouchableOpacity>
      </View>
      {/* {console.log(danhSachNguoiDung)} */}
      <View style={{flex : 1}}>
        <FlatList
          data={danhSachNguoiDung}
          keyExtractor={item => item._id}
          renderItem={({item})=><Friend id={item._id} hoTen={item.hoTen} ngaySinh={item.ngaySinh} moTa={item.moTa} 
                                          hinhAnh ={item.hinhAnh} trangThaiKetBan={item.trangThaiKetBan}/>}
        />
      </View>
    </View>
  );
}

//Screen Container
export default function FriendSearchScreen({navigation}) {
  return(
      <SafeAreaView style={styles.container}>
        <Header navigation={navigation} />
        <Body/>
      </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
      flex:2,
      backgroundColor: '#313230',
  },
  bodyContainer: {
      flex: 1,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
  },
  headerViewText: {
    margin: 15,
  },
  headertext: {
    color: '#DFD719',
    fontSize: 25,
    fontWeight: 'bold',
  },
  viewTitle: { 
    color: 'white', 
    fontSize: 20, 
    fontWeight: 'bold' 
  },
  input: {
    color: 'white',
    borderColor: 'white',
    borderRadius: 5,
    height: 40,
    margin: 10,
    borderWidth: 1,
    padding: 10,
  }
});