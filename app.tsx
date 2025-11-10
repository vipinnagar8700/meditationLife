// App.js - Complete Navigation Setup with Expo Vector Icons
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as Font from 'expo-font';
import { LinearGradient } from 'expo-linear-gradient';
import { useEffect } from 'react';
import { Alert, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';

import Login_Screen from './Src/Auth/Login_Screen';
import SignUp_Screen from './Src/Auth/SignUp_Screen';
import Content_Screens from './Src/ContentPages/Content_Screens';
import Home_Screen from './Src/MainScreens/Home_Screen';
import MyMusic_Screen from './Src/MainScreens/MyMusic_Screen';
import Profile_Screen from './Src/MainScreens/Profile_Screen';
import Music_Screen from './Src/MusicScreen/MusicScreen';
import Single_Music from './Src/MusicScreen/Single_Music';
import Notification_Screen from './Src/Notification/Notification_Screen';
import Onboarding_Screen from './Src/Onboarding/Onboarding_Screen';
import Question_Screen from './Src/QuestionLists/Question_Screen';
import Splash_Screen from './Src/Splash/Splash_Screen';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

// Custom Drawer Content
const CustomDrawer = ({ navigation }) => {
    const handleLogout = () => {
        console.log('Logging out...');
        navigation.navigate('Login_Screen');
    };

    const handleDeleteAccount = () => {
        Alert.alert(
            'Delete Account',
            'Are you sure you want to delete your account? This action cannot be undone.',
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'Delete',
                    style: 'destructive',
                    onPress: () => {
                        console.log('Account deletion requested');
                    }
                },
            ]
        );
    };

    return (
        <View style={styles.drawerContainer}>
            <LinearGradient
                colors={['#EA580C', '#F59E0B']}
                style={styles.drawerHeader}
            >
                <View style={styles.drawerAvatar}>
                    <Text style={styles.drawerAvatarText}>S</Text>
                </View>
                <Text style={styles.drawerUserName}>Sarah</Text>
                <Text style={styles.drawerUserEmail}>sarah@example.com</Text>
            </LinearGradient>

            <ScrollView style={styles.drawerMenu}>


                <TouchableOpacity
                    style={styles.drawerItem}
                    onPress={() => navigation.navigate('Settings')}
                >
                    <Ionicons name="settings" size={24} color="#b0a9a9ff" style={styles.drawerItemIcon} />
                    <Text style={styles.drawerItemText}>Settings</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.drawerItem}
                    onPress={() => navigation.navigate('Content', { page: 'FAQ' })}
                >
                    <Ionicons name="help-circle" size={24} color="#b0a9a9ff" style={styles.drawerItemIcon} />
                    <Text style={styles.drawerItemText}>FAQ</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.drawerItem}
                    onPress={() => navigation.navigate('Content', { page: 'PrivacyPolicy' })}
                >
                    <MaterialIcons name="privacy-tip" size={24} color="#b0a9a9ff" style={styles.drawerItemIcon} />
                    <Text style={styles.drawerItemText}>Privacy Policy</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.drawerItem}
                    onPress={() => navigation.navigate('Content', { page: 'About' })}
                >
                    <Ionicons name="information-circle" size={24} color="#b0a9a9ff" style={styles.drawerItemIcon} />
                    <Text style={styles.drawerItemText}>About</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.drawerItem}
                    onPress={() => navigation.navigate('Content', { page: 'TermsConditions' })}
                >
                    <Ionicons name="document-text" size={24} color="#b0a9a9ff" style={styles.drawerItemIcon} />
                    <Text style={styles.drawerItemText}>Terms & Conditions</Text>
                </TouchableOpacity>


                <View style={styles.drawerDivider} />

                <TouchableOpacity
                    style={[styles.drawerItem, styles.deleteAccountItem]}
                    onPress={handleDeleteAccount}
                >
                    <MaterialIcons name="delete-forever" size={24} color="#dc262697" style={styles.drawerItemIcon} />
                    <Text style={[styles.drawerItemText, styles.deleteAccountText]}>Delete Account</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.drawerItem, styles.logoutItem]}
                    onPress={handleLogout}
                >
                    <Ionicons name="log-out" size={24} color="#dc262697" style={styles.drawerItemIcon} />
                    <Text style={[styles.drawerItemText, styles.logoutText]}>Logout</Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    );
};

// Bottom Tab Navigator
const TabNavigator = () => {
    const insets = useSafeAreaInsets();

    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarStyle: {
                    height: 60 + insets.bottom,
                    paddingBottom: insets.bottom,
                    paddingTop: 8,
                    backgroundColor: '#FFF',
                    borderTopWidth: 0,
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: -4 },
                    shadowOpacity: 0.1,
                    shadowRadius: 12,
                    elevation: 20,
                },
                tabBarActiveTintColor: '#EA580C',
                tabBarInactiveTintColor: '#999',
                tabBarLabelPosition: 'below-icon',
                tabBarLabel: ({ focused, color }) => (
                    !focused ? (
                        null
                    ) : null // hide active label
                ),
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;

                    if (route.name === 'Home') {
                        iconName = focused ? 'home' : 'home-outline';
                    } else if (route.name === 'Profile') {
                        iconName = focused ? 'person' : 'person-outline';
                    } else if (route.name === 'Notifications') {
                        iconName = focused ? 'notifications' : 'notifications-outline';
                    } else if (route.name === 'MyMusic') {
                        iconName = focused ? 'musical-notes' : 'musical-notes-outline';
                    }

                    return (
                        <View
                            style={[
                                styles.tabIconContainer,
                                focused && styles.tabIconContainerActive,
                            ]}
                        >
                            {focused && (
                                <LinearGradient
                                    colors={['#EA580C', '#F59E0B']}
                                    style={StyleSheet.absoluteFillObject}
                                    start={{ x: 0, y: 0 }}
                                    end={{ x: 1, y: 1 }}
                                />
                            )}
                            <Ionicons name={iconName} size={26} color={focused ? '#FFF' : color} />
                        </View>
                    );
                },
            })}
        >
            <Tab.Screen name="Home" component={Home_Screen} />
            <Tab.Screen name="MyMusic" component={MyMusic_Screen} />
            <Tab.Screen name="Profile" component={Profile_Screen} />
        </Tab.Navigator>

    );
};

// Drawer Navigator
const DrawerNavigator = () => {
    return (
        <Drawer.Navigator
            drawerContent={(props) => <CustomDrawer {...props} />}
            screenOptions={{
                headerShown: false,
                drawerType: 'slide',
                drawerStyle: styles.drawer,
            }}
        >
            <Drawer.Screen name="MainTabs" component={TabNavigator} />
        </Drawer.Navigator>
    );
};

// Main App Navigator
export default function App() {
    // Load fonts
    useEffect(() => {
        (async () => {
            try {
                await Font.loadAsync({
                    'Lato-Thin': require('./assets/fonts/Lato-Thin.ttf'),
                    'Lato-Light': require('./assets/fonts/Lato-Light.ttf'),
                    'Lato-Regular': require('./assets/fonts/Lato-Regular.ttf'),
                    'Lato-Bold': require('./assets/fonts/Lato-Bold.ttf'),
                    'Lato-Black': require('./assets/fonts/Lato-Black.ttf'),
                });
            } catch (err) {
                console.warn('Font loading error:', err);
            }
        })();
    }, []);

    return (
        <SafeAreaProvider>
            <NavigationContainer>
                <StatusBar barStyle="dark-content" backgroundColor="#f5f5f0" />
                <Stack.Navigator
                    screenOptions={{
                        headerShown: false,
                        contentStyle: { backgroundColor: '#f5f5f0' }
                    }}
                >

                    <Stack.Screen name="Splash_Screen" component={Splash_Screen} />
                    <Stack.Screen name="Onboarding_Screen" component={Onboarding_Screen} />
                    <Stack.Screen name="Question_Screen" component={Question_Screen} />
                    <Stack.Screen name="Login_Screen" component={Login_Screen} />
                    <Stack.Screen name="SignUp_Screen" component={SignUp_Screen} />
                    <Stack.Screen name="Single_Music" component={Single_Music} />
                    <Stack.Screen name="Music_Screen" component={Music_Screen} />
                    <Stack.Screen name="Notification_Screen" component={Notification_Screen} />
                    <Stack.Screen name="Content" component={Content_Screens} />
                    <Stack.Screen name="Home_Screen" component={DrawerNavigator} />

                </Stack.Navigator>
            </NavigationContainer>
        </SafeAreaProvider>
    );
}

const styles = StyleSheet.create({
    deleteAccountItem: {
        marginTop: 8,
        backgroundColor: '#FFF5F5',
    },
    deleteAccountText: {
        color: '#dc262697',
        fontFamily: "Lato-Bold"
    },
    // Drawer
    drawer: {
        width: '80%',
    },
    drawerContainer: {
        flex: 1,
        backgroundColor: '#FFF',
    },
    drawerHeader: {
        padding: 30,
        paddingTop: 60,
        paddingBottom: 30,
    },
    drawerAvatar: {
        width: 70,
        height: 70,
        borderRadius: 35,
        backgroundColor: '#FFF',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 15,
    },
    drawerAvatarText: {
        fontSize: 30,
        fontFamily: "Lato-Bold",
        color: '#EA580C',
    },
    drawerUserName: {
        fontSize: 22,
        fontFamily: "Lato-Bold",
        color: '#FFF',
        marginBottom: 5,
    },
    drawerUserEmail: {
        fontSize: 14,
        color: '#FFF',
        opacity: 0.9,
        fontFamily: "Lato-Bold",
    },
    drawerMenu: {
        flex: 1,
        padding: 20,
    },
    drawerItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
        borderRadius: 12,
        marginBottom: 2,
    },
    drawerItemIcon: {
        marginRight: 15,
    },
    drawerItemText: {
        fontSize: 16,
        fontFamily: "Lato-Regular",
        color: '#b0a9a9ff',
    },
    drawerDivider: {
        height: 1,
        backgroundColor: '#f0f0f0',
        marginVertical: 15,
    },
    logoutItem: {
        backgroundColor: '#FFF0F0',
        marginTop: 10,
    },
    logoutText: {
        color: '#dc262697',
        fontFamily: "Lato-Bold",
    },

    // Bottom Tabs
    tabLabel: {
        fontSize: 11,
        fontWeight: '700',
        marginTop: 4,
    },
    tabIconContainer: {
        width: 40,
        height: 40,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
    },
    tabIconContainerActive: {
        shadowColor: '#EA580C',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 6,
        elevation: 6,
    },
});