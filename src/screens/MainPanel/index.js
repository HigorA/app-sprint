import { Feather } from '@expo/vector-icons';
import * as Font from 'expo-font';
import { useEffect } from "react";
import { Image, Pressable, SafeAreaView, StyleSheet, Text, TextInput, View } from "react-native";

export default function MainPanel({ navigation }) {

    const openDrawer = () => {
        navigation.openDrawer();
    };


    useEffect(() => {
        Font.loadAsync({
            'MontserratRegular': require('./../../../assets/Montserrat/static/Montserrat-Regular.ttf'),
            'MontserratBold': require('./../../../assets/Montserrat/static/Montserrat-Bold.ttf'),
            'TitilliumSemiBold': require('./../../../assets/Titillium_Web/TitilliumWeb-SemiBold.ttf'),
        })
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <View style={[styles.aView, {marginTop: 0}]}>
                <Text style={styles.title}>Login</Text>
                <Pressable onPress={() => openDrawer()} >
                    <Feather name="menu" size={24} color="black" style={{paddingRight: 8}} />
                </Pressable>
            </View>

            <View style={styles.aView}>
                <TextInput placeholder="Search here..." style={styles.searchField} />
                <Pressable style={styles.voiceButton} ><Feather name="mic" size={20} color="white" /></Pressable>
            </View>

            <View style={{justifyContent: 'center', alignItems: 'center', width: '100%', height: 250}}>
                <View style={[styles.aView, styles.favoritesView]}>
                    <Text style={styles.title}>Favorites</Text>
                    <Text style={[styles.title, styles.seeMoreButton]}>See More +</Text>
                </View>
                <View style={[styles.aView, styles.itemFavorite, {height: 130, justifyContent: 'center', gap: 50}]}>
                    <Image source={require('./../../../assets/fundo.jpeg')} style={{width: 100, height: 100, borderRadius: 8}} />
                    <View>
                        <Text style={styles.commonText}>Nome Produto</Text>
                        <Text style={styles.commonText}>Preço Produto</Text>
                    </View>
                </View>
            </View>

            <View style={{justifyContent: 'space-around', alignItems: 'center', width: '100%', gap: 20, height: 350}}>
                <View style={[styles.aView, styles.favoritesView]}>
                    <Text style={styles.title}>Recently Seen</Text>
                    <Text style={[styles.title, styles.seeMoreButton]}>See More +</Text>
                </View>
                
                <View style={[{width:'95%', height: 330, flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center'}]}>
                    <View style={[styles.aView, styles.itemFavorite, {height: 70, justifyContent: 'space-around'}]}>
                        <Image source={require('./../../../assets/fundo.jpeg')} style={{width: 60, height: 60, borderRadius: 8}} />
                        <View>
                            <Text style={styles.commonText}>Nome Produto</Text>
                            <Text style={styles.commonText}>Preço Produto</Text>
                        </View>
                    </View>

                    <View style={[styles.aView, styles.itemFavorite, {height: 70, justifyContent: 'space-around'}]}>
                        <Image source={require('./../../../assets/fundo.jpeg')} style={{width: 60, height: 60, borderRadius: 8}} />
                        <View>
                            <Text style={styles.commonText}>Nome Produto</Text>
                            <Text style={styles.commonText}>Preço Produto</Text>
                        </View>
                    </View>

                    <View style={[styles.aView, styles.itemFavorite, {height: 70, justifyContent: 'space-around'}]}>
                        <Image source={require('./../../../assets/fundo.jpeg')} style={{width: 60, height: 60, borderRadius: 8}} />
                        <View>
                            <Text style={styles.commonText}>Nome Produto</Text>
                            <Text style={styles.commonText}>Preço Produto</Text>
                        </View>
                    </View>

                    <View style={[styles.aView, styles.itemFavorite, {height: 70, justifyContent: 'space-around'}]}>
                        <Image source={require('./../../../assets/fundo.jpeg')} style={{width: 60, height: 60, borderRadius: 8}} />
                        <View>
                            <Text style={styles.commonText}>Nome Produto</Text>
                            <Text style={styles.commonText}>Preço Produto</Text>
                        </View>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        gap: 40
    },

    aView: {
        backgroundColor: 'white',
        flexDirection: 'row',
        width: '95%',
        height: 40,
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 8
    },

    searchField: {
        width: '90%',
        backgroundColor: '#EEE5D4',
        paddingVertical: 10,
        paddingHorizontal: 10,
        borderTopLeftRadius: 8,
        borderBottomLeftRadius: 8
    },

    voiceButton: {
        borderTopRightRadius: 8,
        borderBottomRightRadius: 8,
        borderWidth: 1, 
        borderColor: 'none', 
        backgroundColor: '#475569',
        height: '100%',
        width: '10%',
        justifyContent: 'center',
        alignItems: 'center'
    },

    favoritesView: {
        paddingHorizontal: 8
    },

    seeMoreButton: {
        color: '#94A3B8'
    },

    itemFavorite: {
        justifyContent: 'space-around',
        alignItems: 'center',
        height: '15%',
        borderRadius: 8,
        backgroundColor: '#EEE5D4'
    },

    title: {
        fontFamily: 'TitilliumSemiBold',
        fontSize: 16,
        color: '#334155'
    },

    commonText: {
        fontFamily: 'MontserratRegular',
        fontSize: 14,
    }
});