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
import MatIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Provider } from 'react-redux';
import configureStore from './Src/Store';
import 'react-native-gesture-handler';
import { connect } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from "@react-navigation/drawer";
import { DrawerContent } from './Screen/DrawerContent';

const store = configureStore();

const Stack = createStackNavigator();

import ForgotPassword from './Screen/fogotPassword';
import Search from './Screen/search';
import DashboardScreen from './Screen/DashboardScreen';
import MainScreen from './Screen/MainScreen';
import Cart from './Screen/Cart';
import Checkout from './Screen/Checkout';
import Address from './Screen/Address';
import AddAddress from './Screen/AddAddress';
import Login from './Screen/Login';
import Registration from './Screen/Registration';
import OtpScreen from './Screen/OtpScreen';
import OrderList from './Screen/OrderList';
import OrderDetails from './Screen/OrderDetails';

import MobileScreen from './Screen/ForgotPassword/MobileScreen';
import ForgotOtpScreen from './Screen/ForgotPassword/ForgotOtpScreen';

const Drawer = createDrawerNavigator();
const HomeStack = createStackNavigator();
const OrderStack = createStackNavigator();

const HomeStackScreen = ({navigation}) => (
  <HomeStack.Navigator>
    <HomeStack.Screen name="DashboardScreen" component={DashboardScreen}    options={{
      title: '',
      headerStyle: {
        backgroundColor: '#000a28',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontSize:16,
        fontWeight:'400'
      },
      headerLeft: () => (
        <MatIcon onPress={() => navigation.toggleDrawer()} name="menu" color="#FFF" size={24} style={{ marginLeft:15}}/>
      ),
      // headerRight: () => (
      //   <MatIcon onPress={() => navigation.toggleDrawer()} name="map-marker" color="#FFF" size={24} style={{marginRight:15}}/>
      // ),
    }} />
    <HomeStack.Screen name="MainScreen" component={MainScreen}  options={{
      title: '',
      headerStyle: {
        backgroundColor: '#000a28',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontSize:16,
        fontWeight:'400'
      },
      headerLeft: () => (
        <MatIcon onPress={() => navigation.toggleDrawer()} name="menu" color="#FFF" size={24} style={{ marginLeft:15}}/>
      ),
      // headerRight: () => (
      //   <MatIcon onPress={() => navigation.toggleDrawer()} name="map-marker" color="#FFF" size={24} style={{marginRight:15}}/>
      // ),
    }} />
    <HomeStack.Screen name="Cart" component={Cart}  options={{
      title: 'CART',
      headerStyle: {
        backgroundColor: '#000a28',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontSize:16,
        fontWeight:'400'
      },
    }} />
    <HomeStack.Screen name="Checkout" component={Checkout}  options={{
      title: 'CHECKOUT',
      headerStyle: {
        backgroundColor: '#000a28',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontSize:16,
        fontWeight:'400'
      },
    }} />
    <HomeStack.Screen name="Address" component={Address} />
    <HomeStack.Screen name="AddAddress" component={AddAddress} />
    <HomeStack.Screen name="Login" component={Login} />
    <HomeStack.Screen name="Registration" component={Registration} />
    <HomeStack.Screen name="OtpScreen" component={OtpScreen} />

    <HomeStack.Screen name="MobileScreen" component={MobileScreen} />
    <HomeStack.Screen name="ForgotOtpScreen" component={ForgotOtpScreen} />
  </HomeStack.Navigator>
);

const OrderStackScreen  = ({navigation}) => (
  <OrderStack.Navigator>
    <OrderStack.Screen name="OrderList" component={OrderList} options={{headerShown:true}} />
    <OrderStack.Screen name="OrderDetails" component={OrderDetails} />
  </OrderStack.Navigator>  
);

class App extends React.Component {
  constructor(){  
    super();  
    this.state={  
    isVisible : true,  
   }  
  } 

  componentDidMount(){
    var that = this;  
    setTimeout(function(){  
      that.Hide_Splash_Screen();  
    }, 2000);  
  }

  Hide_Splash_Screen=()=>{  
    this.setState({   
      isVisible : false   
    });  
  }  
  render() {
    let Splash_Screen = (  
      <View style={styles.SplashScreen_RootView}>  
          <View style={styles.SplashScreen_ChildView}>  
                <Image 
                source={require('./Screen/images/splash.jpg')}
             style={{width:'100%', height: '100%', resizeMode: 'contain'}} />  
         </View>  
      </View> ) 
    return (
      <NavigationContainer>
        {  
          (this.state.isVisible === true) ? Splash_Screen : null  
        } 
        <Drawer.Navigator drawerContent={props1 => <DrawerContent {...props1 } user={this.props.user} />}>
          <Drawer.Screen name="Home" component={HomeStackScreen} />
          <Drawer.Screen name="OrderList" component={OrderStackScreen} />            
        </Drawer.Navigator>
      </NavigationContainer>
    );
  }
}

const styles = StyleSheet.create({
});

const mapStateToProps = (state) => {
  return{
      user: state.checkout.user
  }
}

export default connect(mapStateToProps, null)(App);
