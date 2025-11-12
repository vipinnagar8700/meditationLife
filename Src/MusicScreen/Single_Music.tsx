import { Ionicons } from '@expo/vector-icons';
import Slider from '@react-native-community/slider';
import { useNavigation } from '@react-navigation/native';
import { useAudioPlayer, useAudioPlayerStatus } from 'expo-audio';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect, useState } from 'react';
import { Share, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

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
        player.seekTo(value / 1000);
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

    const position = (status.currentTime || 0) * 1000;
    const duration = (status.duration || 1) * 1000;

    // Generate waveform bars
    const renderWaveform = () => {
        const bars = 30;
        const waveformBars = [];
        for (let i = 0; i < bars; i++) {
            const progress = position / duration;
            const isActive = i / bars < progress;
            const height = 20 + Math.random() * 20;
            waveformBars.push(
                <View
                    key={i}
                    style={[
                        styles.waveBar,
                        {
                            height,
                            backgroundColor: isActive ? '#F3A469' : '#d4d4d4',
                        },
                    ]}
                />
            );
        }
        return waveformBars;
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" size={26} color="#333" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setBookmarked(!bookmarked)}>
                    <Ionicons
                        name={bookmarked ? 'bookmark' : 'bookmark-outline'}
                        size={26}
                        color="#333"
                    />
                </TouchableOpacity>
            </View>

            <View style={styles.inner}>
                {/* Circular Image */}
                <View style={styles.imageContainer}>
                    <LinearGradient
                        colors={['#f5d4d4', '#d4a5a5', '#F3A469']}
                        style={styles.circularImage}
                    >
                        <View style={styles.landscape}>
                            <View style={styles.sun} />
                            <View style={styles.mountain1} />
                            <View style={styles.mountain2} />
                            <View style={styles.mountain3} />
                            <View style={styles.palmLeft} />
                            <View style={styles.palmRight} />
                        </View>
                    </LinearGradient>
                </View>

                {/* Title and Subtitle */}
                <Text style={styles.title}>Focus Attention</Text>
                <Text style={styles.subtitle}>7 DAYS OF CALM</Text>

                {/* Waveform Visualization */}
                <View style={styles.waveformContainer}>{renderWaveform()}</View>

                {/* Progress Bar */}
                <Slider
                    style={styles.slider}
                    minimumValue={0}
                    maximumValue={duration}
                    value={position}
                    onSlidingComplete={seek}
                    minimumTrackTintColor="#F3A469"
                    maximumTrackTintColor="#e0e0e0"
                    thumbTintColor="#F3A469"
                />

                {/* Music Controls */}
                <View style={styles.controls}>
                    <TouchableOpacity onPress={() => setShuffle(!shuffle)}>
                        <Ionicons
                            name="shuffle"
                            size={24}
                            color={shuffle ? '#333' : '#999'}
                        />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={handlePrevious}>
                        <Ionicons name="play-skip-back" size={32} color="#333" />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.playBtn} onPress={togglePlay}>
                        <Ionicons
                            name={status.playing ? 'pause' : 'play'}
                            size={32}
                            color="#fff"
                        />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={handleNext}>
                        <Ionicons name="play-skip-forward" size={32} color="#333" />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => setRepeat(!repeat)}>
                        <Ionicons
                            name="repeat"
                            size={24}
                            color={repeat ? '#333' : '#999'}
                        />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5e8e8',
        justifyContent: 'center',
        alignItems: 'center',
    },
    header: {
        position: 'absolute',
        top: 60,
        left: 30,
        right: 30,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    inner: {
        alignItems: 'center',
        width: '85%',
    },
    imageContainer: {
        marginBottom: 30,
    },
    circularImage: {
        width: 280,
        height: 280,
        borderRadius: 140,
        overflow: 'hidden',
        justifyContent: 'center',
        alignItems: 'center',
    },
    landscape: {
        width: '100%',
        height: '100%',
        position: 'relative',
    },
    sun: {
        position: 'absolute',
        top: 40,
        left: '50%',
        marginLeft: -35,
        width: 70,
        height: 70,
        borderRadius: 35,
        backgroundColor: '#f5d4d4',
        opacity: 0.8,
    },
    mountain1: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: 0,
        height: 0,
        backgroundColor: 'transparent',
        borderStyle: 'solid',
        borderLeftWidth: 100,
        borderRightWidth: 100,
        borderBottomWidth: 120,
        borderLeftColor: 'transparent',
        borderRightColor: 'transparent',
        borderBottomColor: '#b87a7a',
    },
    mountain2: {
        position: 'absolute',
        bottom: 0,
        left: 80,
        width: 0,
        height: 0,
        backgroundColor: 'transparent',
        borderStyle: 'solid',
        borderLeftWidth: 80,
        borderRightWidth: 80,
        borderBottomWidth: 100,
        borderLeftColor: 'transparent',
        borderRightColor: 'transparent',
        borderBottomColor: '#c28a8a',
    },
    mountain3: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        width: 0,
        height: 0,
        backgroundColor: 'transparent',
        borderStyle: 'solid',
        borderLeftWidth: 90,
        borderRightWidth: 90,
        borderBottomWidth: 110,
        borderLeftColor: 'transparent',
        borderRightColor: 'transparent',
        borderBottomColor: '#a66767',
    },
    palmLeft: {
        position: 'absolute',
        top: 60,
        left: 10,
        width: 40,
        height: 80,
        backgroundColor: '#8a5555',
        opacity: 0.5,
        borderRadius: 20,
        transform: [{ rotate: '-15deg' }],
    },
    palmRight: {
        position: 'absolute',
        top: 40,
        right: 10,
        width: 35,
        height: 90,
        backgroundColor: '#8a5555',
        opacity: 0.5,
        borderRadius: 20,
        transform: [{ rotate: '20deg' }],
    },
    title: {
        fontSize: 28,
        color: '#333',
        fontWeight: '700',
        marginBottom: 5,
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 13,
        color: '#999',
        letterSpacing: 2,
        marginBottom: 30,
        textAlign: 'center',
    },
    waveformContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        height: 50,
        marginBottom: 30,
        gap: 3,
    },
    waveBar: {
        width: 3,
        borderRadius: 2,
    },
    slider: {
        width: '100%',
        marginBottom: 30,
    },
    controls: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        paddingHorizontal: 20,
    },
    playBtn: {
        width: 70,
        height: 70,
        borderRadius: 35,
        backgroundColor: '#F3A469',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#F3A469',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 8,
    },
});