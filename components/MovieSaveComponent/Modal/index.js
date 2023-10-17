import { Modal, StyleSheet, Text, TextInput, View, TouchableOpacity } from 'react-native';
import CheckBox from 'expo-checkbox';
import React, { useEffect, useState } from 'react';
import { Dropdown } from 'react-native-element-dropdown';
import { editSaveList } from '../../../api/apiApp';

// import AntDesign from '@expo/vector-icons/AntDesign';

function ModalConFig({ visible, onClose, point, status, like, idUser, idMovie }) {
  // console.log(idUser, idMovie)
  const [pointNew, setPointNew] = useState();
  const [statusNew, setStatusNew] = useState();
  const [likeNew, setLikeNew] = useState();
  const [idUserNew, setIdUserNew] = useState();
  const [idMovieNew, setIdMovieNew] = useState();

  const handlerEdit = async () => {
    const result = await editSaveList({
      idUser: idUser,
      idMovie: idMovie,
      point: pointNew,
      status: statusNew,
      like: likeNew
    });

    if(result.message === 'Sửa thành công'){
      onClose()
    }else{
      alert('Sửa Thất Bại')
    }
    alert(result.message)
  }; 

  useEffect(() => {
    let pointBase;
    let statusBase;
    let likeBase;

    if (point === -1 || status === -1 || like === -1) {
      pointBase = 0;
      statusBase = 0;
      likeBase = 0;
    } else {
      pointBase = point;
      statusBase = status;
      likeBase = like;
    }
    setPointNew(pointBase);
    setStatusNew(statusBase);
    setLikeNew(likeBase);
    // setIdUserNew(idUser)
    // setIdMovieNew()
  }, [point, status, like, idMovie,idUser]); // Chỉ kích hoạt useEffect khi prop 'point' thay đổi

  //

  const dataPoint = [
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

  const dataStatus = [
    { id: 0, name: 'Chưa xem' },
    { id: 1, name: 'Đã xem' },
    { id: 2, name: 'Sắp xem' },
  ];

  const dataLike = [
    { id: 0, name: 'Không' },
    { id: 1, name: 'Có' },
  ];

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={() => {
        onClose();
      }}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.styleText}>Đánh Giá</Text>
          <Dropdown
            style={styles.dropdown}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            labelField="name" // Thay thế "nameTableType" bằng trường tương ứng trong dữ liệu API
            data={dataPoint}
            search
            maxHeight={300}
            valueField="id"
            placeholder="Chọn điểm"
            searchPlaceholder="Search..."
            value={pointNew}
            onChange={(item) => {
              setPointNew(item.id);
              // setPoint(item.id);
            }}
            renderLeftIcon={
              () => null
              // <AntDesign style={styles.icon} color="black" name="Safety" size={20} />
            }
          />

          <Text style={styles.styleText}>Trạng Thái Xem</Text>
          <Dropdown
            style={styles.dropdown}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            labelField="name" // Thay thế "nameTableType" bằng trường tương ứng trong dữ liệu API
            data={dataStatus}
            search
            maxHeight={300}
            valueField="id"
            placeholder="Chọn trạng thái"
            searchPlaceholder="Search..."
            value={statusNew}
            onChange={(item) => {
              // setValue(item._id);
              setStatusNew(item.id);
            }}
            renderLeftIcon={
              () => null
              // <AntDesign style={styles.icon} color="black" name="Safety" size={20} />
            }
          />

          <Text style={styles.styleText}>Yêu Thích</Text>

          <Dropdown
            style={styles.dropdown}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            labelField="name" // Thay thế "nameTableType" bằng trường tương ứng trong dữ liệu API
            data={dataLike}
            search
            maxHeight={300}
            valueField="id"
            // placeholder="Select item"
            searchPlaceholder="Search..."
            value={likeNew}
            onChange={(item) => {
              // setValue(item._id);
              setLikeNew(item.id);
            }}
            renderLeftIcon={
              () => null
              // <AntDesign style={styles.icon} color="black" name="Safety" size={20} />
            }
          />

          <View style={{ flexDirection: 'row', marginTop: 20, alignSelf: 'center' }}>
          <TouchableOpacity style={styles.button} onPress={onClose}>
              <Text style={styles.buttonText}>Huỷ</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.button} onPress={() =>{
              handlerEdit()
            }}>
              <Text style={styles.buttonText}>Sửa</Text>
            </TouchableOpacity>

           
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 30,
    marginLeft: 20,  // Điều chỉnh giá trị marginLeft tại đây
    marginRight: 20, // Điều chỉnh giá trị marginRight tại đây
    maxWidth: '100%',
    maxHeight: "50%",  // Để tránh modal quá rộng, bạn có thể sử dụng maxWidth
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },

  button: {
    alignSelf: 'center',
    backgroundColor: 'blue',
    width: 100,
    height: 40,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10,
    marginRight: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },

  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  styleText: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 20,
    marginLeft: 15,
  },
  textInput: {
    width: 300,
    height: 50,
    borderColor: 'black',
    borderWidth: 0.5,
    alignSelf: 'center',
    marginTop: 25,
    paddingLeft: 10,
    borderRadius: 5,
  },

  checkboxContainer: {
    flexDirection: 'row',
    marginTop: 20,
    marginLeft: -180,
  },
  checkbox: {
    alignSelf: 'center',
  },
  label: {
    margin: 8,
  },

  selectedItem: {
    borderRadius: 10,
  },

  dropdown: {
    width: 320,
    margin: 15,
    height: 50,
    borderWidth: 1,
    borderBottomColor: 'black',
    padding: 10,
    borderRadius: 5,
  },
  icon: {
    marginRight: 5,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});

export default ModalConFig;
