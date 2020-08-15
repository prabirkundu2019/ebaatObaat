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
  Dimensions,
  Modal
} from 'react-native';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { getMenus } from '../Src/actions/restaurantActions';
import { connect } from 'react-redux';
import axios from 'axios';

class ProductList extends React.PureComponent{
  constructor(props){
    super(props);
    this.state = {
      subCategoryId: 0,
      category: []
    }    
  }
  componentDidMount(){
    this.props.getMenus(this.props.categoryId, this.state.subCategoryId);
    console.log(this.props.subCategoryId);

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
    this.props.getMenus(this.props.categoryId, subCategoryId);
  }

  render(){
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
              <TouchableOpacity>
                <Image
                  style={{width:'100%', height:120,resizeMode:"cover"}}
                  source={{uri: product.imagePath}}                
                />
              </TouchableOpacity>
              <Text style={{position:'absolute', right:0, bottom:20, backgroundColor:'#000a28', fontSize:14, fontWeight:'700', color:'#e5b443', width:40, textAlign:'center',paddingVertical:4}}><Icon name="rupee" size={15} /> {product.productPrice}</Text>
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
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={styles.topMenu}>
          <View>
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
});

const mapStateToProps = state => ({
  products: state.cart.items,
  cartItems: state.cart.cartItems
})

const mapDispatchToProps =  {
  getMenus
}    
  
export default connect(mapStateToProps, mapDispatchToProps)(ProductList);