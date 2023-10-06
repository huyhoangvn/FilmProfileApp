import { StyleSheet, View, Text, Image, Button, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { TextInput } from 'react-native-gesture-handler';
import CheckBox from 'expo-checkbox';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/FontAwesome';
import { getDataStorage, deleteDataStorage } from '../../../config/Storage';
import { detailMovies, image500, getCastMovie } from '../../../api/flimsDB';
import { saveMovies, getStatus, deleteStatus } from '../../../api/apiApp';

export default function Header({ navigation, data }) {
  const [isSelected, setSelected] = useState(false);
  const [colorIcon, setColorIcon] = useState('white');

  useEffect(() => {
    if (data && data.id) {
      getDataStatus();
    }
  }, [data]);

  const getDataStatus = async () => {
    const idUser = await getDataStorage({ nameData: 'idUser' });
    const dataAsString = JSON.stringify(data);
    const parsedData = JSON.parse(dataAsString);
    const status = await getStatus({ idMovie: parsedData.id, idUser: idUser });
    if (status.data === true) {
      setSelected(true);
      setColorIcon('red');
    } else {
      setSelected(false);
      setColorIcon('white');
    }
    // console.log('cccc ' + status);
    // console.log('a  ' + parsedData.id, idUser);
  };

  const deleteDataStatus = async () => {
    setColorIcon('white'); 
    const idUser = await getDataStorage({ nameData: 'idUser' });
    const dataAsString = JSON.stringify(data);
    const parsedData = JSON.parse(dataAsString);
    await deleteStatus({ idMovie: parsedData.id, idUser: idUser });


    setSelected(false);
  };

  const saveMoviesApi = async () => {
    setColorIcon('red');
    const idUser = await getDataStorage({ nameData: 'idUser' });
    const dataAsString = JSON.stringify(data);
    const parsedData = JSON.parse(dataAsString);
    await saveMovies({
      id: idUser,
      idMovie: parsedData.id,
      nameMovie: parsedData.title,
      imageMovie: parsedData.poster_path,
    });


    setSelected(true);
  };

  const handleIconPress = async () => {
    if (isSelected) {
      await deleteDataStatus();
    } else {
      await saveMoviesApi();
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.viewText}>
        <Text style={styles.text_two}>
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}>
            <Icon name="arrow-left" size={25} color={'white'}></Icon>
          </TouchableOpacity>
        </Text>
      </View>

      <View style={styles.viewTitle}>
        <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}>Chi tiết phim</Text>
      </View>

      <View style={styles.viewIcon}>
        <TouchableOpacity
          onPress={() => {
            handleIconPress();
          }}>
          <Icon name="bookmark" color={colorIcon} size={25} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'relative',
  },

  viewText: {
    margin: 15,
  },
  text_one: {
    color: '#DFD719',
    fontSize: 25,
    fontWeight: 'bold',
  },
  text_two: {
    fontSize: 25,
    fontWeight: 'bold',
    color: 'white',
  },

  viewIcon: {
    margin: 15,
  },
});
