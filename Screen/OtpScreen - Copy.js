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

import Icon from 'react-native-vector-icons';
import { SearchBar, Header, Input } from 'react-native-elements';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';

class OtpScreen extends React.PureComponent{
  constructor(props){
    super(props);
    this.state = {
      registerInfo: [],
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
    console.log(JSON.parse(registerInfo));
    var registerInfo1 = JSON.parse(registerInfo)
    this.setState({
      firstName : registerInfo1.firstName,
      lastName : registerInfo1.lastName,
      mobileNo : registerInfo1.mobileNo,
      password : registerInfo1.password,
      confirmPassword : registerInfo1.confirmPassword
    }); 
  };

  submit = () => {
    console.log(this.state.registerInfo);
    let data = {
        "firstName": this.state.firstName,
        "lastName": this.state.lastName,
        "mobileNo": this.state.mobileNo,
        "password": this.state.password,
        "confirmPassword": this.state.confirmPassword,
        "username": this.state.mobileNo,
        "otp" : this.state.otp,
        "userType": "WEB",
        "otpType": "REG",
        "ApiKey": "AJHG56778HGJGJHG111",
        "roleId": 3
    }
    console.log(data);
    axios.post('http://api.pimento.in/api/User/UserRegistration', data,{
        headers: { 'Content-Type': 'application/json' }
    })
    .then(res=>{
        if(res.data.status == true)
        {
            let customer = {
                "originFrom": "WEB",
                "description": this.state.firstName + " " + this.state.lastName,
                "mobileNo1": this.state.mobileNo,
                "loginUserId": res.data.id,
                "APIKey":"AJHG56778HGJGJHG111"
            }
            AsyncStorage.removeItem('registerInfo');
            axios.post('http://api.pimento.in/api/Customer/Insert', data,{
                headers: { 'Content-Type': 'application/json' }
            })
            this.props.navigation.navigate('MainScreen');
        }        
    })
  }

  render(){
    return (
    <View style={styles.body}>
        <View style={styles.logo}>
          {/* <Image
          style={styles.tinyLogo}
          source={{
          uri: 'Screen/images/logo.png',
          }}
          /> */}
        </View>
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionDescription}>
            You will now get a confirmation code via SMS Ensure our secret stays safe.
          </Text>              
        </View>
        <View style={styles.inputWrapper}>
            <TextInput
                placeholder="OTP"
                style={styles.formControl}
                keyboardType = "number-pad"
                onChangeText={(otp) => this.setState({otp})}
            />
        </View>
        <View style={styles.btn}>
            <TouchableOpacity style={styles.button} onPress={this.submit}>
                <Text>RESEND</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button1}>
                <Text>VERIFY</Text>
            </TouchableOpacity>
        </View>
    </View>
    );
  }  
};

const styles = StyleSheet.create({

    body: {
      flex: 1,
      flexDirection: 'column',
      justifyContent:"center"
    },
    logo:{
      alignItems:"center"
    },  
    tinyLogo: {
      width: 50,
      height: 50,
    },
    sectionContainer: {
      marginTop: 32,
      paddingHorizontal: 24,
    },
    sectionDescription: {
      marginTop: 8,
      fontSize: 16,
      fontWeight: '400',
      textAlign:'center'
    },
    inputWrapper:{
      alignItems: 'center',
      justifyContent: 'center',
      marginTop:60
    },
    formControl:{
      width:'60%',
      height:50,
      color:'#000',
      fontSize:16,
      borderBottomColor:'#787210',
      borderBottomWidth:2
    },
    btn:{
      marginTop:50,
      flexDirection:'row',
      justifyContent: 'space-around',
    }
});

export default OtpScreen;