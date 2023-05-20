import { Feather } from '@expo/vector-icons';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useState } from "react";
import { Alert, ImageBackground, Pressable, SafeAreaView, StyleSheet, Text, View } from "react-native";
import { SignUp } from "../../components/SignUp";
import { SignIn } from './../../components/SignIn';


export default function Home({ navigation }) {
    
    const [showSignIn, setShowSignIn] = useState(true);
    const [showSignUp, setShowSignUp] = useState(false);

    const Tab = createMaterialTopTabNavigator();

    const handleSignIn = () => {
        setShowSignIn(true);
        setShowSignUp(false);
        navigation.navigate('SignIn')
    }

    const handleSignUp = () => {
        setShowSignIn(false);
        setShowSignUp(true);
        navigation.navigate('SignUp')
    }

    const openDrawer = () => {
        navigation.openDrawer();
    };

    return (
        <SafeAreaView style={styles.container}>
            <ImageBackground 
                source={require('./../../../assets/fundo.jpeg')}
                style={
                    {
                        flex: 1, 
                        resizeMode: 'cover', 
                        justifyContent: 'center', 
                        alignItems: 'center',
                        width: '100%', 
                        height: '100%',}}
                >
                <View style={{backgroundColor: 'rgba(0,0,0, 0.5)', justifyContent: 'center', alignItems: 'center', gap: 30, width: '100%', height: '100%'}}>
                    <Pressable onPress={() => openDrawer()} >
                        <Feather name="menu" size={26} color="white" style={{ position: 'absolute', top: -40, left: 180 }} />
                    </Pressable>
                    <Text style={{color: 'white', fontSize: 30, fontWeight: 'bold', }}>Welcome</Text>
                    <Text style={{color: 'white', fontSize: 22, textAlign: 'center', paddingHorizontal: 30, }}>By signing, you are agreeing with our 
                        <Text style={{color: '#036BB9'}} onPress={() => Alert.alert('Recurso não disponivel')}> terms and policy</Text>
                    </Text>
                </View>
            </ImageBackground>
    
            <View style={[styles.utilArea]}>
                <View style={styles.headerButton}>
                    <Pressable onPress={() => handleSignIn()} style={[styles.button, showSignIn && styles.activeButton]}>
                        <Text style={[{fontSize: 20, paddingVertical: 5}, showSignIn && {color: '#036BB9'}]}>Sign In</Text>
                    </Pressable>
                    <Pressable onPress={() => handleSignUp()} style={[styles.button, showSignUp && styles.activeButton]}>
                        <Text style={[{fontSize: 20, paddingVertical: 5}, showSignUp && {color: '#036BB9'}]}>Sign Up</Text>
                    </Pressable>
                </View>
                <View style={{height: '100%', width: '100%'}}>
                    <Tab.Navigator screenOptions={{ tabBarStyle: {display: 'none'} }}>
                        <Tab.Screen name="SignIn" component={SignIn} />
                        <Tab.Screen name="SignUp" component={SignUp} />    
                    </Tab.Navigator>    
                </View>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({

    container: {
        justifyContent:'flex-end',
        alignItems: 'center',
        backgroundColor: 'black',
        width: '100%',
        height: '100%'
    },

    utilArea: {
        height: '65%',
        backgroundColor: 'white',
        width: '100%',
        gap: 20
    },

    headerButton: {
        flexDirection: 'row',
        gap: 60,
        backgroundColor:'white',
        width: '100%',
        justifyContent:'center',
        alignItems: 'center',
        paddingVertical: 5,
        borderTopLeftRadius: 25, 
        borderTopRightRadius: 25
        
    },

    button: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 90,
    },

    activeButton: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 90,
        borderBottomColor: 'black',
        borderBottomWidth: 1,
    },

    formArea: {
        position: 'relative',
        top: 30
    }
})