import { Dimensions, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import Checkbox from 'expo-checkbox';
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { useState } from "react";
import { Fontisto, Ionicons, SimpleLineIcons } from '@expo/vector-icons'; 


const schema = yup.object({
    email: yup
        .string()
        .email()
        .required(),
    password: yup
        .string()
        .required(),
    confirmPassword: yup
        .string()
        .oneOf([yup.ref('password'), null], 'Passwords must be the same.')
        .required('Confirm your password.'),
    userName: yup.string().required('Name can not be null.')
}).required();

export function SignUp() {

    const { control, reset, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    })

    const onSubmit = data => {
        console.log(data)
        reset();
    };


    return (
        
        <View style={[styles.container, errors && {gap: 15}]}>
            <Controller 
                control={control}
                rules={{
                    required: true,
                   }}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <View>
                            <View style={[styles.commonView, styles.inputView, errors.email && styles.invalidField]}>
                                <Fontisto name="email" size={24} color={errors.email ? 'red' : "#818080"} />
                                <TextInput
                                    style={styles.input}
                                    placeholder="E-mail"
                                    onBlur={onBlur}
                                    onChangeText={onChange}
                                    value={value}
                                    />
                            </View>
                            <View style={{paddingHorizontal: 40}}>
                                {errors.email && <Text style={{color: '#818080', fontSize: 11}}>{errors.email.message}</Text>}
                            </View>
                        </View>
                   )}
                    name="email"
            />
            
            <Controller 
                control={control}
                rules={{
                    required: true,
                   }}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <View>
                            <View style={[styles.commonView, styles.inputView, errors.password && styles.invalidField]}>
                                <Ionicons name="lock-closed-outline" size={24} color={errors.password ? 'red' : "#818080"} />
                                <TextInput
                                    style={styles.input}
                                    placeholder="Password"
                                    onBlur={onBlur}
                                    onChangeText={onChange}
                                    value={value}
                                    secureTextEntry={true}
                                    />
                            </View>
                            <View style={{paddingHorizontal: 40}}>
                                {errors.password && <Text style={{color: '#818080', fontSize: 11}}>{errors.password.message}</Text>}
                            </View>
                        </View>
                    )}
                    name="password"
            />

            <Controller 
                control={control}
                rules={{
                    required: true,
                   }}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <View >
                            <View style={[styles.commonView, styles.inputView, errors.confirmPassword && styles.invalidField]}>
                            <Ionicons name="lock-closed-outline" size={24} color={errors.confirmPassword ? 'red' : "#818080"} />
                            <TextInput
                                style={styles.input}
                                placeholder="Confirm password"
                                onBlur={onBlur}
                                onChangeText={onChange}
                                value={value}
                                secureTextEntry={true}
                                />
                            </View>
                            <View style={{paddingHorizontal: 40}}>
                                {errors.confirmPassword && <Text style={{color: '#818080', fontSize: 11}}>{errors.confirmPassword.message}</Text>}
                            </View>    
                        </View>
                            
                    )}
                    name="confirmPassword"
            />

            <Controller 
                control={control}
                rules={{
                    required: true,
                   }}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <View>
                            <View style={[styles.commonView, styles.inputView, errors.userName && styles.invalidField]}>
                                <SimpleLineIcons name="user" size={24} color={errors.userName ? 'red' : "#818080"} />
                                <TextInput
                                    style={styles.input}
                                    placeholder="Name"
                                    onBlur={onBlur}
                                    onChangeText={onChange}
                                    value={value}
                                    />
                            </View>
                            <View style={{paddingHorizontal: 40}}>
                                {errors.userName && <Text style={{color: '#818080', fontSize: 11}}>{errors.userName.message}</Text>}
                            </View>
                        </View>
                    )}
                    name="userName"
            />
            <Pressable style={[styles.commonView, styles.button, {marginTop: 30}]} onPress={handleSubmit(onSubmit)}>
                <Text style={styles.buttonTitle}>Submit</Text>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        justifyContent:'flex-start',
        alignItems: 'center',
        gap: 30,
        height: '100%',
        backgroundColor: 'white',
    },

    commonView: {
        width: '100%',
    },

    inputView: {
        flexDirection: 'row',        
        alignItems: 'center',
        gap: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#818080',
        paddingHorizontal: 10,
        width: '100%'
    },

    input: {
        width: '80%',      
        paddingVertical: 10,
    },

    button: {
        backgroundColor: '#393939',
        borderRadius: 4,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 10,
        width: '80%'
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