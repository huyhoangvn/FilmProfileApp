import {
  StyleSheet,
  View,
  Image,
  SafeAreaView,
  Dimensions,
  TouchableWithoutFeedback,
  Text,
  ScrollView,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { getMovieTrending, image500, getMovieComings } from '../../../api/flimsDB';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import { Button } from 'react-native-paper';

// import Carousel from 'react-native-snap-carousel';
var { width, height } = Dimensions.get('window');

export default function ComingMovies() {
  const [data, setData] = useState([]);
  console.log(data);

  const getMovieComing = async () => {
    const result = await getMovieComings();
    setData(result);
  };

  useEffect(() => {
    getMovieComing();
  }, []);

  const Item = ({ name, image }) => {
    return (
      <TouchableOpacity
        onPress={() => {
          // setTest(tenMon);
          // clickHandler();
        }}
      >
        <View style={styles.item}>
          <Image></Image>
          <Text>{name}</Text>
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <View style={styles.container}>
      <View style={styles.boxText}>
        <View style={styles.viewText_one}>
          <Text style={{ color: 'white', fontSize: 17, fontWeight: 'bold' }}>Săp Chiếu</Text>
        </View>
        <View style={styles.viewText_two}>
          <TouchableOpacity onPress={() => {}}>
            <Text style={{ color: 'yellow', fontSize: 17, fontWeight: 'bold' }}>Xem thêm</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.viewMovie}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 15 }}
        >
          {data.map((item, index) => {
            return (
              <TouchableWithoutFeedback key={index} onPress={() => navigation.push('Movie', item)}>
                <View>
                  <Image
                    // source={require('../assets/images/moviePoster2.png')}
                    source={{ uri: image500(item.poster_path) || fallbackMoviePoster }}
                    className="rounded-3xl"
                    style={{ width: width * 0.33, height: height * 0.22 , marginRight: 15, borderRadius: 20}}
                  />
                  <Text style = {{color: 'white', marginTop: 5, fontWeight: 'bold'}}>
                    {item.title.length > 14 ? item.title.slice(0, 14) + '...' : item.title}
                  </Text>
                </View>
              </TouchableWithoutFeedback>
            );
          })}
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  boxText: {
    flex: 0.5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 30,
  },

  viewMovie: {
      
  },

  viewText_one: {
    margin: 10,
  },

  viewText_two: {
    margin: 10,
  },
});
