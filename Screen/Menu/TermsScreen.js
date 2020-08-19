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

class TermsScreen extends React.PureComponent{
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
              <Text style={{color:"#212121", fontSize:18, marginRight:12, marginBottom:5,}}>Terms and conditions</Text>

              <Text style={{color:"#212121", fontSize:14, marginRight:12, marginBottom:5,}}>1) You must not accept these terms if:</Text>
              <Text style={{color:"#818181", marginBottom:8,}}>You are not lawfully entitled to use Pimento website or App in the country in which you are located or reside If you are not of legal age to bind agreement with us</Text>

              <Text style={{color:"#212121", fontSize:14, marginRight:12, marginBottom:5,}}>2) If any change made to Terms & Conditions:</Text>
              <Text style={{color:"#818181", marginBottom:8,}}>Pimento team can modify Terms & conditions at any time, in sole discretion. If Pimento team will be modifying any content, team will let you know either by site or through app. It's a major factor that you do agree to modified Terms & conditions. If you don't agree to be bound by the modified Terms, then you can't use the services any more. Over Services are evolving over time we can change or close any services at any time without any notice, at our sole discretion. </Text>

              <Text style={{color:"#212121", fontSize:14, marginRight:12, marginBottom:5,}}> 3) Privacy :</Text>
              <Text style={{color:"#818181", marginBottom:8,}}>Your privacy is very important to us. We will assure you that your any private data will not be disclosed anywhere at any cost. If you have any questions or concerns about terms and conditions, please contact us at support@pimento.com </Text>

              <Text style={{color:"#212121", fontSize:16, marginRight:12, marginBottom:5,}}> Legal Activity </Text>
              <Text style={{color:"#818181", fontSize:14, marginBottom:8,}}>Do not use Pimento to promote any illegal activities.</Text>

              <Text style={{color:"#212121", fontSize:16, marginRight:12, marginBottom:5,}}> Harmful Activities </Text>
              <Text style={{color:"#818181", fontSize:14, marginBottom:8,}}>Do not distribute content that harms or interferes with the operation of the Networks, Servers, or other infrastructure of Pimento. </Text>

              <Text style={{color:"#212121", fontSize:16, marginRight:12, marginBottom:5,}}> Hacking Personal Information </Text>
              <Text style={{color:"#818181", fontSize:14, marginBottom:8,}}>Do not access other user’s account without their permission. Do not disturb other people’s personal information like email Id, passwords, play store or app store credentials without their permission.</Text>
              <Text style={{color:"#818181", fontSize:12, marginBottom:8,}}>NOTE: In case of any illegal activities from user, we can block their account permanently.</Text>


              <Text style={{color:"#212121", fontSize:18, marginRight:12, marginBottom:5,}}>Refund Policy:</Text>
              <Text style={{color:"#212121", fontSize:14, marginRight:12, marginBottom:5,}}> 1) For Restaurant Owner: </Text>
              <Text style={{color:"#818181", marginBottom:8,}}>In case of payment did by mistake or in case of any payment related issues from Google Play Store or App Store, we are not entitled to refund any amount. If it’s very crucial and any genuine problem is seen in our system than we can look into it and resolve the issue or issue refund.</Text>

              <Text style={{color:"#212121", fontSize:14, marginRight:12, marginBottom:5,}}> 2) For Customer of Restaurant:</Text>
              <Text style={{color:"#818181", marginBottom:8,}}>In case of payment did by mistake or in case of any payment related issues for food ordered with Pimento, we are not entitled to refund any amount. Restaurant Owner will be responsible for issue refund to customer for placed order in any case. </Text>

              <Text style={{color:"#212121", fontSize:16, marginRight:12, marginBottom:5,}}> Order Approval: </Text>
              <Text style={{color:"#818181", fontSize:14, marginBottom:8,}}>Pimento is not responsible for any kind of order cancelation or approval. Delivery time, Taxes, Delivery Charges and Delivery times are decided by the restaurant owner. Restaurant owners are only responsible for any kind of updates and changes of extra charges. </Text>

              <Text style={{color:"#212121", fontSize:16, marginRight:12, marginBottom:5,}}> Communication Problems between Customer and Restaurant: </Text>
              <Text style={{color:"#818181", fontSize:14, marginBottom:8,}}>In case of misbehaviour, miscommunication or any illegal activities done by customer and restaurant registered here, we will not be responsible for any such activities as we are not taking any proof of their identity. </Text>

              <Text style={{color:"#212121", fontSize:16, marginRight:12, marginBottom:5,}}> Blocking or Deleting your Account: </Text>
              <Text style={{color:"#818181", fontSize:14, marginBottom:8,}}>If we notice any illegal activity then we have all rights to permanently Block your account without any notice and reasons. </Text>
              

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

export default TermsScreen;