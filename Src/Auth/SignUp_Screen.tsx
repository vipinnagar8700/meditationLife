import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect, useRef, useState } from 'react';
import { Alert, Animated, Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

const SignUp_Screen = ({ navigation }) => {
    const [name, setName] = useState('vipin nagar');
    const [phone, setPhone] = useState('+918700504218');
    const [email, setEmail] = useState('vipinnagar8700@gmail.com');
    const [password, setPassword] = useState('Vipin@111');
    const [confirmPassword, setConfirmPassword] = useState('Vipin@111');
    const [agreeTerms, setAgreeTerms] = useState(false);
    const [nameError, setNameError] = useState('');
    const [phoneError, setPhoneError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [confirmPasswordError, setConfirmPasswordError] = useState('');
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);

    // Animation values
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const slideAnim = useRef(new Animated.Value(50)).current;
    const pulseAnim = useRef(new Animated.Value(1)).current;

    useEffect(() => {
        // Form fade in and slide up animation
        Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 800,
                useNativeDriver: true,
            }),
            Animated.spring(slideAnim, {
                toValue: 0,
                tension: 20,
                friction: 7,
                useNativeDriver: true,
            })
        ]).start();

        // Continuous pulse animation for form border
        Animated.loop(
            Animated.sequence([
                Animated.timing(pulseAnim, {
                    toValue: 1.02,
                    duration: 2000,
                    useNativeDriver: true,
                }),
                Animated.timing(pulseAnim, {
                    toValue: 1,
                    duration: 2000,
                    useNativeDriver: true,
                })
            ])
        ).start();
    }, []);

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
        } else {
            setPasswordError('');
        }

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
        <LinearGradient
            colors={['#E8624E', '#F3A469']}
            style={styles.gradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
        >
            <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
                <View style={styles.headerContainer}>
                    <Image source={require('../../assets/images/icon.png')} style={styles.logo} />
                    <Text style={styles.title}>Create Account</Text>
                    <Text style={styles.subtitle}>Begin your journey to inner peace</Text>
                </View>

                <Animated.View
                    style={[
                        styles.formWrapper,
                        {
                            opacity: fadeAnim,
                            transform: [
                                { translateY: slideAnim },
                                { scale: pulseAnim }
                            ]
                        }
                    ]}
                >
                    {/* Animated gradient border */}
                    <LinearGradient
                        colors={['#E8624E', '#F3A469', '#E8624E']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        style={styles.gradientBorder}
                    >
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

                            {/* Sign Up Button with Gradient */}
                            <TouchableOpacity onPress={handleSignUp} style={styles.signUpButtonWrapper}>
                                <LinearGradient
                                    colors={['#E8624E', '#F3A469']}
                                    start={{ x: 0, y: 0 }}
                                    end={{ x: 1, y: 0 }}
                                    style={styles.signUpButton}
                                >
                                    <Text style={styles.signUpButtonText}>Create Account</Text>
                                </LinearGradient>
                            </TouchableOpacity>

                            {/* Sign In Link */}
                            <View style={styles.signInContainer}>
                                <Text style={styles.signInText}>Already have an account? </Text>
                                <TouchableOpacity onPress={() => navigation.navigate('Login_Screen')}>
                                    <Text style={styles.signInLink}>Sign In</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </LinearGradient>
                </Animated.View>
            </ScrollView>
        </LinearGradient>
    );
};

export default SignUp_Screen;

const styles = StyleSheet.create({
    gradient: {
        flex: 1,
    },
    container: {
        flexGrow: 1,
        padding: 20,
        paddingTop: 60,
        paddingBottom: 40,
    },
    headerContainer: {
        alignItems: 'center',
        marginBottom: 30,
    },
    logo: {
        width: 120,
        height: 120,
        marginBottom: 16,
        borderRadius: 60,
    },
    title: {
        fontSize: 32,
        color: '#fff',
        marginBottom: 8,
        fontFamily: "Lato-Bold",
        textShadowColor: 'rgba(0, 0, 0, 0.2)',
        textShadowOffset: { width: 0, height: 2 },
        textShadowRadius: 4,
    },
    subtitle: {
        fontSize: 16,
        color: '#fff',
        textAlign: 'center',
        fontFamily: "Lato-Regular",
        opacity: 0.9,
    },
    formWrapper: {
        borderRadius: 26,
    },
    gradientBorder: {
        borderRadius: 26,
        padding: 3,
        shadowColor: '#E8624E',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.3,
        shadowRadius: 16,
        elevation: 10,
    },
    formContainer: {
        backgroundColor: '#fff',
        borderRadius: 24,
        padding: 24,
    },
    inputContainer: {
        marginBottom: 18,
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
        color: '#2c2c2c',
        fontFamily: "Lato-Regular"
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
        fontSize: 20,
    },
    errorText: {
        color: '#ff6b6b',
        fontSize: 12,
        marginTop: 6,
        marginLeft: 4,
        fontFamily: "Lato-Regular",
    },
    termsContainer: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginTop: 4,
        marginBottom: 24,
    },
    checkbox: {
        width: 22,
        height: 22,
        borderRadius: 6,
        borderWidth: 2,
        borderColor: '#E8624E',
        marginRight: 10,
        marginTop: 2,
        justifyContent: 'center',
        alignItems: 'center',
        flexShrink: 0,
    },
    checkboxChecked: {
        backgroundColor: '#E8624E',
    },
    checkmark: {
        color: '#fff',
        fontSize: 14,
        fontFamily: "Lato-Bold"
    },
    termsText: {
        fontSize: 13,
        color: '#666',
        lineHeight: 20,
        flex: 1,
        fontFamily: "Lato-Regular"
    },
    termsLink: {
        color: '#E8624E',
        fontFamily: "Lato-Bold"
    },
    signUpButtonWrapper: {
        marginBottom: 20,
        borderRadius: 12,
        overflow: 'hidden',
        shadowColor: '#E8624E',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.4,
        shadowRadius: 12,
        elevation: 6,
    },
    signUpButton: {
        borderRadius: 12,
        padding: 16,
        alignItems: 'center',
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
        color: '#666',
        fontFamily: "Lato-Regular"
    },
    signInLink: {
        fontSize: 14,
        color: '#E8624E',
        fontFamily: "Lato-Bold"
    },
});