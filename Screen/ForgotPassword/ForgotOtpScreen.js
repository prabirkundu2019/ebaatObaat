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
import Spinner from 'react-native-loading-spinner-overlay';
import axios from 'axios';

class ForgotOtpScreen extends React.PureComponent{
  constructor(props){
    super(props);
    this.state = {
      spinner: false,
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
    let registerInfo = await AsyncStorage.getItem('forgotInfo');
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
    this.setState({ spinner:true })
    console.log(this.state.registerInfo);
    let data = {
        "mobileNo": this.state.mobileNo,
        "password": this.state.password,
        "confirmPassword": this.state.confirmPassword,
        "otp" : this.state.otp,
        "otpType": "FOG",
        "ApiKey": "AJHG56778HGJGJHG111" 
    }
    console.log(data);
    axios.post("http://api.pimento.in/api/ForgetPassword", data,{
        headers: { 'Content-Type': 'application/json' }
    })
    .then(res=>{
      this.setState({ spinner:false })
      alert("Password reset successfully!");
      this.props.navigation.navigate('Login');       
    })
    .catch(err => {
      this.setState({ spinner:false })
      alert("There have some issue");
    });
  }

  render(){
    return (
    <View style={styles.body}>
        <Spinner
          visible={this.state.spinner}
          textStyle={styles.spinnerTextStyle}
        />
        <View style={styles.logo}>
          <Image
          style={styles.tinyLogo}
          source={require('../images/logo.png')}
          />
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
                <Text>VERIFY</Text>
            </TouchableOpacity>
            {/* <TouchableOpacity style={styles.button1}>
                <Text>VERIFY</Text>
            </TouchableOpacity> */}
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
      width: 100,
      height: 100,
    },
    sectionContainer: {
      marginTop: 32,
      paddingHorizontal: 24,
    },
    sectionDescription: {
      marginTop: 8,
      paddingHorizontal: 30,
      fontSize: 14,
      fontWeight: '400',
      textAlign:'center',
      color: '#474747'
    },
    inputWrapper:{
      alignItems: 'center',
      justifyContent: 'center',
      marginTop:60,
      paddingHorizontal: 40,
    },
    formControl:{
      width:'100%',
      height:50,
      color:'#000',
      fontSize:16,
      borderBottomColor:'#000a28',
      borderBottomWidth:2
    },
    btn:{
      marginTop:50,
      flexDirection:'row',
      justifyContent: 'space-between',
      paddingHorizontal: 40,
      alignItems: 'center'
    }
});

export default ForgotOtpScreen;