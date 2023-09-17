import { StyleSheet } from 'react-native';

const style = StyleSheet.create({
    textInput: {
        width: 334,
        height: 54,
        borderColor: 'black',
        borderWidth: 0.5,
        alignSelf: 'center',
        marginTop: 10,
        paddingLeft: 10,
        borderRadius: 5,
      },
    
      button: {
        alignSelf: 'center',
        backgroundColor: '#6D736D',
        width: 334,
        height: 43,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 25,
      },
      buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
      },
      checkboxContainer: {
        marginLeft: 45,
        flexDirection: 'row',
        marginTop: 20,
    
      },
      checkbox: {
        alignSelf: 'center',
      },
      label: {
        margin: 8,
      },
});

export default style;
