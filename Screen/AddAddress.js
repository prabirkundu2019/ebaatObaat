/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState} from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  TextInput,
  Picker,
  TouchableOpacity,
  AsyncStorage,
} from 'react-native';

import { Header, Input } from 'react-native-elements';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';
import { connect } from 'react-redux';


class AddAddress extends React.PureComponent{
  constructor(props){
    super(props);
    this.state = {
      "mobileNo": "",
      "houseNo": "",
      "area": "",
      "fullName": "",
      "address": "",
      "state": "WB",
      "city": "Kolkata",
      "landMark": "",
      "pinCode": "",
      "latitude" : "",
      "longitude" : "",
      "customerId" : 0,
      "access_token" : ""
    }
  } 

  setCityValue = (city) => {
    this.setState({
      "city": city
    })
  }

  async componentDidMount(){
    let user = await AsyncStorage.getItem('userData');
    var user1 = JSON.parse(user);
    //console.log(user1,1);
  }

  checkAddress = (address) => {
    axios.get('https://autocomplete.geocoder.ls.hereapi.com/6.2/suggest.json?apiKey=YDVsY3mS-20TDTAwgkNXjDyaBiF2yRNTDC7fZiBtoI0&query=83%pallisree%netaji%nagar&beginHighlight=<b>&endHighlight=</b>')
    .then(response => {
      console.log(response.data.suggestions[0].locationId);
        axios.get('https://geocoder.ls.hereapi.com/6.2/geocode.json?locationid='+response.data.suggestions[0].locationId+'&jsonattributes=1&gen=9&apiKey=YDVsY3mS-20TDTAwgkNXjDyaBiF2yRNTDC7fZiBtoI0')
      .then(response1 => {
        console.log(response1.data.response.view[0].result[0].location.address);
        this.setState({
          "latitude" : response1.data.response.view[0].result[0].location.displayPosition.latitude,
          "longitude" : response1.data.response.view[0].result[0].location.displayPosition.longitude,
          "address" : response1.data.response.view[0].result[0].location.address.label,
          "city" : response1.data.response.view[0].result[0].location.address.city,
          "state" : response1.data.response.view[0].result[0].location.address.state,
          "pinCode" : response1.data.response.view[0].result[0].location.address.postalCode,
          "houseNo" : response1.data.response.view[0].result[0].location.address.houseNumber
        })
      })
    })
  }

  submitAddress = () => {
    // let data = {  
    //   "ApiKey":  'AJHG56778HGJGJHG111'
    // } 
    let data = {
      "customerId": this.props.user.customerId,
      "mobileNo": this.state.mobileNo,
      "houseNo": this.state.houseNo,
      "area": this.state.area,
      "fullName": this.state.fullName,
      "address": this.state.address,
      "state": this.state.state,
      "city": this.state.city,
      "landMark": this.state.landMark,
      "pinCode": this.state.pinCode,
      "latitude" : "22.489660",
      "longitude" : "88.399420",
      "id": 0
    };  
    console.log(data);
    // Get Menus
    axios.post('http://api.pimento.in/api/AddressTemplate/Insert',data,
    {
      headers: {
        "token_type": "access_token",
        "Authorization": "Bearer "+ this.props.user.access_token,
        "Content-Type":  'application/json'
      }
    })
    .then(response => {
      console.log(response);
      this.props.navigation.navigate('Address');
    })
  }

  render(){
    console.log(this.props.user);
    return (
      // <Header
      //   placement="left"
      //   leftComponent={{ icon: 'arrow-back', color: '#fff' }}
      //   centerComponent={{ text: 'YOUR ADDRESS', style: { color: '#fff', fontSize:18 } }}
      //   backgroundColor="#827e09"
      //   containerStyle={{paddingTop:0, height:55}}      
      // />
      <View style={styles.body}>
        <ScrollView style={styles.bodyPadding}>
          <View>
            <Text style={styles.selectLabel}>CITY</Text>
            <View style={styles.selectBox}>
              <Picker
                selectedValue={this.state.city}              
                onValueChange={(itemValue, itemIndex) => this.setCityValue(itemValue)}
              >
                <Picker.Item label="Kolkata" value="Kolkata" />
                <Picker.Item label="Delhi" value="Delhi" />
              </Picker>
            </View>
          </View>

          <View>
            <TextInput 
              style={styles.textInput} 
              placeholderTextColor="#bfbfbf" 
              placeholder="Address"
              //onChangeText = {(address) => this.checkAddress(address)}
              onChangeText={(address) => this.setState({address})}
            />          
          </View>

          <View>
            <TextInput 
              style={styles.textInput} 
              placeholder="House No"
              value={this.state.houseNo} 
              onChangeText={(houseNo) => this.setState({houseNo})}
            />          
          </View>

          <View>
            <TextInput 
              style={styles.textInput} 
              placeholder="Area"
              onChangeText={(area) => this.setState({area})}
            />          
          </View>

          <View>
            <TextInput 
              style={styles.textInput} 
              placeholder="Nearby Landmark"
              onChangeText={(landMark) => this.setState({landMark})}
            />          
          </View>

          <View>
            <TextInput 
              style={styles.textInput} 
              placeholder="Pincode"
              value={this.state.pinCode} 
              onChangeText={(pinCode) => this.setState({pinCode})}
            />          
          </View>

          <View>
              <TextInput 
                style={styles.textInput} 
                placeholder="Nick Name" 
                onChangeText={(fullName) => this.setState({fullName})}
              />          
          </View>
          <View>
              <TextInput 
                style={styles.textInput} 
                placeholder="Mobile No" 
                onChangeText={(mobileNo) => this.setState({mobileNo})}
              />          
          </View>
          
        </ScrollView>
        <TouchableOpacity style={styles.fixedButton} onPress={() => this.submitAddress()}>
          <Text style={{fontSize:18, color:'#FFF'}}>DONE</Text>            
        </TouchableOpacity>
      </View>
    )
  }  
};

const styles = StyleSheet.create({

  body: {
    flex: 1,
    justifyContent:"center",
    backgroundColor:'#ffffff',
    position:"relative"
  },
  bodyPadding:{
    padding:10
  },
  selectLabel:{
    color:'#989898',
    fontSize:16,
    textTransform:'uppercase',
    fontWeight:'400'
  },
  fixedButton:{
    alignItems:"center",
    backgroundColor:'#827e09',
    paddingVertical:10
  },
  selectBox:{
    borderBottomColor:'#827e09',
    borderBottomWidth:2,
    marginBottom:15
  },
  textInput:{
    borderBottomColor:'#827e09',
    borderBottomWidth:2,
    color:'#000',
    fontSize:16,
    paddingHorizontal:10,
    marginBottom:15
  }
  
});

const mapStateToProps = state => ({
  user: state.checkout.user
})
  
  
export default connect(mapStateToProps, null)(AddAddress);