import React, { useEffect, useRef } from 'react'
import { View, Text,PermissionsAndroid, StyleSheet, TouchableOpacity, Image, ScrollView, Dimensions, Alert } from 'react-native'
import RootNavigator from './src/navigations/RootNavigation'
const { width, height } = Dimensions.get('window')
import { NavigationContainer } from '@react-navigation/native';
import NetInfo from '@react-native-community/netinfo';
import { Provider } from 'react-redux';
import store from "./src/redux/store";
import Toast from 'react-native-toast-message';
const App = () => {
  const dispatch = store.dispatch;
 

  return (
    <Provider store={store}>
      <NavigationContainer>
        <RootNavigator></RootNavigator>
      </NavigationContainer>
      <Toast/>
    </Provider>
  )
}
export default App;