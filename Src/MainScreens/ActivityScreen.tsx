import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useRef } from 'react';
import { Animated, Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width * 0.7;
const CARD_MARGIN = 15;

const ActivityScreen = () => {
    const scrollX = useRef(new Animated.Value(0)).current;

    const activities = [
        {
            id: 1,
            title: 'Yoga',
            subtitle: 'Balance & Flexibility',
            icon: 'fitness',
            duration: '30 min',
            calories: '150 kcal',
            gradient: ['#FF6B6B', '#FF8E53'],
            sessions: 12,
        },
        {
            id: 2,
            title: 'Journal',
            subtitle: 'Daily Reflections',
            icon: 'book',
            duration: '15 min',
            calories: '5 kcal',
            gradient: ['#4E65FF', '#92EFFD'],
            sessions: 24,
        },
        {
            id: 3,
            title: 'Gym',
            subtitle: 'Strength Training',
            icon: 'barbell',
            duration: '60 min',
            calories: '400 kcal',
            gradient: ['#F093FB', '#F5576C'],
            sessions: 18,
        },
        {
            id: 4,
            title: 'Meditation',
            subtitle: 'Inner Peace',
            icon: 'flower',
            duration: '20 min',
            calories: '10 kcal',
            gradient: ['#667EEA', '#764BA2'],
            sessions: 30,
        },
    ];

    return (
        <View>
            {/* Header */}
            < View style={styles.header} >
                <View>
                    <Text style={styles.headerTitle}>Activities</Text>
                    <Text style={styles.headerSubtitle}>Choose your daily routine</Text>
                </View>

            </View >

            {/* Activity Cards Carousel */}
            < View style={styles.carouselContainer} >
                <Animated.ScrollView
                    horizontal
                    pagingEnabled={false}
                    showsHorizontalScrollIndicator={false}
                    decelerationRate="fast"
                    snapToInterval={CARD_WIDTH + CARD_MARGIN * 2}
                    contentContainerStyle={styles.scrollContent}
                    onScroll={Animated.event(
                        [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                        { useNativeDriver: true }
                    )}
                    scrollEventThrottle={16}
                >
                    {activities.map((activity, index) => {
                        const inputRange = [
                            (index - 1) * (CARD_WIDTH + CARD_MARGIN * 2),
                            index * (CARD_WIDTH + CARD_MARGIN * 2),
                            (index + 1) * (CARD_WIDTH + CARD_MARGIN * 2),
                        ];

                        const scale = scrollX.interpolate({
                            inputRange,
                            outputRange: [0.9, 1, 0.9],
                            extrapolate: 'clamp',
                        });

                        const opacity = scrollX.interpolate({
                            inputRange,
                            outputRange: [0.6, 1, 0.6],
                            extrapolate: 'clamp',
                        });

                        return (
                            <Animated.View
                                key={activity.id}
                                style={[
                                    styles.cardWrapper,
                                    {
                                        transform: [{ scale }],
                                        opacity,
                                    },
                                ]}
                            >
                                <TouchableOpacity activeOpacity={0.95}>
                                    <LinearGradient
                                        colors={activity.gradient}
                                        style={styles.activityCard}
                                        start={{ x: 0, y: 0 }}
                                        end={{ x: 1, y: 1 }}
                                    >
                                        {/* Card Header */}
                                        <View style={styles.cardHeader}>
                                            <View style={styles.iconContainer}>
                                                <Ionicons name={activity.icon} size={40} color="#fff" />
                                            </View>
                                            <View style={styles.sessionBadge}>
                                                <Text style={styles.sessionText}>{activity.sessions}</Text>
                                                <Text style={styles.sessionLabel}>sessions</Text>
                                            </View>
                                        </View>

                                        {/* Card Content */}
                                        <View style={styles.cardContent}>
                                            <Text style={styles.activityTitle}>{activity.title}</Text>
                                            <Text style={styles.activitySubtitle}>{activity.subtitle}</Text>

                                            {/* Stats */}
                                            <View style={styles.statsContainer}>
                                                <View style={styles.statItem}>
                                                    <Ionicons name="time-outline" size={18} color="rgba(255,255,255,0.9)" />
                                                    <Text style={styles.statText}>{activity.duration}</Text>
                                                </View>
                                                <View style={styles.statDivider} />
                                                <View style={styles.statItem}>
                                                    <Ionicons name="flame-outline" size={18} color="rgba(255,255,255,0.9)" />
                                                    <Text style={styles.statText}>{activity.calories}</Text>
                                                </View>
                                            </View>
                                        </View>

                                        {/* Start Button */}
                                        <TouchableOpacity style={styles.startButton}>
                                            <Text style={styles.startButtonText}>Start Now</Text>
                                            <Ionicons name="arrow-forward" size={18} color="#fff" />
                                        </TouchableOpacity>

                                        {/* Decorative Circle */}
                                        <View style={styles.decorativeCircle} />
                                    </LinearGradient>
                                </TouchableOpacity>
                            </Animated.View>
                        );
                    })}
                </Animated.ScrollView>


            </View >

            {/* Quick Stats */}
            < View style={styles.quickStatsContainer} >
                <Text style={styles.quickStatsTitle}>Today's Progress</Text>
                <View style={styles.quickStatsRow}>
                    <View style={styles.quickStatCard}>
                        <LinearGradient
                            colors={['rgba(255,255,255,0.2)', 'rgba(255,255,255,0.1)']}
                            style={styles.quickStatGradient}
                        >
                            <Ionicons name="fitness" size={24} color="#fff" />
                            <Text style={styles.quickStatNumber}>2</Text>
                            <Text style={styles.quickStatLabel}>Activities</Text>
                        </LinearGradient>
                    </View>

                    <View style={styles.quickStatCard}>
                        <LinearGradient
                            colors={['rgba(255,255,255,0.2)', 'rgba(255,255,255,0.1)']}
                            style={styles.quickStatGradient}
                        >
                            <Ionicons name="time" size={24} color="#fff" />
                            <Text style={styles.quickStatNumber}>45</Text>
                            <Text style={styles.quickStatLabel}>Minutes</Text>
                        </LinearGradient>
                    </View>

                    <View style={styles.quickStatCard}>
                        <LinearGradient
                            colors={['rgba(255,255,255,0.2)', 'rgba(255,255,255,0.1)']}
                            style={styles.quickStatGradient}
                        >
                            <Ionicons name="flame" size={24} color="#fff" />
                            <Text style={styles.quickStatNumber}>320</Text>
                            <Text style={styles.quickStatLabel}>Calories</Text>
                        </LinearGradient>
                    </View>
                </View>
            </View >
        </View>

    );
};

export default ActivityScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    safeArea: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 14,
    },
    headerTitle: {
        fontSize: 20,
        fontFamily: 'Heading',
        color: '#fff',
        marginBottom: 4,
    },
    headerSubtitle: {
        fontSize: 14,
        fontFamily: 'Lato-Regular',
        color: 'rgba(255,255,255,0.8)',
    },

    carouselContainer: {
        flex: 1,
        marginTop: 10,
    },
    scrollContent: {
    },
    cardWrapper: {
        width: CARD_WIDTH,
        marginHorizontal: CARD_MARGIN,
    },
    activityCard: {
        height: 278,
        borderRadius: 10,
        padding: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.3,
        shadowRadius: 20,
        elevation: 15,
        overflow: 'hidden', marginBottom: 10
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    },
    iconContainer: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: 'rgba(255,255,255,0.25)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    sessionBadge: {
        backgroundColor: 'rgba(255,255,255,0.25)',
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 16,
        alignItems: 'center',
    },
    sessionText: {
        fontSize: 20,
        fontFamily: 'Lato-Bold',
        color: '#fff',
    },
    sessionLabel: {
        fontSize: 10,
        fontFamily: 'Lato-Regular',
        color: 'rgba(255,255,255,0.9)',
        marginTop: 2,
    },
    cardContent: {
        justifyContent: 'center', marginTop: 10
    },
    activityTitle: {
        fontSize: 32,
        fontFamily: 'Heading',
        color: '#fff',
        marginBottom: 8,
    },
    activitySubtitle: {
        fontSize: 16,
        fontFamily: 'Lato-Bold',
        color: 'rgba(255,255,255,0.9)',
        marginBottom: 10,
    },
    statsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255,255,255,0.2)',
        borderRadius: 10,
        padding: 5,
    },
    statItem: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    statDivider: {
        width: 1,
        height: 30,
        backgroundColor: 'rgba(255,255,255,0.3)',
        marginHorizontal: 12,
    },
    statText: {
        fontSize: 14,
        fontFamily: 'Lato-Bold',
        color: '#fff',
    },
    startButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(255,255,255,0.3)',
        paddingVertical: 10,
        borderRadius: 10,
        gap: 8,
        marginTop: 10,
    },
    startButtonText: {
        fontSize: 16,
        fontFamily: 'Lato-Bold',
        color: '#fff',
    },
    decorativeCircle: {
        position: 'absolute',
        width: 200,
        height: 200,
        borderRadius: 100,
        backgroundColor: 'rgba(255,255,255,0.1)',
        top: -50,
        right: -50,
    },
    paginationContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 30,
        gap: 8,
    },
    paginationDot: {
        height: 8,
        borderRadius: 4,
        backgroundColor: '#fff',
    },
    quickStatsContainer: {
        paddingHorizontal: 12,
        paddingBottom: 10,
    },
    quickStatsTitle: {
        fontSize: 20,
        fontFamily: 'Heading',
        color: '#fff',
        marginBottom: 8,
    },
    quickStatsRow: {
        flexDirection: 'row',
        gap: 12,
    },
    quickStatCard: {
        flex: 1,
    },
    quickStatGradient: {
        borderRadius: 10,
        padding: 16,
        alignItems: 'center',
    },
    quickStatNumber: {
        fontSize: 24,
        fontFamily: 'Lato-Bold',
        color: '#fff',
        marginTop: 8,
    },
    quickStatLabel: {
        fontSize: 12,
        fontFamily: 'Lato-Regular',
        color: 'rgba(255,255,255,0.9)',
        marginTop: 4,
    },
});