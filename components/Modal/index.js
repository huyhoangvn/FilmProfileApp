import { Modal, StyleSheet, Text, TextInput, View, TouchableOpacity } from 'react-native';
import CheckBox from 'expo-checkbox';
import React, { useEffect, useState } from 'react';
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from '@expo/vector-icons/AntDesign';

function Modal2({ visible, onClose, onAdd }) {
  const [isSelected, setSelection] = useState(true);
  const [value, setValue] = useState(null);
  const [data, setData] = useState([]);
  const [nameTable, setNameTable] = useState('');
  const [idTableType, setIdTableType] = useState('');
  const [isAddSuccess, setIsAddSuccess] = useState(false); // Thêm trạng thái mới

  const getAPI = () => {
    var requestOptions = {
      method: 'GET',
      redirect: 'follow',
    };

    fetch('http://localhost:3000/lb/api/get', requestOptions)
      .then((response) => response.json())
      .then((result) => setData(result))
      .catch((error) => console.log('error', error));
  };

  const addTable = () => {
    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    var raw = JSON.stringify({
      tableType: idTableType,
      nameTable: nameTable,
      statusTable: isSelected,
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    };

    fetch('http://localhost:3000/ban/api/add', requestOptions)
      .then((response) => response.json())
      .then((result) => onAdd(result))
      .catch((error) => console.log('error', error));
    setIsAddSuccess(true);
  };

  const getData = () => {
    var requestOptions = {
      method: 'GET',
      redirect: 'follow',
    };

    fetch('http://localhost:3000/ban/api/get', requestOptions)
      .then((response) => response.json())
      .then((result) => setData(result))
      .catch((error) => console.log('error', error));
    setRefreshing(false); // Cập nhật biến đánh dấu khi có dữ liệu mới
  };

  useEffect(() => {
    getAPI(); // Khi trạng thái isAddSuccess thay đổi, kiểm tra nếu thành công thì đóng modal
    if (isAddSuccess) {
      onClose();
    }
  }, [isAddSuccess]);

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
          <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 20 }}>Thêm Bàn</Text>

          <Dropdown
            style={styles.dropdown}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            labelField="nameTableType" // Thay thế "nameTableType" bằng trường tương ứng trong dữ liệu API
            data={data}
            search
            maxHeight={300}
            valueField="_id"
            placeholder="Select item"
            searchPlaceholder="Search..."
            value={value}
            onChange={(item) => {
              setValue(item._id);
              setIdTableType(item._id);
            }}
            renderLeftIcon={() => (
              <AntDesign style={styles.icon} color="black" name="Safety" size={20} />
            )}
          />

          <View>
            <TextInput
              style={styles.textInput}
              placeholder="Nhập Loại Bàn"
              onChangeText={(data) => {
                setNameTable(data);
              }}
            />
          </View>

          <View style={styles.checkboxContainer}>
            <CheckBox value={isSelected} onValueChange={setSelection} style={styles.checkbox} />
            <Text style={styles.label}>Trạng Thái</Text>
          </View>

          <View style={{ flexDirection: 'row', marginTop: 20 }}>
            <TouchableOpacity style={styles.button} onPress={addTable}>
              <Text style={styles.buttonText}>Add</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={onClose}>
              <Text style={styles.buttonText}>Huỷ</Text>
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
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
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
    width: 300,
    margin: 16,
    height: 50,
    borderBottomColor: 'gray',
    borderBottomWidth: 0.5,
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

export default Modal2;
