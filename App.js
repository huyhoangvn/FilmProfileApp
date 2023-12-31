import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome'; // Chọn một tên biểu tượng từ thư viện
import HomePage from './screen/HomePage';
import FriendPage from './screen/FriendPage';
import ProfilePage from './screen/ProfilePage';
import MovieSavePage from './screen/MovieSavePage';
import Login from './screen/Login';
import SignUp from './screen/signUp';
import SearchScreen from './screen/SearchScreen';
import DetailScreen from './screen/DetailScreen';
import EditScreen from './screen/EditScreen';
import FriendSearchScreen from './screen/FriendSearchScreen';
import ShareScreen from './screen/ShareScreen';

import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
const Stack = createStackNavigator();
const Tab = createMaterialBottomTabNavigator();

export default function App() {
  function BottomTabs() {
    var sizeIcon = 25;
    var colorFocused = 'black';
    var colorIcon = 'white';

    return (
      <Tab.Navigator
        barStyle={{ backgroundColor: '#6D736D' }}
        activeColor={colorFocused}
        inactiveColor={colorIcon}
      >
        <Tab.Screen
          name="Trang Chủ"
          component={HomePage}
          options={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              return (
                <Icon
                  name="home"
                  color={focused ? colorFocused : colorIcon} // Thay đổi màu khi tab được chọn và không được chọn
                  size={sizeIcon}
                />
              );
            },
          })}
        />
        <Tab.Screen
          name="Bài Đăng"
          component={FriendPage}
          options={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              return (
                <Icon
                  name="group"
                  color={focused ? colorFocused : colorIcon} // Thay đổi màu khi tab được chọn và không được chọn
                  size={sizeIcon}
                />
              );
            },
          })}
        />

        <Tab.Screen
          name="Đã Lưu"
          component={MovieSavePage}
          options={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              return (
                <Icon
                  name="bookmark"
                  color={focused ? colorFocused : colorIcon} // Thay đổi màu khi tab được chọn và không được chọn
                  size={sizeIcon}
                />
              );
            },
          })}
        />

        <Tab.Screen
          name="Hồ Sơ"
          component={ProfilePage}
          options={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              return (
                <Icon
                  name="user"
                  color={focused ? colorFocused : colorIcon} // Thay đổi màu khi tab được chọn và không được chọn
                  size={sizeIcon}
                />
              );
            },
          })}
        />
      </Tab.Navigator>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false, gestureEnabled: false, headerTitle: null }}
        />

        <Stack.Screen
          name="SignUp"
          component={SignUp}
          options={{ headerShown: false, gestureEnabled: false }} // Giữ thanh header, nhưng loại bỏ văn bản (tên trang) trong header
        />
        <Stack.Screen
          name="HomeScreen"
          component={BottomTabs}
          options={{ headerShown: false, gestureEnabled: false }}
          // options={{
          //  // Tắt title của header
          //   headerTitle: () => {null},
          //   headerLeft: () => <Header name='Flim ProFile'/>,
          //   headerRight: () => (
          //     <View>
          //       <TouchableOpacity>
          //         <Icon name="backward" size={20} color={'red'}></Icon>
          //       </TouchableOpacity>
          //     </View>
          //   ),
          //   headerStyle: {
          //     backgroundColor: '#313230',

          //   },
          // }}
        />

        <Stack.Screen
          name="SearchScreen"
          component={SearchScreen}
          options={{ headerShown: false, gestureEnabled: false }} // Giữ thanh header, nhưng loại bỏ văn bản (tên trang) trong header
        />
        <Stack.Screen
          name="DetailScreen"
          component={DetailScreen}
          options={{ headerShown: false, gestureEnabled: false }} // Giữ thanh header, nhưng loại bỏ văn bản (tên trang) trong header
        />

        <Stack.Screen
          name="FriendSearchScreen"
          component={FriendSearchScreen}
          options={{ headerShown: false, gestureEnabled: false }} // Giữ thanh header, nhưng loại bỏ văn bản (tên trang) trong header
        />

        <Stack.Screen
          name="EditScreen"
          component={EditScreen}
          options={{ headerShown: false, gestureEnabled: false }} // Giữ thanh header, nhưng loại bỏ văn bản (tên trang) trong header
        />

        <Stack.Screen
          name="ShareScreen"
          component={ShareScreen}
          options={{ headerShown: false, gestureEnabled: false }} // Giữ thanh header, nhưng loại bỏ văn bản (tên trang) trong header
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
