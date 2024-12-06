import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Link } from 'expo-router';

const API_BASE_URL = 'http://192.168.137.201:3000'

export default function LoginScreen() {
    const navigation = useNavigation()

    const [username, setUsername] = useState('testUser3')
    const [password, setPassword] = useState('Testing123@')
    const [loading, setLoading] = useState(false)

    const loginUser = async (credentials: any) => {
        try {
            const response = await fetch(`${API_BASE_URL}/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(credentials),
            })

            console.log(response, '<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<')

            if (!response.ok) {
                const errorData = await response.json()
                throw new Error(errorData.message || 'Login failed')
            }

            return await response.json()
        } catch (error) {
            throw error
        }
    }

    const handleLogin = async () => {

        if (!username) {
            Alert.alert('Username is required!')
            return
        }
        if (!password) {
            Alert.alert('Password is required!')
            return
        }


        try {
            setLoading(true)
            const formattedRequest = { username, password }
            const response = await loginUser(formattedRequest)
            Alert.alert(response?.message)

        } catch (e: any) {
            console.log('e', e)
            Alert.alert(e?.message || 'Something went wrong. Please try again later!')

        } finally {
            setLoading(false)

        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Hello</Text>
            <Text style={styles.subtitle}>Sign in to your account</Text>

            <TextInput
                style={styles.input}
                placeholder="Username"
                value={username}
                onChangeText={(x) => setUsername(x)}
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                secureTextEntry
                value={password}
                onChangeText={(x) => setPassword(x)}
            />

            <TouchableOpacity>
                <Text style={styles.forgotText}>Forgot your password?</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={handleLogin}>
                {loading ?
                    <ActivityIndicator color={'white'} />
                    :
                    <Text style={styles.buttonText}>Sign in</Text>
                }
            </TouchableOpacity>


            <Text style={styles.footerText}>
                {'Don’t have an account? '}
                <Link style={styles.createText} push href={'/screens/signupscreen'}>
                    {'Create'}
                </Link>
            </Text>

            {/* <TouchableOpacity onPress={() => navigation.navigate('SignupScreen')}>
                <Text style={styles.footerText}>Don’t have an account? <Text style={styles.createText}>Create</Text></Text>
            </TouchableOpacity> */}
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20, backgroundColor: '#ffffff' },
    title: { fontSize: 36, fontWeight: 'bold', color: '#333' },
    subtitle: { fontSize: 16, color: '#666', marginBottom: 30 },
    input: { width: '80%', height: 50, backgroundColor: '#f5f5f5', borderRadius: 25, paddingHorizontal: 15, marginVertical: 10 },
    forgotText: { alignSelf: 'flex-end', color: '#666', marginVertical: 10 },
    button: { backgroundColor: '#ff7e5f', borderRadius: 25, paddingVertical: 10, paddingHorizontal: 20, marginTop: 20, width: '80%', alignItems: 'center' },
    buttonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
    footerText: { marginTop: 30, color: '#666' },
    createText: { color: '#ff7e5f', fontWeight: 'bold' },
});
