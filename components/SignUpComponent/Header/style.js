import { StyleSheet } from 'react-native';

const style = StyleSheet.create({
  image: {
    width: "100%",
    height: 230,
    position: 'absolute',
    zIndex: 1,
  },
  viewImg: {
    flexDirection: 'row',
    position: 'relative',
    // Đặt kiểu hiển thị nằm ngang
  },
  viewText: {
    marginTop: 50,
    position: 'absolute',
    zIndex: 1,
  },
  text: {
    marginTop: 15,
    marginLeft: 20,
    fontSize: 25,
    fontWeight: 'bold',
    color: 'white',
  },
  icon_back:{
    marginLeft: 20,
  }
});

export default style;
