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
import { Header, Input } from 'react-native-elements';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
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
      pinCode: "",
      tax: 0,
      subTotal: 0
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

  paymentSubmit(){    
    this.setState({
      spinner : true
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
    let data = {
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
      console.log(response.data);
      this.props.navigation.navigate("OrderList");
    })
    .catch(error => {
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
        <View style={styles.singleRow}>
          <Text style={styles.label}>{item.product} ({item.quantity})</Text>
          <Text style={styles.price}><Icon name="rupee" size={15} /> { (item.productPrice * item.quantity).toFixed(2) }</Text>
        </View>
      )
    })
    return (
      <SafeAreaView style={styles.mainWrapper}>
        <Spinner
          visible={this.state.spinner}
        /> 
        {/* <Header
          placement="left"
          leftComponent={{ icon: 'arrow-back', color: '#fff' }}
          centerComponent={{ text: 'CHECKOUT', style: { color: '#fff', fontSize:18 } }}
          backgroundColor="#827e09"
          containerStyle={{paddingTop:0, height:55}}      
        /> */}
        <Modal            
          animationType = {"fade"}  
          transparent = {false}  
          visible = {this.state.isTimeVisible}  
          onRequestClose = {() =>{ console.log("Modal has been closed.") } }>  
          {/*All views of Modal*/}  
            <View style = {styles.modal}>  
              <TouchableOpacity onPress={this.setTime(1)}>
                <Text style = {styles.text}>2:00 PM-3:00 PM</Text> 
              </TouchableOpacity>
              <TouchableOpacity onPress={this.setTime(1)}>
                <Text style = {styles.text}>3:00 PM-4:00 PM</Text> 
              </TouchableOpacity> 
              <TouchableOpacity onPress={this.setTime(1)}>
                <Text style = {styles.text}>4:00 PM-5:00 PM</Text> 
              </TouchableOpacity> 
              <TouchableOpacity onPress={this.setTime(1)}>
                <Text style = {styles.text}>5:00 PM-6:00 PM</Text> 
              </TouchableOpacity> 
              <TouchableOpacity onPress={this.setTime(1)}>
                <Text style = {styles.text}>6:00 PM-7:00 PM</Text> 
              </TouchableOpacity> 
              <TouchableOpacity onPress={this.setTime(1)}>
                <Text style = {styles.text}>7:00 PM-8:00 PM</Text> 
              </TouchableOpacity> 
              <TouchableOpacity onPress={this.setTime(1)}>
                <Text style = {styles.text}>8:00 PM-9:00 PM</Text> 
              </TouchableOpacity> 
              <TouchableOpacity onPress={this.setTime(1)}>
                <Text style = {styles.text}>9:00 PM-10:00 PM</Text> 
              </TouchableOpacity> 
              <TouchableOpacity onPress={this.setTime(1)}>
                <Text style = {styles.text}>10:00 PM-11:00 PM</Text> 
              </TouchableOpacity> 
              <TouchableOpacity onPress={this.setTime(1)}>
                <Text style = {styles.text}>2:00 PM-3:00 PM</Text> 
              </TouchableOpacity>              
              <Button 
                title="Click To Close Modal" 
                onPress = {() => { this.setState({ isTimeVisible:!this.state.isTimeVisible})}}/>  
            </View>  
        </Modal> 
        <ScrollView style={styles.bodyPadding}>
            <View style={styles.ordTotl}>
                {cart}
                <View style={styles.singleRow}>
                  <Text style={styles.label}>Sub Total</Text>
                  <Text style={styles.price}><Icon name="rupee" size={15} /> { this.props.totalPrice.toFixed(2) }</Text>
                </View>
                <View style={styles.singleRow}>
                  <Text style={styles.label}>TAX</Text>
                  <Text style={styles.price}><Icon name="rupee" size={15} /> {this.state.tax.toFixed(2)}</Text>
                </View>
                <View style={styles.singleRow}>
                  <Text style={styles.label}>TOTAL</Text>
                  <Text style={styles.price}><Icon name="rupee" size={15} /> {this.state.subTotal.toFixed(2)}</Text>
                </View>
            </View>

            {/* <View style={styles.whiteBox}>
                <View style={styles.boxHeadingWrapper}>
                  <Text style={styles.boxHeading}>Apply Coupon Code</Text>
                </View>
                <View>
                <Input
                  placeholder='Enter your copon code'
                  inputContainerStyle={{borderColor:'#827e09'}}
                  inputStyle={{fontSize:15, color:'#bfbfbf', height:15}}
                />
                </View>
            </View> */}

            {/* <View style={styles.whiteBox}>
                <View style={[styles.boxHeadingWrapper, {borderBottomWidth:0}]}>
                  <Text style={styles.boxHeading}>Delivery time</Text>
                  <Text style={{marginLeft:10}}>( Sun, 10th May )</Text>
                </View>
                <View>
                    <RadioForm
                        formHorizontal={true}
                        animation={true}>
                        {
                            radio_props.map((obj, i) => (
                            <RadioButton labelHorizontal={true} key={i} >
                                <RadioButtonInput
                                  obj={obj}
                                  index={i}
                                  isSelected={this.state.value3Index === i}
                                  onPress = {() => {this.setState({ isTimeVisible: true})}}  
                                  borderWidth={1}
                                  buttonInnerColor={'#827e09'}
                                  buttonOuterColor={this.state.value3Index === i ? '#b8b8b8' : '#827e09'}
                                  buttonSize={10}
                                  buttonOuterSize={20}
                                  buttonStyle={{}}
                                  buttonWrapStyle={{marginLeft: 0}}
                                />
                                <RadioButtonLabel
                                  obj={obj}
                                  index={i}
                                  labelHorizontal={true}
                                  labelStyle={{fontSize:15, color: '#3a363b'}}
                                  labelWrapStyle={{marginRight:28}}
                                />
                            </RadioButton>
                            ))
                        }  
                    </RadioForm>
                </View>
            </View>
            <View style={styles.whiteBox}>
                <View style={[styles.boxHeadingWrapper, {borderBottomWidth:0, paddingBottom:0}]}>
                  <Text style={styles.boxHeading}>Delivery Method</Text>
                </View>
                <View style={{paddingBottom:5}}>                  
                  <TouchableOpacity style={styles.textButton}>
                    <Text style={styles.textButtonLabel}>Regular menu</Text>
                    <Icon name="arrow-right" size={24} color="#827e09" style={{marginTop:5}}/>
                  </TouchableOpacity>
                </View>
            </View> */}

            <View style={styles.ordTotl}>

              <View style={{width:'100%', paddingHorizontal:15, paddingVertical:10,}}>
                <Text style={{color:"#272727", fontSize:15, fontWeight:'700', marginBottom:15, textTransform:'uppercase'}}>Delivery Address Details</Text>

                  <View style={styles.inputWrapper}>
                    <Text style={styles.inputLable}>Address *</Text>
                    <TextInput
                        // placeholder="First Name"
                        style={styles.formControl}
                        onChangeText={(firstName) => this.setState({firstName})}
                    />
                    <Text style={styles.inputLable}>Floor No</Text>
                    <TextInput
                        // placeholder="Last Name"
                        style={styles.formControl}
                        onChangeText={(lastName) => this.setState({lastName})}
                    />
                    <Text style={styles.inputLable}>Pincode</Text>
                    <TextInput
                        // placeholder="Mobile"
                        style={styles.formControl}
                        keyboardType = "number-pad"
                        onChangeText={(mobileNo) => this.setState({mobileNo})}
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
                        onChangeText={(lastName) => this.setState({lastName})}
                    />
                </View>
                <View style={styles.btn}>
                    <TouchableOpacity style={styles.button} onPress={this.submit}>
                        <Text style={styles.buttonText}>Done</Text>
                    </TouchableOpacity>
                </View>
              </View>
            </View>
            
            {/* <View style={styles.whiteBox}>
                <View style={[styles.boxHeadingWrapper, {borderBottomWidth:0, paddingBottom:0}]}>
                  <Text style={styles.boxHeading}>Delivery Address</Text>
                </View>
                <View style={{paddingBottom:5}}> 
                  <TextInput 
                    style={styles.textInput} 
                    placeholderTextColor="#bfbfbf" 
                    placeholder="Address"
                    value={this.state.despatchAddress}
                    onChangeText={(despatchAddress) => this.setState({despatchAddress})}
                  />
                </View>
                <View style={{paddingBottom:5}}> 
                  <TextInput 
                    style={styles.textInput} 
                    placeholderTextColor="#bfbfbf" 
                    placeholder="Pincode"
                    value={this.state.pinCode}
                    keyboardType="number-pad"
                    onChangeText={(pinCode) => this.setState({pinCode})}
                  />
                </View>
            </View> */}

          </ScrollView>
          {/* <TouchableHighlight
             style={styles.fixedButton}
             onPress={() => {this.paymentSubmit()}}>  
              <Text style={{fontSize:18, color:'#FFF'}}>DONE</Text>    
          </TouchableHighlight> */}
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