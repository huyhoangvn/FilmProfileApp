import { StyleSheet, View, SafeAreaView } from 'react-native';
import Trending from '../components/HomeComponents/Trending';
import Header from '../components/HomeComponents/Header';
import ComingMovies from '../components/HomeComponents/ComingMovies';
import { ScrollView } from 'react-native-gesture-handler';
export default function HomePage({navigation}) {
  return (
    <SafeAreaView style={styles.container}>
      
      <View style={styles.viewHeader}>
          <Header navigation={navigation} />
      </View>
      <ScrollView>
      <View style={styles.viewTrending}>
        <Trending navigation={navigation} />
      </View>

      <View style={styles.viewComing}>
          <ComingMovies navigation={navigation} />
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
  },
  viewTrending: {
    flex: 1.4,
    marginTop: -8
  },

  viewComing: {
    flex: 1,
    marginTop: -20
  },
});
