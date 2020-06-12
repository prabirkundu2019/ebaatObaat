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
  SafeAreaView
} from 'react-native';
import Navbar from './NavBar';
import { Button, Header, FlatList} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-community/async-storage';
import { connect } from 'react-redux'
import axios from 'axios';


class Cart extends React.PureComponent{
  constructor(props){
    super(props);
    this.state = {
      menuList: [],
      customerId: 0   
    }
  }

  async componentDidMount(){
    let customerId = await AsyncStorage.getItem('customerId'); 
    this.setState({ customerId: customerId })
  }

  checkLogin = () => {
    //alert(this.state.customerId);
    if(this.state.customerId == null)
    {
      this.props.navigation.navigate('Login');
    }else{
      this.props.navigation.navigate('Checkout');
    }
    
  }

  render(){
    let cart = this.props.cartItems.map((item, index) => {
        return(
            <View style={styles.cartWrapper}>
                <View style={{width:65, height:65, borderTopLeftRadius:50, borderTopRightRadius:50, borderBottomLeftRadius:50,borderTopRightRadius:50, overflow:"hidden"}}>
                <Image
                    style={{flex:1, width:null, height:null, resizeMode:'cover'}}
                    source={{uri: item.imagePath}}   />
                </View>
                <View style={{flex:2, paddingHorizontal:10}}>
                <Text style={{fontSize:15, marginBottom:10}}>{item.product}</Text>
                <Text style={{fontSize:18, marginBottom:5}}>$ {item.quantity * item.productPrice}</Text>
                </View>
                <View style={{flex:1, alignItems:'center', flexDirection:'row', justifyContent:'space-between'}}>
                <TouchableOpacity style={{ width:25, height:25, borderTopLeftRadius:20,borderBottomLeftRadius:20, borderTopRightRadius:20, borderBottomRightRadius:20, alignItems:"center", backgroundColor:'#c19e3a', justifyContent:"center"}}>
                    <Icon name="minus" size={12} color="#FFF" />
                </TouchableOpacity>
                <Text style={{width:30, textAlign:'center', fontSize:16}}>{item.quantity}</Text>
                <TouchableOpacity style={{ width:25, height:25, borderTopLeftRadius:20,borderBottomLeftRadius:20, borderTopRightRadius:20, borderBottomRightRadius:20, alignItems:"center", backgroundColor:'#c19e3a', justifyContent:"center"}}>
                    <Icon name="plus" size={12} color="#FFF" />
                </TouchableOpacity>              
                </View>
            </View>
        )
    })
    return (
      <SafeAreaView style={styles.mainWrapper}>
        <Header
          placement="left"
          leftComponent={{ icon: 'menu', color: '#fff' }}
          centerComponent={{ text: 'CART', style: { color: '#fff', fontSize:18 } }}
          rightComponent={<Text style={{color:'#FFF', fontSize:16}}>TOTAL   ${this.props.totalPrice}</Text>}
          backgroundColor='#231f20'
          containerStyle={{paddingTop:0, height:50}}
          onPress={() => this.props.navigation.navigate('MainScreen')}
        />
        <ScrollView>
          <View style={{flex:1, padding:10}}>
            {cart}
          </View>
        </ScrollView>
        <View style={{ flexDirection:'row', paddingHorizontal:12, position:'absolute', justifyContent:'space-between', bottom:0, left:0, right:0, width:'100%', height:55, backgroundColor: '#c19e3a'}}>
          <View style={{flex:1, flexDirection:'row', alignItems:"center", justifyContent:"flex-end"}}>
            <TouchableOpacity onPress={this.checkLogin}>
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
  cartWrapper: {
    flexDirection:"row", 
    borderRadius:3, 
    alignItems:"center", 
    justifyContent:"space-between", 
    paddingHorizontal:10, 
    paddingVertical:10, 
    backgroundColor:'#FFF', 
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.20,
    shadowRadius: 1.41,      
    elevation: 2, marginBottom:8
  },
});

const mapStateToProps = (state) => {
    return{
      cartItems: state.cart.cartItems,
      totalPrice: state.cart.totalPrice
    }
  }
  
  
export default connect(mapStateToProps, null)(Cart);