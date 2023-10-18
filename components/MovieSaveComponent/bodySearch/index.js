import { StyleSheet, View, TextInput, TouchableWithoutFeedback, Image, Dimensions, Text, FlatList, Button, Alert } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { getSearchMovie, image185 } from '../../../api/flimsDB';
import { TouchableOpacity } from 'react-native-gesture-handler';
import CheckBox from 'expo-checkbox';
import { Dropdown } from 'react-native-element-dropdown';
import { getListSave, deleteStatus } from '../../../api/apiApp';
import { getDataStorage, deleteDataStorage } from '../../../config/Storage';
import Modal from '../../../components/MovieSaveComponent/Modal';

var { width, height } = Dimensions.get('window');

export default function BodySearch({ navigation }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [data, setData] = useState([]);
  const [isSelected, setSelection] = useState(false);
  const [point, setPoint] = useState(-1);
  const [status, setStatus] = useState(-1);
  const [nameMovie, setNameMovie] = useState(-1);
  const [modalVisible, setModalVisible] = useState(false);
  const [dataIsSelected, setDataSelection] = useState(false);
  const [dataPoint, setDataPoint] = useState();
  const [dataStatus, setDataStatus] = useState();
  const [idUser, setIdUser] = useState();
  const [idMovie, setIdMovie] = useState();
  const dataDropDow = [
    { id: -1, name: 'Xem tất cả' },
    { id: 0, name: 'Chưa xem' },
    { id: 1, name: 'Đã xem' },
    { id: 2, name: 'Sắp xem' },
  ];
  const dataDropDowPoint = [
    { id: -1, name: 'All' },
    { id: 0, name: '0' },
    { id: 1, name: '1' },
    { id: 2, name: '2' },
    { id: 3, name: '3' },
    { id: 4, name: '4' },
    { id: 5, name: '5' },
    { id: 6, name: '6' },
    { id: 7, name: '7' },
    { id: 8, name: '8' },
    { id: 9, name: '9' },
    { id: 10, name: '10' },
  ];

  const getDataSave = async () => {
    var love;
    if (isSelected === true) {
      love = 1;
    } else if (isSelected === false) {
      love = -1;
    }
    const idUser = await getDataStorage({ nameData: 'idUser' });
    const details = await getListSave({
      idUser: idUser,
      love: love,
      status: status,
      nameMovie: nameMovie,
      review: point,
    });
    setData(details);
  };

  const search = async () => {
    const idUser = await getDataStorage({ nameData: 'idUser' });
    var love = isSelected ? 1 : -1;
    const details = await getListSave({
      idUser: idUser,
      love: love,
      status: status,
      nameMovie: searchQuery,
      review: status,
    });
    setData(details);
  };

  const handelDelete = async (idMovie) => {
    const idUser = await getDataStorage({ nameData: 'idUser' });

    const result = await deleteStatus({ idMovie: idMovie, idUser: idUser });
    if (result.message === 'Xóa thành công') {
      getDataSave();
      alert(result.message);
    }
  };

  const handlerShare = (idUser, idReview, imageMovie, nameMovie) => {
    navigation.navigate('ShareScreen', {
      idUser: idUser,
      idReview: idReview,
      imageMovie: imageMovie,
      nameMovie: nameMovie,
    });
  };

  useEffect(() => {
    getDataSave();
  }, [point, status, searchQuery, isSelected]);

  useFocusEffect(
    React.useCallback(() => {
      getDataSave();
    }, [modalVisible]),
  );

  const openModal = () => {
    setModalVisible(true);
  };

  const renderItem = ({ item, index }) => {
    let yeuThich;
    if (item.yeuThich === 0) {
      yeuThich = 'N/A';
    } else {
      yeuThich = 'Yêu Thích';
    }
    var love;
    if (isSelected === true) {
      love = 1;
    } else if (isSelected === false) {
      love = -1;
    }
    return (
      <View>
        <TouchableWithoutFeedback
          key={index}
          onPress={() => {
            navigation.navigate('DetailScreen', {
              itemId: item.idPhim,
            });
          }}
        >
          <View style={styles.viewItem}>
            <Image source={{ uri: image185(item.hinhAnh) }} style={{ width: 80, height: 130, borderRadius: 15 }} />

            <View style={{ marginLeft: 15 }}>
              <Text style={{ color: '#F8EE0D', fontSize: 25, fontWeight: 'bold', marginTop: 5 }}>{item.tenPhim.length > 20 ? item.tenPhim.slice(0, 15) + '...' : item.tenPhim}</Text>
              <Text style={styles.text_two}>
                <Text style={styles.text_one}>Đánh giá: </Text>
                {item.danhGia === -1 ? 'Chưa đánh giá' : item.danhGia}
              </Text>

              <Text style={styles.text_two}>
                <Text style={styles.text_one}>Trạng thái xem: </Text>
                {item.trangThaiXem === 0 ? 'Chưa xem' : item.trangThaiXem === 2 ? 'Sắp xem' : item.trangThaiXem === 1 ? 'Đã xem' : 'Trạng thái không rõ'}
              </Text>
              <Text style={{ color: '#FFA800', fontSize: 15, marginTop: 5, fontWeight: 'bold' }}>Yêu thích: {yeuThich}</Text>
            </View>
          </View>
        </TouchableWithoutFeedback>

        <View style={styles.viewButton}>
          <TouchableOpacity
            key={index}
            style={styles.button}
            onPress={async () => {
              const idUser = await getDataStorage({ nameData: 'idUser' });
              openModal();
              setDataPoint(item.danhGia);
              setDataStatus(item.trangThaiXem);
              setDataSelection(item.yeuThich);
              setIdUser(idUser);
              setIdMovie(item.idPhim);
            }}
          >
            <Text style={styles.buttonText}>Sửa</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button2}
            onPress={() => {
              handlerShare(item.idNguoiDung, item._id, item.hinhAnh, item.tenPhim);
            }}
          >
            <Text style={styles.buttonText}>Chia sẻ</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              Alert.alert(
                'Bạn có muốn xóa?',
                '',
                [
                  {
                    text: 'Cancel',
                    onPress: () => {},
                    style: 'cancel',
                  },
                  {
                    text: 'OK',
                    onPress: () => {
                      handelDelete(item.idPhim);
                    },
                  },
                ], // Thêm ngoặc đóng ở đây
              );
            }}
          >
            <Text style={styles.buttonText}>Xoá</Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            width: '100%',
            height: 0.5,
            backgroundColor: '#686868',
            marginBottom: 10,
            marginTop: 5,
          }}
        ></View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput style={styles.textInput} value={searchQuery} onChangeText={(text) => setSearchQuery(text)} placeholder="Search" />
        <TouchableOpacity
          onPress={() => {
            search();
          }}
        >
          <Icon name="search" size={25} color={'#848484'} style={styles.icon} />
        </TouchableOpacity>
      </View>

      <View style={styles.checkboxContainer}>
        <CheckBox value={isSelected} onValueChange={setSelection} style={{ marginLeft: 4, borderColor: 'white' }} />
        <Text style={{ color: 'white', marginLeft: 5 }}>Yêu thích</Text>
        <Modal visible={modalVisible} point={dataPoint} status={dataStatus} like={dataIsSelected} idUser={idUser} idMovie={idMovie} onClose={() => setModalVisible(false)} />

        <View style={{ flexDirection: 'row', flex: 1, justifyContent: 'flex-end' }}>
          <Dropdown
            style={styles.dropdown}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            iconStyle={styles.iconStyle}
            labelField="name"
            data={dataDropDow}
            maxHeight={300}
            valueField="id"
            value={status}
            onChange={(item) => {
              setStatus(item.id);
            }}
          />

          <Dropdown
            style={styles.dropdown2}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            iconStyle={styles.iconStyle}
            labelField="name"
            data={dataDropDowPoint}
            maxHeight={300}
            valueField="id"
            value={point}
            onChange={async (item) => {
              setPoint(item.id);
            }}
          />
        </View>
      </View>

      <View>
        <FlatList
          style={{ height: 534 }}
          data={data}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}

          // numColumns={false} // Chia thành hai cột
          // columnWrapperStyle={{ justifyContent: 'space-between' }} // Điều chỉnh khoảng cách giữa các cột
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '95%',
    height: 40,
    borderWidth: 2,
    borderColor: '#848484',
    paddingLeft: 10,
    paddingRight: 10,
    alignSelf: 'center',
  },
  textInput: {
    flex: 1,
    color: 'white',
  },
  icon: {
    marginLeft: 10,
  },

  viewItem: {
    flexDirection: 'row',
    marginLeft: 5,
    padding: 5,
  },
  text_one: {
    color: 'white',
    fontSize: 15,
    fontWeight: 'bold',
    marginTop: 5,
  },
  text_two: {
    fontSize: 15,
    color: 'white',
    marginTop: 5,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 5,
    marginTop: 10,
  },

  dropdown: {
    width: 120,
    height: 50,
    marginRight: 10,
  },
  dropdown2: {
    width: 65,
    height: 50,
  },
  placeholderStyle: {
    fontSize: 16,
    color: 'white',
  },
  selectedTextStyle: {
    fontSize: 16,
    color: 'white',
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  button: {
    backgroundColor: '#19AFDF',
    width: 100,
    height: 30,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10,
    marginRight: 10,
  },
  button2: {
    backgroundColor: '#19AFDF',
    width: 150,
    height: 30,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  viewButton: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 10,
  },
});
