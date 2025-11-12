import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { ResizeMode, Video } from 'expo-av';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useRef, useState } from 'react';
import {
    Dimensions,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';

const { width } = Dimensions.get('window');

const MeditationDetailScreen = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const [isFavorite, setIsFavorite] = useState(false);
    const [isVideoPlaying, setIsVideoPlaying] = useState(false);
    const [showVideoPlayer, setShowVideoPlayer] = useState(false);
    const videoRef = useRef(null);

    // Sample meditation detail data
    const meditationDetail = {
        id: '1',
        name: 'Ocean Waves Meditation',
        duration: '10:30',
        category: 'Nature Sounds',
        icon: '🌊',
        gradient: ['#6DD5FA', '#2980B9'],
        description: 'Immerse yourself in the calming sounds of ocean waves. This guided meditation will help you relax, reduce stress, and find inner peace through the rhythmic sounds of the sea.',
        instructor: 'Sarah Mitchell',
        level: 'Beginner',
        benefits: [
            'Reduces stress and anxiety',
            'Improves sleep quality',
            'Enhances focus and concentration',
            'Promotes emotional balance',
            'Lowers blood pressure'
        ],
        image: 'https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=800',
        videoThumbnail: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800',
        // Add actual video URL here
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
        steps: [
            {
                step: 1,
                title: 'Find Your Space',
                description: 'Choose a quiet, comfortable place where you won\'t be disturbed. Sit or lie down in a relaxed position.',
                duration: '1 min'
            },
            {
                step: 2,
                title: 'Close Your Eyes',
                description: 'Gently close your eyes and take three deep breaths. Feel your body starting to relax with each exhale.',
                duration: '2 min'
            },
            {
                step: 3,
                title: 'Listen to the Waves',
                description: 'Focus on the sound of ocean waves. Let the rhythmic sounds wash over you, releasing any tension.',
                duration: '5 min'
            },
            {
                step: 4,
                title: 'Body Scan',
                description: 'Slowly scan your body from head to toe, releasing any remaining tension you find.',
                duration: '2 min'
            },
            {
                step: 5,
                title: 'Return Slowly',
                description: 'Gradually bring your awareness back. Wiggle your fingers and toes, then slowly open your eyes.',
                duration: '30 sec'
            }
        ],
        reviews: {
            rating: 4.8,
            count: 1234
        }
    };

    const handlePlayPress = () => {
        navigation.navigate('PlayerScreen', {
            track: meditationDetail,
        });
    };

    const handleBackPress = () => {
        navigation.goBack();
    };

    const handleVideoPress = async () => {
        if (!showVideoPlayer) {
            setShowVideoPlayer(true);
            setTimeout(async () => {
                if (videoRef.current) {
                    await videoRef.current.playAsync();
                    setIsVideoPlaying(true);
                }
            }, 100);
        } else {
            if (isVideoPlaying) {
                await videoRef.current.pauseAsync();
                setIsVideoPlaying(false);
            } else {
                await videoRef.current.playAsync();
                setIsVideoPlaying(true);
            }
        }
    };

    return (
        <View style={styles.container}>
            {/* Header with Image */}
            <View style={styles.headerImageContainer}>
                <Image
                    source={{ uri: meditationDetail.image }}
                    style={styles.headerImage}
                    resizeMode="cover"
                />
                <LinearGradient
                    colors={['transparent', 'rgba(0,0,0,0.8)']}
                    style={styles.headerGradient}
                />

                {/* Back Button */}
                <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
                    <Ionicons name="arrow-back" size={24} color="#fff" />
                </TouchableOpacity>

                {/* Favorite Button */}
                <TouchableOpacity
                    style={styles.favoriteButton}
                    onPress={() => setIsFavorite(!isFavorite)}
                >
                    <Ionicons
                        name={isFavorite ? "heart" : "heart-outline"}
                        size={24}
                        color={isFavorite ? "#FF6B6B" : "#fff"}
                    />
                </TouchableOpacity>
            </View>

            <ScrollView
                style={styles.scrollView}
                showsVerticalScrollIndicator={false}
            >
                {/* Title Section */}
                <View style={styles.titleSection}>
                    <View style={styles.titleRow}>
                        <Text style={styles.icon}>{meditationDetail.icon}</Text>
                        <View style={styles.titleTextContainer}>
                            <Text style={styles.title}>{meditationDetail.name}</Text>
                            <View style={styles.metaRow}>
                                <View style={styles.metaItem}>
                                    <Ionicons name="time-outline" size={16} color="#718096" />
                                    <Text style={styles.metaText}>{meditationDetail.duration}</Text>
                                </View>
                                <View style={styles.metaItem}>
                                    <Ionicons name="person-outline" size={16} color="#718096" />
                                    <Text style={styles.metaText}>{meditationDetail.instructor}</Text>
                                </View>
                            </View>
                        </View>
                    </View>

                    {/* Rating */}
                    <View style={styles.ratingContainer}>
                        <Ionicons name="star" size={18} color="#F59E0B" />
                        <Text style={styles.ratingText}>{meditationDetail.reviews.rating}</Text>
                        <Text style={styles.reviewCount}>({meditationDetail.reviews.count} reviews)</Text>
                    </View>
                </View>

                {/* Category and Level */}
                <View style={styles.tagsContainer}>
                    <View style={styles.tag}>
                        <Text style={styles.tagText}>{meditationDetail.category}</Text>
                    </View>
                    <View style={[styles.tag, styles.tagLevel]}>
                        <Text style={styles.tagText}>{meditationDetail.level}</Text>
                    </View>
                </View>

                {/* Description */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>About This Meditation</Text>
                    <Text style={styles.description}>{meditationDetail.description}</Text>
                </View>

                {/* Video Preview */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Video Guide</Text>
                    <TouchableOpacity
                        style={styles.videoContainer}
                        onPress={handleVideoPress}
                        activeOpacity={0.9}
                    >
                        {!showVideoPlayer ? (
                            <>
                                <Image
                                    source={{ uri: meditationDetail.videoThumbnail }}
                                    style={styles.videoThumbnail}
                                    resizeMode="cover"
                                />
                                <View style={styles.playButtonOverlay}>
                                    <View style={styles.playButton}>
                                        <Ionicons name="play" size={32} color="#2980B9" />
                                    </View>
                                </View>
                            </>
                        ) : (
                            <Video
                                ref={videoRef}
                                source={{ uri: meditationDetail.videoUrl }}
                                style={styles.video}
                                resizeMode={ResizeMode.CONTAIN}
                                useNativeControls
                                onPlaybackStatusUpdate={(status) => {
                                    if (status.isLoaded) {
                                        setIsVideoPlaying(status.isPlaying);
                                    }
                                }}
                            />
                        )}
                        <View style={styles.videoDuration}>
                            <Ionicons name="videocam" size={14} color="#fff" />
                            <Text style={styles.videoDurationText}>{meditationDetail.duration}</Text>
                        </View>
                    </TouchableOpacity>
                </View>

                {/* Benefits */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Benefits</Text>
                    {meditationDetail.benefits.map((benefit, index) => (
                        <View key={index} style={styles.benefitItem}>
                            <View style={styles.benefitIcon}>
                                <Ionicons name="checkmark-circle" size={20} color="#10B981" />
                            </View>
                            <Text style={styles.benefitText}>{benefit}</Text>
                        </View>
                    ))}
                </View>

                {/* Steps */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Meditation Steps</Text>
                    {meditationDetail.steps.map((item, index) => (
                        <View key={index} style={styles.stepCard}>
                            <View style={styles.stepHeader}>
                                <View style={styles.stepNumber}>
                                    <Text style={styles.stepNumberText}>{item.step}</Text>
                                </View>
                                <View style={styles.stepContent}>
                                    <Text style={styles.stepTitle}>{item.title}</Text>
                                    <View style={styles.stepDuration}>
                                        <Ionicons name="time-outline" size={14} color="#718096" />
                                        <Text style={styles.stepDurationText}>{item.duration}</Text>
                                    </View>
                                </View>
                            </View>
                            <Text style={styles.stepDescription}>{item.description}</Text>
                        </View>
                    ))}
                </View>

                {/* Similar Meditations */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>You Might Also Like</Text>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                        {[1, 2, 3].map((item) => (
                            <TouchableOpacity key={item} style={styles.similarCard}>
                                <LinearGradient
                                    colors={['#56AB2F', '#A8E063']}
                                    style={styles.similarGradient}
                                >
                                    <Text style={styles.similarIcon}>🌲</Text>
                                    <Text style={styles.similarName}>Forest Peace</Text>
                                    <Text style={styles.similarDuration}>8:45</Text>
                                </LinearGradient>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                </View>

                {/* Bottom Spacing */}
                <View style={styles.bottomSpacing} />
            </ScrollView>

            {/* Fixed Play Button */}
            <View style={styles.playButtonContainer}>
                <TouchableOpacity
                    style={styles.playButtonMain}
                    onPress={handlePlayPress}
                    activeOpacity={0.8}
                >
                    <LinearGradient
                        colors={meditationDetail.gradient}
                        style={styles.playButtonGradient}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                    >
                        <Ionicons name="play" size={24} color="#fff" />
                        <Text style={styles.playButtonText}>Start Meditation</Text>
                    </LinearGradient>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default MeditationDetailScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    headerImageContainer: {
        height: 300,
        position: 'relative',
    },
    headerImage: {
        width: '100%',
        height: '100%',
    },
    headerGradient: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 100,
    },
    backButton: {
        position: 'absolute',
        top: 50,
        left: 20,
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    favoriteButton: {
        position: 'absolute',
        top: 50,
        right: 20,
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    scrollView: {
        flex: 1,
    },
    titleSection: {
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#E2E8F0',
    },
    titleRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
    },
    icon: {
        fontSize: 48,
        marginRight: 16,
    },
    titleTextContainer: {
        flex: 1,
    },
    title: {
        fontSize: 24,
        fontWeight: '700',
        color: '#1A202C',
        marginBottom: 8,
    },
    metaRow: {
        flexDirection: 'row',
        gap: 16,
    },
    metaItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    metaText: {
        fontSize: 14,
        color: '#718096',
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    ratingText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#1A202C',
    },
    reviewCount: {
        fontSize: 14,
        color: '#718096',
    },
    tagsContainer: {
        flexDirection: 'row',
        paddingHorizontal: 20,
        paddingVertical: 16,
        gap: 10,
    },
    tag: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 20,
        backgroundColor: '#EBF8FF',
    },
    tagLevel: {
        backgroundColor: '#F0FDF4',
    },
    tagText: {
        fontSize: 14,
        fontWeight: '600',
        color: '#2C5282',
    },
    section: {
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#E2E8F0',
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: '700',
        color: '#1A202C',
        marginBottom: 16,
    },
    description: {
        fontSize: 16,
        lineHeight: 24,
        color: '#4A5568',
    },
    videoContainer: {
        position: 'relative',
        borderRadius: 16,
        overflow: 'hidden',
        height: 200,
        backgroundColor: '#000',
    },
    videoThumbnail: {
        width: '100%',
        height: '100%',
    },
    video: {
        width: '100%',
        height: '100%',
    },
    playButtonOverlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.3)',
    },
    playButton: {
        width: 64,
        height: 64,
        borderRadius: 32,
        backgroundColor: 'rgba(255,255,255,0.9)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    videoDuration: {
        position: 'absolute',
        bottom: 12,
        right: 12,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
        backgroundColor: 'rgba(0,0,0,0.7)',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 8,
    },
    videoDurationText: {
        fontSize: 12,
        color: '#fff',
        fontWeight: '600',
    },
    benefitItem: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginBottom: 12,
    },
    benefitIcon: {
        marginRight: 12,
        marginTop: 2,
    },
    benefitText: {
        flex: 1,
        fontSize: 16,
        color: '#4A5568',
        lineHeight: 24,
    },
    stepCard: {
        backgroundColor: '#F7FAFC',
        borderRadius: 12,
        padding: 16,
        marginBottom: 12,
    },
    stepHeader: {
        flexDirection: 'row',
        marginBottom: 8,
    },
    stepNumber: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: '#4A5568',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    stepNumberText: {
        fontSize: 16,
        fontWeight: '700',
        color: '#fff',
    },
    stepContent: {
        flex: 1,
    },
    stepTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#1A202C',
        marginBottom: 4,
    },
    stepDuration: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    stepDurationText: {
        fontSize: 12,
        color: '#718096',
    },
    stepDescription: {
        fontSize: 14,
        color: '#4A5568',
        lineHeight: 20,
        marginLeft: 44,
    },
    similarCard: {
        width: 140,
        height: 160,
        marginRight: 12,
        borderRadius: 16,
        overflow: 'hidden',
    },
    similarGradient: {
        flex: 1,
        padding: 16,
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    similarIcon: {
        fontSize: 40,
    },
    similarName: {
        fontSize: 16,
        fontWeight: '600',
        color: '#fff',
        textAlign: 'center',
    },
    similarDuration: {
        fontSize: 14,
        color: 'rgba(255,255,255,0.9)',
    },
    bottomSpacing: {
        height: 100,
    },
    playButtonContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        padding: 20,
        backgroundColor: '#fff',
        borderTopWidth: 1,
        borderTopColor: '#E2E8F0',
    },
    playButtonMain: {
        borderRadius: 16,
        overflow: 'hidden',
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
    },
    playButtonGradient: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 16,
        gap: 8,
    },
    playButtonText: {
        fontSize: 18,
        fontWeight: '700',
        color: '#fff',
    },
});