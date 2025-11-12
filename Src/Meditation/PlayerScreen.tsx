import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect, useRef, useState } from 'react';
import {
    Animated,
    Dimensions,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

const { width, height } = Dimensions.get('window');

const PlayerScreen = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const track = route.params?.track;

    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(630); // 10:30 in seconds
    const [playbackSpeed, setPlaybackSpeed] = useState(1.0);

    // Animation values
    const pulseAnim = useRef(new Animated.Value(1)).current;
    const waveAnim1 = useRef(new Animated.Value(0)).current;
    const waveAnim2 = useRef(new Animated.Value(0)).current;
    const waveAnim3 = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        if (isPlaying) {
            startPulseAnimation();
            startWaveAnimation();
            startTimer();
        } else {
            pulseAnim.stopAnimation();
            waveAnim1.stopAnimation();
            waveAnim2.stopAnimation();
            waveAnim3.stopAnimation();
        }
    }, [isPlaying]);

    const startPulseAnimation = () => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(pulseAnim, {
                    toValue: 1.1,
                    duration: 1500,
                    useNativeDriver: true,
                }),
                Animated.timing(pulseAnim, {
                    toValue: 1,
                    duration: 1500,
                    useNativeDriver: true,
                }),
            ])
        ).start();
    };

    const startWaveAnimation = () => {
        const createWaveAnimation = (anim, delay) => {
            return Animated.loop(
                Animated.sequence([
                    Animated.delay(delay),
                    Animated.timing(anim, {
                        toValue: 1,
                        duration: 2000,
                        useNativeDriver: true,
                    }),
                    Animated.timing(anim, {
                        toValue: 0,
                        duration: 0,
                        useNativeDriver: true,
                    }),
                ])
            );
        };

        Animated.parallel([
            createWaveAnimation(waveAnim1, 0),
            createWaveAnimation(waveAnim2, 600),
            createWaveAnimation(waveAnim3, 1200),
        ]).start();
    };

    const startTimer = () => {
        const interval = setInterval(() => {
            setCurrentTime((prev) => {
                if (prev >= duration) {
                    clearInterval(interval);
                    setIsPlaying(false);
                    return duration;
                }
                return prev + 1;
            });
        }, 1000);

        return () => clearInterval(interval);
    };

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    const handlePlayPause = () => {
        setIsPlaying(!isPlaying);
    };

    const handleSkip = (seconds) => {
        setCurrentTime((prev) => Math.max(0, Math.min(duration, prev + seconds)));
    };

    const handleSpeedChange = () => {
        const speeds = [0.5, 0.75, 1.0, 1.25, 1.5, 2.0];
        const currentIndex = speeds.indexOf(playbackSpeed);
        const nextIndex = (currentIndex + 1) % speeds.length;
        setPlaybackSpeed(speeds[nextIndex]);
    };

    const progress = currentTime / duration;

    const waveScale1 = waveAnim1.interpolate({
        inputRange: [0, 1],
        outputRange: [1, 2],
    });

    const waveOpacity1 = waveAnim1.interpolate({
        inputRange: [0, 1],
        outputRange: [0.6, 0],
    });

    const waveScale2 = waveAnim2.interpolate({
        inputRange: [0, 1],
        outputRange: [1, 2],
    });

    const waveOpacity2 = waveAnim2.interpolate({
        inputRange: [0, 1],
        outputRange: [0.4, 0],
    });

    const waveScale3 = waveAnim3.interpolate({
        inputRange: [0, 1],
        outputRange: [1, 2],
    });

    const waveOpacity3 = waveAnim3.interpolate({
        inputRange: [0, 1],
        outputRange: [0.2, 0],
    });

    return (
        <LinearGradient
            colors={track?.gradient || ['#6DD5FA', '#2980B9']}
            style={styles.container}
        >
            <StatusBar barStyle="light-content" />

            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity
                    style={styles.headerButton}
                    onPress={() => navigation.goBack()}
                >
                    <Ionicons name="chevron-down" size={28} color="#fff" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Now Playing</Text>
                <TouchableOpacity style={styles.headerButton}>
                    <Ionicons name="ellipsis-horizontal" size={24} color="#fff" />
                </TouchableOpacity>
            </View>

            {/* Animated Circle with Waves */}
            <View style={styles.visualContainer}>
                <Animated.View
                    style={[
                        styles.wave,
                        {
                            transform: [{ scale: waveScale1 }],
                            opacity: waveOpacity1,
                        },
                    ]}
                />
                <Animated.View
                    style={[
                        styles.wave,
                        {
                            transform: [{ scale: waveScale2 }],
                            opacity: waveOpacity2,
                        },
                    ]}
                />
                <Animated.View
                    style={[
                        styles.wave,
                        {
                            transform: [{ scale: waveScale3 }],
                            opacity: waveOpacity3,
                        },
                    ]}
                />
                <Animated.View
                    style={[
                        styles.centerCircle,
                        {
                            transform: [{ scale: pulseAnim }],
                        },
                    ]}
                >
                    <Text style={styles.centerIcon}>{track?.icon || '🌊'}</Text>
                </Animated.View>
            </View>

            {/* Track Info */}
            <View style={styles.infoContainer}>
                <Text style={styles.trackName}>{track?.name || 'Ocean Waves Meditation'}</Text>
                <Text style={styles.instructor}>{track?.instructor || 'Sarah Mitchell'}</Text>
            </View>

            {/* Progress Bar */}
            <View style={styles.progressContainer}>
                <View style={styles.progressBar}>
                    <View style={[styles.progressFill, { width: `${progress * 100}%` }]} />
                    <View style={[styles.progressThumb, { left: `${progress * 100}%` }]} />
                </View>
                <View style={styles.timeContainer}>
                    <Text style={styles.timeText}>{formatTime(currentTime)}</Text>
                    <Text style={styles.timeText}>{formatTime(duration)}</Text>
                </View>
            </View>

            {/* Controls */}
            <View style={styles.controlsContainer}>
                <TouchableOpacity
                    style={styles.controlButton}
                    onPress={handleSpeedChange}
                >
                    <Text style={styles.speedText}>{playbackSpeed}x</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.controlButton}
                    onPress={() => handleSkip(-15)}
                >
                    <Ionicons name="play-back" size={32} color="#fff" />
                    <Text style={styles.skipText}>15</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.playButton}
                    onPress={handlePlayPause}
                >
                    <View style={styles.playButtonInner}>
                        <Ionicons
                            name={isPlaying ? 'pause' : 'play'}
                            size={40}
                            color="#2980B9"
                        />
                    </View>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.controlButton}
                    onPress={() => handleSkip(15)}
                >
                    <Ionicons name="play-forward" size={32} color="#fff" />
                    <Text style={styles.skipText}>15</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.controlButton}>
                    <Ionicons name="repeat" size={28} color="#fff" />
                </TouchableOpacity>
            </View>

            {/* Bottom Actions */}
            <View style={styles.bottomActions}>
                <TouchableOpacity style={styles.actionButton}>
                    <Ionicons name="timer-outline" size={24} color="#fff" />
                    <Text style={styles.actionText}>Timer</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.actionButton}>
                    <Ionicons name="heart-outline" size={24} color="#fff" />
                    <Text style={styles.actionText}>Save</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.actionButton}>
                    <Ionicons name="share-outline" size={24} color="#fff" />
                    <Text style={styles.actionText}>Share</Text>
                </TouchableOpacity>
            </View>
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 50,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
    headerButton: {
        width: 44,
        height: 44,
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#fff',
        opacity: 0.9,
    },
    visualContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 40,
    },
    wave: {
        position: 'absolute',
        width: 200,
        height: 200,
        borderRadius: 100,
        backgroundColor: '#fff',
    },
    centerCircle: {
        width: 200,
        height: 200,
        borderRadius: 100,
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 3,
        borderColor: 'rgba(255, 255, 255, 0.5)',
    },
    centerIcon: {
        fontSize: 80,
    },
    infoContainer: {
        alignItems: 'center',
        paddingHorizontal: 40,
        marginBottom: 40,
    },
    trackName: {
        fontSize: 24,
        fontWeight: '700',
        color: '#fff',
        textAlign: 'center',
        marginBottom: 8,
    },
    instructor: {
        fontSize: 16,
        color: 'rgba(255, 255, 255, 0.8)',
        fontWeight: '500',
    },
    progressContainer: {
        paddingHorizontal: 30,
        marginBottom: 40,
    },
    progressBar: {
        height: 4,
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
        borderRadius: 2,
        position: 'relative',
        marginBottom: 8,
    },
    progressFill: {
        height: '100%',
        backgroundColor: '#fff',
        borderRadius: 2,
    },
    progressThumb: {
        position: 'absolute',
        top: -4,
        width: 12,
        height: 12,
        borderRadius: 6,
        backgroundColor: '#fff',
        marginLeft: -6,
    },
    timeContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    timeText: {
        fontSize: 12,
        color: 'rgba(255, 255, 255, 0.8)',
        fontWeight: '500',
    },
    controlsContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
        marginBottom: 40,
        gap: 20,
    },
    controlButton: {
        width: 50,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
    },
    speedText: {
        fontSize: 16,
        fontWeight: '700',
        color: '#fff',
    },
    skipText: {
        position: 'absolute',
        bottom: 8,
        fontSize: 10,
        fontWeight: '700',
        color: '#fff',
    },
    playButton: {
        width: 80,
        height: 80,
        justifyContent: 'center',
        alignItems: 'center',
    },
    playButtonInner: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 8,
    },
    bottomActions: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingHorizontal: 40,
        paddingBottom: 40,
    },
    actionButton: {
        alignItems: 'center',
        gap: 4,
    },
    actionText: {
        fontSize: 12,
        color: 'rgba(255, 255, 255, 0.9)',
        fontWeight: '500',
    },
});

export default PlayerScreen;