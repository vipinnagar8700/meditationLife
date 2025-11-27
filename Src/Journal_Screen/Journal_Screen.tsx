import { Feather, FontAwesome, Ionicons, MaterialIcons } from '@expo/vector-icons'
import React, { useState } from 'react'
import { Alert, Modal, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'

const Journal_Screen = () => {
    const [selectedFilter, setSelectedFilter] = useState('All Entries')
    const [searchQuery, setSearchQuery] = useState('')
    const [modalVisible, setModalVisible] = useState(false)
    const [editModalVisible, setEditModalVisible] = useState(false)
    const [selectedEntry, setSelectedEntry] = useState(null)
    const [newEntry, setNewEntry] = useState({
        title: '',
        content: '',
        mood: '😌',
        type: 'Mindfulness',
        duration: '20 min'
    })

    const [journalEntries, setJournalEntries] = useState([
        {
            id: 1,
            date: '2025-11-27',
            title: 'Morning Meditation Reflection',
            preview: 'Today\'s session brought a sense of deep calm. I focused on breath awareness and noticed...',
            mood: '😌',
            duration: '20 min',
            type: 'Mindfulness',
            liked: false,
            disliked: false
        },
        {
            id: 2,
            date: '2025-11-26',
            title: 'Evening Gratitude Practice',
            preview: 'Grateful for the peaceful moments today. The sunset meditation helped me release tension...',
            mood: '🙏',
            duration: '15 min',
            type: 'Gratitude',
            liked: true,
            disliked: false
        },
        {
            id: 3,
            date: '2025-11-25',
            title: 'Body Scan Insights',
            preview: 'Discovered areas of tension I wasn\'t aware of. The practice of progressive relaxation...',
            mood: '😊',
            duration: '30 min',
            type: 'Body Scan',
            liked: false,
            disliked: false
        }
    ])

    const filters = ['All Entries', 'This Week', 'This Month', 'Favorites']
    const moods = ['😌', '🙏', '😊', '😔', '😤', '🥰', '😐', '🤗']
    const types = ['Mindfulness', 'Gratitude', 'Body Scan', 'Breathing', 'Loving-Kindness']
    const durations = ['5 min', '10 min', '15 min', '20 min', '30 min', '45 min', '60 min']

    const formatDate = (dateString) => {
        const date = new Date(dateString)
        return date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        })
    }

    const handleCreateEntry = () => {
        if (!newEntry.title.trim() || !newEntry.content.trim()) {
            Alert.alert('Error', 'Please fill in title and content')
            return
        }

        const entry = {
            id: journalEntries.length + 1,
            date: new Date().toISOString().split('T')[0],
            title: newEntry.title,
            preview: newEntry.content,
            mood: newEntry.mood,
            duration: newEntry.duration,
            type: newEntry.type,
            liked: false,
            disliked: false
        }

        setJournalEntries([entry, ...journalEntries])
        setModalVisible(false)
        setNewEntry({
            title: '',
            content: '',
            mood: '😌',
            type: 'Mindfulness',
            duration: '20 min'
        })
    }

    const handleEditEntry = () => {
        if (!newEntry.title.trim() || !newEntry.content.trim()) {
            Alert.alert('Error', 'Please fill in title and content')
            return
        }

        const updatedEntries = journalEntries.map(entry =>
            entry.id === selectedEntry.id
                ? { ...entry, title: newEntry.title, preview: newEntry.content, mood: newEntry.mood, type: newEntry.type, duration: newEntry.duration }
                : entry
        )

        setJournalEntries(updatedEntries)
        setEditModalVisible(false)
        setSelectedEntry(null)
        setNewEntry({
            title: '',
            content: '',
            mood: '😌',
            type: 'Mindfulness',
            duration: '20 min'
        })
    }

    const handleDeleteEntry = (id) => {
        Alert.alert(
            'Delete Entry',
            'Are you sure you want to delete this entry?',
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'Delete',
                    style: 'destructive',
                    onPress: () => {
                        setJournalEntries(journalEntries.filter(entry => entry.id !== id))
                    }
                }
            ]
        )
    }

    const handleLike = (id) => {
        setJournalEntries(journalEntries.map(entry =>
            entry.id === id
                ? { ...entry, liked: !entry.liked, disliked: false }
                : entry
        ))
    }

    const handleDislike = (id) => {
        setJournalEntries(journalEntries.map(entry =>
            entry.id === id
                ? { ...entry, disliked: !entry.disliked, liked: false }
                : entry
        ))
    }

    const handleShare = (entry) => {
        Alert.alert('Share Entry', `Sharing: ${entry.title}`)
    }

    const openEditModal = (entry) => {
        setSelectedEntry(entry)
        setNewEntry({
            title: entry.title,
            content: entry.preview,
            mood: entry.mood,
            type: entry.type,
            duration: entry.duration
        })
        setEditModalVisible(true)
    }

    const EntryModal = ({ visible, onClose, onSave, isEdit = false }) => (
        <Modal
            animationType="slide"
            transparent={true}
            visible={visible}
            onRequestClose={onClose}
        >
            <View style={styles.modalOverlay}>
                <View style={styles.modalContent}>
                    {/* Modal Header */}
                    <View style={styles.modalHeader}>
                        <Text style={styles.modalTitle}>{isEdit ? 'Edit Entry' : 'New Entry'}</Text>
                        <TouchableOpacity onPress={onClose}>
                            <Ionicons name="close" size={28} color="#6B7280" />
                        </TouchableOpacity>
                    </View>

                    <ScrollView showsVerticalScrollIndicator={false}>
                        {/* Title Input */}
                        <View style={styles.inputGroup}>
                            <Text style={styles.inputLabel}>Title</Text>
                            <TextInput
                                style={styles.textInput}
                                placeholder="Enter title..."
                                placeholderTextColor="#9CA3AF"
                                value={newEntry.title}
                                onChangeText={(text) => setNewEntry({ ...newEntry, title: text })}
                            />
                        </View>

                        {/* Content Input */}
                        <View style={styles.inputGroup}>
                            <Text style={styles.inputLabel}>Content</Text>
                            <TextInput
                                style={[styles.textInput, styles.textArea]}
                                placeholder="Write your thoughts..."
                                placeholderTextColor="#9CA3AF"
                                multiline
                                numberOfLines={6}
                                value={newEntry.content}
                                onChangeText={(text) => setNewEntry({ ...newEntry, content: text })}
                            />
                        </View>

                        {/* Mood Selection */}
                        <View style={styles.inputGroup}>
                            <Text style={styles.inputLabel}>Mood</Text>
                            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                                <View style={styles.moodContainer}>
                                    {moods.map((mood) => (
                                        <TouchableOpacity
                                            key={mood}
                                            style={[
                                                styles.moodButton,
                                                newEntry.mood === mood && styles.moodButtonActive
                                            ]}
                                            onPress={() => setNewEntry({ ...newEntry, mood })}
                                        >
                                            <Text style={styles.moodEmoji}>{mood}</Text>
                                        </TouchableOpacity>
                                    ))}
                                </View>
                            </ScrollView>
                        </View>

                        {/* Type Selection */}
                        <View style={styles.inputGroup}>
                            <Text style={styles.inputLabel}>Meditation Type</Text>
                            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                                <View style={styles.typeContainer}>
                                    {types.map((type) => (
                                        <TouchableOpacity
                                            key={type}
                                            style={[
                                                styles.typeButton,
                                                newEntry.type === type && styles.typeButtonActive
                                            ]}
                                            onPress={() => setNewEntry({ ...newEntry, type })}
                                        >
                                            <Text style={[
                                                styles.typeText,
                                                newEntry.type === type && styles.typeTextActive
                                            ]}>
                                                {type}
                                            </Text>
                                        </TouchableOpacity>
                                    ))}
                                </View>
                            </ScrollView>
                        </View>

                        {/* Duration Selection */}
                        <View style={styles.inputGroup}>
                            <Text style={styles.inputLabel}>Duration</Text>
                            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                                <View style={styles.durationContainer}>
                                    {durations.map((duration) => (
                                        <TouchableOpacity
                                            key={duration}
                                            style={[
                                                styles.durationButton,
                                                newEntry.duration === duration && styles.durationButtonActive
                                            ]}
                                            onPress={() => setNewEntry({ ...newEntry, duration })}
                                        >
                                            <Text style={[
                                                styles.durationText,
                                                newEntry.duration === duration && styles.durationTextActive
                                            ]}>
                                                {duration}
                                            </Text>
                                        </TouchableOpacity>
                                    ))}
                                </View>
                            </ScrollView>
                        </View>

                        {/* Save Button */}
                        <TouchableOpacity
                            style={styles.saveButton}
                            onPress={onSave}
                        >
                            <Ionicons name="checkmark-circle" size={24} color="#FFFFFF" />
                            <Text style={styles.saveButtonText}>{isEdit ? 'Update Entry' : 'Save Entry'}</Text>
                        </TouchableOpacity>
                    </ScrollView>
                </View>
            </View>
        </Modal>
    )

    return (
        <SafeAreaView style={styles.container}>
            {/* Header */}

            <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
                <View style={styles.header}>
                    <Text style={styles.headerTitle}>My Journal</Text>
                    <Text style={styles.headerSubtitle}>Track your meditation journey</Text>
                </View>

                <View style={styles.content}>
                    {/* Search Bar */}
                    <View style={styles.searchContainer}>
                        <Feather name="search" size={20} color="#9CA3AF" style={styles.searchIcon} />
                        <TextInput
                            style={styles.searchInput}
                            placeholder="Search your entries..."
                            placeholderTextColor="#9CA3AF"
                            value={searchQuery}
                            onChangeText={setSearchQuery}
                        />
                    </View>

                    {/* Filter Tabs */}
                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        style={styles.filtersContainer}
                        contentContainerStyle={styles.filtersContent}
                    >
                        {filters.map((filter) => (
                            <TouchableOpacity
                                key={filter}
                                onPress={() => setSelectedFilter(filter)}
                                style={[
                                    styles.filterButton,
                                    selectedFilter === filter && styles.filterButtonActive
                                ]}
                            >
                                <Text style={[
                                    styles.filterText,
                                    selectedFilter === filter && styles.filterTextActive
                                ]}>
                                    {filter}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>

                    {/* New Entry Button */}
                    <TouchableOpacity
                        style={styles.newEntryButton}
                        onPress={() => setModalVisible(true)}
                    >
                        <Ionicons name="add-circle" size={24} color="#FFFFFF" />
                        <Text style={styles.newEntryText}>Create New Entry</Text>
                    </TouchableOpacity>

                    {/* Journal Entries */}
                    <View style={styles.entriesContainer}>
                        {journalEntries.map((entry) => (
                            <View key={entry.id} style={styles.entryCard}>
                                {/* Entry Header */}
                                <View style={styles.entryHeader}>
                                    <View style={styles.entryHeaderLeft}>
                                        <Text style={styles.entryMood}>{entry.mood}</Text>
                                        <View>
                                            <Text style={styles.entryTitle}>{entry.title}</Text>
                                            <View style={styles.entryDateContainer}>
                                                <Ionicons name="calendar-outline" size={14} color="#6B7280" />
                                                <Text style={styles.entryDate}>{formatDate(entry.date)}</Text>
                                            </View>
                                        </View>
                                    </View>
                                    <View style={styles.entryHeaderRight}>
                                        <View style={styles.typeBadge}>
                                            <Text style={styles.typeBadgeText}>{entry.type}</Text>
                                        </View>
                                        <Text style={styles.entryDuration}>{entry.duration}</Text>
                                    </View>
                                </View>

                                {/* Entry Preview */}
                                <Text style={styles.entryPreview} numberOfLines={2}>
                                    {entry.preview}
                                </Text>

                                {/* Action Buttons */}
                                <View style={styles.actionButtons}>
                                    <View style={styles.actionButtonsLeft}>
                                        {/* Like Button */}
                                        <TouchableOpacity
                                            style={styles.actionButton}
                                            onPress={() => handleLike(entry.id)}
                                        >
                                            <FontAwesome
                                                name={entry.liked ? "thumbs-up" : "thumbs-o-up"}
                                                size={18}
                                                color={entry.liked ? "#7C3AED" : "#6B7280"}
                                            />
                                        </TouchableOpacity>

                                        {/* Dislike Button */}
                                        <TouchableOpacity
                                            style={styles.actionButton}
                                            onPress={() => handleDislike(entry.id)}
                                        >
                                            <FontAwesome
                                                name={entry.disliked ? "thumbs-down" : "thumbs-o-down"}
                                                size={18}
                                                color={entry.disliked ? "#EF4444" : "#6B7280"}
                                            />
                                        </TouchableOpacity>

                                        {/* Share Button */}
                                        <TouchableOpacity
                                            style={styles.actionButton}
                                            onPress={() => handleShare(entry)}
                                        >
                                            <Feather name="share-2" size={18} color="#6B7280" />
                                        </TouchableOpacity>
                                    </View>

                                    <View style={styles.actionButtonsRight}>
                                        {/* Edit Button */}
                                        <TouchableOpacity
                                            style={[styles.actionButton, styles.editButton]}
                                            onPress={() => openEditModal(entry)}
                                        >
                                            <Feather name="edit-2" size={18} color="#3B82F6" />
                                        </TouchableOpacity>

                                        {/* Delete Button */}
                                        <TouchableOpacity
                                            style={[styles.actionButton, styles.deleteButton]}
                                            onPress={() => handleDeleteEntry(entry.id)}
                                        >
                                            <MaterialIcons name="delete-outline" size={20} color="#EF4444" />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        ))}
                    </View>

                    {/* Empty State */}
                    {journalEntries.length === 0 && (
                        <View style={styles.emptyState}>
                            <Text style={styles.emptyStateIcon}>📔</Text>
                            <Text style={styles.emptyStateTitle}>No entries yet</Text>
                            <Text style={styles.emptyStateSubtitle}>Start your meditation journal today</Text>
                        </View>
                    )}
                </View>
            </ScrollView>

            {/* Create Entry Modal */}
            <EntryModal
                visible={modalVisible}
                onClose={() => setModalVisible(false)}
                onSave={handleCreateEntry}
            />

            {/* Edit Entry Modal */}
            <EntryModal
                visible={editModalVisible}
                onClose={() => {
                    setEditModalVisible(false)
                    setSelectedEntry(null)
                }}
                onSave={handleEditEntry}
                isEdit={true}
            />
        </SafeAreaView>
    )
}

export default Journal_Screen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    header: {
        backgroundColor: '#FFFFFF',
        paddingHorizontal: 10,
        paddingVertical: 10,
        borderBottomWidth: 0.2,
        borderBottomColor: '#E5E7EB',
    },
    headerTitle: {
        fontSize: 32,
        fontFamily: 'Heading',
        fontWeight: 'bold',
        color: '#4C1D95',
        marginBottom: 4,
    },
    headerSubtitle: {
        fontSize: 16,
        fontFamily: 'Lato-Bold',
        color: '#6B7280',
    },
    scrollView: {
        flex: 1,
    },
    content: {
        padding: 12,
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        paddingHorizontal: 16,
        paddingVertical: 12,
        marginBottom: 16,
        borderWidth: 2, borderColor: "#9CA3AF"
    },
    searchIcon: {
        marginRight: 12,
    },
    searchInput: {
        flex: 1,
        fontSize: 16,
        fontFamily: 'Lato-Bold',
        color: '#1F2937',
    },
    filtersContainer: {
        marginBottom: 6,
    },
    filtersContent: {
        gap: 6,
        paddingBottom: 8,
    },
    filterButton: {
        paddingHorizontal: 10,
        paddingVertical: 10,
        borderRadius: 10,
        backgroundColor: '#FFFFFF',
    },
    filterButtonActive: {
        backgroundColor: '#7C3AED',
        shadowColor: '#7C3AED',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 4,
    },
    filterText: {
        fontSize: 14,
        fontFamily: 'Lato-Bold',
        color: '#6B7280',
    },
    filterTextActive: {
        color: '#FFFFFF',
    },
    newEntryButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#7C3AED',
        borderRadius: 10,
        paddingVertical: 10,
        marginBottom: 10,
        gap: 12,
        shadowColor: '#7C3AED',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 4,
    },
    newEntryText: {
        fontSize: 16,
        fontFamily: 'Lato-Bold',
        color: '#FFFFFF',
    },
    entriesContainer: {
        gap: 6, marginBottom: 100
    },
    entryCard: {
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        padding: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 4,
        elevation: 3,
        borderWidth: 1,
        borderColor: '#F3F4F6',
    },
    entryHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 12,
    },
    entryHeaderLeft: {
        flexDirection: 'row',
        gap: 12,
        flex: 1,
    },
    entryMood: {
        fontSize: 32,
    },
    entryTitle: {
        fontSize: 18,
        fontFamily: 'Lato-Bold',
        color: '#1F2937',
        marginBottom: 4,
    },
    entryDateContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
    },
    entryDate: {
        fontSize: 12,
        fontFamily: 'Lato-Bold',
        color: '#6B7280',
    },
    entryHeaderRight: {
        alignItems: 'flex-end',
        gap: 4,
    },
    typeBadge: {
        backgroundColor: '#EDE9FE',
        paddingHorizontal: 12,
        paddingVertical: 4,
        borderRadius: 12,
    },
    typeBadgeText: {
        fontSize: 11,
        fontFamily: 'Lato-Bold',
        color: '#7C3AED',
        fontWeight: '700',
    },
    entryDuration: {
        fontSize: 11,
        fontFamily: 'Lato-Bold',
        color: '#6B7280',
    },
    entryPreview: {
        fontSize: 14,
        fontFamily: 'Lato-Regular',
        color: '#6B7280',
        lineHeight: 22,
        marginBottom: 16,
    },
    actionButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: 12,
        borderTopWidth: 1,
        borderTopColor: '#F3F4F6',
    },
    actionButtonsLeft: {
        flexDirection: 'row',
        gap: 12,
    },
    actionButtonsRight: {
        flexDirection: 'row',
        gap: 12,
    },
    actionButton: {
        padding: 8,
        borderRadius: 8,
        backgroundColor: '#F9FAFB',
    },
    editButton: {
        backgroundColor: '#EFF6FF',
    },
    deleteButton: {
        backgroundColor: '#FEF2F2',
    },
    emptyState: {
        alignItems: 'center',
        paddingVertical: 64,
    },
    emptyStateIcon: {
        fontSize: 64,
        marginBottom: 16,
    },
    emptyStateTitle: {
        fontSize: 24,
        fontFamily: 'Heading',
        fontWeight: 'bold',
        color: '#6B7280',
        marginBottom: 8,
    },
    emptyStateSubtitle: {
        fontSize: 16,
        fontFamily: 'Lato-Bold',
        color: '#9CA3AF',
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'flex-end',
    },
    modalContent: {
        backgroundColor: '#FFFFFF',
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        padding: 24,
        maxHeight: '90%',
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 24,
    },
    modalTitle: {
        fontSize: 24,
        fontFamily: 'Heading',
        fontWeight: 'bold',
        color: '#1F2937',
    },
    inputGroup: {
        marginBottom: 20,
    },
    inputLabel: {
        fontSize: 14,
        fontFamily: 'Lato-Bold',
        color: '#374151',
        marginBottom: 8,
        fontWeight: '700',
    },
    textInput: {
        backgroundColor: '#F9FAFB',
        borderRadius: 12,
        padding: 14,
        fontSize: 16,
        fontFamily: 'Lato-Regular',
        color: '#1F2937',
        borderWidth: 1,
        borderColor: '#E5E7EB',
    },
    textArea: {
        height: 120,
        textAlignVertical: 'top',
    },
    moodContainer: {
        flexDirection: 'row',
        gap: 12,
    },
    moodButton: {
        width: 56,
        height: 56,
        borderRadius: 28,
        backgroundColor: '#F9FAFB',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#E5E7EB',
    },
    moodButtonActive: {
        backgroundColor: '#EDE9FE',
        borderColor: '#7C3AED',
    },
    moodEmoji: {
        fontSize: 28,
    },
    typeContainer: {
        flexDirection: 'row',
        gap: 12,
    },
    typeButton: {
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderRadius: 20,
        backgroundColor: '#F9FAFB',
        borderWidth: 1,
        borderColor: '#E5E7EB',
    },
    typeButtonActive: {
        backgroundColor: '#7C3AED',
        borderColor: '#7C3AED',
    },
    typeText: {
        fontSize: 14,
        fontFamily: 'Lato-Bold',
        color: '#6B7280',
    },
    typeTextActive: {
        color: '#FFFFFF',
    },
    durationContainer: {
        flexDirection: 'row',
        gap: 12,
    },
    durationButton: {
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderRadius: 20,
        backgroundColor: '#F9FAFB',
        borderWidth: 1,
        borderColor: '#E5E7EB',
    },
    durationButtonActive: {
        backgroundColor: '#7C3AED',
        borderColor: '#7C3AED',
    },
    durationText: {
        fontSize: 14,
        fontFamily: 'Lato-Bold',
        color: '#6B7280',
    },
    durationTextActive: {
        color: '#FFFFFF',
    },
    saveButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#7C3AED',
        borderRadius: 12,
        paddingVertical: 16,
        marginTop: 12,
        gap: 8,
    },
    saveButtonText: {
        fontSize: 16,
        fontFamily: 'Lato-Bold',
        color: '#FFFFFF',
        fontWeight: '700',
    },
})