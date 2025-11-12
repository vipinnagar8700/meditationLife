import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const Notification_Screen = ({ navigation }) => {
    const [activeTab, setActiveTab] = useState('unread');

    const notifications = {
        unread: [
            { id: 1, title: 'Welcome to the App', message: 'Thank you for joining our platform!' },
            { id: 2, title: 'Special Offer', message: 'Get 30% off on your next purchase.' },
        ],
        read: [
            { id: 3, title: 'System Update', message: 'The app has been updated successfully.' },
            { id: 4, title: 'Reminder', message: 'Your subscription expires in 3 days.' },
        ],
    };

    return (
        <View style={styles.container}>
            <LinearGradient colors={['#E8624E', '#F3A469']}
                style={styles.header}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}>
                <TouchableOpacity
                    onPress={() => navigation?.goBack()}
                    style={styles.backButton}
                >
                    <Ionicons name="arrow-back" size={24} color="#fff" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Notifications</Text>
                <View style={{ width: 24 }} />
            </LinearGradient>

            <View style={styles.tabContainer}>
                <TouchableOpacity
                    style={[styles.tabButton, activeTab === 'unread' && styles.activeTab]}
                    onPress={() => setActiveTab('unread')}
                >
                    <Text style={[styles.tabText, activeTab === 'unread' && styles.activeTabText]}>
                        Unread
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.tabButton, activeTab === 'read' && styles.activeTab]}
                    onPress={() => setActiveTab('read')}
                >
                    <Text style={[styles.tabText, activeTab === 'read' && styles.activeTabText]}>
                        Read
                    </Text>
                </TouchableOpacity>
            </View>

            <ScrollView contentContainerStyle={styles.scroll}>
                {notifications[activeTab]?.length > 0 ? (
                    notifications[activeTab].map((item) => (
                        <View key={item.id} style={styles.notificationCard}>
                            <Ionicons
                                name={activeTab === 'read' ? 'notifications-outline' : 'notifications'}
                                size={24}
                                color={activeTab === 'read' ? '#999' : '#f59f0bf4'}
                                style={{ marginRight: 10 }}
                            />
                            <View style={{ flex: 1 }}>
                                <Text style={styles.notificationTitle}>{item.title}</Text>
                                <Text style={styles.notificationMessage}>{item.message}</Text>
                            </View>
                        </View>
                    ))
                ) : (
                    <Text style={styles.noNotificationText}>No notifications</Text>
                )}
            </ScrollView>
        </View>
    );
};

export default Notification_Screen;

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#FFF' },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingTop: 50,
        paddingHorizontal: 10,
        paddingBottom: 16,
        elevation: 4,
        shadowColor: '#EA580C',
    },
    backButton: { padding: 6, borderRadius: 20 },
    headerTitle: { fontSize: 20, color: '#fff', fontFamily: 'Lato-Bold' },
    tabContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 10,
        backgroundColor: '#FFF7ED',
        borderRadius: 12,
        marginHorizontal: 20,
        padding: 5,
    },
    tabButton: { flex: 1, alignItems: 'center', paddingVertical: 10, borderRadius: 10 },
    activeTab: { backgroundColor: '#F3A469' },
    tabText: { fontSize: 16, color: '#444', fontFamily: 'Lato-Regular' },
    activeTabText: { color: '#FFF', fontFamily: 'Lato-Bold' },
    scroll: { padding: 20 },
    notificationCard: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        backgroundColor: '#FFF7ED',
        padding: 14,
        borderRadius: 12,
        marginBottom: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    notificationTitle: { fontSize: 16, fontFamily: 'Lato-Regular', color: '#222' },
    notificationMessage: { fontSize: 14, color: '#555', marginTop: 4, fontFamily: 'Lato-Regular' },
    noNotificationText: { fontSize: 16, color: '#888', textAlign: 'center', marginTop: 20, fontFamily: 'Lato-Regular' },
});
