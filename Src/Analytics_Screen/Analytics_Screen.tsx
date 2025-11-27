import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import { Dimensions, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const { width } = Dimensions.get('window');

const Analytics_Screen = () => {
    const [selectedPeriod, setSelectedPeriod] = useState('week');

    // Sample data
    const weeklyData = [
        { label: 'Mon', value: 15 },
        { label: 'Tue', value: 25 },
        { label: 'Wed', value: 10 },
        { label: 'Thu', value: 30 },
        { label: 'Fri', value: 35 },
        { label: 'Sat', value: 20 },
        { label: 'Sun', value: 18 },
    ];

    const monthlyData = [
        { label: 'Week 1', value: 120 },
        { label: 'Week 2', value: 150 },
        { label: 'Week 3', value: 140 },
        { label: 'Week 4', value: 180 },
    ];

    const chartData = selectedPeriod === 'week' ? weeklyData : monthlyData;
    const maxValue = Math.max(...chartData.map(d => d.value));

    return (
        <View style={styles.container}>
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
            >
                {/* Header */}
                <View style={styles.header}>
                    <Text style={styles.headerTitle}>Analytics</Text>
                    <TouchableOpacity style={styles.calendarButton}>
                        <Ionicons name="calendar-outline" size={22} color="#1F2937" />
                    </TouchableOpacity>
                </View>

                {/* Main Stats Card */}
                <LinearGradient
                    colors={['#EA580C', '#F07663']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={styles.mainCard}
                >
                    <View style={styles.mainCardContent}>
                        <View style={styles.streakBadge}>
                            <Ionicons name="flame" size={20} color="#EA580C" />
                            <Text style={styles.streakText}>12 Days</Text>
                        </View>
                        <Text style={styles.mainCardTitle}>Total Minutes</Text>
                        <Text style={styles.mainCardValue}>1,840</Text>
                        <Text style={styles.mainCardSubtext}>127 sessions completed</Text>
                    </View>
                    <View style={styles.decorativeCircle} />
                    <View style={styles.decorativeCircle2} />
                </LinearGradient>

                {/* Quick Stats Grid */}
                <View style={styles.quickStats}>
                    <View style={styles.quickStatItem}>
                        <View style={styles.quickStatIcon}>
                            <Ionicons name="today-outline" size={24} color="#EA580C" />
                        </View>
                        <Text style={styles.quickStatValue}>28</Text>
                        <Text style={styles.quickStatLabel}>Best Streak</Text>
                    </View>
                    <View style={styles.quickStatItem}>
                        <View style={styles.quickStatIcon}>
                            <Ionicons name="time-outline" size={24} color="#EA580C" />
                        </View>
                        <Text style={styles.quickStatValue}>14.5</Text>
                        <Text style={styles.quickStatLabel}>Avg Minutes</Text>
                    </View>
                    <View style={styles.quickStatItem}>
                        <View style={styles.quickStatIcon}>
                            <MaterialCommunityIcons name="meditation" size={24} color="#EA580C" />
                        </View>
                        <Text style={styles.quickStatValue}>85%</Text>
                        <Text style={styles.quickStatLabel}>Goal Rate</Text>
                    </View>
                </View>

                {/* Chart Section */}
                <View style={styles.chartSection}>
                    <View style={styles.chartHeader}>
                        <Text style={styles.chartTitle}>Activity</Text>
                        <View style={styles.filterButtons}>
                            <TouchableOpacity
                                style={[styles.filterButton, selectedPeriod === 'week' && styles.filterButtonActive]}
                                onPress={() => setSelectedPeriod('week')}
                            >
                                <Text style={[styles.filterText, selectedPeriod === 'week' && styles.filterTextActive]}>
                                    Week
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.filterButton, selectedPeriod === 'month' && styles.filterButtonActive]}
                                onPress={() => setSelectedPeriod('month')}
                            >
                                <Text style={[styles.filterText, selectedPeriod === 'month' && styles.filterTextActive]}>
                                    Month
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={styles.chart}>
                        {chartData.map((item, index) => (
                            <View key={index} style={styles.chartBar}>
                                <View style={styles.barContainer}>
                                    <View style={styles.barBackground}>
                                        <LinearGradient
                                            colors={['#F07663', '#EA580C']}
                                            style={[styles.barFill, { height: `${(item.value / maxValue) * 100}%` }]}
                                        />
                                    </View>
                                </View>
                                <Text style={styles.barLabel}>{item.label}</Text>
                            </View>
                        ))}
                    </View>
                </View>

                {/* Progress Section */}
                <View style={styles.progressSection}>
                    <View style={styles.progressHeader}>
                        <Text style={styles.progressTitle}>Weekly Goal</Text>
                        <Text style={styles.progressValue}>85/100 min</Text>
                    </View>
                    <View style={styles.progressBar}>
                        <LinearGradient
                            colors={['#F07663', '#EA580C']}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}
                            style={[styles.progressFill, { width: '85%' }]}
                        />
                    </View>
                    <Text style={styles.progressLabel}>15 minutes remaining</Text>
                </View>

                {/* Achievements */}
                <View style={styles.achievementsSection}>
                    <Text style={styles.sectionTitle}>Recent Achievements</Text>

                    <View style={styles.achievementCard}>
                        <LinearGradient
                            colors={['#FFF5F0', '#FFE8DD']}
                            style={styles.achievementIconBg}
                        >
                            <Ionicons name="trophy" size={28} color="#EA580C" />
                        </LinearGradient>
                        <View style={styles.achievementInfo}>
                            <Text style={styles.achievementTitle}>Century Club</Text>
                            <Text style={styles.achievementDesc}>100 sessions completed!</Text>
                        </View>
                        <View style={styles.achievementBadge}>
                            <Ionicons name="checkmark" size={16} color="#FFF" />
                        </View>
                    </View>

                    <View style={styles.achievementCard}>
                        <LinearGradient
                            colors={['#FFF5F0', '#FFE8DD']}
                            style={styles.achievementIconBg}
                        >
                            <Ionicons name="flame" size={28} color="#EA580C" />
                        </LinearGradient>
                        <View style={styles.achievementInfo}>
                            <Text style={styles.achievementTitle}>Week Warrior</Text>
                            <Text style={styles.achievementDesc}>7 day streak achieved</Text>
                        </View>
                        <View style={styles.achievementBadge}>
                            <Ionicons name="checkmark" size={16} color="#FFF" />
                        </View>
                    </View>

                    <View style={[styles.achievementCard, styles.achievementLocked]}>
                        <View style={styles.achievementIconBgLocked}>
                            <Ionicons name="star" size={28} color="#9CA3AF" />
                        </View>
                        <View style={styles.achievementInfo}>
                            <Text style={styles.achievementTitleLocked}>Zen Master</Text>
                            <Text style={styles.achievementDesc}>Complete 500 sessions</Text>
                        </View>
                        <Ionicons name="lock-closed" size={20} color="#D1D5DB" />
                    </View>
                </View>

                <View style={{ height: 100 }} />
            </ScrollView>
        </View>
    );
};

export default Analytics_Screen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FAFAFA',
    },
    scrollContent: {
        paddingBottom: 20,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingTop: 60,
        paddingBottom: 20,
    },
    headerTitle: {
        fontSize: 32,
        fontFamily: 'Heading',
        color: '#1F2937',
    },
    calendarButton: {
        width: 44,
        height: 44,
        borderRadius: 12,
        backgroundColor: '#FFF',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 8,
        elevation: 3,
    },
    mainCard: {
        marginHorizontal: 20,
        borderRadius: 24,
        padding: 24,
        marginBottom: 20,
        overflow: 'hidden',
        shadowColor: '#EA580C',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.25,
        shadowRadius: 16,
        elevation: 8,
    },
    mainCardContent: {
        zIndex: 1,
    },
    streakBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFF',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 20,
        alignSelf: 'flex-start',
        marginBottom: 12,
    },
    streakText: {
        fontSize: 13,
        fontFamily: 'Lato-Bold',
        color: '#EA580C',
        marginLeft: 6,
    },
    mainCardTitle: {
        fontSize: 15,
        fontFamily: 'Lato-Regular',
        color: '#FFF',
        opacity: 0.9,
        marginBottom: 4,
    },
    mainCardValue: {
        fontSize: 48,
        fontFamily: 'Heading',
        color: '#FFF',
        marginBottom: 4,
    },
    mainCardSubtext: {
        fontSize: 14,
        fontFamily: 'Lato-Regular',
        color: '#FFF',
        opacity: 0.85,
    },
    decorativeCircle: {
        position: 'absolute',
        width: 150,
        height: 150,
        borderRadius: 75,
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        top: -40,
        right: -40,
    },
    decorativeCircle2: {
        position: 'absolute',
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: 'rgba(255, 255, 255, 0.08)',
        bottom: -30,
        left: -20,
    },
    quickStats: {
        flexDirection: 'row',
        paddingHorizontal: 20,
        marginBottom: 20,
        gap: 12,
    },
    quickStatItem: {
        flex: 1,
        backgroundColor: '#FFF',
        borderRadius: 16,
        padding: 16,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 2,
    },
    quickStatIcon: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: '#FFF5F0',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 8,
    },
    quickStatValue: {
        fontSize: 22,
        fontFamily: 'Lato-Bold',
        color: '#1F2937',
        marginBottom: 2,
    },
    quickStatLabel: {
        fontSize: 11,
        fontFamily: 'Lato-Regular',
        color: '#6B7280',
        textAlign: 'center',
    },
    chartSection: {
        backgroundColor: '#FFF',
        marginHorizontal: 20,
        borderRadius: 20,
        padding: 20,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 2,
    },
    chartHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 24,
    },
    chartTitle: {
        fontSize: 18,
        fontFamily: 'Heading',
        color: '#1F2937',
    },
    filterButtons: {
        flexDirection: 'row',
        backgroundColor: '#F3F4F6',
        borderRadius: 10,
        padding: 3,
    },
    filterButton: {
        paddingHorizontal: 16,
        paddingVertical: 6,
        borderRadius: 8,
    },
    filterButtonActive: {
        backgroundColor: '#FFF',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 2,
    },
    filterText: {
        fontSize: 13,
        fontFamily: 'Lato-Regular',
        color: '#6B7280',
    },
    filterTextActive: {
        fontFamily: 'Lato-Bold',
        color: '#EA580C',
    },
    chart: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        height: 180,
    },
    chartBar: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    barContainer: {
        width: '100%',
        height: 140,
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginBottom: 8,
    },
    barBackground: {
        width: '70%',
        height: '100%',
        backgroundColor: '#F3F4F6',
        borderRadius: 8,
        overflow: 'hidden',
        justifyContent: 'flex-end',
    },
    barFill: {
        width: '100%',
        borderRadius: 8,
        minHeight: 4,
    },
    barLabel: {
        fontSize: 11,
        fontFamily: 'Lato-Regular',
        color: '#9CA3AF',
        marginTop: 4,
    },
    progressSection: {
        backgroundColor: '#FFF',
        marginHorizontal: 20,
        borderRadius: 20,
        padding: 20,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 2,
    },
    progressHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
    },
    progressTitle: {
        fontSize: 18,
        fontFamily: 'Heading',
        color: '#1F2937',
    },
    progressValue: {
        fontSize: 16,
        fontFamily: 'Lato-Bold',
        color: '#EA580C',
    },
    progressBar: {
        height: 10,
        backgroundColor: '#F3F4F6',
        borderRadius: 5,
        overflow: 'hidden',
        marginBottom: 8,
    },
    progressFill: {
        height: '100%',
        borderRadius: 5,
    },
    progressLabel: {
        fontSize: 13,
        fontFamily: 'Lato-Regular',
        color: '#6B7280',
    },
    achievementsSection: {
        paddingHorizontal: 20,
    },
    sectionTitle: {
        fontSize: 18,
        fontFamily: 'Heading',
        color: '#1F2937',
        marginBottom: 16,
    },
    achievementCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFF',
        borderRadius: 16,
        padding: 16,
        marginBottom: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 2,
    },
    achievementLocked: {
        opacity: 0.6,
    },
    achievementIconBg: {
        width: 56,
        height: 56,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
    },
    achievementIconBgLocked: {
        width: 56,
        height: 56,
        borderRadius: 16,
        backgroundColor: '#F3F4F6',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
    },
    achievementInfo: {
        flex: 1,
    },
    achievementTitle: {
        fontSize: 16,
        fontFamily: 'Lato-Bold',
        color: '#1F2937',
        marginBottom: 2,
    },
    achievementTitleLocked: {
        fontSize: 16,
        fontFamily: 'Lato-Bold',
        color: '#9CA3AF',
        marginBottom: 2,
    },
    achievementDesc: {
        fontSize: 13,
        fontFamily: 'Lato-Regular',
        color: '#6B7280',
    },
    achievementBadge: {
        width: 24,
        height: 24,
        borderRadius: 12,
        backgroundColor: '#10B981',
        justifyContent: 'center',
        alignItems: 'center',
    },
});