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
import AsyncStorage from '@react-native-community/async-storage';
import Spinner from 'react-native-loading-spinner-overlay';
import axios from 'axios';

class MobileScreen extends React.PureComponent{
  constructor(props){
    super(props);
    this.state = {
      spinner: false,
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
    this.setState({ spinner:true })
    if(this.state.mobileNo.trim() == ""){
        alert('Mobile no can not be blank.');
    }else if(this.state.password.trim() == ""){
        alert('Password can not be blank.');
    }else if(this.state.password != this.state.confirmPassword){
        alert('Password and confirm password should be same.');
    }else{
        let data = {
            "firstName": "XXX",
            "lastName": "XXX",
            "mobileNo": this.state.mobileNo,
            "password": this.state.password,
            "confirmPassword": this.state.confirmPassword,
            "otpType": "FOG",
            "ApiKey": "AJHG56778HGJGJHG111",
            "roleId": 0
        }
        axios.post('http://api.pimento.in/api/OTP', data,{
            headers: { 'Content-Type': 'application/json' }
        })
        .then(res=>{
          this.setState({ spinner:false })
          console.log(res.data);
          AsyncStorage.setItem('forgotInfo', JSON.stringify(data));
          this.props.navigation.navigate('ForgotOtpScreen');
        })
        .catch(err => {
          this.setState({ spinner:false })
          console.log(err);
          if (err.response) {
            // client received an error response (5xx, 4xx)
          } else if (err.request) {
            // client never received a response, or request never left
          } else {
            // anything else
          }
        });
    }
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
          {/* <Text style={styles.sectionDescription}>
            You will now get a confirmation code via SMS Ensure our secret stays safe.
          </Text>               */}
        </View>
        <View style={styles.inputWrapper}>
            {/* <Text style={styles.inputLable}>First Name</Text>
            <TextInput
                //placeholder="First Name"
                style={styles.formControl}
                onChangeText={(firstName) => this.setState({firstName})}
            />
            <Text style={styles.inputLable}>Last Name</Text>
            <TextInput
                //placeholder="Last Name"
                style={styles.formControl}
                onChangeText={(lastName) => this.setState({lastName})}
            /> */}
            <Text style={styles.inputLable}>Mobile</Text>
            <TextInput
                //placeholder="Mobile"
                style={styles.formControl}
                keyboardType = "number-pad"
                onChangeText={(mobileNo) => this.setState({mobileNo})}
            />
            <Text style={styles.inputLable}>Password</Text>
            <TextInput
                //placeholder="Password"
                style={styles.formControl}
                onChangeText={(password) => this.setState({password})}
            />
            <Text style={styles.inputLable}>Confirm Password</Text>
            <TextInput
                //placeholder="Confirm Password"
                style={styles.formControl}
                onChangeText={(confirmPassword) => this.setState({confirmPassword})}
            />
        </View>
        <View style={styles.btn}>
            <TouchableOpacity style={styles.button} onPress={this.submit}>
              <Text style={styles.buttonText}>SUBMIT</Text>
            </TouchableOpacity>
        </View>
        <View style={{justifyContent:'center', alignItems:'center', flexDirection:'row',padding:20,}}>	
            <Text style={{color:'#666'}}>Already a member? </Text>	
            <TouchableOpacity onPress={() => this.props.navigation.navigate("Login")}>	
              <Text style={{textDecorationLine:'underline', color:'#000a28'}}>Login here</Text>	
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

export default MobileScreen;