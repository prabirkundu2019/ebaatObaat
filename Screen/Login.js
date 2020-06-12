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

class Search extends React.PureComponent{
  constructor(props){
    super(props);
    this.state = {
        username: "",
        password: "" 
    }
  }
  componentDidMount = () => {
  };

  submit = () => {
    let data = "username="+this.state.username+"&password="+this.state.password+"&grant_type=password";
    // let data = {
    //     "username": this.state.username,
    //     "password": this.state.password,
    //     "grant_type": "password",
    //     "ApiKey": "AJHG56778HGJGJHG211"
    // }
    console.log(data);
    axios.post('http://quickbillingapi.ezoneindiaportal.com/token', data,{
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    })
    .then(res=>{
        AsyncStorage.setItem('access_token', res.data.access_token);
        AsyncStorage.setItem('customerId', res.data.customerId);
        this.props.navigation.navigate('Cart');
    })
  }

  goToRegistration = () => {
    this.props.navigation.navigate('Registration');
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
                placeholder="Phone No"
                style={styles.formControl}
                keyboardType = "number-pad"
                onChangeText={(username) => this.setState({username})}
            />
        </View>
        <View style={styles.inputWrapper}>
            <TextInput
                placeholder="Password"
                style={styles.formControl}
                keyboardType = "number-pad"
                onChangeText={(password) => this.setState({password})}
            />
        </View>
        <View style={styles.btn}>
            <TouchableOpacity style={styles.button} onPress={this.submit}>
                <Text>RESEND</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button1} onPress={this.goToRegistration}>
                <Text>Registration</Text>
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

export default Search;
