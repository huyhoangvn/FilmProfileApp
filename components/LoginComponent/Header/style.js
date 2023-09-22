import { StyleSheet } from 'react-native';

const style = StyleSheet.create({
  image_one: {
    width: 350,
    height: 330,
    backgroundColor: '#6D736D',
    borderRadius: 200,
    marginTop: -100,
    marginLeft: -100,
    position: 'absolute',
    zIndex: 1,
  },
  image_two: {
    width: 220,
    height: 220,
    backgroundColor: 'black',
    borderRadius: 500,
    position: 'relative',
    marginTop: -100,
    marginLeft: 150,
  },
  viewImg: {
    flexDirection: 'row',
    position: 'relative',
    // Đặt kiểu hiển thị nằm ngang
  },
  viewText: {
    marginTop: 50,
    position: 'absolute',
  },
  text: {
    margin: 20,
    fontSize: 30,
    fontWeight: 'bold',
    color: 'white',
  },
});

export default style;
