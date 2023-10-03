import {
  StyleSheet,
  View,
  TextInput,
  ScrollView,
  TouchableWithoutFeedback,
  Image,
  Dimensions,
  Text,
  FlatList,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { getSearchMovie, image185 } from '../../../api/flimsDB';
import { TouchableOpacity } from 'react-native-gesture-handler';
import CheckBox from 'expo-checkbox';
import { Dropdown } from 'react-native-element-dropdown';

var { width, height } = Dimensions.get('window');

export default function BodySearch({ navigation }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [data, setData] = useState([]);
  const [isSelected, setSelection] = useState();
  const dataDropDow = [
    { id: '1', name: 'Type 1' },
    { id: '2', name: 'Type 2' },
    { id: '3', name: 'Type 3' },
  ];

  useEffect(() => {
    const search = async () => {
      if (searchQuery.trim() !== '') {
        const details = await getSearchMovie(searchQuery);
        setData(details.results);
      } else {
        setData([]);
      }
    };

    search();
  }, [searchQuery]);

  const isUpcomingMovie = (releaseDate) => {
    if (!isSelected) {
      return true; // Nếu checkbox chưa được chọn, hiển thị tất cả phim
    }

    const currentDate = new Date(); // Lấy ngày hiện tại
    const releaseDateObj = new Date(releaseDate); // Chuyển ngày phát hành thành đối tượng ngày
    return currentDate < releaseDateObj; // So sánh ngày hiện tại với ngày phát hành
  };

  const renderItem = ({ item, index }) => {
    const isUpcoming = isUpcomingMovie(item.release_date);

    if (!isUpcoming) {
      return null; // Không hiển thị phim nếu không phải "sắp chiếu"
    }

    return (
      <TouchableWithoutFeedback
        key={index}
        onPress={() => {
          navigation.navigate('DetailScreen', {
            itemId: item.id,
          });
        }}
      >
        <View style={styles.viewItem}>
          <Image
            source={{ uri: image185(item.poster_path) }}
            style={{ width: 80, height: 130, borderRadius: 15 }}
          />
          <View style={{ marginLeft: 15 }}>
            <Text style={{ color: '#F8EE0D', fontSize: 25, fontWeight: 'bold', marginTop: 5 }}>
              {item.title.length > 20 ? item.title.slice(0, 15) + '...' : item.title}
            </Text>
            <Text style={styles.text_two}>
              <Text style={styles.text_one}>Ngày Phát Hành</Text>: {item.release_date}
            </Text>

            <Text style={styles.text_two}>
              <Text style={styles.text_one}>Điểm imdb: </Text>: 8/10
            </Text>

            <Text style={{color: '#19AFDF', fontSize: 20, marginTop: 5}}>Thêm vào danh sách</Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          value={searchQuery}
          onChangeText={(text) => setSearchQuery(text)}
          placeholder="Search"
        />
        <TouchableOpacity>
          <Icon name="search" size={25} color={'#848484'} style={styles.icon} />
        </TouchableOpacity>
      </View>

      <View style={styles.checkboxContainer}>
        <CheckBox value={isSelected} onValueChange={setSelection} style={{ marginLeft: 4, borderColor: 'white'}} />
        <Text style={{ color: 'white', marginLeft: 5 }}>Sắp Chiếu</Text>

        <View style={{ flex: 1, alignItems: 'flex-end' }}>
          <Dropdown
            style={styles.dropdown}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            iconStyle={styles.iconStyle}
            labelField="name"
            data={dataDropDow}
            maxHeight={300}
            valueField="id"
            placeholder="Xem Tất Cả"
            onChange={(item) => {
              // setValue(item.id);
              // setIdTableType(item.id);
            }}
          />
        </View>
      </View>

      <View>
        <FlatList
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
    marginLeft: 10,
    padding: 10,
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
    width: 110,
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
});
