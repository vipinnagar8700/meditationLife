import React, { useEffect, useRef } from 'react';
import { Animated, Dimensions, ImageBackground, StyleSheet } from 'react-native';

const { width, height } = Dimensions.get('window');

const Splash_Screen = ({ navigation }) => {
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const scaleAnim = useRef(new Animated.Value(0.7)).current;

    useEffect(() => {
        // Start animation
        Animated.sequence([
            Animated.parallel([
                Animated.timing(fadeAnim, {
                    toValue: 1,
                    duration: 1500,
                    useNativeDriver: true,
                }),
                Animated.spring(scaleAnim, {
                    toValue: 1,
                    friction: 3,
                    tension: 40,
                    useNativeDriver: true,
                }),
            ]),
        ]).start();

        // Navigate to next screen after 3 seconds
        const timer = setTimeout(() => {
            navigation.replace('Onboarding_Screen'); // Replace with your next screen name
        }, 3000);

        return () => clearTimeout(timer);
    }, [fadeAnim, scaleAnim]);

    return (
        <ImageBackground source={require('../../assets/images/Splash/Splash.png')} style={styles.container}>
        </ImageBackground>
    );
};

export default Splash_Screen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    centerContent: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logoContainer: {
        alignItems: 'center',
    },
    lottie: {
        width: width * 0.5,
        height: width * 0.5,
    },
    appName: {
        fontSize: 32,
        fontWeight: '700',
        marginTop: 20,
        color: '#fff',
        textShadowColor: 'rgba(255,255,255,0.3)',
        textShadowOffset: { width: 0, height: 0 },
        textShadowRadius: 10,
    },
});
