import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useAudioPlayer, useAudioPlayerStatus } from 'expo-audio';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const MyMusic_Screen = () => {
    const [currentTrack, setCurrentTrack] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const player = useAudioPlayer(currentTrack?.uri || '');
    const status = useAudioPlayerStatus(player);

    const playlists = [
        {
            id: 1,
            name: 'Morning Meditation',
            icon: <Ionicons name="sunny-outline" size={24} color="#EA580C" />,
            uri: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
            duration: '45 min'
        },
        {
            id: 2,
            name: 'Sleep Sounds',
            icon: <Ionicons name="moon-outline" size={24} color="#9333EA" />,
            uri: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
            duration: '2h 30min'
        },
        {
            id: 3,
            name: 'Nature Sounds',
            icon: <MaterialCommunityIcons name="leaf" size={24} color="#16A34A" />,
            uri: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
            duration: '1h 45min'
        }
    ];

    const playSound = async (track) => {
        try {
            setIsLoading(true);
            setCurrentTrack(track);

            // Replace the current track and play
            await player.replace(track.uri);
            player.play();

            setIsLoading(false);
        } catch (error) {
            console.log('Error playing sound:', error);
            setIsLoading(false);
        }
    };

    const togglePlayback = () => {
        if (!currentTrack) return;

        if (status.playing) {
            player.pause();
        } else {
            player.play();
        }
    };

    return (
        <View style={styles.container}>
            <LinearGradient
                colors={['#FDF6EC', '#F9E6CF', '#F7D6C2']}
                style={StyleSheet.absoluteFillObject}
            />

            <ScrollView contentContainerStyle={styles.scroll}>
                <Text style={styles.pageTitle}>My Meditation Music</Text>

                {/* Now Playing Card */}
                {currentTrack && (
                    <LinearGradient
                        colors={['#EA580C', '#F59E0B']}
                        style={styles.nowPlayingCard}
                    >
                        <Ionicons name="musical-notes" size={50} color="#FFF" />
                        <Text style={styles.nowPlayingTitle}>{currentTrack.name}</Text>

                        {isLoading ? (
                            <ActivityIndicator color="#fff" size="large" />
                        ) : (
                            <TouchableOpacity style={styles.playButton} onPress={togglePlayback}>
                                {status.playing ? (
                                    <Ionicons name="pause" size={32} color="#EA580C" />
                                ) : (
                                    <Ionicons name="play" size={32} color="#EA580C" />
                                )}
                            </TouchableOpacity>
                        )}
                    </LinearGradient>
                )}

                {/* Playlist Section */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Playlists</Text>
                    {playlists.map((item) => (
                        <TouchableOpacity key={item.id} onPress={() => playSound(item)} activeOpacity={0.7}>
                            <LinearGradient
                                colors={['#FFFFFF', '#FFF7ED']}
                                style={styles.playlistCard}
                            >
                                <View style={styles.playlistIcon}>{item.icon}</View>
                                <View style={styles.playlistInfo}>
                                    <Text style={styles.playlistName}>{item.name}</Text>
                                    <Text style={styles.playlistDetails}>{item.duration}</Text>
                                </View>
                                <Ionicons name="play-circle-outline" size={26} color="#EA580C" />
                            </LinearGradient>
                        </TouchableOpacity>
                    ))}
                </View>
            </ScrollView>
        </View>
    );
};

export default MyMusic_Screen;

const styles = StyleSheet.create({
    container: { flex: 1, paddingTop: 40 },
    scroll: { padding: 20 },
    pageTitle: { fontSize: 22, fontFamily: "Lato-Bold", color: '#2c2c2c', marginBottom: 20 },
    nowPlayingCard: {
        padding: 24,
        borderRadius: 20,
        alignItems: 'center',
        marginBottom: 30,
        shadowColor: '#EA580C',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 6,
    },
    nowPlayingTitle: { fontSize: 20, fontFamily: "Lato-Regular", color: '#fff', marginBottom: 10, marginTop: 8 },
    playButton: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: '#FFF',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
    },
    section: { marginTop: 10 },
    sectionTitle: { fontSize: 20, fontFamily: "Lato-Bold", marginBottom: 10, color: '#2c2c2c' },
    playlistCard: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        borderRadius: 16,
        marginBottom: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 4,
    },
    playlistIcon: { marginRight: 12 },
    playlistInfo: { flex: 1 },
    playlistName: { fontSize: 16, fontFamily: "Lato-Regular", color: '#2c2c2c' },
    playlistDetails: { fontSize: 13, color: '#666', fontFamily: "Lato-Regular" },
});