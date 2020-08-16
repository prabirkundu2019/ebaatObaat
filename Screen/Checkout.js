import React, {useState} from 'react';
import {
  TouchableOpacity,
  TouchableHighlight,
  Text,
  TextInput,
  Image,
  View,
  ImageBackground,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  Button,
  Modal
} from 'react-native';
import { RadioButton } from 'react-native-paper';
import { Header, Input } from 'react-native-elements';
//import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-community/async-storage';
import Spinner from 'react-native-loading-spinner-overlay';
import { connect } from 'react-redux';
import RazorpayCheckout from 'react-native-razorpay';
import axios from 'axios';


class Checkout extends React.PureComponent{
  constructor(props){
    super(props);
    this.state = {
      isTimeVisible: false, //state of modal default false  ,
      //deliveryAddress: [],
      spinner : false,
      despatchAddress: "",
      address: "",
      floorNo: "",
      pinCode: "",
      mobileNo: "",
      howToReach: "",
      tax: 0,
      subTotal: 0,
      paymentType : "online"
    }
  }

  componentDidMount(){    
    var tax = this.props.totalPrice * 0.05;
    let subTotal = this.props.totalPrice + tax;
    this.setState({
      tax : tax,
      subTotal: subTotal
    })
    // let deliveryAddress = await AsyncStorage.getItem('deliveryAddress'); 
    // this.setState({
    //   deliveryAddress: JSON.parse(deliveryAddress)
    // })
    // //alert(deliveryAddress);
    // console.log(deliveryAddress);
    
  }

  setTime(a) {
    console.log(a);
  }

  setPaymentType = (type) => {
    this.setState({
      paymentType : type
    })
  }

  paymentSubmit(){    
    this.setState({
      spinner : true,
      despatchAddress: this.state.address+" "+this.state.floorNo+" "+this.state.pinCode
    })
    axios.get('http://api.pimento.in/api/ServiceArea/isValid/'+this.state.pinCode,
    {
      headers: {
        "token_type": "access_token",
        "Authorization": "Bearer "+ this.props.user.access_token,
        "Content-Type":  'application/json'
      }
    })
    .then(response => {
      console.log(response.data);
      if(response.data == true)
      {
        if(this.state.paymentType == 'online')
        {
          let data = {
            "amount" : this.state.subTotal * 100,
            "currency" : "INR",
            "receipt": "Receipt no. 1",
            "payment_capture": 1
          }
          axios.post('https://api.razorpay.com/v1/orders',data,
          {
            headers: {
              "Content-Type"  :  "application/json",
              "Authorization" : "Basic cnpwX3Rlc3RfZmZEMmIyQ0ozaWFlQVM6MjZFMTB1dGVVQ1RUc215d2J6aUR2b0NF"
            }
          })
          .then(response => {
            this.setState({
              spinner : false
            })
            console.log(response.id);
            var options = {
              description: "Payment from paymeno",
              image: 'https://eebaatoobaat.com/piamento.jpg',
              currency: 'INR',
              key: 'rzp_test_ffD2b2CJ3iaeAS',
              amount: this.state.subTotal * 100,
              name: 'Payment O',
              order_id: response.id,//Replace this with an order_id created using Orders API. Learn more at https://razorpay.com/docs/api/orders.
              // prefill: {
              //   email: 'prabir.pixzion@gmail.com',
              //   contact: '9804335472',
              //   name: 'Prabir Kundu'
              // },
              theme: {color: '#53a20e'}
            }
            RazorpayCheckout.open(options).then((data) => {
              // handle success
              this.onSuccess(data.razorpay_payment_id)
              //alert(`Success: ${data.razorpay_payment_id}`);
            }).catch((error) => {
              // handle failure
              alert(`Error: ${error.code} | ${error.description}`);
            });
          })  
        }else{
          this.onSuccess(0)
        }
      }else{
        alert("Pincode is not valid");
      }
    })      
  }

  onSuccess = (paymentId) => {
    //alert(paymentId);
    let cartArray = [];
    for(let i=0;i<this.props.cartItems.length;i++){
      var item = {
        "quantity": this.props.cartItems[i].quantity,
        "weight": 0,
        "defaultWeight": this.props.cartItems[i].defaultWeight,
        "price": this.props.cartItems[i].productPrice,
        "discountAmount": 0,
        "salesAmount": this.props.cartItems[i].productPrice * this.props.cartItems[i].quantity,
        "productId": this.props.cartItems[i].productId,
        "product": this.props.cartItems[i].product
      }
      cartArray.push(item);
    }
    let data = {};
    if(paymentId != 0)
    {
      data = {
        "salesType" : "Card",
        "customerId": this.props.user.customerId,
        "customerName": this.props.user.fullName,
        "quantity": this.props.totalItem,
        "salesAmount": this.props.totalPrice,
        "cgstTaxRate": 2,
        "cgstTaxAmount": 30,
        "sgstTaxRate": 2,
        "sgstTaxAmount": 30,
        "taxAmount": this.state.tax,
        "invoiceAmount":this.state.subTotal,
        "onlinePaymentStatus": true,
        "onlineTransactionId": paymentId,
        "paymentGateWayProvider": "razorpay",
        "deliveryTerms": "idk",
        "despatchAddress": this.state.despatchAddress,
        "shippingCharge": 0,
        "listOfSalesOderDetails": cartArray,
        "originFrom": "APP"
      }
    }else{
      data = {
        "salesType" : "Card",
        "customerId": this.props.user.customerId,
        "customerName": this.props.user.fullName,
        "quantity": this.props.totalItem,
        "salesAmount": this.props.totalPrice,
        "cgstTaxRate": 2,
        "cgstTaxAmount": 30,
        "sgstTaxRate": 2,
        "sgstTaxAmount": 30,
        "taxAmount": this.state.tax,
        "invoiceAmount":this.state.subTotal,
        "onlinePaymentStatus": false,
        "onlineTransactionId": "",
        "paymentGateWayProvider": "",
        "deliveryTerms": "idk",
        "despatchAddress": this.state.despatchAddress,
        "shippingCharge": 0,
        "listOfSalesOderDetails": cartArray,
        "originFrom": "APP"
      }
    }
    console.log(data);
    axios.post('http://api.pimento.in/api/SalesOrder/Insert',data,
    {
      headers: {
        "token_type": "access_token",
        "Authorization": "Bearer "+ this.props.user.access_token,
        "Content-Type":  'application/json'
      }
    })
    .then(response => {
      this.setState({
        spinner : false
      })
      console.log(response.data);
      this.props.navigation.navigate("OrderList");
    })
    .catch(error => {
      this.setState({
        spinner : false
      })
      console.log(error);
    })
  }

  render(){
    let radio_props = [
      {label: 'Deliver Now', value: 0 },
      {label: 'Deliver Later', value: 1 }
    ];
    let cart = this.props.cartItems.map((item, index) => {
      return (
        <View style={{flexDirection:'row', justifyContent: 'space-between', paddingHorizontal:15, paddingVertical:8,}}>
          <Text style={{color:"#2b2b2b", fontSize:14, marginRight:12}}>{item.product} ({item.quantity}) </Text>
          <Text style={{color:"#010101", fontSize:18, fontWeight:'600',}}>₹ { (item.productPrice * item.quantity).toFixed(2) }</Text>
        </View>
      )
    })
    return (
      <SafeAreaView style={styles.mainWrapper}>
        <Spinner
          visible={this.state.spinner}
          textStyle={styles.spinnerTextStyle}
        />        
        
        <ScrollView keyboardDismissMode="interactive">
          

          <View style={styles.ordTotl}>

            {cart}

            <View style={{flexDirection:'row', justifyContent: 'space-between', paddingHorizontal:15, paddingVertical:8,}}>
              <Text style={{color:"#2b2b2b", fontSize:14, marginRight:12, textTransform:'uppercase',}}>Sub Total </Text>
              <Text style={{color:"#010101", fontSize:18, fontWeight:'600',}}>+ ₹ { this.props.totalPrice.toFixed(2) }</Text>
            </View>

            <View style={{flexDirection:'row', justifyContent: 'space-between', paddingHorizontal:15, paddingVertical:8,}}>
              <Text style={{color:"#2b2b2b", fontSize:14, marginRight:12}}>TAX </Text>
              <Text style={{color:"#010101", fontSize:18, fontWeight:'600',}}>+ ₹ {this.state.tax.toFixed(2)}</Text>
            </View>

            <View style={{flexDirection:'row', justifyContent: 'space-between', backgroundColor:'#f2efeb', paddingHorizontal:15, paddingVertical:10,}}>
              <Text style={{color:"#2b2b2b", fontSize:14, marginRight:12, fontWeight:'700',}}>TOTAL</Text>
              <Text style={{color:"#010101", fontSize:18, fontWeight:'600',}}>₹ {this.state.subTotal.toFixed(2)}</Text>
            </View>

          </View>


          <View style={styles.ordTotl}>

            <View style={{width:'100%', paddingHorizontal:15, paddingVertical:10,}}>
              <Text style={{color:"#272727", fontSize:15, fontWeight:'700', marginBottom:15, textTransform:'uppercase'}}>Delivery Address Details</Text>

                <View style={styles.inputWrapper}>
                  <Text style={styles.inputLable}>Address *</Text>
                  <TextInput
                      // placeholder="First Name"
                      style={styles.formControl}
                      onChangeText={(address) => this.setState({address})}
                  />
                  <Text style={styles.inputLable}>Floor No</Text>
                  <TextInput
                      // placeholder="Last Name"
                      style={styles.formControl}
                      onChangeText={(floorNo) => this.setState({floorNo})}
                  />
                  <Text style={styles.inputLable}>Pincode</Text>
                  <TextInput
                      // placeholder="Mobile"
                      style={styles.formControl}
                      keyboardType = "number-pad"
                      onChangeText={(pinCode) => this.setState({pinCode})}
                  />
                  <Text style={styles.inputLable}>Phone</Text>
                  <TextInput
                      // placeholder="Mobile"
                      style={styles.formControl}
                      keyboardType = "number-pad"
                      onChangeText={(mobileNo) => this.setState({mobileNo})}
                  />
                  <Text style={styles.inputLable}>How to reach (Optional)</Text>
                  <TextInput
                      // placeholder="Last Name"
                      style={styles.formControl}
                      onChangeText={(howToReach) => this.setState({howToReach})}
                  />
              </View>
              <View flexDirection="row">
                <RadioButton
                  value="online"
                  status={ this.state.paymentType === 'online' ? 'checked' : 'unchecked' }
                  onPress={() => this.setPaymentType('online')}
                />
                <Text>Online</Text>
                <RadioButton
                  value="cod"
                  status={ this.state.paymentType === 'cod' ? 'checked' : 'unchecked' }
                  onPress={() => this.setPaymentType('cod')}
                />
                <Text>COD</Text>
              </View>
              <View style={styles.btn}>
                  <TouchableOpacity style={styles.button} onPress={() => {this.paymentSubmit()}}>
                      <Text style={styles.buttonText}>Done</Text>
                  </TouchableOpacity>
              </View>
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
    marginTop: 15,
  },
  ordInv: {
    backgroundColor: '#fff',
    paddingHorizontal:15,
    marginBottom: 8,
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 5,
    shadowColor: "#ccc",
    shadowOffset: {
      width: 1,
      height: 0,
    },
    shadowOpacity: 0.1,
    elevation: 2,
  },
  ordTotl: {
    backgroundColor: '#fff', 
    marginBottom: 8,
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 5,
    shadowColor: "#ccc",
    shadowOffset: {
      width: 1,
      height: 0,
    },
    shadowOpacity: 0.1,
    elevation: 2,
  },
  inputWrapper:{
      justifyContent: 'center',
      marginTop:10,
      paddingHorizontal:10,
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
      marginTop:10,
      flexDirection:'row',
      paddingHorizontal:10,
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

const mapStateToProps = (state) => {
    return{
      user: state.checkout.user,
      cartItems: state.cart.cartItems,
      totalItem: state.cart.totalItem,
      totalPrice: state.cart.totalPrice,
      address: state.checkout.deliveryAddress
    }
}
  
  
export default connect(mapStateToProps, null)(Checkout);