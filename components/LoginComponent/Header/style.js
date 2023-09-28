import { StyleSheet } from 'react-native';

const style = StyleSheet.create({
  image: {
    width: "100%",
    height: 230,
    position: 'relative',
    zIndex: 1,
  },
  viewImg: {
    flexDirection: 'row',
    position: 'relative',
  },
  viewText: {
    marginTop: 50,
    position: 'absolute',
    zIndex: 1
  },
  text: {
    margin: 20,
    fontSize: 25,
    fontWeight: 'bold',
    color: 'white',
  },

});

export default style;
