import { Feather } from '@expo/vector-icons';
import { Audio, InterruptionModeAndroid, InterruptionModeIOS } from 'expo-av';
import * as FileSystem from 'expo-file-system';
import { useEffect, useState } from "react";
import { Image, Pressable, SafeAreaView, StyleSheet, Text, TextInput, View } from "react-native";
import * as Speech from 'expo-speech';


const RECORDING_OPTIONS = {
    android: {
        extension: '.mp3',
        outputFormat: Audio.AndroidOutputFormat.MPEG_4,
        audioEncoder: Audio.AndroidAudioEncoder.AAC,
        sampleRate: 44100,
        numberOfChannels: 2,
        bitRate: 128000,
    },
    ios: {
        extension: '.wav',
        audioQuality: Audio.IOSAudioQuality.HIGH,
        sampleRate: 44100,
        numberOfChannels: 1,
        bitRate: 128000,
        linearPCMBitDepth: 16,
        linearPCMIsBigEndian: false,
        linearPCMIsFloat: false,
    },
    web: {
  
    }
};

export default function MainPanel({ navigation }) {

    const [isConvertingSTT, setIsConvertingSTT] = useState(false);
    const [toastMessage, setToastMessage] = useState(null);
    const [recording, setRecording] = useState(null);
    const [description, setDescription] = useState('');
    const [isRecording, setIsRecording] = useState(false);

    const openDrawer = () => {
        navigation.openDrawer();
    };

    useEffect(() => {
        Audio
          .requestPermissionsAsync()
          .then((granted) => {
            if (granted) {
                Audio.setAudioModeAsync({
                    allowsRecordingIOS: true,
                    interruptionModeIOS: InterruptionModeIOS.DoNotMix,
                    playsInSilentModeIOS: true,
                    shouldDuckAndroid: true,
                    interruptionModeAndroid: InterruptionModeAndroid.DoNotMix,
                    playThroughEarpieceAndroid: true,
              });
            }
        });
        
    }, []);

    const speak = (termo) => {
        const thingsToSay = `Você quer pesquisar por ${termo}, entretanto, ainda não posso fazer pesquisas. Sinto Muito!`
        Speech.speak(thingsToSay);
    }

    async function handleRecordingStart() {
        const { granted } = await Audio.getPermissionsAsync();

        if ( granted ) {
            try {
                setIsRecording(true);
                setToastMessage('Gravando...')

                const { recording } = await Audio.Recording.createAsync(RECORDING_OPTIONS);
                setRecording(recording);
            } catch (error) {
                console.log(error);
            }
        }
    }

    async function handleRecordingStop() {
        try {
            setToastMessage(null);

            await recording.stopAndUnloadAsync();
            const recordingFileUri = recording.getURI();
            
            if (recordingFileUri) {
                const base64File = await FileSystem.readAsStringAsync(recordingFileUri, { encoding: FileSystem?.EncodingType?.Base64 });
                
                setIsRecording(false);
                setRecording(null);
                getTranscription(base64File);
                await FileSystem.deleteAsync(recordingFileUri);
            } else {
                Alert.alert("Audio", "Não foi possível obter a gravação.");
            }
        } catch (error) {
                console.log(error);
        }
    }

    function getTranscription(base64File) {
        setIsConvertingSTT(true);
    
        fetch(`https://speech.googleapis.com/v1/speech:recognize?key=AIzaSyBEtY_UZuWZlmNa4rKlT1KDENEwgdHdGk4`, {
          method: 'POST',
          body: JSON.stringify({
            config: {
                languageCode: "pt-BR",
                encoding: "WEBM_OPUS",
                sampleRateHertz: 48000,
            },
            audio: {
              content: base64File
            }
          })
        })
        .then(response => response.json())
        .then((data) => {
            console.log(data.results[0].alternatives[0].transcript);
            speak(data.results[0].alternatives[0].transcript)
        })
        .catch((error) => console.log(error))
        .finally(() => setIsConvertingSTT(false))
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={[styles.aView, {marginTop: 80}]}>
                <Text style={styles.title}>Login</Text>
                <Pressable onPress={() => openDrawer()} >
                    <Feather name="menu" size={24} color="black" style={{paddingRight: 8}} />
                </Pressable>
            </View>

            <View style={[styles.aView, styles.searchView]}>
                <TextInput placeholder="Search here..." style={styles.searchField} />
                <Pressable style={isRecording ? styles.activeVoiceButton : styles.inactiveVoiceButton}
                    onPressIn={handleRecordingStart}
                    onPressOut={handleRecordingStop}
                >
                    <Feather name="mic" size={24} color="white" />
                </Pressable>
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

    searchView: {
        justifyContent: 'center'
    },

    searchField: {
        width: '90%',
        height: 60,
        backgroundColor: '#94A3B8',
        paddingVertical: 10,
        paddingHorizontal: 10,
        borderTopLeftRadius: 8,
        borderBottomLeftRadius: 8,
        color: 'white'
    },

    inactiveVoiceButton: {
        borderTopRightRadius: 8,
        borderBottomRightRadius: 8,
        borderWidth: 1, 
        borderColor: 'none', 
        backgroundColor: 'rgba(71, 85, 105, 1)',
        height: 60,
        width: 60,
        justifyContent: 'center',
        alignItems: 'center',
    },

    activeVoiceButton: {
        borderTopRightRadius: 8,
        borderBottomRightRadius: 8,
        borderWidth: 1, 
        borderColor: 'none', 
        backgroundColor: 'rgba(71, 85, 105, 0.5)',
        height: 60,
        width: 60,
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
        fontSize: 16,
        color: '#334155'
    },

    commonText: {
        fontSize: 14,
    }
});