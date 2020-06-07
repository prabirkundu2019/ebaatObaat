/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  StatusBar,
} from 'react-native';


const fogotPassword = () => {
  return (
    <>
        <View style={styles.body}>
          <View style={styles.logo}>
            {/* <Image
            style={styles.tinyLogo}
            source={{
            uri: 'Screen/images/logo.png',
            }}
            /> */}
          </View>
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionDescription}>
              You will now get a confirmation code via SMS Ensure our secret stays safe.
            </Text>              
          </View>
          <View style={styles.inputWrapper}>
          <TextInput
          style={styles.formControl}
          keyboardType = "number-pad"
          />
          </View>
          <View style={styles.btn}>
          <TouchableOpacity
            style={styles.button}
            >
            <Text>RESEND</Text>
            </TouchableOpacity>
            <TouchableOpacity
            style={styles.button1}
            >
            <Text>VERIFY</Text>
            </TouchableOpacity>
          </View>
        </View>
        </>
  );
};

const styles = StyleSheet.create({

  body: {
    flex: 1,
    flexDirection: 'column',
    justifyContent:"center"
  },
  logo:{
    alignItems:"center"
  },  
  tinyLogo: {
    width: 50,
    height: 50,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 16,
    fontWeight: '400',
    textAlign:'center'
  },
  inputWrapper:{
    alignItems: 'center',
    justifyContent: 'center',
    marginTop:60
  },
  formControl:{
    width:'60%',
    height:50,
    color:'#000',
    fontSize:16,
    borderBottomColor:'#787210',
    borderBottomWidth:2
  },
  btn:{
    marginTop:50,
    flexDirection:'row',
    justifyContent: 'space-around',
  }
});

export default fogotPassword;
