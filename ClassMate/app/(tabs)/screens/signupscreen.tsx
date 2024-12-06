import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { Link } from 'expo-router'

const API_BASE_URL = 'http:/192.168.137.201:3000'

export default function SignupScreen() {
    const navigation = useNavigation()

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [loading, setLoading] = useState(false)

    const registerUser = async (userData: any) => {
        try {
            const response = await fetch(`${API_BASE_URL}/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(userData),
            })

            if (!response.ok) {
                const errorData = await response.json()
                throw new Error(errorData?.message || 'Registration failed')
            }

            return await response.json()
        } catch (error) {
            throw error
        }
    }

    const handleRegister = async () => {
        if (!username) {
            Alert.alert('Username is required!')
            return
        }
        if (!password) {
            Alert.alert('Password is required!')
            return
        }
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
        if (!passwordRegex.test(password)) {
            Alert.alert('Password must be at least 8 characters long, include one uppercase letter, one lowercase letter, one number, and one special character.')
            return
        }
        if (!email) {
            Alert.alert('Email is required!')
            return
        }
        const emailRegex = /^[fF]\d{6}@cfd\.nu\.edu\.pk$/
        if (!emailRegex.test(email)) {
            Alert.alert('Enter a valid email address (e.g., f219065@cfd.nu.edu.pk)')
            return
        }
        if (!phone) {
            Alert.alert('Phone number is required!')
            return
        }

        try {
            setLoading(true)

            const formattedRequest = { email: email?.toLowerCase(), username, password, phone }

            const response = await registerUser(formattedRequest)

            Alert.alert(response?.message)
        } catch (e: any) {
            console.error('Error during registration:', e)
            Alert.alert(e?.message || 'Something went wrong. Please try again later!')
        } finally {
            setLoading(false)
        }
    }


    return (
        <View style={styles.container}>
            <Text style={styles.title}>Create Account</Text>

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
            <TextInput
                style={styles.input}
                placeholder="E-mail"
                value={email}
                keyboardType='email-address'
                onChangeText={(x) => setEmail(x)}
            />
            <TextInput
                style={styles.input}
                placeholder="Mobile"
                value={phone}
                keyboardType='phone-pad'
                onChangeText={(x) => setPhone(x)}
            />

            <TouchableOpacity style={styles.button} onPress={handleRegister}>
                {loading ?
                    <ActivityIndicator color={'white'} />
                    :
                    <Text style={styles.buttonText}>Create</Text>
                }
            </TouchableOpacity>

            <Text style={styles.footerText}>
                {'Already have an account? '}
                <Link style={styles.loginText} push href={'/screens/loginscreen'}>
                    {'Login'}
                </Link>
            </Text>

        </View>
    )
}

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20, backgroundColor: '#ffffff' },
    title: { fontSize: 24, fontWeight: 'bold', color: '#333', marginBottom: 30 },
    input: { width: '80%', height: 50, backgroundColor: '#f5f5f5', borderRadius: 25, paddingHorizontal: 15, marginVertical: 10 },
    button: { backgroundColor: '#ff7e5f', borderRadius: 25, paddingVertical: 10, paddingHorizontal: 20, marginTop: 20, width: '80%', alignItems: 'center' },
    buttonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
    footerText: { marginTop: 30, color: '#666' },
    loginText: { color: '#ff7e5f', fontWeight: 'bold' },
})
