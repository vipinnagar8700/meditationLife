import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect, useRef, useState } from 'react';
import { Animated, Dimensions, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from './Layout/Header';

const { width } = Dimensions.get('window');

const Home_Screen = ({ navigation }) => {
    const userName = "Sarah";
    const scrollY = useRef(new Animated.Value(0)).current;
    const [currentMood, setCurrentMood] = useState('calm');

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

    const spin = rotateAnim.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg'],
    });

    return (
        <LinearGradient
            colors={['#E8624E', '#F3A469']}
            style={styles.container}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
        >
            <SafeAreaView style={{ flex: 1 }} edges={['top']}>
                <View style={{ flex: 1 }}>
                    <Header userName={userName} notificationCount={3} />
                    <Animated.ScrollView
                        style={styles.scrollView}
                        showsVerticalScrollIndicator={false}
                        onScroll={Animated.event(
                            [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                            { useNativeDriver: false }
                        )}
                        scrollEventThrottle={16}
                    >
                        {/* Welcome Section */}
                        <View style={{ marginHorizontal: 10, marginTop: 10 }}>
                            <Text style={styles.welcomeText}>Good Morning 👋</Text>
                            <Text style={styles.subWelcomeText}>How are you feeling today?</Text>

                            <View style={styles.imageContainer}>
                                <Image
                                    source={require('../../assets/images/yoga.png')}
                                    style={styles.yogaImage}
                                />
                            </View>
                        </View>

                        {/* Mood Tracker */}
                        <View style={styles.sectionContainer}>
                            <Text style={styles.sectionTitle}>How do you feel?</Text>
                            <ScrollView
                                horizontal
                                showsHorizontalScrollIndicator={false}
                                contentContainerStyle={styles.moodScroll}
                            >
                                <MoodCard emoji="😊" label="Happy" mood="happy" currentMood={currentMood} setMood={setCurrentMood} />
                                <MoodCard emoji="😌" label="Calm" mood="calm" currentMood={currentMood} setMood={setCurrentMood} />
                                <MoodCard emoji="😔" label="Sad" mood="sad" currentMood={currentMood} setMood={setCurrentMood} />
                                <MoodCard emoji="😰" label="Anxious" mood="anxious" currentMood={currentMood} setMood={setCurrentMood} />
                                <MoodCard emoji="😴" label="Tired" mood="tired" currentMood={currentMood} setMood={setCurrentMood} />
                            </ScrollView>
                        </View>

                        {/* Daily Meditation Routine */}
                        <View style={styles.sectionContainer}>
                            <View style={styles.sectionHeader}>
                                <Text style={styles.sectionTitle}>Daily Calm</Text>
                                <View style={styles.streakBadge}>
                                    <Ionicons name="flame" size={16} color="#FF6B35" />
                                    <Text style={styles.streakText}>7 Day Streak</Text>
                                </View>
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

                        {/* Guided Meditation Library */}
                        <View style={styles.sectionContainer}>
                            <View style={styles.sectionHeader}>
                                <Text style={styles.sectionTitle}>Meditation Library</Text>
                                <TouchableOpacity onPress={() => { navigation.navigate("MeditationLists") }}>
                                    <Text style={styles.seeAllText}>See All</Text>
                                </TouchableOpacity>
                            </View>

                            <ScrollView
                                horizontal
                                showsHorizontalScrollIndicator={false}
                                contentContainerStyle={styles.horizontalScroll}
                            >
                                <MeditationCard
                                    icon={<Ionicons name="moon" size={36} color="#6366F1" />}
                                    title="Sleep"
                                    sessions="12 sessions"
                                    colors={['#E0E7FF', '#C7D2FE']}
                                />
                                <MeditationCard
                                    icon={<Ionicons name="cloud-outline" size={36} color="#10B981" />}
                                    title="Stress Relief"
                                    sessions="15 sessions"
                                    colors={['#D1FAE5', '#A7F3D0']}
                                />
                                <MeditationCard
                                    icon={<Ionicons name="bulb-outline" size={36} color="#F59E0B" />}
                                    title="Focus"
                                    sessions="10 sessions"
                                    colors={['#FEF3C7', '#FDE68A']}
                                />
                                <MeditationCard
                                    icon={<Ionicons name="heart" size={36} color="#EC4899" />}
                                    title="Self-Love"
                                    sessions="8 sessions"
                                    colors={['#FCE7F3', '#FBCFE8']}
                                />
                                <MeditationCard
                                    icon={<Ionicons name="person-outline" size={36} color="#8B5CF6" />}
                                    title="Beginners"
                                    sessions="6 sessions"
                                    colors={['#EDE9FE', '#DDD6FE']}
                                />
                            </ScrollView>
                        </View>

                        {/* Breathing Exercises */}
                        <View style={styles.sectionContainer}>
                            <Text style={styles.sectionTitle}>Breathing Exercises</Text>
                            <View style={styles.breathingGrid}>
                                <BreathingCard
                                    icon={<Ionicons name="fitness-outline" size={28} color="#0EA5E9" />}
                                    title="Box Breathing"
                                    duration="4-4-4-4"
                                    colors={['#E0F2FE', '#BAE6FD']}
                                />
                                <BreathingCard
                                    icon={<Ionicons name="analytics-outline" size={28} color="#8B5CF6" />}
                                    title="4-7-8 Calm"
                                    duration="4-7-8"
                                    colors={['#EDE9FE', '#DDD6FE']}
                                />
                            </View>
                        </View>

                        {/* Sleep & Relaxation Sounds */}
                        <View style={styles.sectionContainer}>
                            <View style={styles.sectionHeader}>
                                <Text style={styles.sectionTitle}>Sleep Sounds</Text>
                                <TouchableOpacity onPress={() => { navigation.navigate("Music_Screen") }}>
                                    <Text style={styles.seeAllText}>See All</Text>
                                </TouchableOpacity>
                            </View>

                            <ScrollView
                                horizontal
                                showsHorizontalScrollIndicator={false}
                                contentContainerStyle={styles.horizontalScroll}
                            >
                                <SoundCard
                                    icon={<Ionicons name="water" size={32} color="#0EA5E9" />}
                                    title="Ocean Waves"
                                    isPremium={false}
                                    colors={['#DBEAFE', '#BFDBFE']}
                                />
                                <SoundCard
                                    icon={<Ionicons name="rainy" size={32} color="#6366F1" />}
                                    title="Rain Sounds"
                                    isPremium={false}
                                    colors={['#E0E7FF', '#C7D2FE']}
                                />
                                <SoundCard
                                    icon={<Ionicons name="flame-outline" size={32} color="#F59E0B" />}
                                    title="Fireplace"
                                    isPremium={true}
                                    colors={['#FEF3C7', '#FDE68A']}
                                />
                                <SoundCard
                                    icon={<Ionicons name="leaf-outline" size={32} color="#10B981" />}
                                    title="Forest Birds"
                                    isPremium={true}
                                    colors={['#D1FAE5', '#A7F3D0']}
                                />
                            </ScrollView>
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

// Mood Card Component
const MoodCard = ({ emoji, label, mood, currentMood, setMood }) => {
    const scaleAnim = useRef(new Animated.Value(1)).current;
    const isSelected = currentMood === mood;

    const handlePress = () => {
        Animated.sequence([
            Animated.timing(scaleAnim, {
                toValue: 0.85,
                duration: 100,
                useNativeDriver: true,
            }),
            Animated.spring(scaleAnim, {
                toValue: 1,
                friction: 3,
                useNativeDriver: true,
            }),
        ]).start();
        setMood(mood);
    };

    return (
        <TouchableOpacity onPress={handlePress} activeOpacity={0.9}>
            <Animated.View style={[styles.moodCard, { transform: [{ scale: scaleAnim }] }]}>
                <LinearGradient
                    colors={isSelected ? ['#EA580C', '#F59E0B'] : ['#FFFFFF', '#FFF7ED']}
                    style={styles.moodCardGradient}
                >
                    <Text style={[styles.moodEmoji, isSelected && styles.moodEmojiSelected]}>{emoji}</Text>
                    <Text style={[styles.moodLabel, isSelected && styles.moodLabelSelected]}>{label}</Text>
                </LinearGradient>
            </Animated.View>
        </TouchableOpacity>
    );
};

// Meditation Card Component
const MeditationCard = ({ icon, title, sessions, colors }) => {
    const scaleAnim = useRef(new Animated.Value(1)).current;

    const handlePressIn = () => {
        Animated.spring(scaleAnim, {
            toValue: 0.95,
            useNativeDriver: true,
        }).start();
    };

    const handlePressOut = () => {
        Animated.spring(scaleAnim, {
            toValue: 1,
            friction: 3,
            useNativeDriver: true,
        }).start();
    };

    return (
        <TouchableOpacity
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
            activeOpacity={0.9}
        >
            <Animated.View style={[{ transform: [{ scale: scaleAnim }] }]}>
                <LinearGradient
                    colors={colors}
                    style={styles.meditationCard}
                >
                    <View style={styles.meditationIcon}>{icon}</View>
                    <View>
                        <Text style={styles.meditationTitle}>{title}</Text>
                        <Text style={styles.meditationSessions}>{sessions}</Text>
                    </View>
                </LinearGradient>
            </Animated.View>
        </TouchableOpacity>
    );
};

// Breathing Card Component
const BreathingCard = ({ icon, title, duration, colors }) => {
    const scaleAnim = useRef(new Animated.Value(1)).current;

    const handlePressIn = () => {
        Animated.spring(scaleAnim, {
            toValue: 0.95,
            useNativeDriver: true,
        }).start();
    };

    const handlePressOut = () => {
        Animated.spring(scaleAnim, {
            toValue: 1,
            friction: 3,
            useNativeDriver: true,
        }).start();
    };

    return (
        <TouchableOpacity
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
            activeOpacity={0.9}
            style={styles.breathingCardContainer}
        >
            <Animated.View style={[{ transform: [{ scale: scaleAnim }] }]}>
                <LinearGradient colors={colors} style={styles.breathingCard}>
                    {icon}
                    <Text style={styles.breathingTitle}>{title}</Text>
                    <Text style={styles.breathingDuration}>{duration}</Text>
                </LinearGradient>
            </Animated.View>
        </TouchableOpacity>
    );
};

// Sound Card Component
const SoundCard = ({ icon, title, isPremium, colors }) => {
    const scaleAnim = useRef(new Animated.Value(1)).current;

    const handlePressIn = () => {
        Animated.spring(scaleAnim, {
            toValue: 0.95,
            useNativeDriver: true,
        }).start();
    };

    const handlePressOut = () => {
        Animated.spring(scaleAnim, {
            toValue: 1,
            friction: 3,
            useNativeDriver: true,
        }).start();
    };

    return (
        <TouchableOpacity
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
            activeOpacity={0.9}
        >
            <Animated.View style={[{ transform: [{ scale: scaleAnim }] }]}>
                <LinearGradient colors={colors} style={styles.soundCard}>
                    {isPremium && (
                        <View style={styles.premiumBadge}>
                            <Ionicons name="diamond" size={12} color="#FCD34D" />
                        </View>
                    )}
                    <View style={styles.soundIcon}>{icon}</View>
                    <Text style={styles.soundTitle}>{title}</Text>
                </LinearGradient>
            </Animated.View>
        </TouchableOpacity>
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
        fontFamily: "Lato-Bold",
        color: '#fff',
    },
    subWelcomeText: {
        fontSize: 16,
        fontFamily: "Lato-Regular",
        color: '#fff',
        marginTop: 4,
    },
    imageContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
    },
    yogaImage: {
        width: 300,
        height: 200,
        resizeMode: 'contain',
    },
    sectionContainer: {
        marginBottom: 10,
        marginTop: 10,
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 0,
    },
    sectionTitle: {
        fontSize: 20,
        fontFamily: "Lato-Bold",
        color: '#fff',
        paddingHorizontal: 10,
        marginBottom: 12,
    },
    seeAllText: {
        fontSize: 14,
        fontFamily: "Lato-Bold",
        color: '#fff',
        opacity: 0.8,
    },
    moodScroll: {
        paddingHorizontal: 10,
        gap: 12,
    },
    moodCard: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 4,
    },
    moodCardGradient: {
        paddingVertical: 16,
        paddingHorizontal: 20,
        borderRadius: 16,
        alignItems: 'center',
        minWidth: 90,
    },
    moodEmoji: {
        fontSize: 32,
        marginBottom: 8,
    },
    moodEmojiSelected: {
        transform: [{ scale: 1.1 }],
    },
    moodLabel: {
        fontSize: 14,
        fontFamily: "Lato-Bold",
        color: '#2c2c2c',
    },
    moodLabelSelected: {
        color: '#fff',
    },
    streakBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255,255,255,0.9)',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 20,
        gap: 6, marginBottom: 13
    },
    streakText: {
        fontSize: 13,
        fontFamily: "Lato-Bold",
        color: '#FF6B35',
    },
    dailyCalmCard: {
        marginHorizontal: 10,
        padding: 24,
        borderRadius: 20,
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
        fontFamily: "Lato-Bold",
        color: '#fff',
        marginBottom: 6,
    },
    dailyCalmSubtitle: {
        fontSize: 14,
        fontFamily: "Lato-Regular",
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
    meditationCard: {
        width: 160,
        height: 180,
        borderRadius: 20,
        padding: 20,
        justifyContent: 'space-between',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 12,
        elevation: 6,
    },
    meditationIcon: {
        marginBottom: 8,
    },
    meditationTitle: {
        fontSize: 18,
        color: '#2c2c2c',
        marginBottom: 4,
        fontFamily: "Lato-Bold",
    },
    meditationSessions: {
        fontSize: 13,
        color: '#666',
        fontFamily: "Lato-Regular",
    },
    breathingGrid: {
        flexDirection: 'row',
        paddingHorizontal: 10,
        gap: 12,
    },
    breathingCardContainer: {
        flex: 1,
    },
    breathingCard: {
        padding: 20,
        borderRadius: 16,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 4,
        minHeight: 140,
        justifyContent: 'center',
    },
    breathingTitle: {
        fontSize: 16,
        fontFamily: "Lato-Bold",
        color: '#2c2c2c',
        marginTop: 12,
        textAlign: 'center',
    },
    breathingDuration: {
        fontSize: 13,
        color: '#666',
        fontFamily: "Lato-Regular",
        marginTop: 4,
    },
    soundCard: {
        width: 140,
        height: 140,
        borderRadius: 16,
        padding: 16,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 4,
    },
    premiumBadge: {
        position: 'absolute',
        top: 8,
        right: 8,
        backgroundColor: '#1E3A8A',
        padding: 6,
        borderRadius: 12,
    },
    soundIcon: {
        marginBottom: 8,
    },
    soundTitle: {
        fontSize: 14,
        fontFamily: "Lato-Bold",
        color: '#2c2c2c',
        textAlign: 'center',
    },
    goalCardContainer: {
        marginHorizontal: 10,
        marginBottom: 20,
    },
    goalCard: {
        padding: 24,
        borderRadius: 20,
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
        fontFamily: "Lato-Bold",
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
        color: '#EA580C',
    },
    statLabel: {
        fontSize: 12,
        fontFamily: "Lato-Regular",
        color: '#666',
        marginTop: 4,
    },
    statDivider: {
        width: 1,
        height: 30,
        backgroundColor: '#E5E7EB',
    },
    premiumBannerContainer: {
        marginHorizontal: 10,
        marginBottom: 20,
    },
    premiumBanner: {
        padding: 24,
        borderRadius: 20,
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
        fontFamily: "Lato-Bold",
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