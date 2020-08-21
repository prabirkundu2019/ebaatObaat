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
  Linking,
  Dimensions
} from 'react-native';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { getMenus, search } from '../Src/actions/restaurantActions';
import { connect } from 'react-redux';
import Modal from 'react-native-modal';
import Spinner from 'react-native-loading-spinner-overlay';
import axios from 'axios';

class ProductList extends React.PureComponent{
  constructor(props){
    super(props);
    this.state = {
      spinner: false,
      isModalVisible: false,
      subCategoryId: 0,
      category: [],
      product: {}
    }    
  }
  componentDidMount(){
    //this.props.getMenus(this.props.categoryId, this.state.subCategoryId);
    //console.log(this.props.subCategoryId);

    let data1 = {
      "productCategoryId" : this.props.categoryId,
      "APIKey" : "AJHG56778HGJGJHG111"
    }
    //   Get Category
    axios.post('http://api.pimento.in/api/ProductSubCategory/GetAllByCategory',data1,
    {
      headers: {"Content-Type":  'application/json'}
    })
    .then(response => {
      //console.log(response.data);
      this.setState({
        category: response.data,
        //spinner: false
      })
    })
  }

  subCategoryItem = (subCategoryId) => {
    this.setState({
      subCategoryId: subCategoryId
    })
    this.setState({ spinner:true })
    this.props.getMenus({
      catId: this.props.categoryId,
      subCatId: subCategoryId,
      onSuccess: () => {
        this.setState({ spinner:false })
      },
      // onFailure: () => {
      //     //Alert error message
      // },
    });
  }

  goCart = () => {
    this.setState({
      isModalVisible : false
    })
    this.props.navigation.navigate('Cart');
  }

  searchProduct = (value) => {
    this.props.search(value);   
  }

  render(){
    let existed_item1 = this.props.cartItems.find(item=> this.state.product.id === item.id);        
    let qty1 = 0;
    if(existed_item1)
    {
      qty1 = existed_item1.quantity;
    }else{
      qty1 = 0;
    }

    let category = this.state.category.map((cat, index) => {
      return(
        <View>
            <TouchableOpacity 
              key={index}
              style={[styles.singleTopMenu, {borderBottomWidth:5, borderBottomColor:'#827e09'}]}
              onPress={() => this.subCategoryItem(cat.id)}
            >
              <Text style={[styles.singleTopMenuText, {color:'#827e09'}]}>{cat.subCategory}</Text>
            </TouchableOpacity>
        </View>
      )
    })
      //console.log(this.props.products[0].product);
      let products = this.props.products.map((product, index) => {
        let existed_item = this.props.cartItems.find(item=> product.id === item.id);
        
        let qty = 0;
        if(existed_item)
        {
          qty = existed_item.quantity;
        }else{
          qty = 0;
        }
        
      // if(product.closingQuantity)
      // {
        product.quantity = 1;
        return(
          <View style={{width: Dimensions.get('window').width / 2 -10,}}>
          <View 
              id = {index}
              style={{
                borderRadius:8, overflow:"hidden", shadowColor: "#000",
                shadowOffset: {
                  width: 0,
                  height: 1,
                },
                shadowOpacity: 0.01,
                shadowRadius: 2.22,
                elevation: 1,
                margin:8,}}
            >
            <View style={{width:'100%', position:'relative'}}>
              <TouchableOpacity onPress = {() => {this.setState({ isModalVisible: true, product: product})}} >
                <Image
                  style={{width:'100%', height:120,resizeMode:"cover"}}
                  source={{uri: product.imagePath}}                
                />
              </TouchableOpacity>
              <Text style={{position:'absolute', right:0, bottom:20, backgroundColor:'#000a28', fontSize:14, fontWeight:'700', color:'#e5b443', width:40, textAlign:'center',paddingVertical:4}}><Icon name="rupee" size={15} /> {product.offerPrice}</Text>
            </View>
            <View style={{backgroundColor:'#FFF', paddingHorizontal:12, paddingVertical:12,}}>
              <View style={{width:'100%'}}>
                <Text style={{color:'#000a28', fontSize:16, fontWeight:'600', marginBottom:4,}} numberOfLines = { 1 } ellipsizeMode = 'tail'>{product.product}</Text>
                <Text style={{color:'#666666', fontSize:12}}>{product.productCategory}</Text>
              </View>
              <View style={{flexDirection:'row', justifyContent:'flex-end', marginTop:15, alignItems:'center'}}>
                <View style={{alignItems:'center', marginHorizontal:20, flexDirection:'row', justifyContent:'space-between'}}>
                  <TouchableOpacity style={{ width:22, height:22, borderTopLeftRadius:20,borderBottomLeftRadius:20, borderTopRightRadius:20, borderBottomRightRadius:20, alignItems:"center", backgroundColor:'#ccc', justifyContent:"center"}}
                  onPress={() => this.props.subtractQuantity(product)}
                  >
                    <Icon name="minus" size={10} color="#FFF" />
                  </TouchableOpacity>
                  <Text style={{width:20, textAlign:'center', fontSize:14}}>{qty}</Text>
                  <TouchableOpacity 
                    style={{ 
                      width:22, height:22, borderTopLeftRadius:20,borderBottomLeftRadius:20, borderTopRightRadius:20, borderBottomRightRadius:20, alignItems:"center", backgroundColor:'#ccc', justifyContent:"center"
                    }}
                    onPress={() => this.props.addQuantity(product)}
                  >
                    <Icon name="plus" size={10} color="#FFF" />
                  </TouchableOpacity>              
                </View>
                <Button 
                  buttonStyle={{backgroundColor: '#e5b443', borderRadius:5, width:null, height: 30, paddingHorizontal:10 }} titleStyle={{fontSize:12}} 
                  title="ADD"
                  onPress={() => this.props.onPress(product)}
                />
              </View>
            </View>
          </View>
          </View>
        )
      //}
    })
    return(    
      <ScrollView> 
        <View style={styles.srchBox}>
          <View style = {{ height: 42, flexDirection:"row", alignItems:"center", paddingHorizontal: 5,}}>
            <TouchableOpacity>
              <Image source = {require('./images/srch.png')}
              style = {{ width: 20, height: 20, resizeMode:'stretch', }} />
            </TouchableOpacity>
            <TextInput 
              style={styles.searchBar} 
              placeholder="Search items.."
              value={this.state.search}
              onChangeText={(search) => this.searchProduct(search)}
            />
          </View>
        </View> 
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={styles.topMenu}>
          <Spinner
            visible={this.state.spinner}
            textStyle={styles.spinnerTextStyle}
          />           
          <View>            
            <Modal
              visible={this.state.isModalVisible}
              animationInTiming={300}
              animationOutTiming={300}
              animationIn="slideInUp"
              coverScreen={true}
              backdropOpacity={0.70}
              style={{position:'absolute', bottom:0, right:-15, left:-15,}}
            >
            <TouchableOpacity 
              onPress = {() => { this.setState({ isModalVisible:!this.state.isModalVisible})}}
              style={{position:'absolute', right:0, top:-8, zIndex:1, backgroundColor:'#000a28', width:40, height:40, padding:4, borderRadius:20, alignItems:'center', justifyContent:'center'}}
            >
              <Text style={{fontSize:16, fontWeight:'700', color:'#e5b443',textAlign:'center',}}>X</Text>
            </TouchableOpacity>

              <View style={styles.prodctDetails}>

                <View style={{width: '100%', borderRadius: 10, marginBottom:8}}>
                  <Image source={{uri: this.state.product.imagePath}}
                  style = {{ width: '100%', height:200, borderRadius: 10,}} />
                  <Text style={{position:'absolute', right:0, bottom:30, backgroundColor:'#000a28', fontSize:22, fontWeight:'700', color:'#e5b443', width:80, textAlign:'center',paddingVertical:6}}>₹ {this.state.product.offerPrice}</Text>
                </View>

                <View style={{justifyContent: 'center'}}>
                  <Text style={{color:"#2b2b2b", fontSize:18, marginBottom:5}}>{this.state.product.product}</Text>
                  <Text style={{color:"#7e7e7e", fontSize:14, fontWeight:'600', marginRight:12}}>{this.state.product.remarks}</Text>
                </View>

                <View style={{flexDirection:'row', justifyContent:'space-between', marginTop:15, alignItems:'center'}}>
                  <Text style={{color:"#2b2b2b", fontSize:14, marginBottom:5}}>{this.state.product.productSubCategory}</Text>
                  <View style={{alignItems:'center', marginHorizontal:20, flexDirection:'row', justifyContent:'space-between'}}>
                    <TouchableOpacity 
                      onPress={() => this.props.subtractQuantity(this.state.product)}
                      style={{ width:25, height:25, borderTopLeftRadius:20,borderBottomLeftRadius:20, borderTopRightRadius:20, borderBottomRightRadius:20, alignItems:"center", backgroundColor:'#ccc', justifyContent:"center"}}
                    >
                      <Icon name="minus" size={12} color="#FFF" />
                    </TouchableOpacity>
                      <Text style={{width:25, textAlign:'center', fontSize:14}}>{qty1}</Text>
                    <TouchableOpacity 
                      onPress={() => this.props.addQuantity(this.state.product)}
                      style={{ 
                        width:25, height:25, borderTopLeftRadius:20,borderBottomLeftRadius:20, borderTopRightRadius:20, borderBottomRightRadius:20, alignItems:"center", backgroundColor:'#ccc', justifyContent:"center"
                      }}
                    >
                      <Icon name="plus" size={12} color="#FFF" />
                    </TouchableOpacity>              
                  </View>
                </View>


                <View style={styles.btn}>
                  <TouchableOpacity style={styles.button} onPress={() => this.goCart()}>
                      <Text style={styles.buttonText}>Checkout</Text>
                  </TouchableOpacity>
                </View>

              </View> 
            </Modal>
            <TouchableOpacity 
              style={[styles.singleTopMenu, {borderBottomWidth:5, borderBottomColor:'#827e09'}]}
              onPress={() => this.subCategoryItem(0)}
            >
              <Text style={[styles.singleTopMenuText, {color:'#827e09'}]}>All</Text>
            </TouchableOpacity>
          </View>
          {category}
        </ScrollView>    
        <View style={styles.mainWrapper}>
          {products}
        </View>        
      </ScrollView>
    )
  }
  
}

//export default ProductList;

const styles = StyleSheet.create({
  mainWrapper:{
    flex:1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal:10,
    paddingTop:10,
    paddingBottom:50,
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
  prodctDetails:{
    flexDirection:"column",
    alignContent:"center",
    paddingHorizontal:20,
    paddingVertical:20,
    backgroundColor:'#f4f4f2',
    borderRadius:10,
  },
  btn:{
    marginTop:20,
    flexDirection:'row',
    justifyContent: 'center',
  },
  button:{
    width:'100%',
    alignItems:'center',
    backgroundColor:'#000a28',
    borderRadius:5
  },
  buttonText:{
    color:'#e5b443',
    fontSize:15,
    paddingVertical:12,
    textTransform:'uppercase',   
  }
});

const mapStateToProps = state => ({
  products: state.cart.items,
  cartItems: state.cart.cartItems
})

const mapDispatchToProps =  {
  getMenus, search
}    
  
export default connect(mapStateToProps, mapDispatchToProps)(ProductList);