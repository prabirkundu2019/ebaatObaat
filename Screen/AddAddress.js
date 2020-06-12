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
} from 'react-native';

import { Header, Input } from 'react-native-elements';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
import Icon from 'react-native-vector-icons/FontAwesome';


class AddAddress extends React.PureComponent{
  render(){
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
                // selectedValue={cityValue}              
                // onValueChange={(itemValue, itemIndex) => setCityValue(itemValue)}
              >
                <Picker.Item label="Kolkata" value="Kolkata" />
                <Picker.Item label="Delhi" value="Delhi" />
              </Picker>
            </View>
          </View>

          <View>
              <Text style={styles.selectLabel}>Street/Location</Text>
              <View style={styles.selectBox}>
                <Picker
                  // selectedValue={cityValue}              
                  // onValueChange={(itemValue, itemIndex) => setLocationValue(itemValue)}
                >
                <Picker.Item label="Salt Lake Stadium" value="Salt Lake Stadium" />
                <Picker.Item label="Salt Lake Stadium" value="Salt Lake Stadium" />
                </Picker>
            </View>
          </View>

          <View>
              <TextInput style={styles.textInput} placeholderTextColor="#bfbfbf" placeholder="Flat/House Number" />          
          </View>

          <View>
              <TextInput style={styles.textInput} placeholder="Society Name" />          
          </View>

          <View>
              <TextInput style={styles.textInput} placeholder="Nearby Landmark" />          
          </View>

          <View>
              <TextInput style={styles.textInput} placeholder="Nick Name" />          
          </View>
          
        </ScrollView>
        <TouchableOpacity style={styles.fixedButton}>
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

export default AddAddress;