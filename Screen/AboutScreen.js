import React, {Component, PropTypes} from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Button,
  Text,
  TextInput,
  Image,
  View,
  ImageBackground,
  ScrollView,
  SafeAreaView
} from 'react-native';
import axios from 'axios';

class AboutScreen extends React.PureComponent{
  constructor(props){
    super(props);
    this.state = {
      products: []   
    }
  }

  componentDidMount(){
  }



  render(){
    //console.log(this.props.addItemToCart);
    return ( 
      <SafeAreaView style={styles.mainWrapper}>

      <ScrollView>

          <View style={styles.logo}>
              <Image style={styles.tinyLogo} source={require('../Screen/images/logo.png')} />
            </View>

          <View style={styles.lstBox}>

            <View style={{padding:20,}}>
              <Text style={{color:"#212121", fontSize:18, marginRight:12, marginBottom:5,}}>About section title</Text>
              <Text style={{color:"#818181", marginBottom:8,}}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the  when an unknown printer took a galley of type and scrambled it to make a type specimen book.</Text>
              <Text style={{color:"#212121", fontSize:18, marginBottom:5,}}>About section title</Text>
              <Text style={{color:"#818181", fontSize:14, marginBottom:8,}}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. </Text>
              <Text style={{color:"#818181", fontSize:13, marginBottom:8,}}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. </Text>
            </View>

          </View>


        </ScrollView>

      </SafeAreaView>
    );
  }  
}

const styles = StyleSheet.create({
  mainWrapper: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  logo:{
      alignItems:"center",
      paddingTop: 15,
    },  
    tinyLogo: {
      width: 100,
      height: 100,
    },
  srchBox: {
    backgroundColor: '#ccc',
    alignItems: 'center',
    height: 'auto',
    backgroundColor: 'white',
    elevation: 2,
    paddingHorizontal: 20,
  },
  lstBox: {
    backgroundColor: '#fff',
    marginTop: 20,
    marginBottom: 20,
    marginLeft: 15,
    marginRight: 15,
    borderRadius: 10,
    shadowColor: "#ccc",
    shadowOffset: {
      width: 1,
      height: 0,
    },
    shadowOpacity: 0.1,
    elevation: 2,
  }

});

export default AboutScreen;