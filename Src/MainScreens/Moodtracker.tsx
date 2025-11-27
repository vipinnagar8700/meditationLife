import React, { useState } from 'react';
import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const Moodtracker = () => {
    const [moodsByDay, setMoodsByDay] = useState({
        0: null, // Sunday
        1: null, // Monday
        2: null, // Tuesday
        3: null, // Wednesday
        4: 'calm', // Thursday
        5: null, // Friday
        6: null, // Saturday
    });
    const [showMoodPicker, setShowMoodPicker] = useState(false);
    const [selectedDayIndex, setSelectedDayIndex] = useState(null);

    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const currentDayIndex = new Date().getDay();

    const moods = [
        { emoji: '😊', label: 'Happy', mood: 'happy' },
        { emoji: '😌', label: 'Calm', mood: 'calm' },
        { emoji: '😢', label: 'Sad', mood: 'sad' },
        { emoji: '😰', label: 'Anxious', mood: 'anxious' },
        { emoji: '😴', label: 'Tired', mood: 'tired' },
        { emoji: '😍', label: 'Loved', mood: 'loved' },
        { emoji: '😡', label: 'Angry', mood: 'angry' },
    ];

    const getMoodEmoji = (mood) => {
        const moodItem = moods.find(m => m.mood === mood);
        return moodItem ? moodItem.emoji : '❓';
    };

    const handleDayPress = (dayIndex) => {
        setSelectedDayIndex(dayIndex);
        setShowMoodPicker(true);
    };

    const handleMoodSelect = (mood) => {
        setMoodsByDay({
            ...moodsByDay,
            [selectedDayIndex]: mood
        });
        setShowMoodPicker(false);
    };

    return (
        <View style={styles.sectionContainer}>
            <View style={{ backgroundColor: "#fff", padding: 10, borderRadius: 10 }}>
                <Text style={styles.sectionTitle}>Mood History</Text>

                <View style={styles.weeksContainer}>
                    {days.map((day, dayIndex) => (
                        <TouchableOpacity
                            key={dayIndex}
                            style={styles.dayColumn}
                            onPress={() => handleDayPress(dayIndex)}
                        >
                            <Text style={[styles.dayHeader, currentDayIndex === dayIndex && styles.dayHeaderToday]}>
                                {day}
                            </Text>
                            <View style={styles.moodContainer}>
                                {moodsByDay[dayIndex] ? (
                                    <Text style={styles.moodEmoji}>
                                        {getMoodEmoji(moodsByDay[dayIndex])}
                                    </Text>
                                ) : (
                                    <Text style={styles.addEmoji}>➕</Text>
                                )}
                            </View>
                        </TouchableOpacity>
                    ))}
                </View>
            </View>

            {/* Mood Picker Modal */}
            <Modal
                visible={showMoodPicker}
                transparent={true}
                animationType="fade"
                onRequestClose={() => setShowMoodPicker(false)}
            >
                <TouchableOpacity
                    style={styles.modalOverlay}
                    activeOpacity={1}
                    onPress={() => setShowMoodPicker(false)}
                >
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>
                            Select Mood for {selectedDayIndex !== null ? days[selectedDayIndex] : ''}
                        </Text>
                        <View style={styles.moodGrid}>
                            {moods.map((moodItem) => (
                                <TouchableOpacity
                                    key={moodItem.mood}
                                    style={styles.moodOption}
                                    onPress={() => handleMoodSelect(moodItem.mood)}
                                >
                                    <Text style={styles.modalEmoji}>{moodItem.emoji}</Text>
                                    <Text style={styles.moodOptionLabel}>{moodItem.label}</Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>
                </TouchableOpacity>
            </Modal>
        </View>
    );
};

export default Moodtracker;

const styles = StyleSheet.create({
    sectionContainer: {
        marginBottom: 0,
        margin: 0,
        padding: 12
    },
    sectionTitle: {
        fontSize: 20,
        fontFamily: "Heading",
        color: '#000',
        marginBottom: 10,
    },
    weeksContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    dayColumn: {
        flex: 1,
        alignItems: 'center',
        paddingVertical: 8,
    },
    dayHeader: {
        fontSize: 12,
        fontFamily: "Lato-Bold",
        color: '#000',
        marginBottom: 8,
    },
    dayHeaderToday: {
        color: '#F07663',
        fontSize: 14,
    },
    moodContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 40,
    },
    moodEmoji: {
        fontSize: 36,
    },
    addEmoji: {
        fontSize: 28,
        opacity: 0.3,
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        backgroundColor: '#fff',
        borderRadius: 20,
        padding: 20,
        width: '85%',
        maxWidth: 400,
    },
    modalTitle: {
        fontSize: 18,
        fontFamily: "Heading",
        color: '#F07663',
        marginBottom: 20,
        textAlign: 'center',
    },
    moodGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: 15,
    },
    moodOption: {
        alignItems: 'center',
        padding: 15,
        borderRadius: 15,
        backgroundColor: '#FFF7ED',
        minWidth: 80,
    },
    modalEmoji: {
        fontSize: 48,
    },
    moodOptionLabel: {
        fontSize: 12,
        fontFamily: "Lato-Bold",
        color: '#666',
        marginTop: 8,
    },
});