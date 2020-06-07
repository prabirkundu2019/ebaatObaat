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
import Geolocation from '@react-native-community/geolocation';

class Search extends React.PureComponent{
  state = {
    currentLongitude: 'unknown', //Initial Longitude
    currentLatitude: 'unknown', //Initial Latitude
  };
  componentDidMount = () => {
    Geolocation.getCurrentPosition(
      //Will give you the current location
      position => {
        let currentLongitude = JSON.stringify(position.coords.longitude);
        //getting the Longitude from the location json
        let currentLatitude = JSON.stringify(position.coords.latitude);
        //getting the Latitude from the location json
        alert('Longitude:' +currentLongitude , 'Latitude:' + currentLatitude);
        this.setState({ currentLongitude: currentLongitude });
        //Setting state Longitude to re re-render the Longitude Text
        this.setState({ currentLatitude: currentLatitude });
        //Setting state Latitude to re re-render the Longitude Text
      },
      error => alert(error.message),
      { enableHighAccuracy: true, timeout: 20000 }
    );
    // this.watchID = Geolocation.watchPosition(position => {
    //   //Will give you the location on location change
    //   console.log(position);
    //   const currentLongitude = JSON.stringify(position.coords.longitude);
    //   //getting the Longitude from the location json
    //   const currentLatitude = JSON.stringify(position.coords.latitude);
    //   //getting the Latitude from the location json
    //   this.setState({ currentLongitude: currentLongitude });
    //   //Setting state Longitude to re re-render the Longitude Text
    //   this.setState({ currentLatitude: currentLatitude });
    //   //Setting state Latitude to re re-render the Longitude Text
    // });
  };
  componentWillUnmount = () => {
    //Geolocation.clearWatch(this.watchID);
  };

  gotToMyLocation = () => {
    alert(1);
  }

  render(){
    return (
      <>
      <Header
        placement="left"
        //leftComponent={{ icon: 'arrow-back', color: '#fff' }}
        centerComponent={{ text: 'WHERE TO DELIVER?', style: { color: '#fff' } }}
        backgroundColor="#827e09"        
      />
        <View>        
          <SearchBar
            placeholder="Type Your Location"
            lightTheme = 'true'
            placeholderTextColor = '#c0c0c0'
            color = '#827e09'
            inputContainerStyle = {{backgroundColor:'#FFF', paddingTop:10, paddingBottom:10, height:55}}
            inputStyle = {{backgroundColor:'#FFF', borderLeftColor:'#aeaeae', borderLeftWidth:1, paddingLeft:10}}
            containerStyle = {{backgroundColor:'#FFF', padding:0}}       
          />
          {/* <Input
              placeholder='Detect My Location'
              rightIcon={{ type: 'font-awesome', name: 'map-marker', marginRight:15, color:'#827e09' }}
              containerStyle = {{backgroundColor:'#cacaca'}}
              inputContainerStyle = {{backgroundColor:'#FFF', marginTop:20, borderRadius:5, borderColor:'#FFF'}}
              inputStyle = {{paddingLeft:20, paddingRight:20}}
              onKeyPress={this.gotToMyLocation}
          /> */}
        </View>
      </>
    );
  }  
};

const styles = StyleSheet.create({

  body: {
    flex: 1,
    flexDirection: 'column',
    justifyContent:"flex-start"
  },
  
});

export default Search;
