import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View, TextInput } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import HomePage from './screen/HomePage';
import Login from './screen/Login';

const Stack = createStackNavigator();


export default function App() {

  return (
    <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        component={Login}
        options={{ headerShown: false, gestureEnabled: false }}
      />
      <Stack.Screen
        name="HomePage"
        component={HomePage}
        options={{ headerShown: false, gestureEnabled: false }}
      />
      {/* <Stack.Screen
        name="Article"
        component={Article}
        options={{ headerShown: true, headerTitle: '' }} // Giữ thanh header, nhưng loại bỏ văn bản (tên trang) trong header
      /> */}
    </Stack.Navigator>
  </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
