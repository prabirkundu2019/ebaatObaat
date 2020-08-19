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

class PrivacyScreen extends React.PureComponent{
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
              <Text style={{color:"#212121", fontSize:16, marginRight:12, marginBottom:5,}}>Personal Information We Collect:</Text>

              <Text style={{color:"#818181", marginBottom:8,}}>We collects several types of information regarding our Guest User and Register Users: We collects personally identifiable information from our users. The personal information collected by us mainly consists of Contact Details (i.e. Email Address, Contact Number), Personal Details (i.e. User Name), Billing Details (i.e. Physical Billing address, Payment Method, Transaction Details), User Preferences (i.e. Preferences of order method, Time-zone, Language), User Comments (i.e. Feedback, Complain). We collect information so that you can place order, request information and support and make product suggestions.</Text>

              <Text style={{color:"#818181", fontSize:14, marginBottom:8,}}>Our website and mobile application use forms to collects information. We receive and store your information you enter on our website or mobile applications, five us any other way like email, telephone or other communications with our customer service team. If you contact us for support, we will keep an internal records for that also.</Text>

              <Text style={{color:"#212121", fontSize:15, marginRight:12, marginBottom:5,}}>How We Use the Information We Collects:</Text>
              <Text style={{color:"#818181", fontSize:13, marginBottom:8,}}>Information will be used to process your order and to manage your account. We will use your information to contact you in response of your suggestion or query, regarding the functionality changes to our products, any special offers which will be suitable to you and changes in Privacy Policy.</Text>
              <Text style={{color:"#818181", fontSize:13, marginBottom:8,}}>We used to communicate with you through emails, messages or call. We use emails to confirm orders placed by you or to send information requested by you. We are also providing email links to contact us directly. We are eager to reply you for your message. The information which you have send to us may be reviewed, discarded or used. These information may be used to improve our Website, Application, Product and Services. </Text>
              <Text style={{color:"#818181", fontSize:13, marginBottom:8,}}>To process your order we may send your information to credit reference and fraud prevention agencies. </Text>
              

              <Text style={{color:"#212121", fontSize:18, marginRight:12, marginBottom:5, marginTop:5}}>Cookies:</Text>
              <Text style={{color:"#818181", fontSize:13, marginBottom:8,}}>A cookie is a piece of data stored on a site visitor’s hard drive to help us improve your access to our site and identify repeat visitors to our site. Cookies can also help customize the site for visitors. Personal information cannot be collected via cookies and other tracking technology, however, if you previously provided personally identifiable information, cookies may be tied to such information. We are not storing any cookies to browser by code, its browsers feature to store cookies by clicking on save password. </Text>

              <Text style={{color:"#212121", fontSize:18, marginRight:12, marginBottom:5, marginTop:5}}>Security:</Text>
              <Text style={{color:"#818181", fontSize:13, marginBottom:8,}}>We believe the security of your information is a serious issue and we are committed to protecting the information we receive from you. We take precautions to protect your information. We use security measures to protect against the loss, misuse or alteration of the information under our control. When you submit sensitive information via website or application, your information is protected both online and offline. Whenever you enter sensitive information on our forms, the information is encrypted using MD5 and transmitted to us in a secure way. While we use encryption to protect your sensitive information transmitted online, we also protect your information offline. The computers/servers in which we store personally identifiable information are kept in a secure environment. We will retain personal information only as long as our business needs require. We will then destroy or render unreadable any such information upon disposal. However, we do not guarantee that unauthorized access will never occur. Users who have registered to the site agree to keep their password in strict confidence and not disclose such password to any third party. </Text>

              <Text style={{color:"#212121", fontSize:16, marginRight:12, marginBottom:5, marginTop:5}}>Sharing Information with Third Party:</Text>
              <Text style={{color:"#818181", fontSize:13, marginBottom:8,}}>We may share information about you to third parties to provide various services on our behalf to fulfil your request (i.e. to ship your order, serving advertisements, conducting surveys, Customer relationship managements, and performing analysis of our service). We will only share information about you that is necessary for third party to provide the requested service. These third parties are prohibited from retaining, sharing, storing or using your personally identifiable information for any other purpose. This policy does not apply to information that you provide to any third party such as restaurants at which you make reservation and/or pay through our services and social network that you use in connection with our services. </Text>

              <Text style={{color:"#212121", fontSize:16, marginRight:12, marginBottom:5, marginTop:5}}>Changes in Privacy Policy:</Text>
              <Text style={{color:"#818181", fontSize:13, marginBottom:8,}}>We reserve all rights to modify this Privacy Policy at any time according to our need. Our Privacy Policy may changes from time to time and all updates will be posted on this Website. Our Privacy Policy may be change according to changes in law, our features and services, advances in technology. Please visit our Privacy Policy page with periods of time for update in Privacy Policy. Please review our Privacy Policy carefully. Our continued use of the Services following the posting of changes to Privacy Policy will constitute your consent and acceptance of those changes. </Text>

              <Text style={{color:"#212121", fontSize:16, marginRight:12, marginBottom:5, marginTop:5}}>Contact Details</Text>
              <Text style={{color:"#818181", fontSize:13, marginBottom:8,}}>If you have any Query, Feedback or Concern about this Privacy Policy, you can write to us or reach out to us using following contact details.</Text>
              <Text style={{color:"#818181", fontSize:13, marginBottom:8,}}>INDIA</Text>
              <Text style={{color:"#818181", fontSize:13, marginBottom:8,}}>Dhruv Food Industries Pvt. Ltd.</Text>
              <Text style={{color:"#818181", fontSize:13, marginBottom:8,}}>2ND Floor, TATA Centrus Mall,Kolkata-700156,</Text>
              <Text style={{color:"#818181", fontSize:13, marginBottom:8,}}>Contact Number: +91-9831533436,</Text>
              <Text style={{color:"#818181", fontSize:13, marginBottom:8,}}>Email: support@pimento.in</Text>

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

export default PrivacyScreen;