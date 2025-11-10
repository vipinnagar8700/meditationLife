import { Ionicons } from '@expo/vector-icons';
import Slider from '@react-native-community/slider';
import { useNavigation } from '@react-navigation/native';
import { useAudioPlayer, useAudioPlayerStatus } from 'expo-audio';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Share, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function Single_Music({ route }) {
    const { track, playlist = [] } = route.params;
    const navigation = useNavigation();
    const player = useAudioPlayer(track.uri);
    const status = useAudioPlayerStatus(player);

    const [loading, setLoading] = useState(false);
    const [repeat, setRepeat] = useState(false);
    const [shuffle, setShuffle] = useState(false);
    const [bookmarked, setBookmarked] = useState(false);
    const [currentTrackIndex, setCurrentTrackIndex] = useState(
        playlist.findIndex((item) => item.id === track.id)
    );

    const currentTrack = playlist[currentTrackIndex] || track;

    useEffect(() => {
        player.replace(currentTrack.uri);
        player.play();
    }, [currentTrackIndex]);

    useEffect(() => {
        if (status.playing === false && status.currentTime >= status.duration && status.duration > 0) {
            if (repeat) {
                player.seekTo(0);
                player.play();
            } else {
                handleNext();
            }
        }
    }, [status.playing, status.currentTime, status.duration]);

    const togglePlay = () => {
        if (status.playing) {
            player.pause();
        } else {
            player.play();
        }
    };

    const seek = (value) => {
        player.seekTo(value / 1000); // expo-audio uses seconds
    };

    const handleNext = () => {
        if (shuffle) {
            const randomIndex = Math.floor(Math.random() * playlist.length);
            setCurrentTrackIndex(randomIndex);
        } else {
            const nextIndex = (currentTrackIndex + 1) % playlist.length;
            setCurrentTrackIndex(nextIndex);
        }
    };

    const handlePrevious = () => {
        const prevIndex =
            currentTrackIndex === 0 ? playlist.length - 1 : currentTrackIndex - 1;
        setCurrentTrackIndex(prevIndex);
    };

    const handleShare = async () => {
        try {
            await Share.share({
                message: `🎧 Listen to "${currentTrack.name}" meditation track — ${currentTrack.uri}`,
            });
        } catch (error) {
            console.log('Share error:', error);
        }
    };

    const position = (status.currentTime || 0) * 1000; // Convert to milliseconds for slider
    const duration = (status.duration || 1) * 1000;

    return (
        <LinearGradient colors={['#8360c3', '#2ebf91']} style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" size={26} color="#fff" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setBookmarked(!bookmarked)}>
                    <Ionicons
                        name={bookmarked ? 'bookmark' : 'bookmark-outline'}
                        size={26}
                        color="#fff"
                    />
                </TouchableOpacity>
            </View>

            <View style={styles.inner}>
                <Text style={styles.icon}>{currentTrack.icon}</Text>
                <Text style={styles.title}>{currentTrack.name}</Text>
                <Text style={styles.time}>{currentTrack.duration}</Text>

                {loading ? (
                    <ActivityIndicator size="large" color="#fff" />
                ) : (
                    <>
                        <Slider
                            style={styles.slider}
                            minimumValue={0}
                            maximumValue={duration}
                            value={position}
                            onSlidingComplete={seek}
                            minimumTrackTintColor="#fff"
                            maximumTrackTintColor="rgba(255,255,255,0.3)"
                            thumbTintColor="#fff"
                        />

                        {/* Music Controls */}
                        <View style={styles.controls}>
                            <TouchableOpacity onPress={handlePrevious}>
                                <Ionicons name="play-skip-back" size={36} color="#fff" />
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.playBtn} onPress={togglePlay}>
                                <Ionicons
                                    name={status.playing ? 'pause' : 'play'}
                                    size={40}
                                    color="#fff"
                                />
                            </TouchableOpacity>

                            <TouchableOpacity onPress={handleNext}>
                                <Ionicons name="play-skip-forward" size={36} color="#fff" />
                            </TouchableOpacity>
                        </View>

                        {/* Extra Controls */}
                        <View style={styles.bottomControls}>
                            <TouchableOpacity onPress={() => setShuffle(!shuffle)}>
                                <Ionicons
                                    name="shuffle"
                                    size={26}
                                    color={shuffle ? '#fff' : 'rgba(255,255,255,0.6)'}
                                />
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => setRepeat(!repeat)}>
                                <Ionicons
                                    name="repeat"
                                    size={26}
                                    color={repeat ? '#fff' : 'rgba(255,255,255,0.6)'}
                                />
                            </TouchableOpacity>

                            <TouchableOpacity onPress={handleShare}>
                                <Ionicons name="share-social" size={26} color="#fff" />
                            </TouchableOpacity>
                        </View>
                    </>
                )}
            </View>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    header: {
        position: 'absolute',
        top: 60,
        left: 30,
        right: 30,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    inner: { alignItems: 'center', width: '80%' },
    icon: { fontSize: 80, marginBottom: 20 },
    title: { fontSize: 24, color: '#fff', fontWeight: '700', marginBottom: 5, textAlign: 'center' },
    time: { fontSize: 16, color: 'rgba(255,255,255,0.8)', marginBottom: 30 },
    slider: { width: '100%', marginBottom: 30 },
    controls: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        width: '100%',
        marginBottom: 20,
    },
    playBtn: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: 'rgba(255,255,255,0.2)',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#fff',
    },
    bottomControls: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '60%',
        marginTop: 10,
    },
});