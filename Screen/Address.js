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
import { Header, Input } from 'react-native-elements';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
import Icon from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux'
import axios from 'axios';


class Checkout extends React.PureComponent{
  constructor(props){
    super(props);
    this.state = {
      value3Index: 0 
    }
  }

  

  componentDidMount(){

  }

  render(){
    return (
        <SafeAreaView style={styles.mainWrapper}>
            <Header
                placement="left"
                leftComponent={{ icon: 'arrow-back', color: '#fff' }}
                centerComponent={{ text: 'ADDRESSES', style: { color: '#fff', fontSize:18 } }}
                backgroundColor="#827e09"
                containerStyle={{paddingTop:0, height:55}}      
            />
            <View style={styles.body}>
                <ScrollView>
                    <TouchableOpacity style={styles.button}>
                        <Icon name="plus" size={24} color="#827e09" style={{marginTop:5}}/>
                        <Text style={{fontSize:18, marginHorizontal:10, color:'#827e09'}}>About Eebaat Oobaat</Text>            
                    </TouchableOpacity>
                    <View>
                        <Text style={{textTransform:"uppercase", backgroundColor:'#f2f2f2', paddingVertical:10, paddingHorizontal:15, color:"#3f3f3f", fontSize:16}}>Inside delivery region</Text>
                    </View>
                    <View style={{paddingHorizontal:10, paddingVertical:10}}>
                        <View style={styles.addressbox}>
                            <View style={{position:"absolute", left:20}}>
                                <TouchableOpacity style={ styles.radio }>
                                    <View style={ styles.checkedButton } />
                                </TouchableOpacity> 
                            </View>
                            <View>
                                <Text style={{textTransform:"uppercase", color:"#333333", fontSize:18, marginBottom:4}}>No Address Name</Text>
                                <Text style={{color:"#333333", fontSize:15, flexWrap:"wrap"}}>DA-92, Sector-4 Salt Lake Stadium, Kolkata</Text>
                            </View>
                        </View>
                    </View>
                </ScrollView>
                <TouchableOpacity style={styles.fixedButton}>
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
    button:{
      flexDirection:"row",
      alignItems:"center",
      paddingHorizontal:25,
      paddingVertical:15
    },
    addressbox:{
      width:'100%',
      flexDirection:"row",
      alignItems:"center",
      borderWidth:1,
      borderColor:"#c2c2c2",
      borderRadius:5,
      paddingRight:15,
      paddingVertical:10,
      position:"relative",
      paddingLeft:55,
      marginBottom:12
    },
    fixedButton:{
      alignItems:"center",
      backgroundColor:'#827e09',
      paddingVertical:10
    },
    radio: {
      height: 20,
      width: 20,
      borderRadius: 10,
      borderWidth: 1,
      borderColor: '#827e09',
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: 20
    },
    checkedButton: {
      width: 14,
      height: 14,
      borderRadius: 7,
      backgroundColor:'#827e09'
    }    
});

const mapStateToProps = (state) => {
    return{
      cartItems: state.cartItems,
      totalPrice: state.totalPrice
    }
  }
  
  
export default connect(mapStateToProps, null)(Checkout);