import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useRef, useState } from 'react';
import {
    Dimensions,
    Image,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';

const { width, height } = Dimensions.get('window');

const onboardingData = [
    {
        id: 1,
        title: 'Relax at work',
        image: require('../../assets/images/Onboarding/1.png'),
        description: 'Take a break from your busy schedule and find moments of calm during your workday',
        colors: ['#C2E9FB', '#A1C4FD'],
        accentColor: '#5B9BD5',
        buttonColors: ['#4A90E2', '#5B9BD5']
    },
    {
        id: 2,
        title: 'Time to Relax',
        image: require('../../assets/images/Onboarding/2.png'),
        description: 'Dedicate time for yourself to unwind and release the stress of daily life',
        colors: ['#FAD0C4', '#FFD1FF'],
        accentColor: '#E85D8A',
        buttonColors: ['#E85D8A', '#FF8BA7']
    },
    {
        id: 3,
        title: 'Peace at least',
        image: require('../../assets/images/Onboarding/3.png'),
        description: 'Find your inner peace and tranquility through mindful meditation practices',
        colors: ['#D4FC79', '#96E6A1'],
        accentColor: '#4CAF50',
        buttonColors: ['#4CAF50', '#6FCF73']
    },
    {
        id: 4,
        title: 'Open your mind',
        image: require('../../assets/images/Onboarding/4.png'),
        description: 'Expand your awareness and embrace new perspectives for mental clarity',
        colors: ['#84FAB0', '#8FD3F4'],
        accentColor: '#26C6DA',
        buttonColors: ['#26C6DA', '#4DD0E1']
    },
    {
        id: 5,
        title: 'Quiet your mind',
        image: require('../../assets/images/Onboarding/5.png'),
        description: 'Silence the mental noise and achieve a state of peaceful mindfulness',
        colors: ['#FBC2EB', '#A6C1EE'],
        accentColor: '#9C27B0',
        buttonColors: ['#9C27B0', '#BA68C8']
    },
];

const Onboarding_Screen = () => {
    const navigation = useNavigation();
    const [currentIndex, setCurrentIndex] = useState(0);
    const scrollViewRef = useRef(null);

    const handleNext = () => {
        if (currentIndex < onboardingData.length - 1) {
            const nextIndex = currentIndex + 1;
            setCurrentIndex(nextIndex);
            scrollViewRef.current?.scrollTo({
                x: nextIndex * width,
                animated: true
            });
        } else {
            navigation.replace("Login_Screen");
        }
    };

    const handleSkip = () => {
        navigation.replace("Login_Screen");
    };

    const handleScroll = (event) => {
        const scrollPosition = event.nativeEvent.contentOffset.x;
        const index = Math.round(scrollPosition / width);
        setCurrentIndex(index);
    };

    const handleDotPress = (index) => {
        setCurrentIndex(index);
        scrollViewRef.current?.scrollTo({
            x: index * width,
            animated: true
        });
    };

    const currentSlide = onboardingData[currentIndex];

    return (
        <LinearGradient
            colors={currentSlide.colors}
            style={styles.container}
        >
            <SafeAreaView style={{ flex: 1 }}>
                {/* Skip Button with dynamic color */}
                <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
                    <LinearGradient
                        colors={currentSlide.buttonColors}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        style={styles.skipGradient}
                    >
                        <Text style={styles.skipText}>Skip ›</Text>
                    </LinearGradient>
                </TouchableOpacity>

                {/* Main Content with Swipe */}
                <ScrollView
                    ref={scrollViewRef}
                    horizontal
                    pagingEnabled
                    showsHorizontalScrollIndicator={false}
                    onMomentumScrollEnd={handleScroll}
                    scrollEventThrottle={16}
                    style={{ flex: 1 }}
                >
                    {onboardingData.map((slide, index) => (
                        <View key={slide.id} style={styles.slideContainer}>
                            <View style={styles.contentContainer}>
                                <View style={styles.imageContainer}>
                                    <Image
                                        source={slide.image}
                                        style={styles.onboardingImage}
                                        resizeMode="contain"
                                    />
                                </View>

                                {/* Title */}
                                <Text style={styles.title}>{slide.title}</Text>

                                {/* Description */}
                                <Text style={styles.description}>{slide.description}</Text>
                            </View>
                        </View>
                    ))}
                </ScrollView>

                {/* Fixed Bottom Section */}
                <View style={styles.bottomContainer}>
                    {/* Pagination Dots with dynamic colors */}
                    <View style={styles.pagination}>
                        {onboardingData.map((_, index) => (
                            <TouchableOpacity
                                key={index}
                                onPress={() => handleDotPress(index)}
                            >
                                {currentIndex === index ? (
                                    <LinearGradient
                                        colors={currentSlide.buttonColors}
                                        start={{ x: 0, y: 0 }}
                                        end={{ x: 1, y: 0 }}
                                        style={[styles.dot, styles.dotActive]}
                                    />
                                ) : (
                                    <View
                                        style={[
                                            styles.dot,
                                            styles.dotInactive,
                                            { backgroundColor: 'rgba(255, 255, 255, 0.4)' }
                                        ]}
                                    />
                                )}
                            </TouchableOpacity>
                        ))}
                    </View>

                    {/* Next Button with dynamic gradient */}
                    <TouchableOpacity onPress={handleNext} style={styles.nextButtonWrapper}>
                        <LinearGradient
                            colors={currentSlide.buttonColors}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}
                            style={styles.nextButton}
                        >
                            <Text style={styles.nextButtonText}>
                                {currentIndex === onboardingData.length - 1 ? 'Get Started' : 'Next'}
                            </Text>
                        </LinearGradient>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </LinearGradient>
    );
};

export default Onboarding_Screen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    skipButton: {
        position: 'absolute',
        top: 70,
        right: 20,
        zIndex: 10,
        borderRadius: 20,
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 3,
    },
    skipGradient: {
        paddingHorizontal: 20,
        paddingVertical: 8,
        borderRadius: 20,
    },
    skipText: {
        fontSize: 16,
        color: '#FFFFFF',
        fontFamily: "Lato-Bold",
        fontWeight: '600',
    },
    slideContainer: {
        width: width,
        flex: 1,
    },
    contentContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 20,
    },
    imageContainer: {
        width: width * 0.9,
        height: height * 0.5,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
    },
    onboardingImage: {
        width: '100%',
        height: '100%',
    },
    bottomContainer: {
        alignItems: 'center',
        paddingBottom: 40,
    },
    pagination: {
        flexDirection: 'row',
        gap: 8,
        marginBottom: 30,
    },
    dot: {
        height: 10,
        borderRadius: 5,
    },
    dotActive: {
        width: 30,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 2,
    },
    dotInactive: {
        width: 10,
    },
    title: {
        fontSize: 28,
        color: '#3A2E2E',
        textAlign: 'center',
        marginBottom: 15,
        lineHeight: 36,
        fontFamily: "Lato-Bold"
    },
    description: {
        fontSize: 16,
        color: '#5C5049',
        textAlign: 'center',
        marginBottom: 30,
        lineHeight: 24,
        paddingHorizontal: 30,
        fontFamily: "Lato-Regular"
    },
    nextButtonWrapper: {
        borderRadius: 30,
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 6,
    },
    nextButton: {
        paddingHorizontal: 100,
        paddingVertical: 16,
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
    },
    nextButtonText: {
        fontFamily: "Lato-Bold",
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: '700',
    },
});