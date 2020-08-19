import React, { useState, useEffect } from "react";
import { View, StyleSheet, Dimensions, ImageBackground, Image } from 'react-native';
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

    return(     
        <View style={{flex:1}}>  
            <ImageBackground source={require('./images/menu-bg.jpg')} style={styles.image}>          
            <DrawerContentScrollView {...props}>               
                <View style={styles.drawerContent}>                
                    <View style={styles.userInfoSection}>
                        <View style={{alignItems:"center"}}>
                            <TouchableOpacity onPress={editProfile}>
                                <Avatar.Image 
                                    source={require('./images/userimage.png')}
                                    size={70}
                                />
                            </TouchableOpacity>                            
                            <View style={{alignItems:"center"}}>
                                {props.user.fullName != 'undefined' && props.user.fullName != '' && <Title style={styles.title}>{props.user.fullName}</Title>}
                                {props.user.mobileNo != 'undefined' && props.user.mobileNo != '' && props.user.mobileNo != null && <Caption style={styles.caption}>+91 {props.user.mobileNo}</Caption>}
                            </View>
                        </View>
                    </View>

                    <Drawer.Section style={styles.drawerSection}>                    
                        <DrawerItem 
                            icon={({color, size}) => (
                                <Image source={require('./images/menudisc.png')} style={styles.MenuIcon} />
                            )}
                            label="MENU DISC"
                            labelStyle={{color:'#FFF'}}
                            onPress={() => {props.navigation.navigate('DashboardScreen')}}
                        />
                        <DrawerItem 
                            icon={({color, size}) => (
                                <Image source={require('./images/order-icon.png')} style={styles.MenuIcon} />
                            )}
                            labelStyle={{color:'#FFF'}}
                            label="MY ORDERS"
                            onPress={() => {props.navigation.navigate('OrderList')}}
                        />
                        <DrawerItem 
                            icon={({color, size}) => (
                                <FontIcon 
                                name="share" 
                                color="#FFF"
                                size={20}
                                />
                            )}
                            labelStyle={{color:'#FFF'}}
                            label="SHARE"
                            onPress={() => {props.navigation.navigate('AboutScreen')}}
                        />
                        <DrawerItem 
                            icon={({color, size}) => (
                                <FontIcon 
                                name="user-o" 
                                color='#FFF'
                                size={20}
                                />
                            )}
                            labelStyle={{color:'#FFF'}}
                            label="ABOUT US"
                            onPress={() => {props.navigation.navigate('AboutScreen')}}
                        />
                        <DrawerItem 
                            icon={({color, size}) => (
                                <FontIcon 
                                name="envelope-o" 
                                color='#FFF'
                                size={20}
                                />
                            )}
                            labelStyle={{color:'#FFF'}}
                            label="EMAIL US"
                            onPress={() => {props.navigation.navigate('Support')}}
                        />
                        {!props.user.customerId && <DrawerItem 
                            icon={({color, size}) => (
                                <FontIcon 
                                name="sign-in" 
                                color='#FFF'
                                size={20}
                                />
                            )}
                            labelStyle={{color:'#FFF'}}
                            label="LOG IN"
                            onPress={() => {props.navigation.navigate('Login')}}
                        />}
                        {props.user.customerId > 0 && <DrawerItem 
                            icon={({color, size}) => (
                                <FontIcon 
                                name="sign-out" 
                                color='#FFF'
                                size={20}
                                />
                            )}
                            labelStyle={{color:'#FFF'}}
                            label="LOG OUT"
                            onPress={logOut}
                        />}
                    </Drawer.Section>                    
                </View>
            </DrawerContentScrollView>
            {/* <Drawer.Section style={styles.bottomDrawerSection}>
                <DrawerItem 
                    icon={({color, size}) => (
                        <Icon 
                        name="exit-to-app" 
                        color={color}
                        size={size}
                        />
                    )}
                    label="Sign Out"
                    onPress={() => {signOut()}}
                />
            </Drawer.Section> */}
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
        justifyContent: "center"
      },
    userInfoSection: {
        flex:1,
        height:170,
        justifyContent:'center',
        alignItems:"center",
        backgroundColor:'#827e09',
        marginTop:-5
    },
    title: {
      fontSize: 16,
      marginTop: 3,
      fontWeight: '400',
      color:'#FFF'
    },
    caption: {
      fontSize: 14,
      lineHeight: 14,
      color:'#FFF'
    },
    drawerSection:{
        paddingTop:20
    },
    row: {
      marginTop: 20,
      flexDirection: 'row',
      alignItems: 'center',
    },
    MenuIcon:{
        width:22,
        height:22,
        resizeMode:'stretch'
    }
  });