import {
  StyleSheet,
  View,
  Image,
  SafeAreaView,
  Dimensions,
  TouchableWithoutFeedback,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { getMovieTrending, image500 } from '../../../api/flimsDB';
import Carousel from 'react-native-snap-carousel';

// import Carousel from 'react-native-snap-carousel';
var { width, height } = Dimensions.get('window');


export default function Trending() {
  const [data, setData] = useState();

  const getTrending = async () => {
    const data = await getMovieTrending();
    setData(data);
  };

  useEffect(() => {
    getTrending();
  }, []);

  const handleClick = (item) => {
    navigation.navigate('Movie', item);
  };



  return (
    <View >
      <Carousel
        data={data}
        renderItem={({ item }) => <MovieCard handleClick={handleClick} item={item} />}
        firstItem={1}
        loop={true}
        inactiveSlideScale={0.86}
        inactiveSlideOpacity={0.6}
        sliderWidth={width}
        itemWidth={width * 0.62}
        slideStyle={{ display: 'flex', alignItems: 'center' }}
      />
    </View>
  );
}

const MovieCard = ({ item, handleClick }) => {
    return (
      <TouchableWithoutFeedback onPress={() => handleClick(item)}>
        <Image
          // source={require('../assets/images/moviePoster1.png')}
          source={{ uri: image500(item.poster_path) }}
          style={{
            width: width * 0.6,
            height: height * 0.4,
            borderRadius: 10
          }}
          className="rounded-3xl"
        />
      </TouchableWithoutFeedback>
    );
  };


// import {
//     StyleSheet,
//     View,
//     Image,
//     SafeAreaView,
//     Dimensions,
//     TouchableWithoutFeedback,
//   } from 'react-native';
//   import React, { useEffect, useState } from 'react';
//   import { getMovieTrending, image500 } from '../../../api/flimsDB';
//   import Carousel from 'react-native-snap-carousel';
  
//   // import Carousel from 'react-native-snap-carousel';
//   var { width, height } = Dimensions.get('window');
  
  
//   export class Trending extends React.Component {
  
//     constructor(props){
//         super(props);
//         this.state = {
//           activeIndex:0,
//           carouselItems: [
//           {
//               title:"Item 1",
//               text: "Text 1",
//           },
//           {
//               title:"Item 2",
//               text: "Text 2",
//           },
//           {
//               title:"Item 3",
//               text: "Text 3",
//           },
//           {
//               title:"Item 4",
//               text: "Text 4",
//           },
//           {
//               title:"Item 5",
//               text: "Text 5",
//           },
//         ]
//       }
//     }
  
//      MovieCard = ({ item, handleClick }) => {
//       return (
//         <TouchableWithoutFeedback onPress={() => handleClick(item)}>
//           <Image
//             // source={require('../assets/images/moviePoster1.png')}
//             source={{ uri: image500(item.poster_path) }}
//             style={{
//               width: width * 0.6,
//               height: height * 0.4,
//             }}
//             className="rounded-3xl"
//           />
//         </TouchableWithoutFeedback>
//       );
//     };
  
//     return () {
//       <Carousel
//       data={this.data}
//       renderItem={({ item }) => <MovieCard handleClick={handleClick} item={item} />}
//       firstItem={1}
//       // loop={true}
//       // inactiveSlideScale={0.86}
//       inactiveSlideOpacity={0.6}
//       sliderWidth={width}
//       itemWidth={width * 0.62}
//       slideStyle={{ display: 'flex', alignItems: 'center' }}
//     />
//     }
//   }
  
  
