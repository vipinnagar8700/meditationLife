// App.js - Complete Navigation Setup with Bottom Tabs
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as Font from 'expo-font';
import { LinearGradient } from 'expo-linear-gradient';
import { useEffect } from 'react';
import { Alert, Animated, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Analytics_Screen from './Src/Analytics_Screen/Analytics_Screen';
import Login_Screen from './Src/Auth/Login_Screen';
import SignUp_Screen from './Src/Auth/SignUp_Screen';
import Content_Screens from './Src/ContentPages/Content_Screens';
import Journal_Screen from './Src/Journal_Screen/Journal_Screen';
import Home_Screen from './Src/MainScreens/Home_Screen';
import MeditationDetailScreen from './Src/Meditation/MeditationDetailScreen';
import MeditationLists from './Src/Meditation/MeditationLists';
import PlayerScreen from './Src/Meditation/PlayerScreen';
import Music_Screen from './Src/MusicScreen/MusicScreen';
import Single_Music from './Src/MusicScreen/Single_Music';
import Notification_Screen from './Src/Notification/Notification_Screen';
import Onboarding_Screen from './Src/Onboarding/Onboarding_Screen';
import Profile_Edit_Screen from './Src/ProfileScreen/Profile_Edit_Screen';
import Question_Screen from './Src/QuestionLists/Question_Screen';
import Setting from './Src/Setting/Setting';
import Splash_Screen from './Src/Splash/Splash_Screen';
import Subscription_Screen from './Src/Subscription/Subscription_Screen';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

// Placeholder screens for Analytics and Journal




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
                colors={['#F07663', '#F07663']}
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
                    onPress={() => navigation.navigate('Setting')}
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

// Bottom Tab Navigator with 4 screens
const BottomTabNavigator = () => {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarShowLabel: false,
                tabBarStyle: styles.tabBar,
                tabBarIcon: ({ focused, color, size }) => {
                    const scale = new Animated.Value(focused ? 1 : 0.85);

                    Animated.spring(scale, {
                        toValue: focused ? 1.25 : 0.9,
                        friction: 4,
                        useNativeDriver: true,
                    }).start();

                    let iconName =
                        route.name === "Home" ? (focused ? "home" : "home-outline") :
                            route.name === "Analytics" ? (focused ? "analytics" : "analytics-outline") :
                                route.name === "Journal" ? (focused ? "book" : "book-outline") :
                                    "settings-outline";

                    let activeColor = "#FF6B00"; // default active
                    let inactiveColor = "#555";

                    // Change active color ONLY for Journal
                    if (route.name === "Journal" && focused) {
                        activeColor = "#4C1D95";
                    }

                    return (
                        <Animated.View
                            style={[
                                styles.iconWrapper,
                                focused && styles.activeIcon,
                                { transform: [{ scale }] }
                            ]}
                        >
                            {focused && (
                                <LinearGradient
                                    colors={route.name === "Journal" ? ['#E9D5FF', '#C4B5FD'] : ['#FFE3CC', '#FFB480']}
                                    style={styles.gradient}
                                />
                            )}

                            <Ionicons
                                name={iconName}
                                size={28}
                                color={focused ? activeColor : inactiveColor}
                            />
                        </Animated.View>
                    );
                },
            })}
        >
            <Tab.Screen name="Home" component={Home_Screen} />
            <Tab.Screen name="Analytics" component={Analytics_Screen} />
            <Tab.Screen name="Journal" component={Journal_Screen} />
            <Tab.Screen name="Settings" component={Setting} />
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
            <Drawer.Screen name="MainTabs" component={BottomTabNavigator} />
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
                    'Heading': require('./assets/fonts/TitanOne-Regular.ttf')
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
                    <Stack.Screen name="MeditationLists" component={MeditationLists} />
                    <Stack.Screen name="MeditationDetailScreen" component={MeditationDetailScreen} />
                    <Stack.Screen name="PlayerScreen" component={PlayerScreen} />
                    <Stack.Screen name="Setting" component={Setting} />
                    <Stack.Screen name="Profile_Edit_Screen" component={Profile_Edit_Screen} />
                    <Stack.Screen name="Subscription_Screen" component={Subscription_Screen} />
                    <Stack.Screen name="Home_Screen" component={DrawerNavigator} />
                </Stack.Navigator>
            </NavigationContainer>
        </SafeAreaProvider>
    );
}

const styles = StyleSheet.create({
    // Placeholder screens
    placeholderContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5f5f0',
        padding: 20,
    },
    placeholderTitle: {
        fontSize: 28,
        fontFamily: 'Lato-Bold',
        color: '#1F2937',
        marginTop: 20,
        marginBottom: 10,
    },
    placeholderText: {
        fontSize: 16,
        fontFamily: 'Lato-Regular',
        color: '#6B7280',
        textAlign: 'center',
    },

    // Delete Account
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
        fontFamily: "Heading",
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
    tabBar: {
        height: 75,
        borderTopWidth: 0,
        backgroundColor: "#ffffff02",
        elevation: 30,
        borderRadius: 25,
        position: "absolute",
        marginHorizontal: 20,
        paddingBottom: 10,
        shadowColor: "#000",
        shadowOpacity: 0.25,
        shadowOffset: { width: 0, height: 10 },
        shadowRadius: 12,
    },

    iconWrapper: {
        width: 60,
        height: 60,
        borderRadius: 40,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#ffffff",
        shadowColor: "#000",
        shadowOpacity: 0.15,
        shadowOffset: { width: 0, height: 4 },
        shadowRadius: 8,
    },

    activeIcon: {
        elevation: 10,
        shadowOpacity: 0.35,
        transform: [{ translateY: -10 }],
    },

    gradient: {
        ...StyleSheet.absoluteFillObject,
        borderRadius: 40,
    },
});