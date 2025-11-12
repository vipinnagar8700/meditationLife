import { useNavigation } from '@react-navigation/native'; // ✅ Import navigation hook
import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const Header = ({ userName, notificationCount = 0 }) => {
    const navigation = useNavigation(); // ✅ Access navigation
    const bellAnimation = useRef(new Animated.Value(0)).current;
    const badgeScale = useRef(new Animated.Value(1)).current;
    const menuButtonScale = useRef(new Animated.Value(1)).current;
    const notificationButtonScale = useRef(new Animated.Value(1)).current;

    useEffect(() => {
        // Bell shake animation loop
        Animated.loop(
            Animated.sequence([
                Animated.timing(bellAnimation, {
                    toValue: 1,
                    duration: 100,
                    useNativeDriver: true,
                }),
                Animated.timing(bellAnimation, {
                    toValue: -1,
                    duration: 100,
                    useNativeDriver: true,
                }),
                Animated.timing(bellAnimation, {
                    toValue: 1,
                    duration: 100,
                    useNativeDriver: true,
                }),
                Animated.timing(bellAnimation, {
                    toValue: 0,
                    duration: 100,
                    useNativeDriver: true,
                }),
                Animated.delay(3000),
            ])
        ).start();

        // Badge pulse animation
        Animated.loop(
            Animated.sequence([
                Animated.timing(badgeScale, {
                    toValue: 1.2,
                    duration: 800,
                    useNativeDriver: true,
                }),
                Animated.timing(badgeScale, {
                    toValue: 1,
                    duration: 800,
                    useNativeDriver: true,
                }),
            ])
        ).start();
    }, []);

    const bellRotate = bellAnimation.interpolate({
        inputRange: [-1, 1],
        outputRange: ['-15deg', '15deg'],
    });

    const handleMenuPress = () => {
        Animated.sequence([
            Animated.timing(menuButtonScale, {
                toValue: 0.85,
                duration: 100,
                useNativeDriver: true,
            }),
            Animated.spring(menuButtonScale, {
                toValue: 1,
                friction: 3,
                tension: 40,
                useNativeDriver: true,
            }),
        ]).start(() => {
            navigation.openDrawer(); // ✅ Opens drawer after animation
        });
    };

    const handleNotificationPress = () => {
        Animated.sequence([
            Animated.timing(notificationButtonScale, {
                toValue: 0.85,
                duration: 100,
                useNativeDriver: true,
            }),
            Animated.spring(notificationButtonScale, {
                toValue: 1,
                friction: 3,
                tension: 40,
                useNativeDriver: true,
            }),
        ]).start();
        navigation.navigate("Notification_Screen")
    };

    return (
        <LinearGradient
            colors={['#E8624E', '#F3A469']}
            style={styles.container}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 9 }}
        >
            {/* Menu Icon */}
            <Animated.View style={{ transform: [{ scale: menuButtonScale }] }}>
                <TouchableOpacity
                    style={styles.iconButton}
                    onPress={handleMenuPress}
                    activeOpacity={0.7}
                >
                    <View style={styles.iconGlow} />
                    <View style={styles.menuIcon}>
                        <View style={[styles.menuLine, styles.menuLine1]} />
                        <View style={[styles.menuLine, styles.menuLine2]} />
                        <View style={[styles.menuLine, styles.menuLine3]} />
                    </View>
                </TouchableOpacity>
            </Animated.View>



            {/* Notification Bell */}
            <Animated.View style={{ transform: [{ scale: notificationButtonScale }] }}>
                <TouchableOpacity
                    style={styles.iconButton}
                    onPress={handleNotificationPress}
                    activeOpacity={0.7}
                >
                    <View style={styles.iconGlow} />
                    <Animated.View
                        style={[
                            styles.bellIcon,
                            { transform: [{ rotate: bellRotate }] }
                        ]}
                    >
                        <View style={styles.bellTop} />
                        <View style={styles.bellBody} />
                        <View style={styles.bellBottom} />
                        <View style={styles.bellClapper} />
                    </Animated.View>

                    {notificationCount > 0 && (
                        <Animated.View
                            style={[
                                styles.notificationBadge,
                                { transform: [{ scale: badgeScale }] }
                            ]}
                        >
                            <View style={styles.badgeGlow} />
                            <Text style={styles.badgeText}>{notificationCount}</Text>
                        </Animated.View>
                    )}
                </TouchableOpacity>
            </Animated.View>
        </LinearGradient>
    )
}

export default Header

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        paddingVertical: 10,
        backgroundColor: '#ffffff',

    },
    gradientOverlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'transparent',
        borderBottomWidth: 2,
        borderBottomColor: 'transparent',
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
    },
    iconButton: {
        width: 48,
        height: 48,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 14,
        shadowColor: '#F3A469',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 5,
        position: 'relative',
        overflow: 'visible',
    },
    iconGlow: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        borderRadius: 14,
        backgroundColor: 'rgba(184, 103, 49, 0.1)',
    },
    // Menu Icon Styles with 3D effect
    menuIcon: {
        width: 24,
        height: 18,
        justifyContent: 'space-between',
    },
    menuLine: {
        width: '100%',
        height: 2.5,
        backgroundColor: '#fff',
        borderRadius: 3,
        shadowColor: '#fff',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
        elevation: 3,
    },
    menuLine1: {
        width: '100%',
    },
    menuLine2: {
        width: '80%',
        alignSelf: 'center',
    },
    menuLine3: {
        width: '90%',
        alignSelf: 'center',
    },
    // Center Content with gradient
    centerContent: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 16,
    },
    userNameContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    userName: {
        fontSize: 22,
        color: '#fff',
        letterSpacing: 0.5, fontFamily: "Lato-Bold"
    },
    userEmoji: {
        fontSize: 20,
    },
    underline: {
        marginTop: 4,
        width: 40,
        height: 3,
        backgroundColor: '#fff',
        borderRadius: 2,
        shadowColor: '#fff',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.4,
        shadowRadius: 4,
        elevation: 3,
    },
    // Bell Icon Styles with 3D effect
    bellIcon: {
        width: 20,
        height: 20,
        position: 'relative',
    },
    bellTop: {
        width: 7,
        height: 4,
        backgroundColor: '#fff',
        borderRadius: 4,
        alignSelf: 'center',
        marginBottom: 1,
        shadowColor: '#fff',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.3,
        shadowRadius: 2,
        elevation: 2,
    },
    bellBody: {
        width: 20,
        height: 14,
        backgroundColor: '#fff',
        borderTopLeftRadius: 12,
        borderTopRightRadius: 12,
        alignSelf: 'center',
        shadowColor: '#fff',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.4,
        shadowRadius: 4,
        elevation: 4,
    },
    bellBottom: {
        width: 22,
        height: 3,
        backgroundColor: '#fff',
        borderRadius: 2,
        alignSelf: 'center',
        marginTop: 1,
        shadowColor: '#fff',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
        elevation: 3,
    },
    bellClapper: {
        position: 'absolute',
        bottom: 4,
        alignSelf: 'center',
        width: 4,
        height: 4,
        backgroundColor: '#d4944e',
        borderRadius: 2,
    },
    notificationBadge: {
        position: 'absolute',
        top: -6,
        right: -6,
        backgroundColor: '#ff4444',
        borderRadius: 12,
        minWidth: 22,
        height: 22,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 3,
        borderColor: '#fff',
        shadowColor: '#ff4444',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.5,
        shadowRadius: 6,
        elevation: 6,
    },
    badgeGlow: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        borderRadius: 12,
        backgroundColor: 'rgba(255, 68, 68, 0.3)',
    },
    badgeText: {
        color: '#fff',
        fontSize: 11,
        fontFamily: "Lato-Bold",
        textShadowColor: 'rgba(0, 0, 0, 0.3)',
        textShadowOffset: { width: 0, height: 1 },
        textShadowRadius: 2,
    },
})