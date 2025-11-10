import React, { useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

const SignUp_Screen = ({ navigation }) => {
    const [name, setName] = useState('vipin');
    const [phone, setPhone] = useState('+918700504218');
    const [email, setEmail] = useState('vipinnagar8700@gmail.com');
    const [password, setPassword] = useState('123456');
    const [confirmPassword, setConfirmPassword] = useState('123456');
    const [agreeTerms, setAgreeTerms] = useState(false);
    const [nameError, setNameError] = useState('');
    const [phoneError, setPhoneError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [confirmPasswordError, setConfirmPasswordError] = useState('');
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);

    const validateName = (text) => {
        setName(text);
        if (!text.trim()) {
            setNameError('Name is required');
        } else if (text.trim().length < 2) {
            setNameError('Name must be at least 2 characters');
        } else if (!/^[a-zA-Z\s]+$/.test(text)) {
            setNameError('Name can only contain letters');
        } else {
            setNameError('');
        }
    };

    const validatePhone = (text) => {
        // Remove non-numeric characters for validation
        const numericPhone = text.replace(/[^0-9]/g, '');
        setPhone(text);

        if (!text) {
            setPhoneError('Phone number is required');
        } else if (numericPhone.length < 10) {
            setPhoneError('Phone number must be at least 10 digits');
        } else if (numericPhone.length > 15) {
            setPhoneError('Phone number is too long');
        } else {
            setPhoneError('');
        }
    };

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
        } else if (!/(?=.*[a-z])/.test(text)) {
            setPasswordError('Password must contain a lowercase letter');
        } else if (!/(?=.*[A-Z])/.test(text)) {
            setPasswordError('Password must contain an uppercase letter');
        } else if (!/(?=.*[0-9])/.test(text)) {
            setPasswordError('Password must contain a number');
        } else {
            setPasswordError('');
        }

        // Revalidate confirm password when password changes
        if (confirmPassword) {
            validateConfirmPassword(confirmPassword);
        }
    };

    const validateConfirmPassword = (text) => {
        setConfirmPassword(text);
        if (!text) {
            setConfirmPasswordError('Please confirm your password');
        } else if (text !== password) {
            setConfirmPasswordError('Passwords do not match');
        } else {
            setConfirmPasswordError('');
        }
    };

    const handleSignUp = () => {
        let isValid = true;

        // Validate all fields
        if (!name.trim()) {
            setNameError('Name is required');
            isValid = false;
        }
        if (!phone) {
            setPhoneError('Phone number is required');
            isValid = false;
        }
        if (!email) {
            setEmailError('Email is required');
            isValid = false;
        }
        if (!password) {
            setPasswordError('Password is required');
            isValid = false;
        }
        if (!confirmPassword) {
            setConfirmPasswordError('Please confirm your password');
            isValid = false;
        }

        if (!agreeTerms) {
            Alert.alert('Terms Required', 'Please agree to Terms & Conditions');
            return;
        }

        if (!isValid || nameError || phoneError || emailError || passwordError || confirmPasswordError) {
            Alert.alert('Error', 'Please fix all errors before signing up');
            return;
        }

        // Success - Show welcome message
        Alert.alert(
            'Success! 🎉',
            `Welcome to your meditation journey, ${name}!\n\nYour account has been created successfully.`,
            [
                {
                    text: 'Start Meditating',
                    onPress: () => { navigation.replace('Question_Screen') }
                }
            ]
        );
    };

    return (
        <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
            <View style={styles.headerContainer}>
                <Text style={styles.logo}>🧘‍♀️</Text>
                <Text style={styles.title}>Create Account</Text>
                <Text style={styles.subtitle}>Begin your journey to inner peace</Text>
            </View>

            <View style={styles.formContainer}>
                {/* Name Input */}
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Full Name</Text>
                    <TextInput
                        style={[styles.input, nameError && styles.inputError]}
                        placeholder="Enter your full name"
                        placeholderTextColor="#999"
                        value={name}
                        onChangeText={validateName}
                        autoCapitalize="words"
                    />
                    {nameError ? <Text style={styles.errorText}>{nameError}</Text> : null}
                </View>

                {/* Phone Input */}
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Phone Number</Text>
                    <TextInput
                        style={[styles.input, phoneError && styles.inputError]}
                        placeholder="Enter your phone number"
                        placeholderTextColor="#999"
                        value={phone}
                        onChangeText={validatePhone}
                        keyboardType="phone-pad"
                        maxLength={15}
                    />
                    {phoneError ? <Text style={styles.errorText}>{phoneError}</Text> : null}
                </View>

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
                            placeholder="Create a password"
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

                {/* Confirm Password Input */}
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Confirm Password</Text>
                    <View style={styles.passwordContainer}>
                        <TextInput
                            style={[styles.input, confirmPasswordError && styles.inputError, styles.passwordInput]}
                            placeholder="Confirm your password"
                            placeholderTextColor="#999"
                            value={confirmPassword}
                            onChangeText={validateConfirmPassword}
                            secureTextEntry={!isConfirmPasswordVisible}
                            autoCapitalize="none"
                        />
                        <TouchableOpacity
                            style={styles.eyeIcon}
                            onPress={() => setIsConfirmPasswordVisible(!isConfirmPasswordVisible)}
                        >
                            <Text style={styles.eyeText}>{isConfirmPasswordVisible ? '👁️' : '👁️‍🗨️'}</Text>
                        </TouchableOpacity>
                    </View>
                    {confirmPasswordError ? <Text style={styles.errorText}>{confirmPasswordError}</Text> : null}
                </View>

                {/* Terms & Conditions Checkbox */}
                <TouchableOpacity
                    style={styles.termsContainer}
                    onPress={() => setAgreeTerms(!agreeTerms)}
                >
                    <View style={[styles.checkbox, agreeTerms && styles.checkboxChecked]}>
                        {agreeTerms && <Text style={styles.checkmark}>✓</Text>}
                    </View>
                    <Text style={styles.termsText}>
                        I agree to the{' '}
                        <Text style={styles.termsLink}>Terms & Conditions</Text>
                        {' '}and{' '}
                        <Text style={styles.termsLink}>Privacy Policy</Text>
                    </Text>
                </TouchableOpacity>

                {/* Sign Up Button */}
                <TouchableOpacity style={styles.signUpButton} onPress={handleSignUp}>
                    <Text style={styles.signUpButtonText}>Create Account</Text>
                </TouchableOpacity>

                {/* Sign In Link */}
                <View style={styles.signInContainer}>
                    <Text style={styles.signInText}>Already have an account? </Text>
                    <TouchableOpacity onPress={() => { navigation.navigate('Login_Screen') }}>
                        <Text style={styles.signInLink}>Sign In</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    );
};

export default SignUp_Screen;

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: '#f5f5f0',
        padding: 20,
        paddingTop: 80,
        paddingBottom: 40,
    },
    headerContainer: {
        alignItems: 'center',
        marginBottom: 30,
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
        marginBottom: 16,
    },
    label: {
        fontSize: 14,
        fontFamily: "Lato-Regular",
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
        backgroundColor: '#fff5f5', fontFamily: "Lato-Regular"
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
        fontSize: 20, fontFamily: "Lato-Regular"
    },
    errorText: {
        color: '#ff6b6b',
        fontSize: 12,
        marginTop: 6,
        marginLeft: 4, fontFamily: "Lato-Regular"
    },
    termsContainer: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginTop: 8,
        marginBottom: 24, fontFamily: "Lato-Regular"
    },
    checkbox: {
        width: 22,
        height: 22,
        borderRadius: 6,
        borderWidth: 2,
        borderColor: '#b86731',
        marginRight: 10,
        marginTop: 2,
        justifyContent: 'center',
        alignItems: 'center',
        flexShrink: 0,
    },
    checkboxChecked: {
        backgroundColor: '#b86731',
    },
    checkmark: {
        color: '#fff',
        fontSize: 14,
        fontWeight: 'bold',
    },
    termsText: {
        fontSize: 13,
        color: '#666',
        lineHeight: 20,
        flex: 1, fontFamily: "Lato-Regular"
    },
    termsLink: {
        color: '#b86731',
        fontFamily: "Lato-Regular"
    },
    signUpButton: {
        backgroundColor: '#b86731',
        borderRadius: 12,
        padding: 14,
        alignItems: 'center',
        marginBottom: 20,
        shadowColor: '#b86731',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 6,
    },
    signUpButtonText: {
        color: '#fff',
        fontSize: 18,
        fontFamily: "Lato-Bold",
    },
    signInContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    signInText: {
        fontSize: 14,
        color: '#666', fontFamily: "Lato-Regular"
    },
    signInLink: {
        fontSize: 14,
        color: '#b86731',
        fontFamily: "Lato-Regular"
    },
});