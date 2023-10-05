import {
  StyleSheet,
  View,
  Text,
  Image,
  Button,
  TouchableOpacity,
  SafeAreaView,
  RefreshControl
} from 'react-native';
import React, { useState } from 'react';
import { getMovieTrending } from '../api/flimsDB';
import Header from '../components/ProFileComponent/Header';
import Post from '../components/ProFileComponent/Post';
import Profile from '../components/ProFileComponent/Profile';
import { ScrollView } from 'react-native-gesture-handler';

export default function ProfilePage({ navigation }) {

  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = () => {
    // Bắt đầu tải dữ liệu mới ở đây
    // Sau khi tải xong, hãy gọi setRefreshing(false) để ngừng làm mới
    setRefreshing(false)
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.view_header}>
        <Header navigation={navigation} />
      </View>
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
          />
        }
      >
        <View style={styles.view_Profile}>
          <Profile navigation={navigation}  />
        </View>

        <View style={styles.view_Post}>
          <Post />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 4,
    backgroundColor: '#313230',
  },
  view_header: {
    flex: 0.2,
  },
  view_Profile: {
    flex: 1,
  },
  view_Post: {
    flex: 1,
  },
});
