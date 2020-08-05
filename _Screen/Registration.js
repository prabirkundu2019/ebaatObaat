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

class Registration extends React.PureComponent{
  constructor(props){
    super(props);
    this.state = {
        firstName: "",
        lastName: "",
        mobileNo: "",
        password: "",
        confirmPassword: ""
    }
  }
  componentDidMount = () => {
  };

  submit = () => {
    if(this.state.firstName.trim() == ""){
        alert('First name can not be blank.');
    }else if(this.state.lastName.trim() == ""){
        alert('Last name can not be blank.');
    }else if(this.state.mobileNo.trim() == ""){
        alert('Mobile no can not be blank.');
    }else if(this.state.password.trim() == ""){
        alert('Password can not be blank.');
    }else if(this.state.password != this.state.confirmPassword){
        alert('Password and confirm password should be same.');
    }else{
        let data = {
            "firstName": this.state.firstName,
            "lastName": this.state.lastName,
            "mobileNo": this.state.mobileNo,
            "password": this.state.password,
            "confirmPassword": this.state.confirmPassword,
            "otpType": "REG",
            "ApiKey": "AJHG56778HGJGJHG211",
            "roleId": 0
        }
        console.log(data);
        axios.post('http://quickbillingapi.ezoneindiaportal.com/api/OTP', data,{
            headers: { 'Content-Type': 'application/json' }
        })
        .then(res=>{
            console.log(res);
            AsyncStorage.setItem('registerInfo', data);
            this.props.navigation.navigate('OtpScreen');
        })
    }
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
                placeholder="First Name"
                style={styles.formControl}
                onChangeText={(firstName) => this.setState({firstName})}
            />
            <TextInput
                placeholder="Last Name"
                style={styles.formControl}
                onChangeText={(lastName) => this.setState({lastName})}
            />
            <TextInput
                placeholder="Mobile"
                style={styles.formControl}
                keyboardType = "number-pad"
                onChangeText={(mobileNo) => this.setState({mobileNo})}
            />
            <TextInput
                placeholder="Password"
                style={styles.formControl}
                onChangeText={(password) => this.setState({password})}
            />
            <TextInput
                placeholder="Confirm Password"
                style={styles.formControl}
                onChangeText={(confirmPassword) => this.setState({confirmPassword})}
            />
        </View>
        <View style={styles.btn}>
            <TouchableOpacity style={styles.button} onPress={this.submit}>
                <Text>Submit</Text>
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

export default Registration;