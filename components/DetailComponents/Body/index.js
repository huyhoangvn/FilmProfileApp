import { StyleSheet, View, Text, Image, Button, TouchableOpacity, Dimensions, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import { TextInput } from 'react-native-gesture-handler';
import CheckBox from 'expo-checkbox';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/FontAwesome'; // Chọn một tên biểu tượng từ thư viện
import { detailMovies, image500,getCastMovie} from '../../../api/flimsDB';
import Header from '../Header';
// import styles from './style';
var { width, height } = Dimensions.get('window');

export default function Body({ navigation, id, setDataHeader}) {
  const [image, setImage] = useState();
  const [name, setName] = useState();
  const [overView, setOverView] = useState();
  const [release_date, setRelease_date] = useState();
  const [data, setData] = useState([]);
  const getDetail = async () => {
    const result = await detailMovies(id);
    setData(result)
    setImage(result.poster_path);
    setName(result.title);
    setOverView(result.overview);
    setRelease_date(result.release_date);
    setDataHeader(result)
  };

  useEffect(() => {
      getDetail();
  }, []);
 
      



  return (
    
    <View style={styles.container}>
      <View style={styles.viewImage}>
        <Image
          // source={require('../assets/images/moviePoster1.png')}
          source={{ uri: image500(image) }}
          style={{
            width: '100%',
            height: 270,
            borderRadius: 5,
            resizeMode: 'stretch',//stretch
            // Sử dụng 'cover' để đảm bảo ảnh không bị biến dạng và không mất chi tiết
          }}
        />
        <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#F8EE0D', marginTop: 10 }}>
          {name}
        </Text>
        <Text style={{ fontSize: 15, color: 'white', marginTop: 10,}}>{overView}</Text>
        <Text style={styles.text_two}>
          <Text style={styles.text_one}>Ngày Phát Hành</Text>:  {release_date}
        </Text>

        <Text style={styles.text_two}>
          <Text style={styles.text_one}>Điểm imdb: </Text>:  8/10
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginLeft: 5,
    marginRight: 5,
  },
  viewImage: {
   
  },
  text_one: {
    fontSize: 15,
    fontWeight: 'bold',
    
  },
  text_two: {
    fontSize: 15,
    color: 'white',
    marginTop: 10
  },
});

