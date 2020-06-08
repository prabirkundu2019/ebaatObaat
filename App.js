/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import { Provider } from 'react-redux';
import store from './Src/Store';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from "@react-navigation/drawer";
import { DrawerContent } from './Screen/DrawerContent';

const Stack = createStackNavigator();

import ForgotPassword from './Screen/fogotPassword';
import Search from './Screen/search';
import MainScreen from './Screen/MainScreen';
import Cart from './Screen/Cart';
import Checkout from './Screen/Checkout';
import Address from './Screen/Address';

const Drawer = createDrawerNavigator();
const HomeStack = createStackNavigator();

const HomeStackScreen = () => (
  <HomeStack.Navigator>
    <HomeStack.Screen name="MainScreen" component={MainScreen}  options={{headerShown: false}} />
    <HomeStack.Screen name="Cart" component={Cart}  options={{headerShown: false}} />
    <HomeStack.Screen name="Checkout" component={Checkout}  options={{headerShown: false}} />
    <HomeStack.Screen name="Address" component={Address}  options={{headerShown: false}} />
  </HomeStack.Navigator>
);

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <NavigationContainer>
          <Drawer.Navigator drawerContent={props => <DrawerContent {...props} />}>
            <Drawer.Screen name="Home" component={HomeStackScreen} />
          </Drawer.Navigator>
        </NavigationContainer>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({

  
});
