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

class Support extends React.PureComponent{
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
            "ApiKey": "AJHG56778HGJGJHG111",
            "roleId": 0
        }
        axios.post('http://api.pimento.in/api/OTP', data,{
            headers: { 'Content-Type': 'application/json' }
        })
        .then(res=>{
            console.log(res);
            AsyncStorage.setItem('registerInfo', JSON.stringify(data));
            this.props.navigation.navigate('OtpScreen');
        })
    }
  }

  render(){
    return (
    <View style={styles.body}>

        <View style={styles.logo}>
          <Image
          style={styles.tinyLogo}
          source={require('../Screen/images/logo.png')}
          />
        </View>
        <View style={styles.sectionContainer}>
          {/*<Text style={styles.sectionDescription}>
            You will now get a confirmation code via SMS Ensure our secret stays safe.
          </Text>*/ }             
        </View>
        <ScrollView>
        <View style={styles.inputWrapper}>
            <Text style={styles.inputLable}>Name</Text>
            <TextInput
                // placeholder="First Name"
                style={styles.formControl}
                onChangeText={(firstName) => this.setState({firstName})}
            />
            
            <Text style={styles.inputLable}>Mobile No</Text>
            <TextInput
                // placeholder="Mobile"
                style={styles.formControl}
                keyboardType = "number-pad"
                onChangeText={(mobileNo) => this.setState({mobileNo})}
            />
            <Text style={styles.inputLable}>Your issue</Text>
            <TextInput
                style={styles.formControl}
                onChangeText={(lastName) => this.setState({lastName})}
            />
        </View>
        </ScrollView>
        <View style={styles.btn}>
            <TouchableOpacity style={styles.button} onPress={this.submit}>
                <Text style={styles.buttonText}>Submit</Text>
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
      // justifyContent:"center"
    },
    logo:{
      alignItems:"center",
      marginTop: 20,
    },  
    tinyLogo: {
      width: 80,
      height: 80,
    },
    sectionContainer: {
      marginTop: 20,
      paddingHorizontal: 30,
    },
    sectionDescription: {
      marginTop: 8,
      fontSize: 14,
      fontWeight: '400',
      textAlign:'center'
    },
    inputWrapper:{
      justifyContent: 'center',
      marginTop:20,
      paddingHorizontal:20
    },
    inputLable:{
      color:'#989898',
      fontSize:14,
      textAlign:'left',
      width:'100%',
    },
    formControl:{
      width:'100%',
      height:35,
      lineHeight:10,
      color:'#000',
      fontSize:14,
      borderBottomColor:'#000a28',
      borderBottomWidth:2,
      marginBottom: 20,
    },
    btn:{
      marginTop:20,
      marginBottom:40,
      flexDirection:'row',
      paddingHorizontal:20,
      justifyContent: 'center',
    },
    button:{
      width:'100%',
      alignItems:'center',
      backgroundColor:'#000a28',
      borderRadius:5
    },
    buttonText:{
      color:'#e5b443',
      fontSize:15,
      paddingVertical:12,
      textTransform:'uppercase',   
    },
});

export default Support;