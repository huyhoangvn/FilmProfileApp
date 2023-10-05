
import { StyleSheet, View, Text, Image, SafeAreaView } from 'react-native';
import React from 'react';
import styles from './style';

export default function Header() {
  return (
    <View>
      <View style ={styles.viewImg}>
      <Image
        style={styles.image}
        source={require('../../../assets/header_img.png')}
      />
      </View>


      <View style={styles.viewText}>
        <Text style={styles.text}>Xin Chào,{'\n'}Mời  Đăng Nhập</Text>
      </View> 
    </View>
  );
}



// import { StyleSheet, View, Text } from 'react-native';
// import React from 'react';

// const styles = StyleSheet.create({
//   text: {
//     fontSize: 24,
//     textAlign: 'center',
//   },
// });

// export default function Header() {
//   return (
//     <View>
//       <Text style={styles.text}>hello</Text>
//     </View>
//   );
// }