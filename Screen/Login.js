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
import { connect } from 'react-redux';
import { setUser } from '../Src/actions/checkoutActions';
import axios from 'axios';

class Login extends React.PureComponent{
  constructor(props){
    super(props);
    this.state = {
        username: "",
        password: "" 
    }
  }
  componentDidMount = () => {
    let data = {
      "access_token" : "",
      "customerId" : "",
      "mobileNo" : "",
      "fullName" : ""
    }
    this.props.setUser(data);
  };

  submit = () => {
    let data = "username="+this.state.username+"&password="+this.state.password+"&grant_type=password";
    // let data = {
    //     "username": this.state.username,
    //     "password": this.state.password,
    //     "grant_type": "password",
    //     "ApiKey": "AJHG56778HGJGJHG111"
    // }
    //console.log(data);
    axios.post('http://api.pimento.in/token', data,{
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    })
    .then(res=>{     
        console.log(res.data);
        let data = {
          "access_token" : res.data.access_token,
          "customerId" : res.data.customerId,
          "mobileNo" : res.data.mobileNo,
          "fullName" : res.data.fullName
        }
        AsyncStorage.setItem('userData', JSON.stringify(data));
        AsyncStorage.setItem('access_token', res.data.access_token);
        AsyncStorage.setItem('customerId', res.data.customerId);
        this.props.setUser(data);
        this.props.navigation.navigate('DashboardScreen');
    }, (error) => {
      console.log(error);
      alert("There have some error");
    });
  }

  goToRegistration = () => {
    this.props.navigation.navigate('Registration');
  }
  goToForgot = () => {
    this.props.navigation.navigate('Orders');
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
        <View style={styles.inputWrapper}>
            <Text style={styles.inputLable}>Mobile No.</Text>
            <TextInput
                style={styles.formControl}
                keyboardType = "number-pad"
                onChangeText={(username) => this.setState({username})}
            />
        </View>
        <View style={styles.inputWrapper}>
          <Text style={styles.inputLable}>Password</Text>
            <TextInput
                style={styles.formControl}
                keyboardType = "number-pad"
                onChangeText={(password) => this.setState({password})}
            />
        </View>
        <View style={styles.btnforgot}>
          <TouchableOpacity onPress = {() => this.props.navigation.navigate("MobileScreen")}>
            <Text style={styles.forgotLink}>Forgot Password</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.btn}>
            <TouchableOpacity style={styles.button} onPress={this.submit}>
                <Text style={styles.buttonText}>LOGIN</Text>
            </TouchableOpacity>
        </View>
        <View style={styles.btn}>
            <TouchableOpacity style={styles.button} onPress={this.goToRegistration}>
                <Text style={styles.buttonText}>Registration</Text>
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
      justifyContent:"center",
      paddingBottom:60
    },
    logo:{
      alignItems:"center"
    },  
    tinyLogo: {
      width:150,
      height:150,
      resizeMode:"contain"
    },
    inputWrapper:{
      justifyContent: 'center',
      marginTop:20,
      paddingHorizontal:20
    },
    inputLable:{
      color:'#989898',
      fontSize:15
    },
    formControl:{
      width:'100%',
      height:50,
      color:'#000',
      fontSize:16,
      borderBottomColor:'#787210',
      borderBottomWidth:2
    },
    btn:{
      marginTop:20,
      flexDirection:'row',
      justifyContent: 'space-around',
      paddingHorizontal:20
    },
    button:{
      width:'100%',
      alignItems:'center',
      backgroundColor:'#827e09',
      borderRadius:5
    },
    buttonText:{
      color:'#FFF',
      fontSize:15,
      paddingVertical:12,      
    },
    btnforgot:{
      paddingHorizontal:20,
      alignItems:'flex-end',
      marginTop:20
    },
    forgotLink:{
      color:'#474747',
      fontSize:15,
      textDecorationLine:'underline'
    }
});

const mapDispatchToProps =  {
  setUser
}
  
  
export default connect(null, mapDispatchToProps)(Login);