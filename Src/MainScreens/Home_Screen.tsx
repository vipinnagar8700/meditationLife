import { FontAwesome5, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect, useRef } from 'react';
import { Animated, Dimensions, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from './Layout/Header';

const { width } = Dimensions.get('window');

const Home_Screen = () => {
    const userName = "Sarah";
    const scrollY = useRef(new Animated.Value(0)).current;

    // Animation values
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const scaleAnim = useRef(new Animated.Value(0.9)).current;
    const rotateAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        // Initial animations
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

        // Continuous rotation animation
        Animated.loop(
            Animated.timing(rotateAnim, {
                toValue: 1,
                duration: 3000,
                useNativeDriver: true,
            })
        ).start();
    }, []);

    const headerTranslate = scrollY.interpolate({
        inputRange: [0, 100],
        outputRange: [0, -50],
        extrapolate: 'clamp',
    });

    const spin = rotateAnim.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg'],
    });

    return (
        <SafeAreaView style={styles.container} edges={['top']}>
            <LinearGradient
                colors={['#FFF5F0', '#FFF7ED', '#FFFBEB']}
                style={StyleSheet.absoluteFillObject}
            />
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
                    <Animated.View
                        style={[
                            styles.welcomeSection,
                            {
                                opacity: fadeAnim,
                                transform: [{ scale: scaleAnim }]
                            }
                        ]}
                    >
                        <LinearGradient
                            colors={['#EA580C', '#F59E0B', '#EA580C']}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 1 }}
                            style={styles.welcomeGradient}
                        >
                            <Text style={styles.welcomeTitle}>Find Your Inner Peace</Text>
                            <Text style={styles.welcomeSubtitle}>
                                Start your meditation journey today
                            </Text>
                        </LinearGradient>
                    </Animated.View>

                    {/* Daily Quote Card with 3D Effect */}
                    <Animated.View
                        style={[
                            styles.quoteCardContainer,
                            {
                                opacity: fadeAnim,
                                transform: [
                                    { perspective: 1000 },
                                    {
                                        rotateY: scrollY.interpolate({
                                            inputRange: [0, 300],
                                            outputRange: ['0deg', '5deg'],
                                            extrapolate: 'clamp',
                                        })
                                    },
                                ]
                            }
                        ]}
                    >
                        <LinearGradient
                            colors={['#FFFFFF', '#FFF7ED']}
                            style={styles.quoteCard}
                        >
                            <Animated.View
                                style={[
                                    styles.quoteIconContainer,
                                    { transform: [{ rotate: spin }] }
                                ]}
                            >
                                <Ionicons name="sparkles" size={28} color="#F59E0B" />
                            </Animated.View>
                            <Text style={styles.quoteText}>
                                "Peace comes from within. Do not seek it without."
                            </Text>
                            <LinearGradient
                                colors={['#EA580C', '#F59E0B']}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 0 }}
                                style={styles.quoteAuthorGradient}
                            >
                                <Text style={styles.quoteAuthor}>- Buddha</Text>
                            </LinearGradient>
                        </LinearGradient>
                    </Animated.View>

                    {/* Quick Stats with Gradient Cards */}
                    <Animated.View
                        style={[
                            styles.statsContainer,
                            {
                                opacity: fadeAnim,
                                transform: [{ translateY: Animated.multiply(scrollY, -0.1) }]
                            }
                        ]}
                    >
                        <StatCard
                            icon={<Ionicons name="flame" size={28} color="#EA580C" />}
                            number="12"
                            label="Day Streak"
                            colors={['#FEE2E2', '#FED7AA']}
                            numberColors={['#DC2626', '#EA580C']}
                        />
                        <StatCard
                            icon={<Ionicons name="time-outline" size={28} color="#0EA5E9" />}
                            number="45"
                            label="Minutes Today"
                            colors={['#DBEAFE', '#BAE6FD']}
                            numberColors={['#2563EB', '#0EA5E9']}
                        />
                        <StatCard
                            icon={<MaterialCommunityIcons name="target" size={28} color="#A855F7" />}
                            number="28"
                            label="Sessions"
                            colors={['#E9D5FF', '#F3E8FF']}
                            numberColors={['#9333EA', '#A855F7']}
                        />
                    </Animated.View>

                    {/* Featured Sessions */}
                    <View style={styles.sectionContainer}>
                        <View style={styles.sectionHeader}>
                            <Text style={styles.sectionTitle}>Featured Sessions</Text>
                            <TouchableOpacity>
                                <LinearGradient
                                    colors={['#EA580C', '#F59E0B']}
                                    start={{ x: 0, y: 0 }}
                                    end={{ x: 1, y: 0 }}
                                    style={styles.seeAllGradient}
                                >
                                    <Text style={styles.seeAllText}>See All →</Text>
                                </LinearGradient>
                            </TouchableOpacity>
                        </View>

                        <ScrollView
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            contentContainerStyle={styles.horizontalScroll}
                        >
                            <SessionCard
                                icon={<Ionicons name="sunny" size={36} color="#EA580C" />}
                                title="Morning Peace"
                                duration="10 min"
                                colors={['#FED7AA', '#FDBA74']}
                            />
                            <SessionCard
                                icon={<MaterialCommunityIcons name="meditation" size={36} color="#0EA5E9" />}
                                title="Stress Relief"
                                duration="15 min"
                                colors={['#BAE6FD', '#7DD3FC']}
                            />
                            <SessionCard
                                icon={<Ionicons name="moon" size={36} color="#9333EA" />}
                                title="Sleep Better"
                                duration="20 min"
                                colors={['#E9D5FF', '#D8B4FE']}
                            />
                            <SessionCard
                                icon={<MaterialCommunityIcons name="brain" size={36} color="#10B981" />}
                                title="Deep Focus"
                                duration="25 min"
                                colors={['#A7F3D0', '#6EE7B7']}
                            />
                        </ScrollView>
                    </View>

                    {/* Categories */}
                    <View style={styles.sectionContainer}>
                        <View style={styles.sectionHeader}>
                            <Text style={styles.sectionTitle}>Explore Categories</Text>
                        </View>

                        <View style={styles.categoriesGrid}>
                            <CategoryCard icon={<MaterialCommunityIcons name="yoga" size={32} color="#EA580C" />} name="Meditation" />
                            <CategoryCard icon={<Ionicons name="bed" size={32} color="#6366F1" />} name="Sleep" />
                            <CategoryCard icon={<FontAwesome5 name="dumbbell" size={28} color="#10B981" />} name="Yoga" />
                            <CategoryCard icon={<Ionicons name="musical-notes" size={32} color="#F59E0B" />} name="Music" />
                            <CategoryCard icon={<Ionicons name="leaf" size={32} color="#059669" />} name="Nature" />
                            <CategoryCard icon={<Ionicons name="heart" size={32} color="#EC4899" />} name="Wellness" />
                        </View>
                    </View>

                    {/* Today's Goal with Animated Progress */}
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
                                <Text style={styles.goalTitle}>Today's Goal</Text>
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
                            <Text style={styles.goalText}>
                                15 more minutes to reach your daily goal! 🎯
                            </Text>
                        </LinearGradient>
                    </Animated.View>

                    <View style={styles.bottomSpacing} />
                </Animated.ScrollView>
            </View>
        </SafeAreaView>
    );
};

// Stat Card Component with Animation
const StatCard = ({ icon, number, label, colors, numberColors }) => {
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
            style={{ flex: 1 }}
        >
            <Animated.View style={[{ transform: [{ scale: scaleAnim }] }]}>
                <LinearGradient
                    colors={colors}
                    style={styles.statCard}
                >
                    <View style={styles.statIcon}>{icon}</View>
                    <LinearGradient
                        colors={numberColors}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        style={styles.statNumberGradient}
                    >
                        <Text style={styles.statNumber}>{number}</Text>
                    </LinearGradient>
                    <Text style={styles.statLabel}>{label}</Text>
                </LinearGradient>
            </Animated.View>
        </TouchableOpacity>
    );
};

// Session Card Component
const SessionCard = ({ icon, title, duration, colors }) => {
    const scaleAnim = useRef(new Animated.Value(1)).current;
    const rotateAnim = useRef(new Animated.Value(0)).current;

    const handlePressIn = () => {
        Animated.parallel([
            Animated.spring(scaleAnim, {
                toValue: 0.95,
                useNativeDriver: true,
            }),
            Animated.timing(rotateAnim, {
                toValue: 1,
                duration: 200,
                useNativeDriver: true,
            }),
        ]).start();
    };

    const handlePressOut = () => {
        Animated.parallel([
            Animated.spring(scaleAnim, {
                toValue: 1,
                friction: 3,
                useNativeDriver: true,
            }),
            Animated.timing(rotateAnim, {
                toValue: 0,
                duration: 200,
                useNativeDriver: true,
            }),
        ]).start();
    };

    const rotate = rotateAnim.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '5deg'],
    });

    return (
        <TouchableOpacity
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
            activeOpacity={0.9}
        >
            <Animated.View
                style={[
                    { transform: [{ scale: scaleAnim }, { rotate }] }
                ]}
            >
                <LinearGradient
                    colors={colors}
                    style={styles.sessionCard}
                >
                    <View style={styles.sessionIcon}>{icon}</View>
                    <View>
                        <Text style={styles.sessionTitle}>{title}</Text>
                        <Text style={styles.sessionDuration}>{duration}</Text>
                    </View>
                </LinearGradient>
            </Animated.View>
        </TouchableOpacity>
    );
};

// Category Card Component
const CategoryCard = ({ icon, name }) => {
    const scaleAnim = useRef(new Animated.Value(1)).current;

    const handlePressIn = () => {
        Animated.spring(scaleAnim, {
            toValue: 0.9,
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
            style={styles.categoryCardContainer}
        >
            <Animated.View style={[{ transform: [{ scale: scaleAnim }] }]}>
                <LinearGradient
                    colors={['#FFFFFF', '#FFF7ED']}
                    style={styles.categoryCard}
                >
                    <View style={styles.categoryIcon}>{icon}</View>
                    <Text style={styles.categoryName}>{name}</Text>
                </LinearGradient>
            </Animated.View>
        </TouchableOpacity>
    );
};

export default Home_Screen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',
    },
    scrollView: {
        flex: 1,
    },
    welcomeSection: {
        marginHorizontal: 20,
        marginTop: 24,
        marginBottom: 20,
    },
    welcomeGradient: {
        padding: 24,
        borderRadius: 20,
    },
    welcomeTitle: {
        fontSize: 32,
        fontFamily: "Lato-Bold",
        color: '#FFF',
        marginBottom: 8,
        textShadowColor: 'rgba(0, 0, 0, 0.2)',
        textShadowOffset: { width: 0, height: 2 },
        textShadowRadius: 4,
    },
    welcomeSubtitle: {
        fontSize: 16,
        color: '#FFF',
        opacity: 0.95,
        fontFamily: "Lato-Regular"
    },
    quoteCardContainer: {
        marginHorizontal: 20,
        marginBottom: 20,
    },
    quoteCard: {
        padding: 24,
        borderRadius: 20,
        shadowColor: '#EA580C',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 12,
        elevation: 8,
        borderLeftWidth: 4,
        borderLeftColor: '#EA580C',
    },
    quoteIconContainer: {
        marginBottom: 12,
    },
    quoteText: {
        fontSize: 16,
        fontStyle: 'italic',
        color: '#2c2c2c',
        lineHeight: 24,
        marginBottom: 12,
        fontFamily: "Lato-Bold"
    },
    quoteAuthorGradient: {
        alignSelf: 'flex-start',
        paddingHorizontal: 12,
        paddingVertical: 4,
        borderRadius: 12,
    },
    quoteAuthor: {
        fontSize: 14,
        color: '#FFF',
        fontWeight: '700',
    },
    statsContainer: {
        flexDirection: 'row',
        paddingHorizontal: 20,
        gap: 12,
    },
    statCard: {
        flex: 1,
        padding: 16,
        borderRadius: 16,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 8,
        elevation: 6,
    },
    statIcon: {
        marginBottom: 8,
    },
    statNumberGradient: {
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: 8,
    },
    statNumber: {
        fontSize: 28,
        fontFamily: "Lato-Regular",
        color: '#FFF',
    },
    statLabel: {
        fontSize: 12,
        color: '#666',
        textAlign: 'center',
        marginTop: 4,
        fontFamily: "Lato-Regular"
    },
    sectionContainer: {
        marginBottom: 28,
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        marginBottom: 16,
    },
    sectionTitle: {
        fontSize: 18,
        fontFamily: "Lato-Bold",
        color: '#2c2c2c',
    },
    seeAllGradient: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 20,
    },
    seeAllText: {
        fontSize: 14,
        color: '#FFF',
        fontFamily: "Lato-Regular"
    },
    horizontalScroll: {
        paddingHorizontal: 20,
        gap: 16,
    },
    sessionCard: {
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
    sessionIcon: {
        marginBottom: 8,
    },
    sessionTitle: {
        fontSize: 18,
        color: '#2c2c2c',
        marginBottom: 4, fontFamily: "Lato-Regular"
    },
    sessionDuration: {
        fontSize: 14,
        color: '#666',
        fontFamily: "Lato-Bold"
    },
    categoriesGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        paddingHorizontal: 20,
        gap: 12,
    },
    categoryCardContainer: {
        width: '30%',
    },
    categoryCard: {
        aspectRatio: 1,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#EA580C',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 4,
    },
    categoryIcon: {
        marginBottom: 8,
    },
    categoryName: {
        fontSize: 13,
        fontFamily: "Lato-Bold",
        color: '#2c2c2c',
    },
    goalCardContainer: {
        marginHorizontal: 20,
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
        fontSize: 20,
        fontFamily: "Lato-Bold",
        color: '#FFF',
    },
    progressBarContainer: {
        height: 10,
        backgroundColor: '#F3F4F6',
        borderRadius: 8,
        overflow: 'hidden',
        marginBottom: 12,
    },
    progressBar: {
        height: '100%',
        borderRadius: 8,
    },
    goalText: {
        fontSize: 14,
        color: '#666',
        fontFamily: "Lato-Bold"
    },
    bottomSpacing: {
        height: 30,
    },
});