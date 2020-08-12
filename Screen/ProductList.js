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
} from 'react-native';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { getMenus } from '../Src/actions/restaurantActions';
import { connect } from 'react-redux';

class ProductList extends React.PureComponent{
  componentDidMount(){
    this.props.getMenus(this.props.categoryId);
  }

  render(){
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
  }
});

const mapStateToProps = state => ({
  products: state.cart.items,
  cartItems: state.cart.cartItems
})

const mapDispatchToProps =  {
  getMenus
}    
  
export default connect(mapStateToProps, mapDispatchToProps)(ProductList);