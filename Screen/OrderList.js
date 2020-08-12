import React, {Component, PropTypes, useState} from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Button,
  Text,
  TextInput,
  Image,
  View,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  Switch
} from 'react-native';

import Navbar from './NavBar';
import ProductList from './ProductList';
import Spinner from 'react-native-loading-spinner-overlay';
import Icon from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';
import { getOrders } from '../Src/actions/checkoutActions';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';

class OrderList extends React.PureComponent{
  constructor(props){
    super(props);
    this.state = {
      category: [],
      products: [],
      filtereditems: [],
      spinner: true,
      isEnabled:false
    }
    
  }
  toggleSwitch = () => {
    this.setState(state => ({
      isEnabled : !state.isEnabled
    }))
  };

  async componentDidMount(){
    let access_token = await AsyncStorage.getItem('access_token'); 
    let customerId = await AsyncStorage.getItem('customerId'); 
    if(customerId == "undefined" || customerId == null)
    {
        this.props.navigation.navigate("Login");
    }else{
        this.props.getOrders(access_token, customerId); 
    }    
  }
  render(){
    let orders = this.props.orders.map((order, index) => {
      return(
        <View style={styles.lstBox}>
            <View style={{width: '30%', borderRadius: 10,}}>
                <Image source = {require('./images/orderimage.png')}
                style = {{ width: 80, height: 80, borderRadius: 50, margin: 5,}} />
            </View>

            <View style={{width:'55%', justifyContent: 'center'}}>
                <Text style={{color:"#2b2b2b", fontSize:16, marginRight:12}}>{order.orderNo}</Text>
                <Text style={{color:"#010101", fontSize:20, fontWeight:'600', marginRight:12}}>₹ {order.invoiceAmount}</Text>
            </View>

            <View style={{width:'15%', justifyContent: 'center',}}>
                <TouchableOpacity onPress={() => this.props.navigation.navigate("OrderDetails", {OrderId: order.orderNo})}>
                    <View style={{backgroundColor: '#eaeaea', borderRadius: 30, width: 35, height: 35, alignItems: 'center'}}>  
                        <Image source = {require('./images/arrow.png')}
                    style = {{ width: 10, height: 15, margin: 10,}} />
                    </View>
                </TouchableOpacity>
            </View>
        </View>
      )
    })
    //console.log(this.props.addItemToCart);
    return ( 
      <SafeAreaView style={styles.mainWrapper}>
        {/* <Spinner
          visible={this.state.spinner}
          textStyle={styles.spinnerTextStyle}
        />         */}        
        <ScrollView>
          {orders}
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
  lstBox: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    marginBottom: 8,
    marginLeft: 10,
    marginRight: 10,
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

const mapStateToProps = state => ({
    orders: state.checkout.orders
  })

const mapDispatchToProps  = {  
    getOrders
}


export default connect(mapStateToProps, mapDispatchToProps)(OrderList);