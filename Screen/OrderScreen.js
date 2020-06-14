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

import Icon from 'react-native-vector-icons/FontAwesome';
import AntIcon from 'react-native-vector-icons/AntDesign';

import { SearchBar, Header, Input } from 'react-native-elements';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';

class OrderScreen extends React.PureComponent{
  constructor(props){
    super(props);
    this.state = {
        firstName: "",
        lastName: "",
        mobileNo: "",
        password: "",
        confirmPassword: "",
        otp: ""
    }
  }
  async componentDidMount () {
    let registerInfo = await AsyncStorage.getItem('registerInfo');
    this.setState(registerInfo); 
  };

  render(){
    return (
    <View style={styles.body}>
        <View style={styles.fixedNav}>
            <TouchableOpacity style={[styles.fixedNavBtn, {borderBottomWidth:5, borderBottomColor:'#827e09'}]}>
              <Text style={[styles.fixedNavBtnText, {color:'#827e09'}]}>Live Orders</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.fixedNavBtn}>
              <Text style={styles.fixedNavBtnText}>Past Orders</Text>
            </TouchableOpacity>
        </View>

        {/* <View style={{flex:1, justifyContent:"center"}}>
            <View>
            <View style={styles.logo}>
              <Image
              style={styles.tinyLogo}
              source={require('../Screen/images/logo.png')}
              />
            </View>
            <View style={styles.signInSec}>
              <Text style={styles.signinText}>Please login to view your order history.</Text>
              <TouchableOpacity style={styles.btnSignIn}>
                <Text style={styles.btnSignInText}>Sign in</Text>
              </TouchableOpacity>
            </View>
            </View>
        </View> */}

        <View style={styles.allProducts}>
          <View style={styles.singleProduct}>
              <View style={styles.imageArea}>
                <Image
                style={styles.image}
                source={require('../Screen/images/orderimage.png')}
                />
              </View>
              <View style={styles.textSec}>
                <Text style={styles.productTitle}>Menu item title should be here</Text>
                <Text style={styles.productPrice}><Icon name="rupee" size={15} /> 480</Text>
                <AntIcon name="rightcircle" size={30} color="#bfbe8d" style={styles.arrow}/>
              </View>
          </View>

          <View style={styles.singleProduct}>
              <View style={styles.imageArea}>
                <Image
                style={styles.image}
                source={require('../Screen/images/orderimage.png')}
                />
              </View>
              <View style={styles.textSec}>
                <Text style={styles.productTitle}>Menu item title should be here</Text>
                <Text style={styles.productPrice}><Icon name="rupee" size={15} /> 480</Text>
                <AntIcon name="rightcircle" size={30} color="#bfbe8d" style={styles.arrow}/>
              </View>
          </View>

          <View style={styles.singleProduct}>
              <View style={styles.imageArea}>
                <Image
                style={styles.image}
                source={require('../Screen/images/orderimage.png')}
                />
              </View>
              <View style={styles.textSec}>
                <Text style={styles.productTitle}>Menu item title should be here</Text>
                <Text style={styles.productPrice}><Icon name="rupee" size={15} /> 480</Text>
                <AntIcon name="rightcircle" size={30} color="#bfbe8d" style={styles.arrow}/>
              </View>
          </View>
        </View>

    </View>
    );
  }  
};

const styles = StyleSheet.create({

    body: {
      flex: 1,
      paddingTop:65
    },
    fixedNav:{
      flex:1,
      width:'100%',
      flexDirection:'row',
      justifyContent:'space-around',
      position:'absolute',
      top:0,
      backgroundColor:"#FFF"
    },
    fixedNavBtn:{
      width:'50%',
      alignItems:'center',
      paddingVertical:12      
    },
    fixedNavBtnText:{
      color:'#a2a2a2',
      fontSize:16,
      textTransform:"uppercase"
    },
    logo:{
      alignItems:"center",
      marginBottom:60
    },  
    tinyLogo: {
      width:150,
      height:150,
      resizeMode:"contain"
    },
    signInSec:{
      alignItems:'center'
    },
    signinText:{
      color:'#474747',
      fontSize:15,
      marginBottom:25
    },
    btnSignIn:{
      width:'80%',
      borderWidth:1,
      alignItems:'center',
      borderColor:'#f15a32',
      borderRadius:6,
      padding:15
    },
    btnSignInText:{
      color:'#f15f38',
      fontSize:16,
      textTransform:'uppercase'
    },
    allProducts:{
      paddingHorizontal:15
    },
    singleProduct:{
      width:'100%',
      backgroundColor:'#FFF',
      borderWidth:1,
      borderColor:'#c2c2c2',
      borderRadius:6,
      padding:15,
      flexDirection:'row',
      alignItems:'center',
      marginBottom:12
    },
    imageArea:{
      width:75,
      height:75,
      borderRadius:100,
      marginRight:15
    },
    image:{
      width:'100%',
      height:'100%',
      resizeMode:'cover'
    },
    textSec:{
      width:'60%'
    },
    productTitle:{
      color:"#2b2b2b",
      fontSize:16,
      marginBottom:8
    },
    productPrice:{
      color:'#010101',
      fontSize:18
    },
    arrow:{
      position:'absolute',
      top:20,
      right:-30
    }
    
});

export default OrderScreen;