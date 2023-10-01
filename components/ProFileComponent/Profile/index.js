import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
// import styles from './style';
import { LoginApi, getInfor } from '../../../api/apiApp';
import { getDataStorage , deleteDataStorage} from '../../../config/Storage';
export default function Profile({ navigation }) {
  const [avartaUser, setAvartaUser] = useState('');
  const [nameUser, setNameUser] = useState('');
  const [birdUser, setBirdUser] = useState('');
  const [sexUser, setSexUser] = useState('');
  const [introduceUser, setIntroduceUser] = useState('');
  const [followerUser, setFollowerUser] = useState('');
  const [follow, setFollow] = useState('');

  console.log(nameUser);

  const getUserInfor = async () => {
    const idUser = await getDataStorage({ nameData: 'idUser' });
    console.log(idUser);
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

    console.log(result);
  };

  useEffect(() => {
    getUserInfor();
  }, []);

  return (
    <View>
      <View style={styles.viewInfor}>
        <Image
          style={styles.styleImg}
          source={{ uri: avartaUser[0] }} 
          defaultSource={require('../../../img/header_img.png')} // Đường dẫn đến hình ảnh mặc định
// Sử dụng URI của ảnh làm nguồn
        />
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
    backgroundColor: 'red',
    borderRadius: 100,
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
});