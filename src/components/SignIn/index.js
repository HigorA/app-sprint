import { Dimensions, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import Checkbox from 'expo-checkbox';
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { useState } from "react";
import { Fontisto } from '@expo/vector-icons'; 
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';

const schema = yup.object({
    username: yup.string().required(),
    password: yup.string().required()
}).required();

export function SignIn({navigation}) {
    const [isChecked, setChecked] = useState(false);
    
    const { control, reset, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    })

    const onSubmit = async data => {
        console.log(data)
        axios.post('http://localhost:8080/auth/signin', 
            data)
        .then((resp) => {
            console.log(resp.data.body)
            navigation.navigate('Panel')
        }).catch((error) => {
            console.log(error)
        });
        reset();
    };


    return (
        <View style={styles.container}>
            <Controller 
                control={control}
                rules={{
                    required: true,
                   }}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <View style={[styles.commonView, styles.inputView, errors.username && styles.invalidField]}>
                            <Fontisto name="email" size={24} color={errors.username ? 'red' : "#818080"} />
                            <TextInput
                                style={[styles.input, {color: errors.username && 'red'}]}
                                placeholder="E-mail"
                                onBlur={onBlur}
                                onChangeText={onChange}
                                value={value}
                            />
                        </View>
                   )}
                    name="username"
            />
            
            <Controller 
                control={control}
                rules={{
                    required: true,
                   }}
                render={({ field: { onChange, onBlur, value } }) => (
                    <View style={[styles.commonView, styles.inputView, errors.password && styles.invalidField]}>
                        <Ionicons name="lock-closed-outline" size={24} color={errors.password ? 'red' : "#818080"} />
                        <TextInput
                            style={[styles.input, {color: errors.password && 'red'}]}
                            placeholder="Password"
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                            secureTextEntry={true}
                        />
                    </View>
                )}
                name="password"
            />

            <View style={[{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}, styles.commonView]}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Checkbox
                        style={styles.checkbox}
                        value={isChecked}
                        onValueChange={setChecked}
                        color={isChecked ? '#393939' : undefined}
                    />
                    <Text style={{color: '#6B5E5E'}}>Remember password</Text>
                </View>
                <Text style={{color: '#036BB9'}}>Forgot password ?</Text>
            </View>

            <View style={{width: '100%', justifyContent: 'center', alignItems: 'center', gap: 10}}>
                <Pressable style={[styles.commonView, styles.button]} onPress={handleSubmit(onSubmit)}>
                    <Text style={styles.buttonTitle}>Sign In</Text>
                </Pressable>
                <Text style={{color: '#6B5E5E'}}>or enter with</Text>
                <Pressable style={[styles.commonView, styles.googleButton]}>
                    <Text style={[styles.buttonTitle, {color:'#d54c3f'}]}>Google</Text>
                </Pressable>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        justifyContent:'flex-start',
        alignItems: 'center',
        gap: 30,
        backgroundColor: 'white',
        height: '100%',
        width: '100%',
        paddingTop: 50
    },

    commonView: {
        width: '80%',
    },

    inputView: {
        flexDirection: 'row',        
        alignItems: 'center',
        gap: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#818080',
        paddingHorizontal: 10,
        width: '80%',
    },

    input: {
        width: '100%',      
        paddingVertical: 10,
    },

    button: {
        backgroundColor: '#393939',
        borderRadius: 4,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 10,
    },

    buttonTitle: {
        color: 'white',
        fontWeight: '800',
        fontSize: 16,
        textAlign: 'center'
    },

    googleButton: {
        backgroundColor: 'transparent',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 10,
        borderWidth: 1,
        borderColor: '#d54c3f',
        borderRadius: 4,
    },

    checkbox: {
        margin: 8,
        
    },

    invalidField: {
        flexDirection: 'row',        
        alignItems: 'center',
        gap: 10,
        borderBottomWidth: 1,
        borderBottomColor: 'red',
        paddingHorizontal: 10
    },  
})