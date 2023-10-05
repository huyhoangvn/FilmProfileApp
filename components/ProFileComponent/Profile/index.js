import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
// import styles from './style';
import Icon from 'react-native-vector-icons/FontAwesome'; // Chọn một tên biểu tượng từ thư viện
import { LoginApi, getInfor } from '../../../api/apiApp';
import { getDataStorage, deleteDataStorage } from '../../../config/Storage';
import { Asset } from 'expo-asset';
export default function Profile({ navigation,refreshing}) {
  const defaultImg  = Asset.fromModule(require('../../../assets/avt_default.png'));
  const [avartaUser, setAvartaUser] = useState('');
  const [nameUser, setNameUser] = useState('');
  const [birdUser, setBirdUser] = useState('');
  const [sexUser, setSexUser] = useState('');
  const [introduceUser, setIntroduceUser] = useState('');

  const [followerUser, setFollowerUser] = useState('');
  const [follow, setFollow] = useState('');
  console.log(nameUser);

  console.log('đâsdasdsa' + refreshing)


  const getUserInfor = async () => {
    // if (refreshing) {
      const idUser = await getDataStorage({ nameData: 'idUser' });
      const result = await getInfor({ id: idUser });
      var avatar = result.hinhAnh;
      var name = result.hoTen;
      var bird = result.ngaySinh;
      var sex = result.gioiTinh === 1 ? 'Nữ' : 'Nam';
      var introduce = result.moTa;

      setAvartaUser(avatar);
      setNameUser(name);
      setBirdUser(bird);
      setSexUser(sex);
      setIntroduceUser(introduce);
    }
  // };

  useEffect(() => {
    getUserInfor();
  }, [refreshing]);

  return (
    <View>
      <Image
          style={styles.styleImg}
          source={{ uri: avartaUser ? avartaUser : (defaultImg.uri || '') }}
          

        />
      <Icon style= {styles.styleIcon} name='pencil-square' size = {30} color={'white'} onPress={  () =>{
            navigation.navigate('EditScreen')
      }}  ></Icon>
      <View style={styles.viewInfor}>
      
        <Text style={{ marginTop: 5, color: 'white', fontSize: 25, fontWeight: 'bold' }}>
          {nameUser}
        </Text>

        <Text style={styles.textInfo}>Ngày sinh: {birdUser}</Text>
        <Text style={styles.textInfo}>Giới tính: {sexUser}</Text>

        <Text style={{ marginTop: 10, color: 'white', fontSize: 15 }}>{introduceUser}</Text>

        <View style={styles.viewFollow}>
          <Text style={styles.textFollow}>98 đang theo dõi</Text>
          <Text style={styles.textFollow}>69 người theo dõi</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  viewInfor: {
    alignItems: 'center',
  },
  styleImg: {
    width: 150,
    height: 150,
    borderRadius: 100,
    resizeMode: 'cover',
    backgroundColor: 'red',
    alignSelf: 'center',
    
  },
  textInfo: {
    marginTop: 5,
    color: 'white',
    fontSize: 12,
  },
  viewFollow: {
    flexDirection: 'row',
    marginTop: 15,
  },
  textFollow: {
    color: 'white',
    marginLeft: 20,
    marginRight: 20,
  },
  styleIcon: {
    position: 'absolute',
    top: 120,
    right: 138,
    zIndex: 1,
  }
});


