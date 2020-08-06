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

import Navbar from './NavBar';
import ProductList from './ProductList';
import Icon from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux'
import axios from 'axios';

class MainScreen extends React.PureComponent{
  constructor(props){
    super(props);
    this.state = {
      products: []   
    }
  }

  componentDidMount(){
    let data = {  
      "ApiKey":  'AJHG56778HGJGJHG211'
    }
    axios.post('http://api.pimento.in/api/ProductPrice/GetAll',data,
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
        
        <View style={styles.srchBox}>
          <View style = {{ height: 50, flexDirection:"row", alignItems:"center", paddingHorizontal: 5,}}>
            <TouchableOpacity>
              <Image source = {require('./images/srch.png')}
              style = {{ width: 25, height: 25, }} />
            </TouchableOpacity>
            <TextInput style={styles.searchBar} placeholder="Search for restaurants.."/>
          </View>
        </View>

      <View style={styles.bnrBox}>
        <Image source = {require('./images/inr_bnr.png')}
        style = {{ width: '100%', height: 130}} />
      </View>

      <View style={styles.lstLabel}>
        <Text style={{color:"#2f2f2f", fontSize:18, paddingLeft: 12,}}>Popular Brand</Text>
      </View>

      <ScrollView>
          <View style={styles.lstBox}>

            <View style={{width: '35%', borderRadius: 10,}}>
              <Image source = {require('./images/im1.png')}
            style = {{ width: 100, height: 80, borderRadius: 5, margin: 5,}} />
            </View>

            <View style={{width:'50%', justifyContent: 'center'}}>
              <Text style={{color:"#212121", fontSize:18, marginRight:12}}>Ee-baat Oo-baat</Text>
              <Text style={{color:"#827e09", fontSize:14, marginRight:12}}>25% OFF</Text>
              <Text style={{color:"#818181", fontSize:14, marginRight:12}}>45 Dish</Text>
            </View>

            <View style={{width:'15%', justifyContent: 'center',}}>
              <View style={{backgroundColor: '#eaeaea', borderRadius: 30, width: 35, height: 35, alignItems: 'center'}}>  
                <Image source = {require('./images/arrow.png')}
                style = {{ width: 10, height: 15, margin: 10,}} />
              </View>
            </View>

          </View>


          <View style={styles.lstBox}>

            <View style={{width: '35%', borderRadius: 10,}}>
              <Image source = {require('./images/im2.png')}
            style = {{ width: 100, height: 80, borderRadius: 5, margin: 5,}} />
            </View>

            <View style={{width:'50%', justifyContent: 'center'}}>
              <Text style={{color:"#212121", fontSize:18, marginRight:12}}>Chopstix</Text>
              <Text style={{color:"#827e09", fontSize:14, marginRight:12}}>25% OFF</Text>
              <Text style={{color:"#818181", fontSize:14, marginRight:12}}>45 Dish</Text>
            </View>

            <View style={{width:'15%', justifyContent: 'center',}}>
              <View style={{backgroundColor: '#eaeaea', borderRadius: 30, width: 35, height: 35, alignItems: 'center'}}>  
                <Image source = {require('./images/arrow.png')}
                style = {{ width: 10, height: 15, margin: 10,}} />
              </View>
            </View>

          </View>


          <View style={styles.lstBox}>

            <View style={{width: '35%', borderRadius: 10,}}>
              <Image source = {require('./images/im3.png')}
            style = {{ width: 100, height: 80, borderRadius: 5, margin: 5,}} />
            </View>

            <View style={{width:'50%', justifyContent: 'center'}}>
              <Text style={{color:"#212121", fontSize:18, marginRight:12}}>Tuck Shop</Text>
              <Text style={{color:"#827e09", fontSize:14, marginRight:12}}>25% OFF</Text>
              <Text style={{color:"#818181", fontSize:14, marginRight:12}}>45 Dish</Text>
            </View>

            <View style={{width:'15%', justifyContent: 'center',}}>
              <View style={{backgroundColor: '#eaeaea', borderRadius: 30, width: 35, height: 35, alignItems: 'center'}}>  
                <Image source = {require('./images/arrow.png')}
                style = {{ width: 10, height: 15, margin: 10,}} />
              </View>
            </View>

          </View>

          <View style={styles.lstBox}>

            <View style={{width: '35%', borderRadius: 10,}}>
              <Image source = {require('./images/im4.png')}
            style = {{ width: 100, height: 80, borderRadius: 5, margin: 5,}} />
            </View>

            <View style={{width:'50%', justifyContent: 'center'}}>
              <Text style={{color:"#212121", fontSize:18, marginRight:12}}>Tuck Shop</Text>
              <Text style={{color:"#827e09", fontSize:14, marginRight:12}}>25% OFF</Text>
              <Text style={{color:"#818181", fontSize:14, marginRight:12}}>45 Dish</Text>
            </View>

            <View style={{width:'15%', justifyContent: 'center',}}>
              <View style={{backgroundColor: '#eaeaea', borderRadius: 30, width: 35, height: 35, alignItems: 'center'}}>  
                <Image source = {require('./images/arrow.png')}
                style = {{ width: 10, height: 15, margin: 10,}} />
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
    backgroundColor: '#f0f0f0',
  },
  srchBox: {
    backgroundColor: '#ccc',
    alignItems: 'center',
    height: 'auto',
    backgroundColor: 'white',
    elevation: 2,
    paddingHorizontal: 20,
  },
  searchBar: {
    fontSize: 16,
    paddingLeft: 10,
    paddingRight: 10,
    width: '95%',
    backgroundColor: 'white',
    borderLeftWidth: 1,
    borderLeftColor: '#c0c0c0',
    height:40,
    marginLeft: 10,
  },
  bnrBox: {
    fontSize: 16,
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 20,
    width: '100%',
  },

  lstLabel: {
    backgroundColor: 'white',
    marginTop: 15,
    padding: 5,
    marginBottom: 10,
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

const mapStateToProps = (state) => {
  return{
    totalPrice: state.totalPrice
  }
}

const mapDispatchToProps  = (dispatch) => {
  return {
    addItemToCart: (product) => dispatch({type: 'ADD_TO_CART', payload: product}),
    addQuantity: (product) => dispatch({type: 'ADD_QUANTITY', payload: product}),
    subtractQuantity: (product) => dispatch({type: 'SUB_QUANTITY', payload: product})
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(MainScreen);
