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
  SafeAreaView
} from 'react-native';

import Navbar from './NavBar';
import ProductList from './ProductList';
import Icon from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';

class MainScreen extends React.PureComponent{
  constructor(props){
    super(props);
    this.state = {
      products: []   
    }
  }

  async componentDidMount(){
    await AsyncStorage.removeItem('customerId');
    let data = {  
      "ApiKey":  'AJHG56778HGJGJHG211'
    }
    axios.post('http://quickbillingapi.ezoneindiaportal.com/api/ProductPrice/GetAll',data,
    {
      headers: {"Content-Type":  'application/json'}
    })
    .then(response => {
      //console.log(response.data[0].productPrice);
      this.setState({
        products: response.data
      })
    })
  }

  render(){
    //console.log(this.props.addItemToCart);
    return ( 
      <SafeAreaView style={styles.mainWrapper}>
        <Navbar />
        <ProductList products={this.state.products} navigation={this.props.navigation} onPress={this.props.addItemToCart} addQuantity={this.props.addQuantity} subtractQuantity={this.props.subtractQuantity} />
        <View style={{ flexDirection:'row', paddingHorizontal:12, position:'absolute', justifyContent:'space-between', bottom:0, left:0, right:0, width:'100%', height:55, backgroundColor: '#c19e3a'}}>
          <View style={{flex:1, flexDirection:'row', alignItems:"center",}}>
            <Icon name="shopping-cart" size={18} color="#FFF"/>
            <Text style={{fontSize:18, color:'#FFF', marginLeft:15, borderLeftColor:'#FFF', borderLeftWidth:1, paddingLeft:10}}>$ {this.props.totalPrice}</Text>
          </View>
          <View style={{flex:1, flexDirection:'row', alignItems:"center", justifyContent:"flex-end"}}>
            <TouchableOpacity 
              onPress={() => this.props.navigation.navigate('Cart')}
            >
              <Text style={{color:"#FFF", fontSize:15, marginRight:12}}>PROCEED</Text>
            </TouchableOpacity>            
            <Icon name="arrow-right" size={18} color="#FFF"/>
          </View>
        </View>
      </SafeAreaView>
    );
  }  
}

const styles = StyleSheet.create({
  mainWrapper: {
    flex: 1
  },  
});

const mapStateToProps = (state) => {
  return{
    totalPrice: state.cart.totalPrice
  }
}

const mapDispatchToProps  = (dispatch) => {
  return {
    addItemToCart: (product) => dispatch({type: 'ADD_TO_CART', payload: product}),
    addQuantity: (product) => dispatch({type: 'ADD_TO_CART', payload: product}),
    subtractQuantity: (product) => dispatch({type: 'SUB_QUANTITY', payload: product})
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(MainScreen);
