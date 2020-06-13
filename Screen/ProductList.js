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
  Linking
} from 'react-native';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

class ProductList extends React.PureComponent{

  render(){
      let products = this.props.products.map((product, index) => {
      if(product.closingQuantity)
      {
        product.quantity = 1;
        return(
          <View 
              id = {index}
              style={{
                borderRadius:8, overflow:"hidden", shadowColor: "#000",
                shadowOffset: {
                  width: 0,
                  height: 1,
                },
                shadowOpacity: 0.22,
                shadowRadius: 2.22,
                elevation: 3, marginBottom:20}}
            >
            <View style={{width:'100%', position:'relative', backgroundColor:'#FFF'}}>
              <TouchableOpacity>
                <Image
                  style={{width:'100%', height:120,resizeMode:"cover"}}
                  source={{uri: product.imagePath}}                
                />
              </TouchableOpacity>
              <Text style={{position:'absolute', right:0, bottom:20, backgroundColor:'#131b34', fontSize:18, color:'#FFF', width:80, textAlign:'center',paddingVertical:8, borderTopLeftRadius:25, borderBottomLeftRadius:25}}><Icon name="rupee" size={15} /> {product.productPrice}</Text>
            </View>
            <View style={{backgroundColor:'#FFF', paddingHorizontal:12, paddingTop:5, paddingBottom:12}}>
              <View style={{width:'100%'}}>
                <Text style={{color:'#2b2b2b', fontSize:18, fontWeight:'400', marginBottom:4}}>{product.product}</Text>
                <Text style={{color:'#666666', fontSize:14}}>{product.productCategory}</Text>
              </View>
              <View style={{flexDirection:'row', justifyContent:'flex-end', marginTop:15, alignItems:'center'}}>
                <View style={{alignItems:'center', marginHorizontal:20, flexDirection:'row', justifyContent:'space-between'}}>
                  <TouchableOpacity style={{ width:30, height:30, borderTopLeftRadius:20,borderBottomLeftRadius:20, borderTopRightRadius:20, borderBottomRightRadius:20, alignItems:"center", backgroundColor:'#827e09', justifyContent:"center"}}
                  onPress={() => this.props.subtractQuantity(product)}
                  >
                    <Icon name="minus" size={14} color="#FFF" />
                  </TouchableOpacity>
              <Text style={{width:30, textAlign:'center', fontSize:20}}>{product.quantity}</Text>
                  <TouchableOpacity 
                    style={{ 
                      width:30, height:30, borderTopLeftRadius:20,borderBottomLeftRadius:20, borderTopRightRadius:20, borderBottomRightRadius:20, alignItems:"center", backgroundColor:'#827e09', justifyContent:"center"
                    }}
                    onPress={() => this.props.addQuantity(product)}
                  >
                    <Icon name="plus" size={14} color="#FFF" />
                  </TouchableOpacity>              
                </View>
                <Button 
                  buttonStyle={{backgroundColor: '#f15a32', borderRadius:5, width:75, height: 36, paddingHorizontal:12 }} titleStyle={{fontSize:14}} 
                  title="ADD"
                  onPress={() => this.props.onPress(product)}
                />
              </View>
            </View>
          </View>
        )
      }
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

export default ProductList;

const styles = StyleSheet.create({
  mainWrapper:{
    flex:1,
    paddingHorizontal:10,
    paddingTop:12,
    paddingBottom:50,
    backgroundColor:'#FFF'
  }
});



