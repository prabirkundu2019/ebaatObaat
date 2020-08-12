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
import Spinner from 'react-native-loading-spinner-overlay';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';

class OrderDetails extends React.PureComponent{
  constructor(props){
    super(props);
    this.state = {
      order: {},
      items: [],
      spinner: true
    }
    
  }
  toggleSwitch = () => {
    this.setState(state => ({
      isEnabled : !state.isEnabled
    }))
  };

  async componentDidMount(){
    let access_token = await AsyncStorage.getItem('access_token'); 
    // Get Menus
    axios.get('http://api.pimento.in/api/SalesOrder/GetByOrderNo/'+this.props.route.params.OrderId, {
        headers: {
        "token_type": "application/json",
        "Authorization": "Bearer "+ access_token
        }
    })
    .then(response => {
      console.log(response.data.listOfSalesOderDetails);
      this.setState({
        order: response.data,
        items: response.data.listOfSalesOderDetails,
        spinner: false
      })
    })    
  }

  render(){
    let items = this.state.items.map((item,index) => {
        return(
            <View style={{flexDirection:'row', justifyContent: 'space-between', paddingHorizontal:15, paddingVertical:10,}}>
                <Text style={{color:"#2b2b2b", fontSize:14, marginRight:12}}>{item.product} ({item.quantityUnit}) ({item.quantity}) </Text>
                <Text style={{color:"#010101", fontSize:18, fontWeight:'600',}}>₹ {item.price}</Text>
            </View>
        )        
    })
    return ( 
      <SafeAreaView style={styles.mainWrapper}>
        <Spinner
          visible={this.state.spinner}
          textStyle={styles.spinnerTextStyle}
        />        
        
        <ScrollView>
          <View style={styles.ordInv}>

            <View style={{width:'100%', flexDirection:'row', borderBottom:1, borderBottomColor:'#e7e7e7', borderBottomWidth:1, paddingVertical:10,}}>
              <Text style={{color:"#2b2b2b", fontSize:14, marginRight:8}}>Order No: </Text>
              <Text style={{color:"#010101", fontSize:16, fontWeight:'600', marginRight:12}}>{this.state.order.orderNo}</Text>
            </View>

            <View style={{width:'100%', flexDirection:'row', paddingVertical:10,}}>
              <Text style={{color:"#2b2b2b", fontSize:14, marginRight:8}}>Order Date: </Text>
              <Text style={{color:"#010101", fontSize:16, fontWeight:'600', marginRight:12}}>{this.state.order.orderDate}</Text>
            </View>

          </View>

          <View style={styles.ordTotl}>

            {items}

            <View style={{flexDirection:'row', justifyContent: 'space-between', paddingHorizontal:15, paddingVertical:10,}}>
              <Text style={{color:"#2b2b2b", fontSize:14, marginRight:12}}>TAX </Text>
              <Text style={{color:"#010101", fontSize:18, fontWeight:'600',}}>+ ₹ {this.state.order.taxAmount}</Text>
            </View>

            <View style={{flexDirection:'row', justifyContent: 'space-between', backgroundColor:'#f2efeb', paddingHorizontal:15, paddingVertical:10,}}>
              <Text style={{color:"#2b2b2b", fontSize:14, marginRight:12}}>TOTAL</Text>
              <Text style={{color:"#010101", fontSize:18, fontWeight:'600',}}>₹ {this.state.order.invoiceAmount}</Text>
            </View>
          </View>

          {/* <View style={styles.ordTotl}>
            <View style={{width:'100%', paddingHorizontal:15, paddingVertical:10,}}>
              <Text style={{color:"#272727", fontSize:15, fontWeight:'700', marginBottom:15, textTransform:'uppercase'}}>Delivery Address</Text>
              <Text style={{color:"#666666", fontSize:16,}}>DA-92, Sector-4</Text>
              <Text style={{color:"#666666", fontSize:16,}}>Salt Lake Stadium, Kolkata</Text>
            </View>
          </View> */}
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
  }

});

export default OrderDetails;