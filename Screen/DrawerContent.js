import React from 'react';
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

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import FontIcon from 'react-native-vector-icons/FontAwesome';

//import{ AuthContext } from '../components/context';


export function DrawerContent(props) {

    const paperTheme = useTheme();

    //const { signOut, toggleTheme } = React.useContext(AuthContext);

    return(     
        <View style={{flex:1}}>  
            <ImageBackground source={require('./images/menu-bg.jpg')} style={styles.image}>          
            <DrawerContentScrollView {...props}>               
                <View style={styles.drawerContent}>                
                    <View style={styles.userInfoSection}>
                        <View style={{alignItems:"center"}}>
                            <Avatar.Image 
                                source={require('./images/userimage.png')}
                                size={70}
                            />
                            <View style={{alignItems:"center"}}>
                                <Title style={styles.title}>Guest User</Title>
                                <Caption style={styles.caption}>+91 9723456789</Caption>
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
                            onPress={() => {props.navigation.navigate('Home')}}
                        />
                        <DrawerItem 
                            icon={({color, size}) => (
                                <Image source={require('./images/order-icon.png')} style={styles.MenuIcon} />
                            )}
                            labelStyle={{color:'#FFF'}}
                            label="MY ORDERS"
                            onPress={() => {props.navigation.navigate('Profile')}}
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
                            onPress={() => {props.navigation.navigate('BookmarkScreen')}}
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
                            onPress={() => {props.navigation.navigate('SettingScreen')}}
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
                            onPress={() => {props.navigation.navigate('SupportScreen')}}
                        />
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