import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect, useRef } from 'react';
import { Animated, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ActivityScreen from './ActivityScreen';
import Header from './Layout/Header';
import Moodtracker from './Moodtracker';


const Home_Screen = ({ navigation }) => {
    const userName = "Sarah";
    const scrollY = useRef(new Animated.Value(0)).current;


    // Animation values
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const scaleAnim = useRef(new Animated.Value(0.9)).current;
    const rotateAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 800,
                useNativeDriver: true,
            }),
            Animated.spring(scaleAnim, {
                toValue: 1,
                tension: 50,
                friction: 7,
                useNativeDriver: true,
            }),
        ]).start();

        Animated.loop(
            Animated.timing(rotateAnim, {
                toValue: 1,
                duration: 3000,
                useNativeDriver: true,
            })
        ).start();
    }, []);


    return (
        <LinearGradient
            colors={['#F07663', '#F07663']}
            style={styles.container}

        >

            <SafeAreaView style={{ flex: 1 }} edges={['top']}>

                <View style={{ flex: 1 }}>
                    <Animated.ScrollView
                        style={styles.scrollView}
                        showsVerticalScrollIndicator={false}
                        onScroll={Animated.event(
                            [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                            { useNativeDriver: false }
                        )}
                        scrollEventThrottle={16}
                    >
                        <Header userName={userName} notificationCount={3} />

                        {/* Welcome Section */}
                        <View style={{ marginHorizontal: 10, marginTop: 10, flexDirection: 'row' }}>
                            <View>
                                <Text style={styles.welcomeText}>Good Morning 👋</Text>
                                <Text style={styles.subWelcomeText}>How are you feeling today?</Text>
                            </View>

                            <View style={styles.imageContainer}>
                                <Image
                                    source={require('../../assets/images/yoga.png')}
                                    style={styles.yogaImage}
                                />
                            </View>
                        </View>
                        <ActivityScreen />


                        <Moodtracker />
                        {/* Daily Meditation Routine */}
                        <View style={styles.sectionContainer}>
                            <View style={styles.sectionHeader}>
                                <Text style={styles.sectionTitle}>Daily Calm</Text>

                            </View>

                            <TouchableOpacity activeOpacity={0.9}>
                                <LinearGradient
                                    colors={['#667EEA', '#764BA2']}
                                    style={styles.dailyCalmCard}
                                    start={{ x: 0, y: 0 }}
                                    end={{ x: 1, y: 1 }}
                                >
                                    <View style={styles.dailyCalmContent}>
                                        <View>
                                            <Text style={styles.dailyCalmTitle}>Morning Mindfulness</Text>
                                            <Text style={styles.dailyCalmSubtitle}>Start your day with peace</Text>
                                            <View style={styles.durationContainer}>
                                                <Ionicons name="time-outline" size={16} color="#fff" />
                                                <Text style={styles.dailyCalmDuration}>10 minutes</Text>
                                            </View>
                                        </View>
                                        <View style={styles.playButton}>
                                            <Ionicons name="play" size={32} color="#fff" />
                                        </View>
                                    </View>
                                </LinearGradient>
                            </TouchableOpacity>
                        </View>


                        {/* Progress Dashboard */}
                        <Animated.View
                            style={[
                                styles.goalCardContainer,
                                {
                                    opacity: fadeAnim,
                                    transform: [{ scale: scaleAnim }]
                                }
                            ]}
                        >
                            <LinearGradient
                                colors={['#FFFFFF', '#FFF7ED']}
                                style={styles.goalCard}
                            >
                                <View style={styles.goalHeader}>
                                    <Text style={styles.goalTitle}>Weekly Progress</Text>
                                    <LinearGradient
                                        colors={['#EA580C', '#F59E0B']}
                                        start={{ x: 0, y: 0 }}
                                        end={{ x: 1, y: 0 }}
                                        style={styles.goalProgressGradient}
                                    >
                                        <Text style={styles.goalProgress}>75%</Text>
                                    </LinearGradient>
                                </View>
                                <View style={styles.progressBarContainer}>
                                    <LinearGradient
                                        colors={['#EA580C', '#F59E0B', '#FBBF24']}
                                        start={{ x: 0, y: 0 }}
                                        end={{ x: 1, y: 0 }}
                                        style={[styles.progressBar, { width: '75%' }]}
                                    />
                                </View>
                                <View style={styles.statsRow}>
                                    <View style={styles.statItem}>
                                        <Text style={styles.statNumber}>45</Text>
                                        <Text style={styles.statLabel}>min</Text>
                                    </View>
                                    <View style={styles.statDivider} />
                                    <View style={styles.statItem}>
                                        <Text style={styles.statNumber}>6</Text>
                                        <Text style={styles.statLabel}>sessions</Text>
                                    </View>
                                    <View style={styles.statDivider} />
                                    <View style={styles.statItem}>
                                        <Text style={styles.statNumber}>7</Text>
                                        <Text style={styles.statLabel}>day streak</Text>
                                    </View>
                                </View>
                            </LinearGradient>
                        </Animated.View>

                        {/* Premium Banner */}
                        <TouchableOpacity activeOpacity={0.9} style={styles.premiumBannerContainer}>
                            <LinearGradient
                                colors={['#1E3A8A', '#3B82F6', '#60A5FA']}
                                style={styles.premiumBanner}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 1 }}
                            >
                                <View>
                                    <Text style={styles.premiumTitle}>Unlock Premium</Text>
                                    <Text style={styles.premiumSubtitle}>Access all meditations & sounds</Text>
                                </View>
                                <View style={styles.premiumCrown}>
                                    <Ionicons name="diamond" size={32} color="#FCD34D" />
                                </View>
                            </LinearGradient>
                        </TouchableOpacity>

                        <View style={styles.bottomSpacing} />
                    </Animated.ScrollView>
                </View>
            </SafeAreaView>
        </LinearGradient>
    );
};




export default Home_Screen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollView: {
        flex: 1,
    },
    welcomeText: {
        fontSize: 22,
        fontFamily: "Heading",
        color: '#fff',
    },
    subWelcomeText: {
        fontSize: 16,
        fontFamily: "Lato-Bold",
        color: '#fff',
        marginTop: 4,
    },
    imageContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 0,
    },
    yogaImage: {
        height: 150,
        resizeMode: 'contain',
    },
    sectionContainer: {
        marginBottom: 10,
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 1, marginBottom: 10
    },
    sectionTitle: {
        fontSize: 20,
        fontFamily: "Heading",
        color: '#fff',
        paddingHorizontal: 10,
    },
    seeAllText: {
        fontSize: 14,
        fontFamily: "Lato-Bold",
        color: '#fff',
        opacity: 0.8,
    },

    streakBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255,255,255,0.9)',
        paddingHorizontal: 8,
        paddingVertical: 6,
        borderRadius: 10,

    },
    streakText: {
        fontSize: 13,
        fontFamily: "Lato-Bold",
        color: '#FF6B35',
    },
    dailyCalmCard: {
        marginHorizontal: 10,
        padding: 12,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.2,
        shadowRadius: 16,
        elevation: 10,
    },
    dailyCalmContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    dailyCalmTitle: {
        fontSize: 22,
        fontFamily: "Heading",
        color: '#fff',
        marginBottom: 6,
    },
    dailyCalmSubtitle: {
        fontSize: 14,
        fontFamily: "Lato-Bold",
        color: '#fff',
        opacity: 0.9,
        marginBottom: 8,
    },
    durationContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        marginTop: 4,
    },
    dailyCalmDuration: {
        fontSize: 14,
        fontFamily: "Lato-Bold",
        color: '#fff',
    },
    playButton: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: 'rgba(255,255,255,0.3)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    horizontalScroll: {
        paddingHorizontal: 10,
        gap: 16,
    },

    premiumBadge: {
        position: 'absolute',
        top: 8,
        right: 8,
        backgroundColor: '#1E3A8A',
        padding: 6,
        borderRadius: 12,
    },
    goalCardContainer: {
        marginHorizontal: 10,
        marginBottom: 10,
    },
    goalCard: {
        padding: 12,
        borderRadius: 10,
        shadowColor: '#EA580C',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 12,
        elevation: 8,
    },
    goalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    goalTitle: {
        fontSize: 20,
        fontFamily: "Heading",
        color: '#2c2c2c',
    },
    goalProgressGradient: {
        paddingHorizontal: 16,
        paddingVertical: 6,
        borderRadius: 16,
    },
    goalProgress: {
        fontSize: 18,
        fontFamily: "Lato-Bold",
        color: '#FFF',
    },
    progressBarContainer: {
        height: 10,
        backgroundColor: '#F3F4F6',
        borderRadius: 8,
        overflow: 'hidden',
        marginBottom: 16,
    },
    progressBar: {
        height: '100%',
        borderRadius: 8,
    },
    statsRow: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    statItem: {
        alignItems: 'center',
    },
    statNumber: {
        fontSize: 24,
        fontFamily: "Lato-Bold",
        color: '#E8624E',
    },
    statLabel: {
        fontSize: 12,
        fontFamily: "Lato-Bold",
        color: '#000',
        marginTop: 4,
    },
    statDivider: {
        width: 1,
        height: 30,
        backgroundColor: '#E5E7EB',
    },
    premiumBannerContainer: {
        marginHorizontal: 10,
    },
    premiumBanner: {
        padding: 12,
        borderRadius: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        shadowColor: '#1E3A8A',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.3,
        shadowRadius: 16,
        elevation: 10,
    },
    premiumTitle: {
        fontSize: 20,
        fontFamily: "Heading",
        color: '#fff',
        marginBottom: 4,
    },
    premiumSubtitle: {
        fontSize: 14,
        fontFamily: "Lato-Regular",
        color: '#fff',
        opacity: 0.9,
    },
    premiumCrown: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: 'rgba(255,255,255,0.2)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    bottomSpacing: {
        height: 100,
    },
});