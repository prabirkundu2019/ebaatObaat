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
      subCategoryId: 0,
      category: [],
      products: [],
      filtereditems: [],
      spinner: false,
      isEnabled:false
    }
    
  }
  toggleSwitch = () => {
    this.setState(state => ({
      isEnabled : !state.isEnabled
    }))
  };

  componentDidMount(){
    // let data = {
    //   "categoryId": this.props.route.params.categoryId,
    //   "ApiKey": "AJHG56778HGJGJHG111"
    // }
    // console.log(data);
    // axios.post('http://api.pimento.in/api/ProductSubCategory/GetAllByCategory',data,
    // {
    //   headers: {"Content-Type":  'application/json'}
    // })
    // .then(response => {
    //   console.log(response.data);
    // })


    // let data1 = {
    //   "productCategoryId" : this.props.route.params.categoryId,
    //   "APIKey" : "AJHG56778HGJGJHG111"
    // }
    // //   Get Category
    //   axios.post('http://api.pimento.in/api/ProductSubCategory/GetAllByCategory',data1,
    //   {
    //     headers: {"Content-Type":  'application/json'}
    //   })
    //   .then(response => {
    //     //console.log(response.data);
    //     this.setState({
    //       category: response.data,
    //       //spinner: false
    //     })
    //   })

    // this.setState({
    //   spinner:true
    // })
    // setTimeout(function(){  
    //   this.setState({
    //     spinner:false
    //   })
    // }, 2000); 
    // //await AsyncStorage.removeItem('customerId');
    // let data = {  
    //   "ApiKey":  'AJHG56778HGJGJHG111',
    //   "productCategoryId": this.props.route.params.categoryId
    // }   

    // // Get Menus
    // axios.post('http://api.pimento.in/api/ProductPrice/GetAllByCategory',data,
    // {
    //   headers: {"Content-Type":  'application/json'}
    // })
    // .then(response => {
    //   //console.log(response.data);
    //   this.setState({
    //     products: response.data,
    //     //filtereditems: response.data,
    //     spinner: false
    //   })
    //   Get Category
    //   axios.post('http://api.pimento.in/api/ProductCategory/GetAll',data,
    //   {
    //     headers: {"Content-Type":  'application/json'}
    //   })
    //   .then(response => {
    //     //console.log(response.data);
    //     this.setState({
    //       category: response.data,
    //       //spinner: false
    //     })
    //     let items = [...this.state.products]
    //     let filtereditems = items.filter(item => {
    //       return item.productCategoryId === this.state.category[0].id
    //     })
    //     this.setState({
    //       filtereditems: filtereditems,
    //       spinner: false
    //     })
    //   })
    // })    
  }

  // categoryItem = (category) => {
  //   let items = [...this.state.products]
  //   let filtereditems = items.filter(item => {
  //     console.log(item);
  //     return item.productCategoryId === category
  //   })
  //   console.log(filtereditems);
  //   this.setState({
  //     filtereditems: filtereditems,
  //     spinner: false
  //   })
  // }

  subCategoryItem = (subCategoryId) => {
    this.setState({
      subCategoryId: subCategoryId
    })
  }


  render(){
    // let category = this.state.category.map((cat, index) => {
    //   return(
    //     <View>
    //         <TouchableOpacity 
    //           key={index}
    //           style={[styles.singleTopMenu, {borderBottomWidth:5, borderBottomColor:'#827e09'}]}
    //           onPress={() => this.subCategoryItem(cat.id)}
    //         >
    //           <Text style={[styles.singleTopMenuText, {color:'#827e09'}]}>{cat.subCategory}</Text>
    //         </TouchableOpacity>
    //     </View>
    //   )
    // })
    //console.log(this.props.addItemToCart);
    return ( 
      <SafeAreaView style={styles.mainWrapper}>
        <Spinner
          visible={this.state.spinner}
          textStyle={styles.spinnerTextStyle}
        />        
        {/* <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={styles.topMenu}>
          <View>
              <TouchableOpacity 
                style={[styles.singleTopMenu, {borderBottomWidth:5, borderBottomColor:'#827e09'}]}
                onPress={() => this.subCategoryItem(0)}
              >
                <Text style={[styles.singleTopMenuText, {color:'#827e09'}]}>All</Text>
              </TouchableOpacity>
          </View>
          {category}
        </ScrollView> */}
        {/* <View style={styles.switchToggleWrap}>
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
        </View> */}

        <ProductList categoryId={this.props.route.params.categoryId} subCategoryId={this.state.subCategoryId} navigation={this.props.navigation} onPress={this.props.addItemToCart} addQuantity={this.props.addQuantity} subtractQuantity={this.props.subtractQuantity} />

        <View style={{ flexDirection:'row', paddingHorizontal:12, position:'absolute', justifyContent:'space-between', bottom:0, left:0, right:0, width:'100%', height:55, backgroundColor: '#000a28'}}>
          <View style={{flex:1, flexDirection:'row', alignItems:"center",}}>
            <View style={{position:'relative'}}>
              <View style={{width:20, height:20, justifyContent:'center', borderRadius:50, position:'absolute', zIndex:1, top:-12, right:-12, backgroundColor:'#FFF'}}>
                <Text style={{textAlign:"center", fontSize:11}}>{this.props.totalItem}</Text>
              </View>
              <Icon name="shopping-cart" size={18} color="#e5b443"/>
            </View>
            <Text style={{fontSize:18, color:'#e5b443', marginLeft:18, borderLeftColor:'#e5b443', borderLeftWidth:1, paddingLeft:10}}><Icon name="rupee" size={15} /> {this.props.totalPrice}</Text>
          </View>
          {this.props.totalItem >0 && <View style={{flex:1, flexDirection:'row', alignItems:"center", justifyContent:"flex-end"}}>
            <TouchableOpacity 
              onPress={() => this.props.navigation.navigate('Cart')}
            >
              <Text style={{color:"#e5b443", fontSize:15, marginRight:12}}>PROCEED</Text>
            </TouchableOpacity>            
            <Icon name="arrow-right" size={18} color="#e5b443"/>
          </View>}
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
    totalItem: state.cart.totalItem,
    items: state.cart.items
  }
}

const mapDispatchToProps  = (dispatch) => {
  return {
    addItemToCart: (product) => dispatch({type: 'ADD_TO_CART', payload: product}),
    addQuantity: (product) => dispatch({type: 'ADD_TO_CART', payload: product}),
    subtractQuantity: (product) => dispatch({type: 'SUB_QUANTITY', payload: product}),
    //getMenus: () => dispatch(getMenus(this.props.route.params.categoryId))
  }  
}


export default connect(mapStateToProps, mapDispatchToProps)(MainScreen);