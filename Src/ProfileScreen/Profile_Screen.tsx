// App.js - Complete Navigation Setup
import { FontAwesome5, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

const Profile_Screen = () => {
    return (
        <View style={styles.screenContainer}>
            <LinearGradient
                colors={['#FFF5F0', '#FFF7ED', '#FFFBEB']}
                style={StyleSheet.absoluteFillObject}
            />
            <ScrollView style={styles.profileScroll}>
                <View style={styles.profileHeader}>
                    <LinearGradient
                        colors={['#EA580C', '#F59E0B']}
                        style={styles.avatarGradient}
                    >
                        <Text style={styles.avatarText}>S</Text>
                    </LinearGradient>
                    <Text style={styles.profileName}>Sarah</Text>
                    <Text style={styles.profileEmail}>sarah@example.com</Text>
                </View>

                {/* Stats */}
                <View style={styles.statsRow}>
                    <LinearGradient colors={['#FED7AA', '#FDBA74']} style={styles.statBox}>
                        <Text style={styles.statNumber}>12</Text>
                        <Text style={styles.statLabel}>Day Streak</Text>
                    </LinearGradient>
                    <LinearGradient colors={['#BAE6FD', '#7DD3FC']} style={styles.statBox}>
                        <Text style={styles.statNumber}>28</Text>
                        <Text style={styles.statLabel}>Sessions</Text>
                    </LinearGradient>
                    <LinearGradient colors={['#E9D5FF', '#D8B4FE']} style={styles.statBox}>
                        <Text style={styles.statNumber}>450</Text>
                        <Text style={styles.statLabel}>Minutes</Text>
                    </LinearGradient>
                </View>

                {/* Personal Info */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Personal Information</Text>
                    <View style={styles.infoCard}>
                        <View style={styles.infoRow}>
                            <Ionicons name="calendar-outline" size={20} color="#EA580C" />
                            <Text style={styles.infoLabel}> Age</Text>
                            <Text style={styles.infoValue}>28 years</Text>
                        </View>
                        <View style={styles.infoRow}>
                            <MaterialCommunityIcons name="clock-outline" size={20} color="#EA580C" />
                            <Text style={styles.infoLabel}> Daily Goal</Text>
                            <Text style={styles.infoValue}>20 minutes</Text>
                        </View>
                        <View style={styles.infoRow}>
                            <FontAwesome5 name="bullseye" size={18} color="#EA580C" />
                            <Text style={styles.infoLabel}> Level</Text>
                            <Text style={styles.infoValue}>Intermediate</Text>
                        </View>
                    </View>
                </View>

                {/* Achievements */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Achievements</Text>
                    <View style={styles.achievementGrid}>
                        <View style={styles.achievement}>
                            <Ionicons name="trophy-outline" size={36} color="#F59E0B" />
                            <Text style={styles.achievementName}>7 Day Streak</Text>
                        </View>
                        <View style={styles.achievement}>
                            <FontAwesome5 name="star" size={32} color="#FBBF24" />
                            <Text style={styles.achievementName}>First Session</Text>
                        </View>
                        <View style={styles.achievement}>
                            <MaterialCommunityIcons name="medal-outline" size={36} color="#A855F7" />
                            <Text style={styles.achievementName}>25 Sessions</Text>
                        </View>
                        <View style={styles.achievement}>
                            <FontAwesome5 name="gem" size={30} color="#06B6D4" />
                            <Text style={styles.achievementName}>100 Minutes</Text>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
};

export default Profile_Screen;

const styles = StyleSheet.create({
    // Screen Containers
    screenContainer: {
        flex: 1, paddingTop: 40
    },
    profileScroll: {
        flex: 1,
        padding: 20,
    },
    notificationScroll: {
        flex: 1,
        padding: 20,
    },
    musicScroll: {
        flex: 1,
        padding: 20,
    },
    pageTitle: {
        fontSize: 32,
        fontWeight: '800',
        color: '#2c2c2c',
        marginBottom: 20,
        marginTop: 10,
    },

    // Profile Screen
    profileHeader: {
        alignItems: 'center',
        marginBottom: 30,
        marginTop: 20,
    },
    avatarGradient: {
        width: 100,
        height: 100,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 15,
        shadowColor: '#EA580C',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 8,
    },
    avatarText: {
        fontSize: 40,
        fontWeight: '800',
        color: '#FFF',
    },
    profileName: {
        fontSize: 28,
        fontFamily: "Lato-Bold",
        color: '#2c2c2c',
        marginBottom: 5,
    },
    profileEmail: {
        fontSize: 16,
        color: '#666', fontFamily: "Lato-Regular",
    },
    statsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 30,
        gap: 10,
    },
    infoRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
    },
    infoLabel: {
        flex: 1,
        fontSize: 16,
        color: '#666',
        fontFamily: "Lato-Regular",
        marginLeft: 8,
    },

    statBox: {
        flex: 1,
        padding: 20,
        borderRadius: 16,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 8,
        elevation: 6,
    },
    statNumber: {
        fontSize: 28,
        fontFamily: "Lato-Bold",
        color: '#2c2c2c',
        marginBottom: 5,
    },
    statLabel: {
        fontSize: 12,
        color: '#666',
        fontFamily: "Lato-Regular",
    },
    section: {
        marginBottom: 25,
    },
    sectionTitle: {
        fontSize: 18,
        fontFamily: "Lato-Bold",
        color: '#2c2c2c',
        marginBottom: 15,
    },
    infoCard: {
        backgroundColor: '#FFF',
        borderRadius: 16,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 4,
    },
    infoValue: {
        fontSize: 16,
        color: '#2c2c2c',
        fontFamily: "Lato-Regular",
    },
    achievementGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 12,
    },
    achievement: {
        width: '48%',
        backgroundColor: '#FFF',
        borderRadius: 16,
        padding: 20,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 4,
    },
    achievementIcon: {
        fontSize: 40,
        marginBottom: 10, fontFamily: "Lato-Regular",
    },
    achievementName: {
        fontSize: 12,
        color: '#666',
        fontFamily: "Lato-Regular",
        textAlign: 'center',
    },


});