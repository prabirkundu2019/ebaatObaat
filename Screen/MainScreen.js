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
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';

class MainScreen extends React.PureComponent{
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

  componentDidMount(){
    //await AsyncStorage.removeItem('customerId');
    let data = {  
      "ApiKey":  'AJHG56778HGJGJHG211'
    }   

    // Get Menus
    axios.post('http://quickbillingapi.ezoneindiaportal.com/api/ProductPrice/GetAll',data,
    {
      headers: {"Content-Type":  'application/json'}
    })
    .then(response => {
      console.log(response.data[0]);
      this.setState({
        products: response.data,
        filtereditems: response.data,
        spinner: false
      })
      // Get Category
      axios.post('http://quickbillingapi.ezoneindiaportal.com/api/ProductCategory/GetAll',data,
      {
        headers: {"Content-Type":  'application/json'}
      })
      .then(response => {
        //console.log(response.data);
        this.setState({
          category: response.data,
          //spinner: false
        })
        let items = [...this.state.products]
        let filtereditems = items.filter(item => {
          return item.productCategoryId === this.state.category[0].id
        })
        this.setState({
          filtereditems: filtereditems,
          spinner: false
        })
      })
    })    
  }

  categoryItem = (category) => {
    let items = [...this.state.products]
    let filtereditems = items.filter(item => {
      console.log(item);
      return item.productCategoryId === category
    })
    console.log(filtereditems);
    this.setState({
      filtereditems: filtereditems,
      spinner: false
    })
  }


  render(){
    let category = this.state.category.map((cat, index) => {
      return(
        <View>
            <TouchableOpacity 
              key={index}
              style={[styles.singleTopMenu, {borderBottomWidth:5, borderBottomColor:'#827e09'}]}
              onPress={() => this.categoryItem(cat.id)}
            >
              <Text style={[styles.singleTopMenuText, {color:'#827e09'}]}>{cat.category}</Text>
            </TouchableOpacity>
        </View>
      )
    })
    //console.log(this.props.addItemToCart);
    return ( 
      <SafeAreaView style={styles.mainWrapper}>
        <Spinner
          visible={this.state.spinner}
          textStyle={styles.spinnerTextStyle}
        />        
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={styles.topMenu}>
          {category}
        </ScrollView>
        <View style={styles.switchToggleWrap}>
          <View>
            <Text style={styles.switchToggleLabel}>Show vegetarian dishes</Text>
          </View>
          <View>
          <Switch
          trackColor={{ false: "#bababa", true: "#f15a32" }}
          thumbColor={this.state.isEnabled ? "#FFF" : "#ececec"}
          ios_backgroundColor="#f15a32"
          onValueChange={this.toggleSwitch}
          value={this.state.isEnabled}
          />
          </View>
        </View>

        <ProductList products={this.state.filtereditems} navigation={this.props.navigation} onPress={this.props.addItemToCart} addQuantity={this.props.addQuantity} subtractQuantity={this.props.subtractQuantity} />

        <View style={{ flexDirection:'row', paddingHorizontal:12, position:'absolute', justifyContent:'space-between', bottom:0, left:0, right:0, width:'100%', height:55, backgroundColor: '#827e09'}}>
          <View style={{flex:1, flexDirection:'row', alignItems:"center",}}>
            <View style={{position:'relative'}}>
              <View style={{width:20, height:20, justifyContent:'center', borderRadius:50, position:'absolute', zIndex:1, top:-12, right:-12, backgroundColor:'#FFF'}}>
                <Text style={{textAlign:"center", fontSize:11}}>{this.props.totalItem}</Text>
              </View>
              <Icon name="shopping-cart" size={18} color="#FFF"/>
            </View>
            <Text style={{fontSize:18, color:'#FFF', marginLeft:18, borderLeftColor:'#FFF', borderLeftWidth:1, paddingLeft:10}}><Icon name="rupee" size={15} /> {this.props.totalPrice}</Text>
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
  topMenu:{
    backgroundColor:'#ffffff',
    height:50,
    zIndex:1,
    position:'relative',
  },
  singleTopMenu:{
    height:44
  },
  singleTopMenuText:{
    color:'#949393',
    fontWeight:'500',
    fontSize:15,
    paddingHorizontal:30,
    paddingVertical:10
  },
  switchToggleWrap:{
    flexDirection:"row",
    justifyContent:"space-between",
    alignContent:"center",
    paddingHorizontal:12,
    paddingVertical:8,
    backgroundColor:'#f4f4f2',
  },
  switchToggleLabel:{
    fontSize:16,
    color:'#444444'
  }
});

const mapStateToProps = (state) => {
  return{
    totalPrice: state.cart.totalPrice,
    totalItem: state.cart.totalItem
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