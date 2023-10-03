import { StyleSheet, View, Text, Image, Button, TouchableOpacity, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import { TextInput } from 'react-native-gesture-handler';
import CheckBox from 'expo-checkbox';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/FontAwesome';
import { detailMovies, image500, getCastMovie, image185 } from '../../../api/flimsDB';
// Chọn một tên biểu tượng từ thư viện
// import styles from './style';

export default function Person({ id }) {
  const [data, setData] = useState([]);
  const getCatMovies = async () => {
    const result = await getCastMovie(id);
    setData(result.cast);
  };

  useEffect(() => {
    getCatMovies();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#F8EE0D', marginTop: 10 }}>
        Diễn Viên
      </Text>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 1 }}
      >
        {data.map((item, index) => {
          return (
            <TouchableOpacity
              key={index}
              // onPress={()=> navigation.navigate('item', item)}
            >
              <View style = {{}}>
                <Image
                  style={{ width: 80, height: 80, marginRight: 20, marginLeft: 5 , marginTop: 10 , borderRadius: 50}}
                  // source={require('../assets/images/castImage1.png')}
                  source={{ uri: image185(item?.profile_path) }}
                />
              </View>
              <Text style = {{color: 'white', marginTop: 10}} >{item?.name.length>10? item.name.slice(0,10)+'...' : item?.name}</Text>
              <Text></Text> 
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginLeft: 5,
    marginRight: 5,
  },
});
