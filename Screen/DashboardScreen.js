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
        
      <View style={styles.bnrBox}>
        <Image source = {require('./images/inr_bnr.png')}
        style = {{ width: '100%', height: 180}} />
      </View>

      <View style={styles.lstLabel}>
        <Text style={{color:"#000a28", textAlign:'center', fontSize:18, paddingLeft: 12,}}>Popular Brand</Text>
      </View>

      <ScrollView>
          <View style={styles.mainLst}>
            <TouchableOpacity onPress={() => this.props.navigation.navigate("MainScreen", {categoryId: 23})}>
              <View style={styles.mainLstBox}>
                <Text style={{position:'absolute', zIndex:1, right:0, top:10, backgroundColor:'#000a28', fontSize:11, color:'#e5b443', width:65, textAlign:'center',paddingVertical:6, borderBottomLeftRadius:15, borderTopLeftRadius:15,}}>48 Dishes</Text>
                <View style={{alignItems:"center",}}>
                  <Image 
                  style = {{ width:90, height: 90,}}
                  source = {require('./images/im1.png')}/>
                </View>
                <View style={{alignItems:"center",}}>
                  <Text style={{color:"#212121", fontSize:16, marginRight:12}}>Indian</Text>
                </View>
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => this.props.navigation.navigate("MainScreen", {categoryId: 24})}>
              <View style={styles.mainLstBox}>
                <Text style={{position:'absolute', zIndex:1, right:0, top:10, backgroundColor:'#000a28', fontSize:11, color:'#e5b443', width:65, textAlign:'center',paddingVertical:6, borderBottomLeftRadius:15, borderTopLeftRadius:15,}}>11 Dishes</Text>
                <View style={{alignItems:"center",}}>
                  <Image 
                  style = {{ width:90, height: 90,}}
                  source = {require('./images/im2.png')}/>
                </View>
                <View style={{alignItems:"center",}}>
                  <Text style={{color:"#212121", fontSize:16, marginRight:12}}>Chiness</Text>
                </View>
              </View>
            </TouchableOpacity>


        </View>

        <View style={styles.mainLst}>
            <TouchableOpacity onPress={() => this.props.navigation.navigate("MainScreen", {categoryId: 25})}>
              <View style={styles.mainLstBox}>
                <Text style={{position:'absolute', zIndex:1, right:0, top:10, backgroundColor:'#000a28', fontSize:11, color:'#e5b443', width:65, textAlign:'center',paddingVertical:6, borderBottomLeftRadius:15, borderTopLeftRadius:15,}}>30 Dishes</Text>
                <View style={{alignItems:"center",}}>
                  <Image 
                  style = {{ width:90, height: 90,}}
                  source = {require('./images/im4.png')}/>
                </View>

                <View style={{alignItems:"center",}}>
                  <Text style={{color:"#212121", fontSize:16, marginRight:12}}>South-indian</Text>
                </View>
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => this.props.navigation.navigate("MainScreen", {categoryId: 26})}>
              <View style={styles.mainLstBox}>
                <Text style={{position:'absolute', zIndex:1, right:0, top:10, backgroundColor:'#000a28', fontSize:11, color:'#e5b443', width:65, textAlign:'center',paddingVertical:6, borderBottomLeftRadius:15, borderTopLeftRadius:15,}}>21 Dishes</Text>
                <View style={{alignItems:"center",}}>
                  <Image 
                  style = {{ width:90, height: 90,}}
                  source = {require('./images/im3.png')}/>
                </View>
                <View style={{alignItems:"center",}}>
                  <Text style={{color:"#212121", fontSize:16, marginRight:12}}>Continental</Text>
                </View>
              </View>
            </TouchableOpacity>


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
  bnrBox: {
    fontSize: 16,
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 20,
    width: '100%',
  },

  lstLabel: {
    marginTop: 15,
    padding: 5,
    marginBottom: 10,
  },

  mainLst: {
    flexDirection: 'row',
    justifyContent:'center',
    alignItems: 'center',
  },
  mainLstBox: {
    justifyContent:'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    height:150,
    width:150,
    margin:5,
    padding:5,
    borderRadius: 10,
    borderWidth:1,
    borderColor:'#000a28',
    shadowColor: "#ccc",
    shadowOffset: {
      width: 1,
      height: 0,
    },
    shadowOpacity: 0.1,
    elevation: 2,
  }

});

export default MainScreen;