import React from 'react';
import {
  TouchableOpacity,
  Text,
  TextInput,
  Image,
  View,
  ImageBackground,
  SafeAreaView
} from 'react-native';

import { Header } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

const Navbar = () => {
  return(
      <Header
        placement="left"
        centerComponent={{ text: 'All Menu', style: { color: '#fff' } }}
        backgroundColor='#231f20'
        containerStyle={{paddingTop:0, height:50}}
      />
  )
}

export default Navbar;



