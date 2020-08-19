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

      

          <View style={styles.logo}>
              <Image style={styles.tinyLogo} source={require('../images/logo.png')} />
            </View>

          <View style={styles.lstBox}>

          <ScrollView>

            <View style={{padding:15,}}>
              <Text style={{color:"#212121", fontSize:18, marginRight:12, marginBottom:5,}}>About Us</Text>
              <Text style={{color:"#818181", marginBottom:8,}}>When the world is fighting with COVID-19!</Text>
              <Text style={{color:"#818181", fontSize:14, marginBottom:8,}}>We are delivering all your FOOD CRAVINGS at your doorstep!</Text>
              <Text style={{color:"#212121", fontSize:14, marginBottom:8,}}>Are you craving your favorites dishes??</Text>
              <Text style={{color:"#818181", fontSize:13, marginBottom:8,}}>We have all your favorites here!</Text>
              <Text style={{color:"#818181", fontSize:13, marginBottom:8,}}>Be it Indian food from Ee Baat Oo Baat, Bihar to Bombay or South Indian from PODI, Essence of South India or Chinese from Chopstix, The Asian Food or Continental from Tuck Shop, The Big Bite; order all your most craved cuisines at Pimento.</Text>
              <Text style={{color:"#818181", fontSize:13, marginBottom:8,}}>We deliver at your doorstep maintaining all the sanitization and hygiene protocols for you and your family's safety.</Text>
              <Text style={{color:"#818181", fontSize:13, marginBottom:8,}}>From prepping to delivery we promise safe and hygienic food.</Text>
              

              <Text style={{color:"#212121", fontSize:18, marginRight:12, marginBottom:5, marginTop:5}}>About Pimento</Text>
              <Text style={{color:"#818181", fontSize:13, marginBottom:8,}}>Pimento is all you need to satisfy your food cravings within one single application.</Text>
              <Text style={{color:"#818181", fontSize:13, marginBottom:8,}}>We bring you cuisines from different corners of the world so you don't have to compromise on your choice.</Text>
              <Text style={{color:"#818181", fontSize:13, marginBottom:8,}}>Affordable and hygienic food service is our goal.Dine out at our restaurants or order online.</Text>
              <Text style={{color:"#818181", fontSize:13, marginBottom:8,}}>We promise to serve and deliver mouth watering n hygienically prepared cuisines for your best experience in fine dining n home delivery.</Text>
            </View>

            </ScrollView>

          </View>

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
      width: 60,
      height: 60,
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
    flex:1,
    backgroundColor: '#fff',
    marginTop: 20,
    marginBottom: 15,
    marginLeft: 12,
    marginRight: 12,
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