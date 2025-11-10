import React, { useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

const Login_Screen = ({ navigation }) => {
    const [email, setEmail] = useState('test@gmail.com');
    const [password, setPassword] = useState('123456');
    const [rememberMe, setRememberMe] = useState(false);
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    const validateEmail = (text) => {
        setEmail(text);
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!text) {
            setEmailError('Email is required');
        } else if (!emailRegex.test(text)) {
            setEmailError('Please enter a valid email');
        } else {
            setEmailError('');
        }
    };

    const validatePassword = (text) => {
        setPassword(text);
        if (!text) {
            setPasswordError('Password is required');
        } else if (text.length < 6) {
            setPasswordError('Password must be at least 6 characters');
        } else {
            setPasswordError('');
        }
    };

    const handleSignIn = () => {
        let isValid = true;

        if (!email) {
            setEmailError('Email is required');
            isValid = false;
        }
        if (!password) {
            setPasswordError('Password is required');
            isValid = false;
        }

        if (!isValid || emailError || passwordError) {
            Alert.alert('Error', 'Please fix the errors before signing in');
            return;
        }

        // Check credentials
        if (email === 'test@gmail.com' && password === '123456') {
            Alert.alert('Success', 'Welcome back to your meditation journey! 🧘‍♀️');
            navigation.replace('Home_Screen');
        } else {
            Alert.alert('Error', 'Invalid email or password');
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.headerContainer}>
                <Text style={styles.logo}>🧘‍♀️</Text>
                <Text style={styles.title}>Welcome Back</Text>
                <Text style={styles.subtitle}>Continue your meditation journey</Text>
            </View>

            <View style={styles.formContainer}>
                {/* Email Input */}
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Email</Text>
                    <TextInput
                        style={[styles.input, emailError && styles.inputError]}
                        placeholder="Enter your email"
                        placeholderTextColor="#999"
                        value={email}
                        onChangeText={validateEmail}
                        keyboardType="email-address"
                        autoCapitalize="none"
                        autoComplete="email"
                    />
                    {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}
                </View>

                {/* Password Input */}
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Password</Text>
                    <View style={styles.passwordContainer}>
                        <TextInput
                            style={[styles.input, passwordError && styles.inputError, styles.passwordInput]}
                            placeholder="Enter your password"
                            placeholderTextColor="#999"
                            value={password}
                            onChangeText={validatePassword}
                            secureTextEntry={!isPasswordVisible}
                            autoCapitalize="none"
                        />
                        <TouchableOpacity
                            style={styles.eyeIcon}
                            onPress={() => setIsPasswordVisible(!isPasswordVisible)}
                        >
                            <Text style={styles.eyeText}>{isPasswordVisible ? '👁️' : '👁️‍🗨️'}</Text>
                        </TouchableOpacity>
                    </View>
                    {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}
                </View>

                {/* Remember Me & Forgot Password */}
                <View style={styles.optionsContainer}>
                    <TouchableOpacity
                        style={styles.checkboxContainer}
                        onPress={() => setRememberMe(!rememberMe)}
                    >
                        <View style={[styles.checkbox, rememberMe && styles.checkboxChecked]}>
                            {rememberMe && <Text style={styles.checkmark}>✓</Text>}
                        </View>
                        <Text style={styles.checkboxLabel}>Remember me</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => Alert.alert('Forgot Password', 'Password reset link sent!')}>
                        <Text style={styles.forgotText}>Forgot Password?</Text>
                    </TouchableOpacity>
                </View>

                {/* Sign In Button */}
                <TouchableOpacity style={styles.signInButton} onPress={handleSignIn}>
                    <Text style={styles.signInButtonText}>Sign In</Text>
                </TouchableOpacity>

                {/* Sign Up Link */}
                <View style={styles.signUpContainer}>
                    <Text style={styles.signUpText}>Don't have an account? </Text>
                    <TouchableOpacity onPress={() => { navigation.navigate('SignUp_Screen') }}>
                        <Text style={styles.signUpLink}>Sign Up</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    );
};

export default Login_Screen;

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: '#f5f5f0',
        padding: 20,
        justifyContent: 'center',
    },
    headerContainer: {
        alignItems: 'center',
        marginBottom: 40,
    },
    logo: {
        fontSize: 60,
        marginBottom: 10,
    },
    title: {
        fontSize: 32,
        color: '#2c2c2c',
        marginBottom: 8, fontFamily: "Lato-Bold"
    },
    subtitle: {
        fontSize: 16,
        color: '#666',
        textAlign: 'center', fontFamily: "Lato-Regular"
    },
    formContainer: {
        backgroundColor: '#fff',
        borderRadius: 20,
        padding: 24,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 5,
    },
    inputContainer: {
        marginBottom: 20,
    },
    label: {
        fontSize: 14,
        fontFamily: "Lato-Bold",
        color: '#2c2c2c',
        marginBottom: 8,
    },
    input: {
        backgroundColor: '#f9f9f9',
        borderRadius: 12,
        padding: 16,
        fontSize: 16,
        borderWidth: 1,
        borderColor: '#e0e0e0',
        color: '#2c2c2c', fontFamily: "Lato-Regular"
    },
    inputError: {
        borderColor: '#ff6b6b',
        backgroundColor: '#fff5f5',
    },
    passwordContainer: {
        position: 'relative',
    },
    passwordInput: {
        paddingRight: 50,
    },
    eyeIcon: {
        position: 'absolute',
        right: 16,
        top: 16,
    },
    eyeText: {
        fontSize: 20, fontFamily: "Lato-Regaulr"
    },
    errorText: {
        color: '#ff6b6b',
        fontSize: 12,
        marginTop: 6,
        marginLeft: 4,
    },
    optionsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    checkbox: {
        width: 22,
        height: 22,
        borderRadius: 6,
        borderWidth: 2,
        borderColor: '#b86731',
        marginRight: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
    checkboxChecked: {
        backgroundColor: '#b86731',
    },
    checkmark: {
        color: '#fff',
        fontSize: 14,
        fontFamily: "Lato-Bold"
    },
    checkboxLabel: {
        fontSize: 14,
        color: '#666',
    },
    forgotText: {
        fontSize: 14,
        color: '#b86731'
        , fontFamily: "Lato-Regular"
    },
    signInButton: {
        backgroundColor: '#b86731',
        borderRadius: 12,
        padding: 14,
        alignItems: 'center',
        marginBottom: 20,

    },
    signInButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '700',
    },
    signUpContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
    },
    signUpText: {
        fontSize: 14,
        color: '#666', fontFamily: "Lato-Regular"
    },
    signUpLink: {
        fontSize: 14,
        color: '#b86731'
        , fontFamily: "Lato-Regular"
    },
    testInfoContainer: {
        backgroundColor: '#f0f7ff',
        padding: 16,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#cce5ff',
        marginTop: 10,
    },
    testInfoTitle: {
        fontSize: 12,
        fontWeight: '700',
        color: '#2c2c2c',
        marginBottom: 6,
    },
    testInfo: {
        fontSize: 11,
        color: '#666',
        fontFamily: 'monospace',
        marginBottom: 2,
    },
});