import { StyleSheet } from 'react-native';

const style = StyleSheet.create({
    image_one: {
        width: 290,
        height: 290,
        backgroundColor: 'black',
        borderRadius: 500,
        marginTop: -100,
        marginLeft: -50,
        position: 'absolute',
        zIndex: 1, 
      },
      image_two:{
        width: 200,
        height: 200,
        backgroundColor: '#6D736D',
        borderRadius: 500,
        position:'relative',
        marginTop: -100,
        marginLeft: 180
      },
      viewImg:{
        flexDirection: 'row',
        position: 'relative',
         // Đặt kiểu hiển thị nằm ngang
      },
      viewText:{
        position: 'absolute'
      }
});

export default style;
