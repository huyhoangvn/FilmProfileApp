import {
  StyleSheet,
  View,
  Image,
  SafeAreaView,
  Dimensions,
  TouchableWithoutFeedback,
  Text,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { getMovieTrending, image500 } from '../../../api/flimsDB';
import Carousel from 'react-native-snap-carousel';
import style from '../../ProFileComponent/Post/style';
import { TouchableOpacity } from 'react-native-gesture-handler';

// import Carousel from 'react-native-snap-carousel';
var { width, height } = Dimensions.get('window');

export default function ComingMovies() {
  return (
    <View style={styles.boxText}>
      <View style={styles.viewText_one}>
        <Text style={{ color: 'white', fontSize: 17, fontWeight: 'bold' }}>Săp Chiếu</Text>
      </View>
      <View style={styles.viewText_two}>
      <TouchableOpacity onPress={ () =>{
        
      }}>
      <Text style={{ color: 'yellow', fontSize: 17, fontWeight: 'bold' }}>Xem thêm</Text>

      </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  boxText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'relative',
    marginTop: 30,
  },

  viewText_one: {
    margin: 15,
  },

  viewText_two: {
    margin: 15,
  },
});
