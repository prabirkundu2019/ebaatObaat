import React from 'react';
import { View, StyleSheet, Dimensions  } from 'react-native';
import {
    useTheme,
    Avatar,
    Title,
    Caption,
    Paragraph,
    Drawer,
    Text,
    TouchableRipple,
    Switch,
    Image
} from 'react-native-paper';
import {
    DrawerContentScrollView,
    DrawerItem
} from '@react-navigation/drawer';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

//import{ AuthContext } from '../components/context';


export function DrawerContent(props) {

    const paperTheme = useTheme();

    //const { signOut, toggleTheme } = React.useContext(AuthContext);

    return(     
        <View style={{flex:1}}>            
            <DrawerContentScrollView {...props}>
                <View style={styles.drawerContent}>
                    <View style={styles.userInfoSection}>
                        <View style={{alignItems:"center"}}>
                            <Avatar.Image 
                                source={{
                                    uri: 'https://api.adorable.io/avatars/50/abott@adorable.png'
                                }}
                                size={50}
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
                                <Icon 
                                name="home-outline" 
                                color={color}
                                size={size}
                                />
                            )}
                            label="MENU DISC"
                            onPress={() => {props.navigation.navigate('Home')}}
                        />
                        <DrawerItem 
                            icon={({color, size}) => (
                                <Icon 
                                name="account-outline" 
                                color={color}
                                size={size}
                                />
                            )}
                            label="MY ORDERS"
                            onPress={() => {props.navigation.navigate('Profile')}}
                        />
                        <DrawerItem 
                            icon={({color, size}) => (
                                <Icon 
                                name="bookmark-outline" 
                                color={color}
                                size={size}
                                />
                            )}
                            label="SHARE"
                            onPress={() => {props.navigation.navigate('BookmarkScreen')}}
                        />
                        <DrawerItem 
                            icon={({color, size}) => (
                                <Icon 
                                name="settings-outline" 
                                color={color}
                                size={size}
                                />
                            )}
                            label="ABOUT US"
                            onPress={() => {props.navigation.navigate('SettingScreen')}}
                        />
                        <DrawerItem 
                            icon={({color, size}) => (
                                <Icon 
                                name="account-check-outline" 
                                color={color}
                                size={size}
                                />
                            )}
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
        </View>
    );
}

const styles = StyleSheet.create({
    drawerContent: {
      flex: 1,
    },
    userInfoSection: {
        flex:1,
        height:150,
        justifyContent:'center',
        alignItems:"center",
        backgroundColor:'#827e09',
        marginTop:-5
    },
    title: {
      fontSize: 16,
      marginTop: 3,
      fontWeight: 'bold',
      color:'#FFF'
    },
    caption: {
      fontSize: 14,
      lineHeight: 14,
      color:'#FFF'
    },
    row: {
      marginTop: 20,
      flexDirection: 'row',
      alignItems: 'center',
    }
  });