import { Ionicons } from '@expo/vector-icons'
import { LinearGradient } from 'expo-linear-gradient'
import React, { useState } from 'react'
import { Alert, Linking, Platform, ScrollView, Share, StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native'

const Setting = ({ navigation }) => {
    const [notifications, setNotifications] = useState(true)
    const [dailyReminder, setDailyReminder] = useState(true)
    const [soundEffects, setSoundEffects] = useState(true)
    const [autoPlay, setAutoPlay] = useState(false)
    const [darkMode, setDarkMode] = useState(true)

    // App Store URLs - Replace with your actual package names
    const ANDROID_PACKAGE_NAME = 'com.meditationlife.com'
    const IOS_APP_ID = '6755106377' // Replace with your actual App Store ID

    // Rate App Function
    const handleRateApp = async () => {
        const storeUrl = Platform.select({
            ios: `https://apps.apple.com/app/id${IOS_APP_ID}?action=write-review`,
            android: `market://details?id=${ANDROID_PACKAGE_NAME}`,
        })

        const fallbackUrl = Platform.select({
            ios: `https://apps.apple.com/app/id${IOS_APP_ID}`,
            android: `https://play.google.com/store/apps/details?id=${ANDROID_PACKAGE_NAME}`,
        })

        try {
            const supported = await Linking.canOpenURL(storeUrl)
            if (supported) {
                await Linking.openURL(storeUrl)
            } else {
                await Linking.openURL(fallbackUrl)
            }
        } catch (error) {
            Alert.alert('Error', 'Unable to open store. Please try again later.')
        }
    }

    // Share App Function
    const handleShareApp = async () => {
        try {
            const shareUrl = Platform.select({
                ios: `https://apps.apple.com/app/id${IOS_APP_ID}`,
                android: `https://play.google.com/store/apps/details?id=${ANDROID_PACKAGE_NAME}`,
            })

            const result = await Share.share({
                message: `Check out Meditation Life - Find your inner peace! 🧘‍♀️\n\nRelax, Sleep Better, and Transform Your Life with Guided Meditation.\n\nDownload now: ${shareUrl}`,
                title: 'Meditation Life - Relax & Sleep',
                url: Platform.OS === 'ios' ? shareUrl : undefined,
            })

            if (result.action === Share.sharedAction) {
                // Successfully shared
                console.log('App shared successfully')
            }
        } catch (error) {
            Alert.alert('Error', 'Unable to share. Please try again.')
        }
    }

    const SettingItem = ({ icon, title, subtitle, rightComponent }) => (
        <View style={styles.settingItem}>
            <View style={styles.settingLeft}>
                <View style={styles.iconContainer}>
                    <Ionicons name={icon} size={24} color="#E8624E" />
                </View>
                <View style={styles.settingText}>
                    <Text style={styles.settingTitle}>{title}</Text>
                    {subtitle && <Text style={styles.settingSubtitle}>{subtitle}</Text>}
                </View>
            </View>
            {rightComponent}
        </View>
    )

    const SettingSection = ({ title, children }) => (
        <View style={styles.section}>
            <Text style={styles.sectionTitle}>{title}</Text>
            <View style={styles.sectionContent}>
                {children}
            </View>
        </View>
    )

    return (
        <View style={styles.container}>
            <LinearGradient
                colors={['#E8624E', '#F3A469']}
                style={styles.header}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
            >
                <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => navigation.goBack()}
                >
                    <Ionicons name="arrow-back" size={24} color="#fff" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Settings</Text>
                <View style={styles.placeholder} />
            </LinearGradient>

            <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
                {/* Notifications Section */}
                <SettingSection title="NOTIFICATIONS">
                    <SettingItem
                        icon="notifications-outline"
                        title="Push Notifications"
                        subtitle="Receive meditation reminders"
                        rightComponent={
                            <Switch
                                value={notifications}
                                onValueChange={setNotifications}
                                trackColor={{ false: '#767577', true: '#F3A469' }}
                                thumbColor={notifications ? '#E8624E' : '#f4f3f4'}
                            />
                        }
                    />
                    <View style={styles.divider} />
                    <SettingItem
                        icon="time-outline"
                        title="Daily Reminder"
                        subtitle="8:00 AM - Time to meditate"
                        rightComponent={
                            <Switch
                                value={dailyReminder}
                                onValueChange={setDailyReminder}
                                trackColor={{ false: '#767577', true: '#F3A469' }}
                                thumbColor={dailyReminder ? '#E8624E' : '#f4f3f4'}
                            />
                        }
                    />
                </SettingSection>

                {/* Audio Section */}
                <SettingSection title="AUDIO">
                    <SettingItem
                        icon="volume-high-outline"
                        title="Sound Effects"
                        subtitle="Bell sounds and transitions"
                        rightComponent={
                            <Switch
                                value={soundEffects}
                                onValueChange={setSoundEffects}
                                trackColor={{ false: '#767577', true: '#F3A469' }}
                                thumbColor={soundEffects ? '#E8624E' : '#f4f3f4'}
                            />
                        }
                    />
                    <View style={styles.divider} />
                    <SettingItem
                        icon="play-circle-outline"
                        title="Auto-play Next"
                        subtitle="Automatically play next session"
                        rightComponent={
                            <Switch
                                value={autoPlay}
                                onValueChange={setAutoPlay}
                                trackColor={{ false: '#767577', true: '#F3A469' }}
                                thumbColor={autoPlay ? '#E8624E' : '#f4f3f4'}
                            />
                        }
                    />
                </SettingSection>

                {/* Appearance Section */}
                <SettingSection title="APPEARANCE">
                    <SettingItem
                        icon="moon-outline"
                        title="Dark Mode"
                        subtitle="Use dark theme"
                        rightComponent={
                            <Switch
                                value={darkMode}
                                onValueChange={setDarkMode}
                                trackColor={{ false: '#767577', true: '#F3A469' }}
                                thumbColor={darkMode ? '#E8624E' : '#f4f3f4'}
                            />
                        }
                    />
                </SettingSection>

                {/* Account Section */}
                <SettingSection title="ACCOUNT">
                    <TouchableOpacity onPress={() => { navigation.navigate("Profile_Edit_Screen") }}>
                        <SettingItem
                            icon="person-outline"
                            title="Profile"
                            subtitle="Edit your profile information"
                            rightComponent={
                                <Ionicons name="chevron-forward" size={24} color="#999" />
                            }
                        />
                    </TouchableOpacity>
                    <View style={styles.divider} />
                    <TouchableOpacity onPress={() => { navigation.navigate("Subscription_Screen") }}>
                        <SettingItem
                            icon="card-outline"
                            title="Subscription"
                            subtitle="Manage your premium plan"
                            rightComponent={
                                <Ionicons name="chevron-forward" size={24} color="#999" />
                            }
                        />
                    </TouchableOpacity>
                </SettingSection>

                {/* Support Section */}
                <SettingSection title="SUPPORT">
                    <TouchableOpacity>
                        <SettingItem
                            icon="help-circle-outline"
                            title="Help & Support"
                            subtitle="Get help with the app"
                            rightComponent={
                                <Ionicons name="chevron-forward" size={24} color="#999" />
                            }
                        />
                    </TouchableOpacity>
                    <View style={styles.divider} />
                    <TouchableOpacity onPress={handleRateApp}>
                        <SettingItem
                            icon="star-outline"
                            title="Rate Us"
                            subtitle="Share your feedback"
                            rightComponent={
                                <Ionicons name="chevron-forward" size={24} color="#999" />
                            }
                        />
                    </TouchableOpacity>
                    <View style={styles.divider} />
                    <TouchableOpacity onPress={handleShareApp}>
                        <SettingItem
                            icon="share-social-outline"
                            title="Share App"
                            subtitle="Invite friends to meditate"
                            rightComponent={
                                <Ionicons name="chevron-forward" size={24} color="#999" />
                            }
                        />
                    </TouchableOpacity>
                </SettingSection>

                {/* About Section */}
                <SettingSection title="ABOUT">
                    <TouchableOpacity onPress={() => navigation.navigate('Content', { page: 'About' })}>
                        <SettingItem
                            icon="information-circle"
                            title="About"
                            rightComponent={
                                <Ionicons name="chevron-forward" size={24} color="#999" />
                            }
                        />
                    </TouchableOpacity>
                    <View style={styles.divider} />
                    <TouchableOpacity onPress={() => navigation.navigate('Content', { page: 'PrivacyPolicy' })}>
                        <SettingItem
                            icon="shield-checkmark-outline"
                            title="Privacy Policy"
                            rightComponent={
                                <Ionicons name="chevron-forward" size={24} color="#999" />
                            }
                        />
                    </TouchableOpacity>
                    <View style={styles.divider} />
                    <TouchableOpacity onPress={() => navigation.navigate('Content', { page: 'TermsConditions' })}>
                        <SettingItem
                            icon="document-text"
                            title="Term & Conditions"
                            rightComponent={
                                <Ionicons name="chevron-forward" size={24} color="#999" />
                            }
                        />
                    </TouchableOpacity>
                    <View style={styles.divider} />
                    <TouchableOpacity onPress={() => navigation.navigate('Content', { page: 'FAQ' })}>
                        <SettingItem
                            icon="help-circle"
                            title="FAQ"
                            rightComponent={
                                <Ionicons name="chevron-forward" size={24} color="#999" />
                            }
                        />
                    </TouchableOpacity>
                    <View style={styles.divider} />
                    <SettingItem
                        icon="information-circle-outline"
                        title="App Version"
                        rightComponent={
                            <Text style={styles.versionText}>1.0.0</Text>
                        }
                    />
                </SettingSection>

                {/* Logout Button */}
                <TouchableOpacity style={styles.logoutButton}>
                    <LinearGradient
                        colors={['#E8624E', '#F3A469']}
                        style={styles.logoutGradient}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                    >
                        <Ionicons name="log-out-outline" size={24} color="#fff" />
                        <Text style={styles.logoutText}>Logout</Text>
                    </LinearGradient>
                </TouchableOpacity>

                {/* Delete Button */}
                <TouchableOpacity style={[styles.logoutButton, { marginTop: 5 }]}>
                    <LinearGradient
                        colors={['#E8624E', '#F3A469']}
                        style={styles.logoutGradient}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                    >
                        <Ionicons name="trash-outline" size={24} color="#fff" />
                        <Text style={styles.logoutText}>Delete Account</Text>
                    </LinearGradient>
                </TouchableOpacity>

                <View style={styles.footer}>
                    <Text style={styles.footerText}>Made with ❤️ for mindfulness</Text>
                </View>
            </ScrollView>
        </View>
    )
}

export default Setting

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0a0a0a',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingTop: 50,
        paddingBottom: 20,
        paddingHorizontal: 20,
    },
    backButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: '700',
        color: '#fff',
    },
    placeholder: {
        width: 40,
    },
    scrollView: {
        flex: 1,
    },
    section: {
        marginTop: 20,
        paddingHorizontal: 20,
    },
    sectionTitle: {
        fontSize: 13,
        fontFamily: "Heading",
        color: '#F3A469',
        marginBottom: 10,
        letterSpacing: 1,
    },
    sectionContent: {
        backgroundColor: '#1a1a1a',
        borderRadius: 16,
        overflow: 'hidden',
    },
    settingItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 16,
    },
    settingLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    iconContainer: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: 'rgba(232, 98, 78, 0.1)',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 12,
    },
    settingText: {
        flex: 1,
    },
    settingTitle: {
        fontSize: 16,
        fontFamily: "lato-Bold",
        color: '#fff',
        marginBottom: 2,
    },
    settingSubtitle: {
        fontSize: 13,
        fontFamily: "lato-Regular",
        color: '#999',
    },
    divider: {
        height: 1,
        backgroundColor: '#2a2a2a',
        marginLeft: 68,
    },
    versionText: {
        fontSize: 16,
        color: '#999',
        fontFamily: "lato-Regular",
    },
    logoutButton: {
        marginHorizontal: 20,
        marginTop: 10,
        marginBottom: 5,
        borderRadius: 16,
        overflow: 'hidden',
    },
    logoutGradient: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 16,
        gap: 10,
    },
    logoutText: {
        fontSize: 18,
        fontFamily: "Heading",
        color: '#fff',
    },
    footer: {
        alignItems: 'center',
        paddingBottom: 30,
    },
    footerText: {
        fontSize: 14,
        color: '#666', fontFamily: "Heading",
    },
})