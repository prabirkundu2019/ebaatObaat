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
import Spinner from 'react-native-loading-spinner-overlay';
import { getMenus } from '../Src/actions/restaurantActions';
import { connect } from 'react-redux';


class DashboardScreen extends React.PureComponent{
  constructor(props){
    super(props);
    this.state = {
      spinner: false,
      products: []   
    }
  }

  goToMenu = (categoryId) => {
    //alert(categoryId);
    this.setState({ spinner:true })
    this.props.getMenus({
      catId: categoryId,
      subCatId: 0,
      onSuccess: () => {
        this.setState({ spinner:false })
        this.props.navigation.navigate('MainScreen' , {categoryId: categoryId})
      },
      // onFailure: () => {
      //     //Alert error message
      // },
    });
  }

  render(){
    //console.log(this.props.addItemToCart);
    return ( 
      <SafeAreaView style={styles.mainWrapper}>
        <Spinner
          visible={this.state.spinner}
          textStyle={styles.spinnerTextStyle}
        /> 
        <View style={styles.bnrBox}>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}
          >
          <Image source = {require('./images/banner1.jpg')}
          style = {{width:300, height: 140, marginRight: 10, resizeMode:'cover', borderRadius:20,}} />

          <Image source = {require('./images/banner2.jpg')}
          style = {{width:300, height: 140, resizeMode:'cover', borderRadius:20,}} />
          </ScrollView>
          
        </View>

        <View style={styles.lstLabel}>
          <Text style={{color:"#000a28", textAlign:'center', fontFamily: 'Rosellinda Alyamore', fontSize:30, paddingLeft: 12,}}>Our Exclusive Brands</Text>
        </View>

        <ScrollView>
            <View style={styles.mainLst}>
              <TouchableOpacity onPress={() => this.goToMenu(23)}>
                <View style={styles.mainLstBox}>
                  <View style={{alignItems:"center", justifyContent:'center', backgroundColor:'#570068', width:'100%', height: 90, borderRadius: 10, marginBottom:10,}}>
                    <Image 
                    style = {{ width:70, height: 70,}}
                    source = {require('./images/ebt-obt.png')}/>
                  </View>
                  <View style={{marginBottom:15,}}>
                    <Text style={{color:"#212121", fontSize:16,}}>Ea-baat Oo-baat</Text>
                    <Text style={{color:"#ccc", fontSize:11,}}>Indian</Text>
                  </View>
                </View>
              </TouchableOpacity>

              <TouchableOpacity onPress={() =>  this.goToMenu(24)}>
                <View style={styles.mainLstBox}>
                  <View style={{alignItems:"center", justifyContent:'center', backgroundColor:'#d30100', width:'100%', height: 90, borderRadius: 10, marginBottom:10,}}>
                    <Image 
                    style = {{ width:70, height: 70,}}
                    source = {require('./images/chopstix.png')}/>
                  </View>
                  <View style={{marginBottom:15,}}>
                    <Text style={{color:"#212121", fontSize:16,}}>chopstix</Text>
                    <Text style={{color:"#ccc", fontSize:11,}}>Chiness</Text>
                  </View>
                </View>
              </TouchableOpacity>
          </View>

          <View style={styles.mainLst}>
              <TouchableOpacity onPress={() =>  this.goToMenu(26)}>
                <View style={styles.mainLstBox}>
                  <View style={{alignItems:"center", justifyContent:'center', backgroundColor:'#e5b443', width:'100%', height: 90, borderRadius: 10, marginBottom:10,}}>
                    <Image 
                    style = {{ width:70, height: 70,}}
                    source = {require('./images/tuck-shop.png')}/>
                  </View>
                  <View style={{marginBottom:15,}}>
                    <Text style={{color:"#212121", fontSize:16,}}>Tuckshop</Text>
                    <Text style={{color:"#ccc", fontSize:11,}}>Continental</Text>
                  </View>
                </View>
              </TouchableOpacity>

              <TouchableOpacity onPress={() =>  this.goToMenu(25)}>
                <View style={styles.mainLstBox}>
                  <View style={{alignItems:"center", justifyContent:'center', backgroundColor:'#000a28', width:'100%', height: 90, borderRadius: 10, marginBottom:10,}}>
                    <Image 
                    style = {{ width:70, height: 70,}}
                    source = {require('./images/podi.png')}/>
                  </View>
                  <View style={{marginBottom:15,}}>
                    <Text style={{color:"#212121", fontSize:16,}}>Podi</Text>
                    <Text style={{color:"#ccc", fontSize:12,}}>South-indian</Text>
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
    // paddingHorizontal:10,
    paddingVertical:8,
    width: '100%',
    backgroundColor:'#e3eaf0',
  },

  lstLabel: {
    marginTop: 5,
    padding: 5,
  },

  mainLst: {
    flexDirection: 'row',
    justifyContent:'center',
    alignItems: 'center',
  },
  mainLstBox: {
    backgroundColor: '#fff',
    width:145,
    margin:8,
    padding:9,
    borderRadius: 20,
    shadowColor: "#ccc",
    shadowOffset: {
      width: 1,
      height: 0,
    },
    shadowOpacity: 0.1,
    elevation: 2,
  }

});

const mapDispatchToProps =  {
  getMenus
}    
  
export default connect(null, mapDispatchToProps)(DashboardScreen);