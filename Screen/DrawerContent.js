import React, { useState, useEffect } from "react";
import { View, StyleSheet, Linking, ImageBackground, Image } from 'react-native';
import {
    useTheme,
    Avatar,
    Title,
    Caption,
    Paragraph,
    Drawer,
    Text,
    TouchableRipple,
    Switch
} from 'react-native-paper';
import {
    DrawerContentScrollView,
    DrawerItem
} from '@react-navigation/drawer';

import AsyncStorage from '@react-native-community/async-storage';
import FontIcon from 'react-native-vector-icons/FontAwesome';
import { DrawerActions } from '@react-navigation/native';
import { TouchableOpacity } from "react-native-gesture-handler";


//import{ AuthContext } from '../components/context';

export function DrawerContent(props) {
    //console.log(props);
    console.log(props.user.customerId);
    const paperTheme = useTheme();
    const [checkuser, setCheckuser] = useState(false);
    const [notAuthenticateuser, setAuthenticateuser] = useState(false);

    //alert(props.user.customerId);

    useEffect(() => {
        // const bootstrapAsync = async () => {
        //     let customerId;
        
        //     try {
        //         customerId = props.user.customerId;
        //     } catch (e) {
        //         // Restoring token failed
        //     }
            
        //     // After restoring token, we may need to validate it in production apps
        
        //     // This will switch to the App screen or Auth screen and this loading
        //     // screen will be unmounted and thrown away.
        //     //dispatch({ type: 'RESTORE_TOKEN', token: userToken });
        // };
    
        // bootstrapAsync();
        // (async function() {
        //     try {
        //         let customerId = await AsyncStorage.getItem('customerId');
        //         //alert(customerId);
        //         if(customerId == "undefined" || customerId == null)
        //         {
        //             setCheckuser(false);
        //         }else{
        //             setCheckuser(true);
        //         }
        //     } catch (e) {
        //         console.error(e);
        //     }
        // })();
    }, []);

    //const { signOut, toggleTheme } = React.useContext(AuthContext);
    const logOut = () => {
        AsyncStorage.removeItem("access_token");
        AsyncStorage.removeItem("customerId");
        props.navigation.navigate('Login');
    }

    const logIn = () => {
        props.navigation.navigate('Login');
    }

    const editProfile = () => {
        if(props.user.customerId == null || props.user.customerId == "undefined" || props.user.customerId == "")
        {
            props.navigation.navigate('Login');
        }else{
            props.navigation.navigate('EditProfile');
        }
    }

    const shareApp = () => {
        let text = "test";
        Linking.openURL(`whatsapp://send?text=${text}`);
    }

    return(     
        <View style={{flex:1}}>  
            <ImageBackground  style={styles.image}>          
            <DrawerContentScrollView {...props}>               
                <View style={styles.drawerContent}>                
                    <View style={styles.userInfoSection}>
                        <View style={{alignItems:"center", flex: 1, justifyContent: 'space-between',}}>
                            <Avatar.Image 
                                source={require('./images/userimage.png')}
                                size={85}
                                style={{backgroundColor:'#fff'}}
                            />
                            {props.user.fullName != 'undefined' && props.user.fullName != '' && <View style={{ flexDirection:'row', alignItems:'center'}}>
                                <View style={{ flexDirection:'row', alignItems:'center', width:'80%',}}>
                                    {props.user.fullName != 'undefined' && props.user.fullName != '' && <Title style={styles.title}>Hello</Title>}
                                    {props.user.fullName != 'undefined' && props.user.fullName != '' && <Caption style={styles.caption}>{props.user.fullName}</Caption>}
                                </View>
                                <TouchableOpacity onPress={editProfile}>
                                    <Image style = {{ width:11, height: 18,}} source = {require('./images/arrow.png')}/>
                                </TouchableOpacity>
                            </View>}
                        </View>
                    </View>

                    <Drawer.Section style={styles.drawerSection}>                    
                        {/* <DrawerItem 
                            icon={({color, size}) => (
                                <View style={styles.MenuIconBox}>
                                    <Image source={require('./images/mn1.png')} style={styles.MenuIcon} />
                                </View>
                            )}
                            label="Menu Disc"
                            labelStyle={{color:'#000a28'}}
                            onPress={() => {props.navigation.navigate('Home')}}
                        /> */}
                        <DrawerItem 
                            icon={({color, size}) => (
                                <View style={styles.MenuIconBox}>
                                    <Image source={require('./images/mn2.png')} style={styles.MenuIcon} />
                                </View>
                            )}
                            labelStyle={{color:'#000a28'}}
                            label="My Orders"
                            onPress={() => {props.navigation.navigate('OrderList')}}
                        />
                        <DrawerItem 
                            icon={({color, size}) => (
                                <View style={styles.MenuIconBox}>
                                    <Image source={require('./images/mn3.png')} style={styles.MenuIcon} />
                                </View>
                            )}
                            labelStyle={{color:'#000a28'}}
                            label="Share"
                            onPress={shareApp}
                        />
                        <DrawerItem 
                            icon={({color, size}) => (
                                <View style={styles.MenuIconBox}>
                                    <Image source={require('./images/mn4.png')} style={styles.MenuIcon} />
                                </View>
                            )}
                            labelStyle={{color:'#000a28'}}
                            label="About Us"
                            onPress={() => {props.navigation.navigate('AboutScreen')}}
                        />
                        <DrawerItem 
                            icon={({color, size}) => (
                                <View style={styles.MenuIconBox}>
                                    <Image source={require('./images/mn5.png')} style={styles.MenuIcon} />
                                </View>
                            )}
                            labelStyle={{color:'#000a28'}}
                            label="Help"
                            onPress={() => {props.navigation.navigate('Support')}}
                        />
                        {!props.user.customerId && <DrawerItem 
                            icon={({color, size}) => (
                                <View style={styles.MenuIconBox}>
                                    <Image source={require('./images/mn6.png')} style={styles.MenuIcon} />
                                </View>
                            )}
                            labelStyle={{color:'#000a28'}}
                            label="Log in"
                            onPress={() => {props.navigation.navigate('Login')}}
                        />}
                        {props.user.customerId > 0 && <DrawerItem 
                            icon={({color, size}) => (
                                <View style={styles.MenuIconBox}>
                                    <Image source={require('./images/mn6.png')} style={styles.MenuIcon} />
                                </View>
                            )}
                            labelStyle={{color:'#000a28'}}
                            label="Log Out"
                            onPress={logOut}
                        />}
                    </Drawer.Section>                  
                </View>
            </DrawerContentScrollView>
            <View style={{flexDirection:'row', justifyContent:'space-around', backgroundColor:'#000a28', alignItems:'center', height:54,}}>
                <TouchableOpacity onPress={() => {props.navigation.navigate('TermsScreen')}}>
                    <View><Text style={{color:"#e5b443", fontSize:12,}}>Terms & Conditions</Text></View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {props.navigation.navigate('PrivacyScreen')}}>
                    <View><Text style={{color:"#e5b443", fontSize:12,}}>Privacy Policy</Text></View>
                </TouchableOpacity>
            </View>
            </ImageBackground>
        </View>
    );
}

const styles = StyleSheet.create({
    drawerContent: {
      flex: 1,
    },
    image: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center",
        backgroundColor:'#f3f8fe',
      },
    userInfoSection: {
        flex:1,
        height:155,
        justifyContent:'center',
        alignItems:"center",
        backgroundColor:'#fff',
        paddingTop:15,
        paddingBottom:10,
    },
    title: {
      fontSize: 14,
      fontWeight: '400',
      color:'#000a28',
    },
    caption: {
      fontSize: 28,
      fontFamily: 'Rosellinda Alyamore',
      color:'#000a28',
      marginLeft: 8,
      lineHeight:30,
    },
    drawerSection:{
        paddingTop:20
    },
    row: {
      marginTop: 20,
      flexDirection: 'row',
      alignItems: 'center',
    },
    MenuIconBox:{
        backgroundColor:'#fff',
        width:40,
        height:40,
        alignItems:'center',
        justifyContent:'center',
        borderRadius: 12,
        elevation: 1,
    },
    MenuIcon:{
        width:22,
        height:22,
        resizeMode:'stretch',
    }
});