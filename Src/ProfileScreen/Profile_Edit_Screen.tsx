import { Ionicons } from '@expo/vector-icons'
import { LinearGradient } from 'expo-linear-gradient'
import React, { useState } from 'react'
import { Alert, Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'

const Profile_Edit_Screen = ({ navigation }) => {
    const [name, setName] = useState('John Doe')
    const [email, setEmail] = useState('john.doe@example.com')
    const [phone, setPhone] = useState('+1 234 567 8900')
    const [bio, setBio] = useState('Finding peace through meditation 🧘‍♂️')
    const [location, setLocation] = useState('New York, USA')

    const handleSave = () => {
        Alert.alert(
            'Profile Updated',
            'Your profile has been updated successfully!',
            [{ text: 'OK' }]
        )
    }

    const handleChangePhoto = () => {
        Alert.alert(
            'Change Photo',
            'Choose an option',
            [
                { text: 'Take Photo', onPress: () => console.log('Take Photo') },
                { text: 'Choose from Library', onPress: () => console.log('Choose from Library') },
                { text: 'Cancel', style: 'cancel' }
            ]
        )
    }

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
                <Text style={styles.headerTitle}>Edit Profile</Text>
                <TouchableOpacity
                    style={styles.saveButton}
                    onPress={handleSave}
                >
                    <Ionicons name="checkmark" size={24} color="#fff" />
                </TouchableOpacity>
            </LinearGradient>

            <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
                {/* Profile Photo Section */}
                <View style={styles.photoSection}>
                    <View style={styles.photoContainer}>
                        <Image
                            source={{ uri: 'https://i.pravatar.cc/300' }}
                            style={styles.profilePhoto}
                        />
                        <TouchableOpacity
                            style={styles.editPhotoButton}
                            onPress={handleChangePhoto}
                        >
                            <LinearGradient
                                colors={['#E8624E', '#F3A469']}
                                style={styles.editPhotoGradient}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 1 }}
                            >
                                <Ionicons name="camera" size={20} color="#fff" />
                            </LinearGradient>
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.photoHint}>Tap to change photo</Text>
                </View>

                {/* Form Section */}
                <View style={styles.formSection}>
                    {/* Name Input */}
                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Full Name</Text>
                        <View style={styles.inputContainer}>
                            <Ionicons name="person-outline" size={20} color="#E8624E" style={styles.inputIcon} />
                            <TextInput
                                style={styles.input}
                                value={name}
                                onChangeText={setName}
                                placeholder="Enter your name"
                                placeholderTextColor="#666"
                            />
                        </View>
                    </View>

                    {/* Email Input */}
                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Email Address</Text>
                        <View style={styles.inputContainer}>
                            <Ionicons name="mail-outline" size={20} color="#E8624E" style={styles.inputIcon} />
                            <TextInput
                                style={styles.input}
                                value={email}
                                onChangeText={setEmail}
                                placeholder="Enter your email"
                                placeholderTextColor="#666"
                                keyboardType="email-address"
                                autoCapitalize="none"
                            />
                        </View>
                    </View>

                    {/* Phone Input */}
                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Phone Number</Text>
                        <View style={styles.inputContainer}>
                            <Ionicons name="call-outline" size={20} color="#E8624E" style={styles.inputIcon} />
                            <TextInput
                                style={styles.input}
                                value={phone}
                                onChangeText={setPhone}
                                placeholder="Enter your phone number"
                                placeholderTextColor="#666"
                                keyboardType="phone-pad"
                            />
                        </View>
                    </View>

                    {/* Location Input */}
                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Location</Text>
                        <View style={styles.inputContainer}>
                            <Ionicons name="location-outline" size={20} color="#E8624E" style={styles.inputIcon} />
                            <TextInput
                                style={styles.input}
                                value={location}
                                onChangeText={setLocation}
                                placeholder="Enter your location"
                                placeholderTextColor="#666"
                            />
                        </View>
                    </View>

                    {/* Bio Input */}
                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Bio</Text>
                        <View style={[styles.inputContainer, styles.textAreaContainer]}>
                            <Ionicons name="text-outline" size={20} color="#E8624E" style={[styles.inputIcon, styles.textAreaIcon]} />
                            <TextInput
                                style={[styles.input, styles.textArea]}
                                value={bio}
                                onChangeText={setBio}
                                placeholder="Tell us about yourself"
                                placeholderTextColor="#666"
                                multiline
                                numberOfLines={4}
                                textAlignVertical="top"
                            />
                        </View>
                    </View>

                    {/* Statistics Card */}
                    <View style={styles.statsCard}>
                        <Text style={styles.statsTitle}>Your Meditation Journey</Text>
                        <View style={styles.statsRow}>
                            <View style={styles.statItem}>
                                <Ionicons name="flame" size={24} color="#E8624E" />
                                <Text style={styles.statNumber}>15</Text>
                                <Text style={styles.statLabel}>Day Streak</Text>
                            </View>
                            <View style={styles.statDivider} />
                            <View style={styles.statItem}>
                                <Ionicons name="time" size={24} color="#E8624E" />
                                <Text style={styles.statNumber}>420</Text>
                                <Text style={styles.statLabel}>Minutes</Text>
                            </View>
                            <View style={styles.statDivider} />
                            <View style={styles.statItem}>
                                <Ionicons name="checkmark-circle" size={24} color="#E8624E" />
                                <Text style={styles.statNumber}>32</Text>
                                <Text style={styles.statLabel}>Sessions</Text>
                            </View>
                        </View>
                    </View>
                </View>

                {/* Save Button */}
                <TouchableOpacity style={styles.saveButtonBottom} onPress={handleSave}>
                    <LinearGradient
                        colors={['#E8624E', '#F3A469']}
                        style={styles.saveGradient}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                    >
                        <Ionicons name="save-outline" size={24} color="#fff" />
                        <Text style={styles.saveButtonText}>Save Changes</Text>
                    </LinearGradient>
                </TouchableOpacity>

                <View style={styles.footer}>
                    <Text style={styles.footerText}>Your data is secure and private</Text>
                </View>
            </ScrollView>
        </View>
    )
}

export default Profile_Edit_Screen

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
    saveButton: {
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
    scrollView: {
        flex: 1,
    },
    photoSection: {
        alignItems: 'center',
        paddingVertical: 30,
    },
    photoContainer: {
        position: 'relative',
        marginBottom: 10,
    },
    profilePhoto: {
        width: 120,
        height: 120,
        borderRadius: 60,
        borderWidth: 4,
        borderColor: '#E8624E',
    },
    editPhotoButton: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        borderRadius: 20,
        overflow: 'hidden',
    },
    editPhotoGradient: {
        width: 40,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 3,
        borderColor: '#e5e5e5',
        borderRadius: 20,
    },
    photoHint: {
        fontSize: 14,
        color: '#999',
        marginTop: 5,
    },
    formSection: {
        paddingHorizontal: 20,
    },
    inputGroup: {
        marginBottom: 20,
    },
    label: {
        fontSize: 14,
        fontWeight: '600',
        color: '#F3A469',
        marginBottom: 8,
        letterSpacing: 0.5,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#1a1a1a',
        borderRadius: 16,
        borderWidth: 1,
        borderColor: '#2a2a2a',
        paddingHorizontal: 16,
    },
    inputIcon: {
        marginRight: 12,
    },
    input: {
        flex: 1,
        color: '#fff',
        fontSize: 16,
        paddingVertical: 16,
    },
    textAreaContainer: {
        alignItems: 'flex-start',
        paddingTop: 16,
    },
    textAreaIcon: {
        marginTop: 2,
    },
    textArea: {
        height: 100,
        paddingTop: 0,
    },
    statsCard: {
        backgroundColor: '#1a1a1a',
        borderRadius: 16,
        padding: 20,
        marginTop: 10,
        marginBottom: 20,
        borderWidth: 1,
        borderColor: 'rgba(232, 98, 78, 0.2)',
    },
    statsTitle: {
        fontSize: 16,
        fontWeight: '700',
        color: '#fff',
        marginBottom: 16,
        textAlign: 'center',
    },
    statsRow: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    statItem: {
        alignItems: 'center',
        flex: 1,
    },
    statNumber: {
        fontSize: 24,
        fontWeight: '700',
        color: '#fff',
        marginTop: 8,
        marginBottom: 4,
    },
    statLabel: {
        fontSize: 12,
        color: '#999',
    },
    statDivider: {
        width: 1,
        height: 50,
        backgroundColor: '#2a2a2a',
    },
    saveButtonBottom: {
        marginHorizontal: 20,
        marginTop: 10,
        marginBottom: 20,
        borderRadius: 16,
        overflow: 'hidden',
    },
    saveGradient: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 16,
        gap: 10,
    },
    saveButtonText: {
        fontSize: 18,
        fontWeight: '700',
        color: '#fff',
    },
    footer: {
        alignItems: 'center',
        paddingVertical: 30,
    },
    footerText: {
        fontSize: 14,
        color: '#666',
    },
})