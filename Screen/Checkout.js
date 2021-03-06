import React, {useState} from 'react';
import {
  TouchableOpacity,
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
import { connect } from 'react-redux'
import axios from 'axios';


class Checkout extends React.PureComponent{
  constructor(props){
    super(props);
    this.state = {
      isTimeVisible: false, //state of modal default false  
    }
  }

  componentDidMount(){
  }

  setTime(a) {
    console.log(a);
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
          <Text style={styles.price}>$ { (item.productPrice * item.quantity).toFixed(2) }</Text>
        </View>
      )
    })
    return (
      <SafeAreaView style={styles.mainWrapper}>
        <Header
            placement="left"
            leftComponent={{ icon: 'arrow-back', color: '#fff' }}
            centerComponent={{ text: 'CHECKOUT', style: { color: '#fff', fontSize:18 } }}
            backgroundColor="#827e09"
            containerStyle={{paddingTop:0, height:55}}      
        />
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
        <View style={styles.body}>
          <ScrollView style={styles.bodyPadding}>
            <View style={styles.whiteBox}>
                {cart}
                <View style={styles.singleRow}>
                  <Text style={styles.label}>Checkout Amount</Text>
                  <Text style={styles.price}>$ 480.20</Text>
                </View>
                <View style={styles.singleRow}>
                  <Text style={styles.label}>Sub Total</Text>
                  <Text style={styles.price}>$ 480.20</Text>
                </View>
                <View style={styles.singleRow}>
                  <Text style={styles.label}>TAX</Text>
                  <Text style={styles.price}>$ 480.20</Text>
                </View>
                <View style={styles.singleRow}>
                  <Text style={styles.label}>TOTAL</Text>
                  <Text style={styles.price}>$ 480.20</Text>
                </View>
            </View>

            <View style={styles.whiteBox}>
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
            </View>

            <View style={styles.whiteBox}>
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
                                {/*  You can set RadioButtonLabel before RadioButtonInput */}
                                <RadioButtonInput
                                  obj={obj}
                                  index={i}
                                  isSelected={this.state.value3Index === i}
                                  onPress = {() => {this.setState({ isVisible: true})}}  
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
            </View>
            
            <View style={styles.whiteBox}>
                <View style={[styles.boxHeadingWrapper, {borderBottomWidth:0, paddingBottom:0}]}>
                  <Text style={styles.boxHeading}>Delivery Address</Text>
                </View>

                 {/* <View style={{paddingBottom:5}}>                  
                  <TouchableOpacity style={styles.textButton}>
                    <Text style={styles.textButtonLabel}>Select your address</Text>
                    <Icon name="arrow-right" size={24} color="#827e09" style={{marginTop:5}}/>
                  </TouchableOpacity>
                </View> */}

                <View style={{paddingBottom:5}}>                  
                  <View style={styles.textButton}>
                    <Text style={styles.addressLabel}>DA-92, Sector-4 Salt Lake Stadium, Kolkata</Text>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('Address')}>
                      <Icon name="edit" size={24} color="#827e09" style={{marginTop:5}}/> 
                    </TouchableOpacity>                    
                  </View>
                </View>
            </View>

          </ScrollView>
          <TouchableOpacity
            style={styles.fixedButton}
            >
            <Text style={{fontSize:18, color:'#FFF'}}>DONE</Text>            
            </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({

    body: {
      justifyContent:"center",
      backgroundColor:'#ffffff',
      position:"relative"
    },
    bodyPadding:{
      padding:10
    },
    whiteBox:{
      width:'100%',
      borderWidth:1,
      borderColor:"#c2c2c2",
      borderRadius:5,
      paddingHorizontal:10,
      paddingVertical:5,
      marginBottom:15
    },
    singleRow:{
      flexDirection:"row",
      justifyContent:"space-between",
      paddingVertical:5
    },
    label:{
      width:'80%',
      fontSize:14,
      color:'#373737'
    },
    price:{
      color:'#373737',
      fontWeight:'700'
    },
    boxHeadingWrapper:{
      paddingTop:5,
      paddingBottom:10,
      marginBottom:10,
      borderBottomColor:'#f4f4f4',
      borderBottomWidth:2,
      flexDirection:'row',
      alignItems:"center"
    },
    boxHeading:{
      fontSize:16,
      color:'#000',
      fontWeight:'700',
      textTransform:'uppercase'
    },
    textButton:{
      flexDirection:'row',
      justifyContent:"space-between",
      alignItems:"center"
    },
    textButtonLabel:{
      color:'#827e09',
      fontSize:15
    },
    addressLabel:{
      width:'80%',
      color:'#666666',
      fontSize:14
    },
    fixedButton:{
      alignItems:"center",
      backgroundColor:'#827e09',
      paddingVertical:10
    }
    
  });

const mapStateToProps = (state) => {
    return{
      cartItems: state.cartItems,
      totalPrice: state.totalPrice
    }
  }
  
  
export default connect(mapStateToProps, null)(Checkout);