import { StyleSheet, View, SafeAreaView } from 'react-native';
import Trending from '../components/HomeComponents/Trending';

export default function HomePage(props) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.viewHeader}></View>

      <View style={styles.viewTrending}>
        <Trending />
      </View>

      <View style={styles.viewComing}></View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#313230',
    // alignItems: 'center',
    // justifyContent: 'center',
  },

  viewHeader: {
    flex: 0.3,
  },
  viewTrending: {
    flex: 1.4,
  },

  viewComing: {
    flex: 1,
  },
});
