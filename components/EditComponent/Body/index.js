import { View, Text, TouchableOpacity, StyleSheet, Image, TextInput } from 'react-native';
import React, { useEffect, useState, useMemo } from 'react';
// import styles from './style';
import * as ImagePicker from 'expo-image-picker';
import Icon from 'react-native-vector-icons/FontAwesome';
import RadioGroup from 'react-native-radio-buttons-group';
import { Asset } from 'expo-asset';

// Chọn một tên biểu tượng từ thư viện
import { getInfor, editProFile } from '../../../api/apiApp';
import { getDataStorage, deleteDataStorage } from '../../../config/Storage';
export default function Body({ navigation }) {
  const defaultImg  = Asset.fromModule(require('../../../assets/avt_default.png'));
  const [avartaUser, setAvartaUser] = useState('');
  const [nameUser, setNameUser] = useState('');
  const [birdUser, setBirdUser] = useState('');
  const [sexUser, setSexUser] = useState('');
  const [introduceUser, setIntroduceUser] = useState('');
  const [followerUser, setFollowerUser] = useState('');
  const [follow, setFollow] = useState('');
  const [selectedId, setSelectedId] = useState();

  console.log(selectedId);

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
    setSelectedId(result.gioiTinh);
  };
  useEffect(() => {
    getUserInfor();
  }, []);

  const radioButtons = useMemo(
    () => [
      {
        id: 1,
        label: 'Nữ',
        value: 2,
      },
      {
        id: 2, // acts as primary key, should be unique and non-empty string
        label: 'Nam',
        value: '1',
      },
      {
        id: '3',
        label: 'Khác',
        value: 3,
      },
    ],
    [],
  );
  /// editProfile
  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
  
    if (!result.canceled && result.assets && result.assets.length > 0) {
    await setAvartaUser(result.assets[0].uri);
    } else {
      return null;
    }
  };
  

  const handlerEdit = async () => {
    const idUser = await getDataStorage({ nameData: 'idUser' });
    const result = await editProFile({
      id: idUser,
      name: nameUser,
      bird: birdUser,
      sex: selectedId,
      introduce: introduceUser,
      image: avartaUser,
    });
    console.log(result);
  };
  console.log('aaaaa' + selectedId)
  return (
    <View>
      <Image
        style={styles.styleImg}
        source={{ uri: avartaUser ? avartaUser : (defaultImg.uri || '') }}
      />
      <Icon
        style={styles.styleIcon}
        name="pencil-square"
        size={30}
        color={'white'}
        onPress={() => {
          pickImage();
        }}
      ></Icon>
      <View style={styles.viewInfor}>
        <Text style={styles.styleText}>Họ và tên </Text>
        <TextInput
          style={styles.textInput}
          value={nameUser}
          onChangeText={(data) => {
            setNameUser(data);
          }}
        />

        <Text style={styles.styleText}>Ngày Sinh</Text>
        <TextInput
          style={styles.textInput}
          value={birdUser}
          onChangeText={(data) => {
            setBirdUser(data);
          }}
        />
        <Text style={styles.styleText}>Giới tính</Text>
        <View style={styles.viewRadio}>
          <RadioGroup
            radioButtons={radioButtons}
            onPress={setSelectedId}
            selectedId={selectedId}
            layout="row"
          />
        </View>

        <Text style={styles.styleText}>Mô tả</Text>
        <TextInput
          style={{
            width: 334,
            height: 140,
            borderColor: '#909090',
            borderWidth: 0.5,
            alignSelf: 'center',
            marginTop: 10,
            paddingLeft: 10,
            borderRadius: 5,
            color: 'white',
          }}
          placeholder="Nhập mô tả..."
          placeholderTextColor="white" // Đặt màu cho placeholder
          multiline={true} // Cho phép nhập nhiều dòng
          numberOfLines={4}
          value={introduceUser}
          onChangeText={(data) => {
            setIntroduceUser(data);
          }}
        />
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            handlerEdit();
          }}
        >
          <Text style={styles.buttonText}>SIGN IN</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  viewInfor: {
    marginTop: 0,
  },
  styleImg: {
    width: 150,
    height: 150,
    borderRadius: 100,
    resizeMode: 'cover',
    backgroundColor: 'red',
    alignSelf: 'center',
  },
  styleIcon: {
    position: 'absolute',
    top: 120,
    right: 138,
    zIndex: 1,
  },
  styleText: {
    marginLeft: 30,
    fontSize: 15,
    fontWeight: 'bold',
    color: 'white',
    marginTop: 20,
  },
  textInput: {
    width: 334,
    height: 54,
    borderColor: '#909090',
    borderWidth: 0.5,
    alignSelf: 'center',
    marginTop: 10,
    paddingLeft: 10,
    borderRadius: 5,
    color: 'white',
  },
  viewRadio: {
    marginLeft: 70,
    marginRight: 70,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 20,
    marginTop: 20,
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
