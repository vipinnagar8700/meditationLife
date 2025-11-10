import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect, useRef, useState } from 'react';
import { Alert, Animated, Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

const Login_Screen = ({ navigation }) => {
    const [email, setEmail] = useState('test@gmail.com');
    const [password, setPassword] = useState('123456');
    const [rememberMe, setRememberMe] = useState(false);
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

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
        <LinearGradient
            colors={['#E8624E', '#F3A469']}
            style={styles.gradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
        >
            <ScrollView contentContainerStyle={styles.container}>
                <View style={styles.headerContainer}>
                    <Image source={require('../../assets/images/icon.png')} style={styles.logo} />
                    <Text style={styles.title}>Welcome Back</Text>
                    <Text style={styles.subtitle}>Continue your meditation journey</Text>
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

                            {/* Sign In Button with Gradient */}
                            <TouchableOpacity onPress={handleSignIn} style={styles.signInButtonWrapper}>
                                <LinearGradient
                                    colors={['#E8624E', '#F3A469']}
                                    start={{ x: 0, y: 0 }}
                                    end={{ x: 1, y: 0 }}
                                    style={styles.signInButton}
                                >
                                    <Text style={styles.signInButtonText}>Sign In</Text>
                                </LinearGradient>
                            </TouchableOpacity>

                            {/* Sign Up Link */}
                            <View style={styles.signUpContainer}>
                                <Text style={styles.signUpText}>Don't have an account? </Text>
                                <TouchableOpacity onPress={() => navigation.navigate('SignUp_Screen')}>
                                    <Text style={styles.signUpLink}>Sign Up</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </LinearGradient>
                </Animated.View>
            </ScrollView>
        </LinearGradient>
    );
};

export default Login_Screen;

const styles = StyleSheet.create({
    gradient: {
        flex: 1,
    },
    container: {
        flexGrow: 1,
        padding: 20,
        justifyContent: 'center',
    },
    headerContainer: {
        alignItems: 'center',
        marginBottom: 40,
    },
    logo: {
        width: 150,
        height: 150,
        marginBottom: 20,
        borderRadius: 75,
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
    optionsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 24,
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
        borderColor: '#E8624E',
        marginRight: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
    checkboxChecked: {
        backgroundColor: '#E8624E',
    },
    checkmark: {
        color: '#fff',
        fontSize: 14,
        fontFamily: "Lato-Bold"
    },
    checkboxLabel: {
        fontSize: 14,
        color: '#666',
        fontFamily: "Lato-Regular",
    },
    forgotText: {
        fontSize: 14,
        color: '#E8624E',
        fontFamily: "Lato-Regular"
    },
    signInButtonWrapper: {
        marginBottom: 20,
        borderRadius: 12,
        overflow: 'hidden',
        shadowColor: '#E8624E',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.4,
        shadowRadius: 12,
        elevation: 6,
    },
    signInButton: {
        borderRadius: 12,
        padding: 16,
        alignItems: 'center',
    },
    signInButtonText: {
        color: '#fff',
        fontSize: 18,
        fontFamily: "Lato-Bold",
    },
    signUpContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    signUpText: {
        fontSize: 14,
        color: '#666',
        fontFamily: "Lato-Regular"
    },
    signUpLink: {
        fontSize: 14,
        color: '#E8624E',
        fontFamily: "Lato-Bold"
    },
});