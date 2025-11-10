import React, { useState } from 'react';
import {
    Alert,
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

    const handleSelectOption = (optionValue) => {
        setAnswers({
            ...answers,
            [currentQuestion]: optionValue,
        });
    };

    const handleNext = () => {
        if (currentQuestion < questionsData.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
        } else {
            calculateMood();
        }
    };

    const handlePrevious = () => {
        if (currentQuestion > 0) {
            setCurrentQuestion(currentQuestion - 1);
        }
    };

    const handleSkip = () => {
        if (currentQuestion < questionsData.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
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

        if (percentage <= 25) {
            moodStatus = 'Excellent';
            moodMessage = 'Your mental health appears to be in great shape! Keep up the positive habits.';
        } else if (percentage <= 50) {
            moodStatus = 'Good';
            moodMessage = 'You\'re doing well overall. Consider some relaxation techniques to maintain balance.';
        } else if (percentage <= 75) {
            moodStatus = 'Fair';
            moodMessage = 'You may be experiencing some challenges. Consider speaking with someone you trust.';
        } else {
            moodStatus = 'Needs Attention';
            moodMessage = 'It seems you\'re going through a difficult time. Please consider reaching out to a mental health professional.';
        }

        Alert.alert(
            `Mood Assessment: ${moodStatus}`,
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
    const progress = ((currentQuestion + 1) / questionsData.length) * 100;

    return (
        <SafeAreaView style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                {/* <TouchableOpacity onPress={() => console.log('Go back')}>
                    <Text style={styles.backButton}>←</Text>
                </TouchableOpacity> */}
                <Text style={styles.headerTitle}>Mental Health Assessment</Text>
                <TouchableOpacity onPress={handleSkip}>
                    <Text style={styles.skipButton}>Skip</Text>
                </TouchableOpacity>
            </View>

            {/* Progress Bar */}
            <View style={styles.progressContainer}>
                <View style={styles.progressBarBackground}>
                    <View style={[styles.progressBarFill, { width: `${progress}%` }]} />
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
                <View style={styles.questionCard}>
                    <Text style={styles.questionNumber}>Question {currentQuestion + 1}</Text>
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
                                </TouchableOpacity>
                            );
                        })}
                    </View>
                </View>
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
                >
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
                    style={[
                        styles.navButton,
                        styles.nextButton,
                        answers[currentQuestion] === undefined && styles.navButtonDisabled,
                    ]}
                    onPress={handleNext}
                    disabled={answers[currentQuestion] === undefined}
                >
                    <Text style={styles.navButtonTextWhite}>
                        {currentQuestion === questionsData.length - 1 ? 'Submit' : 'Next'}
                    </Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

export default Question_Screen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F7FA',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 15,
        backgroundColor: '#FFFFFF',
        borderBottomWidth: 1,
        borderBottomColor: '#E5E7EB',
    },
    backButton: {
        fontSize: 24,
        color: '#374151',
        fontWeight: '600',
    },
    headerTitle: {
        fontSize: 18,
        color: '#1F2937', fontFamily: "Lato-Bold"
    },
    skipButton: {
        fontSize: 16,
        color: '#b86731',
        fontFamily: "Lato-Regular"
    },
    progressContainer: {
        paddingHorizontal: 20,
        paddingVertical: 15,
        backgroundColor: '#FFFFFF',
    },
    progressBarBackground: {
        height: 6,
        backgroundColor: '#E5E7EB',
        borderRadius: 3,
        overflow: 'hidden',
    },
    progressBarFill: {
        height: '100%',
        backgroundColor: '#b86731',
        borderRadius: 3,
    },
    progressText: {
        fontSize: 14,
        color: '#6B7280',
        marginTop: 8,
        fontFamily: "Lato-Bold"
    },
    scrollView: {
        flex: 1,
    },
    scrollContent: {
        padding: 20,
    },
    questionCard: {
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 2,
    },
    questionNumber: {
        fontSize: 14,
        fontFamily: "Lato-Bold",
        color: '#b86731',
        marginBottom: 12,
    },
    questionText: {
        fontSize: 18,
        fontWeight: '500',
        color: '#1F2937',
        lineHeight: 26,
        marginBottom: 24,
    },
    optionsContainer: {
        gap: 12,
    },
    optionButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F9FAFB',
        borderRadius: 12,
        padding: 16,
        borderWidth: 2,
        borderColor: '#E5E7EB',
    },
    optionButtonSelected: {
        backgroundColor: '#FEF3E8',
        borderColor: '#b86731',
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
        borderColor: '#b86731',
    },
    radioButtonInner: {
        width: 12,
        height: 12,
        borderRadius: 6,
        backgroundColor: '#b86731',
    },
    optionText: {
        fontSize: 16,
        color: '#4B5563',
        flex: 1, fontFamily: "Lato-Regular"
    },
    optionTextSelected: {
        color: '#1F2937',
        fontFamily: "Lato-Regular"
    },
    navigationContainer: {
        flexDirection: 'row',
        gap: 12,
        paddingHorizontal: 20,
        paddingVertical: 20,
        backgroundColor: '#FFFFFF',
        borderTopWidth: 1,
        borderTopColor: '#E5E7EB',
    },
    navButton: {
        flex: 1,
        paddingVertical: 16,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
    },
    previousButton: {
        backgroundColor: '#F3F4F6',
        borderWidth: 1,
        borderColor: '#D1D5DB',
    },
    nextButton: {
        backgroundColor: '#b86731',
    },
    navButtonDisabled: {
        backgroundColor: '#F3F4F6',
        borderColor: '#E5E7EB',
    },
    navButtonText: {
        fontSize: 16,
        fontFamily: "Lato-Regular",
        color: '#374151',
    },
    navButtonTextWhite: {
        fontSize: 16,
        fontFamily: "Lato-Regular",
        color: '#FFFFFF',
    },
    navButtonTextDisabled: {
        color: '#9CA3AF',
    },
});