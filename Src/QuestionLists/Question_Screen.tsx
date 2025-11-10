import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect, useRef, useState } from 'react';
import {
    Alert,
    Animated,
    Dimensions,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width, height } = Dimensions.get('window');

const questionsData = [
    {
        id: 1,
        question: 'In the past two weeks, have you felt little interest or pleasure in doing things?',
        options: [
            { label: 'Not at all', value: 0 },
            { label: 'Several days', value: 1 },
            { label: 'More than half the days', value: 2 },
            { label: 'Nearly every day', value: 3 },
        ],
    },
    {
        id: 2,
        question: 'How often have you been feeling down, depressed, or hopeless?',
        options: [
            { label: 'Never', value: 0 },
            { label: 'Sometimes', value: 1 },
            { label: 'Often', value: 2 },
            { label: 'Always', value: 3 },
        ],
    },
    {
        id: 3,
        question: 'Have you had trouble falling or staying asleep, or sleeping too much?',
        options: [
            { label: 'No trouble at all', value: 0 },
            { label: 'Slight trouble', value: 1 },
            { label: 'Moderate trouble', value: 2 },
            { label: 'Severe trouble', value: 3 },
        ],
    },
    {
        id: 4,
        question: 'How would you rate your energy levels recently?',
        options: [
            { label: 'Full of energy', value: 0 },
            { label: 'Slightly tired', value: 1 },
            { label: 'Very tired', value: 2 },
            { label: 'Exhausted', value: 3 },
        ],
    },
    {
        id: 5,
        question: 'Have you experienced changes in your appetite?',
        options: [
            { label: 'No change', value: 0 },
            { label: 'Slight change', value: 1 },
            { label: 'Moderate change', value: 2 },
            { label: 'Significant change', value: 3 },
        ],
    },
    {
        id: 6,
        question: 'Do you feel bad about yourself or that you are a failure?',
        options: [
            { label: 'Not at all', value: 0 },
            { label: 'Occasionally', value: 1 },
            { label: 'Frequently', value: 2 },
            { label: 'All the time', value: 3 },
        ],
    },
    {
        id: 7,
        question: 'Have you had trouble concentrating on things?',
        options: [
            { label: 'No difficulty', value: 0 },
            { label: 'Some difficulty', value: 1 },
            { label: 'Much difficulty', value: 2 },
            { label: 'Extreme difficulty', value: 3 },
        ],
    },
    {
        id: 8,
        question: 'How often do you feel anxious or worried?',
        options: [
            { label: 'Rarely', value: 0 },
            { label: 'Sometimes', value: 1 },
            { label: 'Often', value: 2 },
            { label: 'Constantly', value: 3 },
        ],
    },
    {
        id: 9,
        question: 'Do you feel overwhelmed by daily tasks?',
        options: [
            { label: 'Not at all', value: 0 },
            { label: 'A little', value: 1 },
            { label: 'Quite a bit', value: 2 },
            { label: 'Extremely', value: 3 },
        ],
    },
    {
        id: 10,
        question: 'How connected do you feel to others?',
        options: [
            { label: 'Very connected', value: 0 },
            { label: 'Somewhat connected', value: 1 },
            { label: 'Slightly isolated', value: 2 },
            { label: 'Very isolated', value: 3 },
        ],
    },
    {
        id: 11,
        question: 'Have you been able to relax and unwind?',
        options: [
            { label: 'Very easily', value: 0 },
            { label: 'Somewhat easily', value: 1 },
            { label: 'With difficulty', value: 2 },
            { label: 'Unable to relax', value: 3 },
        ],
    },
    {
        id: 12,
        question: 'How often do you experience mood swings?',
        options: [
            { label: 'Never', value: 0 },
            { label: 'Rarely', value: 1 },
            { label: 'Sometimes', value: 2 },
            { label: 'Very often', value: 3 },
        ],
    },
    {
        id: 13,
        question: 'Do you feel motivated to pursue your goals?',
        options: [
            { label: 'Very motivated', value: 0 },
            { label: 'Somewhat motivated', value: 1 },
            { label: 'Slightly motivated', value: 2 },
            { label: 'Not motivated', value: 3 },
        ],
    },
    {
        id: 14,
        question: 'How satisfied are you with your life currently?',
        options: [
            { label: 'Very satisfied', value: 0 },
            { label: 'Somewhat satisfied', value: 1 },
            { label: 'Slightly dissatisfied', value: 2 },
            { label: 'Very dissatisfied', value: 3 },
        ],
    },
    {
        id: 15,
        question: 'Do you feel hopeful about your future?',
        options: [
            { label: 'Very hopeful', value: 0 },
            { label: 'Somewhat hopeful', value: 1 },
            { label: 'Slightly hopeless', value: 2 },
            { label: 'Very hopeless', value: 3 },
        ],
    },
];

const Question_Screen = ({ navigation }) => {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answers, setAnswers] = useState({});

    // Animation values
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const slideAnim = useRef(new Animated.Value(50)).current;
    const scaleAnim = useRef(new Animated.Value(0.9)).current;
    const progressAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        // Animate question card entrance
        Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 600,
                useNativeDriver: true,
            }),
            Animated.spring(slideAnim, {
                toValue: 0,
                tension: 20,
                friction: 7,
                useNativeDriver: true,
            }),
            Animated.spring(scaleAnim, {
                toValue: 1,
                tension: 20,
                friction: 7,
                useNativeDriver: true,
            })
        ]).start();

        // Animate progress bar
        const progress = ((currentQuestion + 1) / questionsData.length);
        Animated.timing(progressAnim, {
            toValue: progress,
            duration: 500,
            useNativeDriver: false,
        }).start();
    }, [currentQuestion]);

    const handleSelectOption = (optionValue) => {
        setAnswers({
            ...answers,
            [currentQuestion]: optionValue,
        });

        // Subtle bounce animation on selection
        Animated.sequence([
            Animated.timing(scaleAnim, {
                toValue: 0.98,
                duration: 100,
                useNativeDriver: true,
            }),
            Animated.spring(scaleAnim, {
                toValue: 1,
                tension: 100,
                friction: 5,
                useNativeDriver: true,
            })
        ]).start();
    };

    const handleNext = () => {
        // Fade out animation
        Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: 0,
                duration: 200,
                useNativeDriver: true,
            }),
            Animated.timing(slideAnim, {
                toValue: -50,
                duration: 200,
                useNativeDriver: true,
            })
        ]).start(() => {
            if (currentQuestion < questionsData.length - 1) {
                setCurrentQuestion(currentQuestion + 1);
                // Reset animations for next question
                fadeAnim.setValue(0);
                slideAnim.setValue(50);
            } else {
                calculateMood();
            }
        });
    };

    const handlePrevious = () => {
        if (currentQuestion > 0) {
            // Fade out animation
            Animated.parallel([
                Animated.timing(fadeAnim, {
                    toValue: 0,
                    duration: 200,
                    useNativeDriver: true,
                }),
                Animated.timing(slideAnim, {
                    toValue: 50,
                    duration: 200,
                    useNativeDriver: true,
                })
            ]).start(() => {
                setCurrentQuestion(currentQuestion - 1);
                // Reset animations
                fadeAnim.setValue(0);
                slideAnim.setValue(-50);
            });
        }
    };

    const handleSkip = () => {
        if (currentQuestion < questionsData.length - 1) {
            Animated.parallel([
                Animated.timing(fadeAnim, {
                    toValue: 0,
                    duration: 200,
                    useNativeDriver: true,
                }),
                Animated.timing(slideAnim, {
                    toValue: -50,
                    duration: 200,
                    useNativeDriver: true,
                })
            ]).start(() => {
                setCurrentQuestion(currentQuestion + 1);
                fadeAnim.setValue(0);
                slideAnim.setValue(50);
            });
        } else {
            calculateMood();
        }
    };

    const calculateMood = () => {
        const totalScore = Object.values(answers).reduce((sum, val) => sum + val, 0);
        const maxScore = questionsData.length * 3;
        const percentage = (totalScore / maxScore) * 100;

        let moodStatus = '';
        let moodMessage = '';
        let icon = '';

        if (percentage <= 25) {
            moodStatus = 'Excellent';
            moodMessage = 'Your mental health appears to be in great shape! Keep up the positive habits.';
            icon = '🌟';
        } else if (percentage <= 50) {
            moodStatus = 'Good';
            moodMessage = 'You\'re doing well overall. Consider some relaxation techniques to maintain balance.';
            icon = '😊';
        } else if (percentage <= 75) {
            moodStatus = 'Fair';
            moodMessage = 'You may be experiencing some challenges. Consider speaking with someone you trust.';
            icon = '💭';
        } else {
            moodStatus = 'Needs Attention';
            moodMessage = 'It seems you\'re going through a difficult time. Please consider reaching out to a mental health professional.';
            icon = '💙';
        }

        Alert.alert(
            `${icon} Mood Assessment: ${moodStatus}`,
            `Score: ${totalScore}/${maxScore} (${percentage.toFixed(1)}%)\n\n${moodMessage}`,
            [
                {
                    text: 'View Resources',
                    onPress: () => console.log('Navigate to resources'),
                },
                {
                    text: 'Done',
                    onPress: () => { navigation.replace('Home_Screen') },
                },
            ]
        );
    };

    const currentQ = questionsData[currentQuestion];
    const progressWidth = progressAnim.interpolate({
        inputRange: [0, 1],
        outputRange: ['0%', '100%'],
    });

    return (
        <LinearGradient
            colors={['#E8624E', '#F3A469']}
            style={styles.gradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
        >
            <SafeAreaView style={styles.container}>
                {/* Header */}
                <View style={styles.header}>
                    <Text style={styles.headerTitle}>Mental Health Assessment</Text>
                    <TouchableOpacity onPress={handleSkip} style={styles.skipButtonContainer}>
                        <Text style={styles.skipButton}>Skip</Text>
                        <Ionicons name="arrow-forward" size={16} color="#fff" />
                    </TouchableOpacity>
                </View>

                {/* Progress Bar */}
                <View style={styles.progressContainer}>
                    <View style={styles.progressBarBackground}>
                        <Animated.View
                            style={[
                                styles.progressBarFill,
                                { width: progressWidth }
                            ]}
                        />
                    </View>
                    <Text style={styles.progressText}>
                        {currentQuestion + 1}/{questionsData.length}
                    </Text>
                </View>

                {/* Question Card */}
                <ScrollView
                    style={styles.scrollView}
                    contentContainerStyle={styles.scrollContent}
                    showsVerticalScrollIndicator={false}
                >
                    <Animated.View
                        style={[
                            styles.questionCard,
                            {
                                opacity: fadeAnim,
                                transform: [
                                    { translateY: slideAnim },
                                    { scale: scaleAnim }
                                ]
                            }
                        ]}
                    >
                        <View style={styles.questionHeader}>
                            <View style={styles.questionNumberBadge}>
                                <Text style={styles.questionNumber}>Q{currentQuestion + 1}</Text>
                            </View>
                            <Ionicons name="help-circle-outline" size={24} color="#E8624E" />
                        </View>

                        <Text style={styles.questionText}>{currentQ.question}</Text>

                        {/* Options */}
                        <View style={styles.optionsContainer}>
                            {currentQ.options.map((option, index) => {
                                const isSelected = answers[currentQuestion] === option.value;
                                return (
                                    <TouchableOpacity
                                        key={index}
                                        style={[
                                            styles.optionButton,
                                            isSelected && styles.optionButtonSelected,
                                        ]}
                                        onPress={() => handleSelectOption(option.value)}
                                        activeOpacity={0.7}
                                    >
                                        <View
                                            style={[
                                                styles.radioButton,
                                                isSelected && styles.radioButtonSelected,
                                            ]}
                                        >
                                            {isSelected && <View style={styles.radioButtonInner} />}
                                        </View>
                                        <Text
                                            style={[
                                                styles.optionText,
                                                isSelected && styles.optionTextSelected,
                                            ]}
                                        >
                                            {option.label}
                                        </Text>
                                        {isSelected && (
                                            <Ionicons name="checkmark-circle" size={24} color="#E8624E" />
                                        )}
                                    </TouchableOpacity>
                                );
                            })}
                        </View>
                    </Animated.View>
                </ScrollView>

                {/* Navigation Buttons */}
                <View style={styles.navigationContainer}>
                    <TouchableOpacity
                        style={[
                            styles.navButton,
                            styles.previousButton,
                            currentQuestion === 0 && styles.navButtonDisabled,
                        ]}
                        onPress={handlePrevious}
                        disabled={currentQuestion === 0}
                        activeOpacity={0.7}
                    >
                        <Ionicons
                            name="arrow-back"
                            size={20}
                            color={currentQuestion === 0 ? '#9CA3AF' : '#374151'}
                        />
                        <Text
                            style={[
                                styles.navButtonText,
                                currentQuestion === 0 && styles.navButtonTextDisabled,
                            ]}
                        >
                            Previous
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.nextButtonContainer}
                        onPress={handleNext}
                        disabled={answers[currentQuestion] === undefined}
                        activeOpacity={0.8}
                    >
                        <LinearGradient
                            colors={
                                answers[currentQuestion] === undefined
                                    ? ['#D1D5DB', '#D1D5DB']
                                    : ['#E8624E', '#F3A469']
                            }
                            start={{ x: 0, y: 0 }}
                            style={styles.nextButton}
                            end={{ x: 1, y: 0 }}
                        >
                            <Text style={styles.navButtonTextWhite}>
                                {currentQuestion === questionsData.length - 1 ? 'Submit' : 'Next'}
                            </Text>
                            <Ionicons
                                name={currentQuestion === questionsData.length - 1 ? "checkmark" : "arrow-forward"}
                                size={20}
                                color="#fff"
                            />
                        </LinearGradient>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </LinearGradient>
    );
};

export default Question_Screen;

const styles = StyleSheet.create({
    gradient: {
        flex: 1,
    },
    container: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 15,
    },
    headerTitle: {
        fontSize: 18,
        color: '#fff',
        fontFamily: "Lato-Bold"
    },
    skipButtonContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    skipButton: {
        fontSize: 16,
        color: '#fff',
        fontFamily: "Lato-Regular"
    },
    progressContainer: {
        paddingHorizontal: 20,
        paddingVertical: 12,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    progressBarBackground: {
        flex: 1,
        height: 8,
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
        borderRadius: 4,
        overflow: 'hidden',
    },
    progressBarFill: {
        height: '100%',
        backgroundColor: '#fff',
        borderRadius: 4,
    },
    progressText: {
        fontSize: 14,
        color: '#fff',
        fontFamily: "Lato-Bold",
        minWidth: 50,
    },
    scrollView: {
        flex: 1,
    },
    scrollContent: {
        padding: 20,
    },
    questionCard: {
        backgroundColor: '#FFFFFF',
        borderRadius: 20,
        padding: 24,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 12,
        elevation: 5,
    },
    questionHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 16,
    },
    questionNumberBadge: {
        backgroundColor: '#FEF3E8',
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 20,
    },
    questionNumber: {
        fontSize: 14,
        fontFamily: "Lato-Bold",
        color: '#E8624E',
    },
    questionText: {
        fontSize: 18,
        fontFamily: "Lato-Bold",
        color: '#1F2937',
        lineHeight: 28,
        marginBottom: 24,
    },
    optionsContainer: {
        gap: 12,
    },
    optionButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F9FAFB',
        borderRadius: 14,
        padding: 16,
        borderWidth: 2,
        borderColor: '#E5E7EB',
    },
    optionButtonSelected: {
        backgroundColor: '#FEF3E8',
        borderColor: '#E8624E',
    },
    radioButton: {
        width: 24,
        height: 24,
        borderRadius: 12,
        borderWidth: 2,
        borderColor: '#D1D5DB',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 12,
    },
    radioButtonSelected: {
        borderColor: '#E8624E',
    },
    radioButtonInner: {
        width: 12,
        height: 12,
        borderRadius: 6,
        backgroundColor: '#E8624E',
    },
    optionText: {
        fontSize: 16,
        color: '#4B5563',
        flex: 1,
        fontFamily: "Lato-Regular"
    },
    optionTextSelected: {
        color: '#1F2937',
        fontFamily: "Lato-Bold"
    },
    navigationContainer: {
        flexDirection: 'row',
        gap: 12,
        paddingHorizontal: 20,
        paddingVertical: 20,
    },
    navButton: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        paddingVertical: 16,
        borderRadius: 14,
    },
    previousButton: {
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.5)',
    },
    nextButtonContainer: {
        flex: 1,
        borderRadius: 14,
        overflow: 'hidden',
        shadowColor: '#E8624E',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 4,
    },
    nextButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        paddingVertical: 16,
        borderRadius: 14,
    },
    navButtonDisabled: {
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
        borderColor: 'rgba(255, 255, 255, 0.3)',
    },
    navButtonText: {
        fontSize: 16,
        fontFamily: "Lato-Bold",
        color: '#374151',
    },
    navButtonTextWhite: {
        fontSize: 16,
        fontFamily: "Lato-Bold",
        color: '#FFFFFF',
    },
    navButtonTextDisabled: {
        color: '#9CA3AF',
    },
});