import { useNavigation } from '@react-navigation/native';
import React, { useRef, useState } from 'react';
import {
    Dimensions,
    Image,
    SafeAreaView,
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
    },
    {
        id: 2,
        title: 'Time to Relax',
        image: require('../../assets/images/Onboarding/2.png'),
        description: 'Dedicate time for yourself to unwind and release the stress of daily life',
    },
    {
        id: 3,
        title: 'Peace at least',
        image: require('../../assets/images/Onboarding/3.png'),
        description: 'Find your inner peace and tranquility through mindful meditation practices',
    },
    {
        id: 4,
        title: 'Open your mind',
        image: require('../../assets/images/Onboarding/4.png'),
        description: 'Expand your awareness and embrace new perspectives for mental clarity',
    },
    {
        id: 5,
        title: 'Quiet your mind',
        image: require('../../assets/images/Onboarding/5.png'),
        description: 'Silence the mental noise and achieve a state of peaceful mindfulness',
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
        } else {
            // Navigate to main app
            navigation.replace("Login_Screen" as never);
        }
    };

    const handleSkip = () => {
        // Navigate to main app
        console.log('Skip to main app');
    };

    return (
        <SafeAreaView style={styles.container}>
            {/* Skip Button */}
            <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
                <Text style={styles.skipText}>Skip ›</Text>
            </TouchableOpacity>

            {/* Main Content */}
            <View style={styles.contentContainer}>
                {/* Onboarding Image */}
                <View style={styles.imageContainer}>
                    <Image
                        source={onboardingData[currentIndex].image}
                        style={styles.onboardingImage}
                        resizeMode="contain"
                    />
                </View>

                {/* Pagination Dots */}
                <View style={styles.pagination}>
                    {onboardingData.map((_, index) => (
                        <View
                            key={index}
                            style={[
                                styles.dot,
                                currentIndex === index ? styles.dotActive : styles.dotInactive,
                            ]}
                        />
                    ))}
                </View>

                {/* Title */}
                <Text style={styles.title}>{onboardingData[currentIndex].title}</Text>

                {/* Description */}
                <Text style={styles.description}>{onboardingData[currentIndex].description}</Text>

                {/* Next Button */}
                <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
                    <Text style={styles.nextButtonText}>
                        {currentIndex === onboardingData.length - 1 ? 'Get Started' : 'Next'}
                    </Text>
                </TouchableOpacity>
            </View>

            {/* Home Indicator */}
            <View style={styles.homeIndicator} />
        </SafeAreaView>
    );
};

export default Onboarding_Screen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#E5F2F3',
    },
    skipButton: {
        position: 'absolute',
        top: 70,
        right: 20,
        zIndex: 10,
    },
    skipText: {
        fontSize: 16,
        color: '#b86731',
        fontFamily: "Lato-Regular"
    },
    contentContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 20,
    },
    imageContainer: {
        width: width * 0.9,
        height: height * 0.55,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
    },
    onboardingImage: {
        width: '100%',
        height: '100%',
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
        backgroundColor: '#b86731',
        width: 30,
    },
    dotInactive: {
        backgroundColor: '#D0D0D0',
        width: 10,
    },
    title: {
        fontSize: 28,
        color: '#584f47',
        textAlign: 'center',
        marginBottom: 15,
        lineHeight: 36,
        paddingHorizontal: 20, fontFamily: "Lato-Bold"
    },
    description: {
        fontSize: 16,

        color: '#7a6f66',
        textAlign: 'center',
        marginBottom: 30,
        lineHeight: 24,
        paddingHorizontal: 30, fontFamily: "Lato-Regular"
    },
    nextButton: {
        backgroundColor: '#b86731',
        paddingHorizontal: 100,
        paddingVertical: 14,
        borderRadius: 30,
        marginBottom: 10,
    },
    nextButtonText: {
        fontFamily: "Lato-Bold",
        color: '#FFFFFF',
    },

});