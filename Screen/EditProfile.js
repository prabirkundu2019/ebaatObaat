import React, {useState} from 'react';
import {
  SafeAreaView,
  TouchableOpacity,
  Text,
  TextInput,
  Image,
  View,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Linking,
  Dimensions,
} from 'react-native';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';
import axios from 'axios';

class EditProfile extends React.PureComponent{
  constructor(props){
    super(props);
    this.state = {
        fullName: "",
        email: ""
    }
  }
  componentDidMount = () => {
    let headers = {
      "token_type": "access_token",
      "Authorization": "Bearer "+ this.props.user.access_token,
      "Content-Type":  'application/json'
    }
    axios.get('http://api.pimento.in/api/Customer/GetById/'+this.props.user.customerId,
    {
      headers: headers
    })
    .then(response => {
      console.log(response.data);
    })
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
          source={require('../Screen/images/orderimage.png')}
          />
          <TouchableOpacity style={styles.iconUser}>
            <Icon name="edit" size={18} color="#e5b443" />
          </TouchableOpacity>
        </View>
        <View style={styles.sectionContainer}>
          {/*<Text style={styles.sectionDescription}>
            You will now get a confirmation code via SMS Ensure our secret stays safe.
          </Text>*/ }             
        </View>
        <View style={styles.inputWrapper}>
            <Text style={styles.inputLable}>Name</Text>
            <View>
              <TextInput
                  // placeholder="First Name"
                  //value="Chandan"
                  style={styles.formControl}
                  onChangeText={(firstName) => this.setState({firstName})}
              />
              <TouchableOpacity style={styles.icon}>
                <Icon name="edit" size={20} color="#000a28" />
              </TouchableOpacity>
            </View>
            <Text style={styles.inputLable}>Last Name</Text>
            <View>
              <TextInput
                  // placeholder="Last Name"
                  //value="Shee"
                  style={styles.formControl}
                  onChangeText={(lastName) => this.setState({lastName})}
              />
              <TouchableOpacity style={styles.icon}>
                <Icon name="edit" size={20} color="#000a28" />
              </TouchableOpacity>
            </View>
            <Text style={styles.inputLable}>Mobile</Text>
            <View>
              <TextInput
                  // placeholder="Mobile"
                  //value="9712345645"
                  style={styles.formControl}
                  keyboardType = "number-pad"
                  onChangeText={(mobileNo) => this.setState({mobileNo})}
              />
              <TouchableOpacity style={styles.icon}>
                <Icon name="edit" size={20} color="#000a28" />
              </TouchableOpacity>
            </View>
            <Text style={styles.inputLable}>Email</Text>
            <View>
              <TextInput
                  // placeholder="Email"
                  //value="sample@gmail.com"
                  style={styles.formControl}
                  onChangeText={(email) => this.setState({email})}
              />
              <TouchableOpacity style={styles.icon}>
                <Icon name="edit" size={20} color="#000a28" />
              </TouchableOpacity>
            </View>
        </View>
        <View style={styles.btn}>
            <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>SAVE</Text>
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
      alignItems: 'center',
    },
    logo:{
      alignItems:"center",
      marginTop: 20,
      position:'relative',
      width: 80,
      alignItems:'center',
      justifyContent: 'center',
      flexDirection:'row',
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
      paddingHorizontal:20,
      width:'100%',
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
    fldHolder:{
      position:'relative',
    },
    icon: {
      position: 'absolute',
      right: 5,
      top: 5,
    },
    iconUser:{
      position: 'absolute',
      right: 0,
      bottom: 0,
      backgroundColor: '#000a28',
      borderRadius: 50,
      padding: 8,
    }
});

const mapStateToProps = (state) => {
  return{
    user: state.checkout.user
  }
} 

export default connect(mapStateToProps, null)(EditProfile);