import { StyleSheet, View, SafeAreaView } from 'react-native';
import Trending from '../components/HomeComponents/Trending';
import Header from '../components/HomeComponents/Header';
import ComingMovies from '../components/HomeComponents/ComingMovies';
import { ScrollView } from 'react-native-gesture-handler';
export default function HomePage() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.viewHeader}>
          <Header/>
      </View>

      <ScrollView>
      <View style={styles.viewTrending}>
        <Trending />
      </View>

      <View style={styles.viewComing}>
          <ComingMovies/>
      </View>
      </ScrollView>
    
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
    flex: 0.4,
  },
  viewTrending: {
    flex: 1.4,

  },

  viewComing: {
    flex: 1,
  },
});
