import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useMemo, useState } from 'react';
import { FlatList, Keyboard, Modal, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';

const MeditationLists = () => {
    const navigation = useNavigation();
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');
    const [showSearchModal, setShowSearchModal] = useState(false);

    // Sample meditation data
    const meditationTracks = [
        {
            id: '1',
            name: 'Ocean Waves',
            duration: '10:30',
            category: 'Nature Sounds',
            icon: '🌊',
            uri: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
            gradient: ['#6DD5FA', '#2980B9'],
        },
        {
            id: '2',
            name: 'Forest Meditation',
            duration: '8:45',
            category: 'Deep Focus',
            icon: '🌲',
            uri: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
            gradient: ['#56AB2F', '#A8E063'],
        },
        {
            id: '3',
            name: 'Mountain Peace',
            duration: '12:15',
            category: 'Relaxation',
            icon: '⛰️',
            uri: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
            gradient: ['#834D9B', '#D04ED6'],
        },
        {
            id: '4',
            name: 'Sunrise Calm',
            duration: '9:20',
            category: 'Morning',
            icon: '🌅',
            uri: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3',
            gradient: ['#F2994A', '#F2C94C'],
        },
        {
            id: '5',
            name: 'Rain Sounds',
            duration: '15:00',
            category: 'Sleep',
            icon: '🌧️',
            uri: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3',
            gradient: ['#4A5568', '#718096'],
        },
        {
            id: '6',
            name: 'Starry Night',
            duration: '11:30',
            category: 'Sleep',
            icon: '⭐',
            uri: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3',
            gradient: ['#0F2027', '#203A43', '#2C5364'],
        },
        {
            id: '7',
            name: 'Birds Chirping',
            duration: '7:45',
            category: 'Nature Sounds',
            icon: '🐦',
            uri: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3',
            gradient: ['#56CCF2', '#2F80ED'],
        },
        {
            id: '8',
            name: 'Desert Wind',
            duration: '10:00',
            category: 'Ambient',
            icon: '🏜️',
            uri: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3',
            gradient: ['#F46B45', '#EEA849'],
        },
        {
            id: '9',
            name: 'Waterfall Flow',
            duration: '13:20',
            category: 'Nature Sounds',
            icon: '💧',
            uri: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3',
            gradient: ['#43C6AC', '#191654'],
        },
        {
            id: '10',
            name: 'Moonlight Serenity',
            duration: '14:15',
            category: 'Sleep',
            icon: '🌙',
            uri: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3',
            gradient: ['#667EEA', '#764BA2'],
        },
    ];

    // Filter tracks based on selected category and search query
    const filteredTracks = useMemo(() => {
        let tracks = meditationTracks;

        // Filter by category
        if (selectedCategory !== 'All') {
            const categoryMap = {
                'Nature': 'Nature Sounds',
                'Sleep': 'Sleep',
                'Focus': 'Deep Focus',
            };
            const actualCategory = categoryMap[selectedCategory] || selectedCategory;
            tracks = tracks.filter(track => track.category === actualCategory);
        }

        // Filter by search query
        if (searchQuery.trim() !== '') {
            const query = searchQuery.toLowerCase();
            tracks = tracks.filter(track =>
                track.name.toLowerCase().includes(query) ||
                track.category.toLowerCase().includes(query)
            );
        }

        return tracks;
    }, [selectedCategory, searchQuery]);

    const handleTrackPress = (track) => {
        navigation.navigate('MeditationDetailScreen', {
            track: track,
            playlist: meditationTracks,
        });
    };

    const handleCategoryPress = (category) => {
        setSelectedCategory(category);
    };

    const handleBackPress = () => {
        Keyboard.dismiss();
        navigation.goBack();
    };

    const renderMeditationItem = ({ item }) => (
        <TouchableOpacity
            style={styles.card}
            onPress={() => handleTrackPress(item)}
            activeOpacity={0.8}
        >
            <LinearGradient
                colors={item.gradient}
                style={styles.cardGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
            >
                {/* Icon/Emoji */}
                <View style={styles.iconContainer}>
                    <Text style={styles.icon}>{item.icon}</Text>
                </View>

                {/* Track Info */}
                <View style={styles.infoContainer}>
                    <Text style={styles.trackName} numberOfLines={1}>
                        {item.name}
                    </Text>
                    <Text style={styles.category}>{item.category}</Text>
                    <View style={styles.bottomRow}>
                        <View style={styles.durationRow}>
                            <Ionicons name="time-outline" size={14} color="rgba(255,255,255,0.9)" />
                            <Text style={styles.duration}>{item.duration}</Text>
                        </View>
                        <Ionicons name="play-circle" size={24} color="rgba(255,255,255,0.9)" />
                    </View>
                </View>
            </LinearGradient>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity
                    style={styles.backBtn}
                    onPress={handleBackPress}
                >
                    <Ionicons name="arrow-back" size={24} color="#333" />
                </TouchableOpacity>

                <View style={styles.headerTextContainer}>
                    <Text style={styles.headerTitle}>Meditation</Text>
                    <Text style={styles.headerSubtitle}>
                        {filteredTracks.length} tracks available
                    </Text>
                </View>

                <TouchableOpacity
                    style={styles.searchBtn}
                    onPress={() => setShowSearchModal(true)}
                >
                    <Ionicons name="search" size={24} color="#333" />
                </TouchableOpacity>
            </View>

            {/* Categories Filter */}
            <View style={styles.categoriesContainer}>
                <TouchableOpacity
                    style={[styles.categoryChip, selectedCategory === 'All' && styles.categoryChipActive]}
                    onPress={() => handleCategoryPress('All')}
                >
                    <Text style={selectedCategory === 'All' ? styles.categoryChipTextActive : styles.categoryChipText}>
                        All
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.categoryChip, selectedCategory === 'Nature' && styles.categoryChipActive]}
                    onPress={() => handleCategoryPress('Nature')}
                >
                    <Text style={selectedCategory === 'Nature' ? styles.categoryChipTextActive : styles.categoryChipText}>
                        Nature
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.categoryChip, selectedCategory === 'Sleep' && styles.categoryChipActive]}
                    onPress={() => handleCategoryPress('Sleep')}
                >
                    <Text style={selectedCategory === 'Sleep' ? styles.categoryChipTextActive : styles.categoryChipText}>
                        Sleep
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.categoryChip, selectedCategory === 'Focus' && styles.categoryChipActive]}
                    onPress={() => handleCategoryPress('Focus')}
                >
                    <Text style={selectedCategory === 'Focus' ? styles.categoryChipTextActive : styles.categoryChipText}>
                        Focus
                    </Text>
                </TouchableOpacity>
            </View>

            {/* Search Query Display */}
            {searchQuery.trim() !== '' && (
                <View style={styles.searchQueryContainer}>
                    <Text style={styles.searchQueryText}>
                        Searching for: "{searchQuery}"
                    </Text>
                    <TouchableOpacity onPress={() => setSearchQuery('')}>
                        <Ionicons name="close-circle" size={20} color="#718096" />
                    </TouchableOpacity>
                </View>
            )}

            {/* Meditation List */}
            <FlatList
                data={filteredTracks}
                renderItem={renderMeditationItem}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.listContainer}
                showsVerticalScrollIndicator={false}
                ListEmptyComponent={
                    <View style={styles.emptyContainer}>
                        <Ionicons name="search-outline" size={64} color="#CBD5E0" />
                        <Text style={styles.emptyText}>No tracks found</Text>
                        <Text style={styles.emptySubtext}>
                            Try adjusting your search or filters
                        </Text>
                    </View>
                }
            />

            {/* Search Modal */}
            <Modal
                visible={showSearchModal}
                animationType="slide"
                transparent={true}
                onRequestClose={() => {
                    Keyboard.dismiss();
                    setShowSearchModal(false);
                }}
            >
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={styles.modalOverlay}>
                        <TouchableWithoutFeedback onPress={() => { }}>
                            <View style={styles.modalContent}>
                                <View style={styles.modalHeader}>
                                    <Text style={styles.modalTitle}>Search Meditations</Text>
                                    <TouchableOpacity onPress={() => {
                                        Keyboard.dismiss();
                                        setShowSearchModal(false);
                                    }}>
                                        <Ionicons name="close" size={28} color="#333" />
                                    </TouchableOpacity>
                                </View>

                                <View style={styles.searchInputContainer}>
                                    <Ionicons name="search" size={20} color="#718096" />
                                    <TextInput
                                        style={styles.searchInput}
                                        placeholder="Search by name or category..."
                                        value={searchQuery}
                                        onChangeText={setSearchQuery}
                                        autoFocus
                                        returnKeyType="search"
                                        onSubmitEditing={() => {
                                            Keyboard.dismiss();
                                            setShowSearchModal(false);
                                        }}
                                    />
                                    {searchQuery !== '' && (
                                        <TouchableOpacity onPress={() => setSearchQuery('')}>
                                            <Ionicons name="close-circle" size={20} color="#718096" />
                                        </TouchableOpacity>
                                    )}
                                </View>

                                <TouchableOpacity
                                    style={styles.searchButton}
                                    onPress={() => {
                                        Keyboard.dismiss();
                                        setShowSearchModal(false);
                                    }}
                                >
                                    <Text style={styles.searchButtonText}>Apply Search</Text>
                                </TouchableOpacity>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>
        </View>
    );
};

export default MeditationLists;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8F9FA',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingTop: 60,
        paddingBottom: 20,
        backgroundColor: '#fff',
    },
    backBtn: {
        width: 45,
        height: 45,
        borderRadius: 22.5,
        backgroundColor: '#F7FAFC',
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerTextContainer: {
        flex: 1,
        marginHorizontal: 15,
    },
    headerTitle: {
        fontSize: 32,
        fontWeight: '700',
        color: '#1A202C',
        marginBottom: 4,
    },
    headerSubtitle: {
        fontSize: 14,
        color: '#718096',
    },
    searchBtn: {
        width: 45,
        height: 45,
        borderRadius: 22.5,
        backgroundColor: '#F7FAFC',
        justifyContent: 'center',
        alignItems: 'center',
    },
    categoriesContainer: {
        flexDirection: 'row',
        paddingHorizontal: 20,
        paddingVertical: 15,
        gap: 10,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#E2E8F0',
    },
    categoryChip: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 20,
        backgroundColor: '#F7FAFC',
    },
    categoryChipActive: {
        backgroundColor: '#4A5568',
    },
    categoryChipText: {
        fontSize: 14,
        color: '#4A5568',
        fontWeight: '600',
    },
    categoryChipTextActive: {
        fontSize: 14,
        color: '#fff',
        fontWeight: '600',
    },
    searchQueryContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 12,
        backgroundColor: '#EDF2F7',
        borderBottomWidth: 1,
        borderBottomColor: '#E2E8F0',
    },
    searchQueryText: {
        fontSize: 14,
        color: '#4A5568',
        fontWeight: '500',
    },
    listContainer: {
        padding: 20,
        paddingBottom: 100,
    },
    card: {
        marginBottom: 16,
        borderRadius: 20,
        overflow: 'hidden',
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 8,
    },
    cardGradient: {
        flexDirection: 'row',
        padding: 16,
        minHeight: 110,
    },
    iconContainer: {
        width: 70,
        height: 70,
        borderRadius: 35,
        backgroundColor: 'rgba(255,255,255,0.3)',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
    },
    icon: {
        fontSize: 36,
    },
    infoContainer: {
        flex: 1,
        justifyContent: 'space-between',
    },
    trackName: {
        fontSize: 20,
        fontWeight: '700',
        color: '#fff',
        marginBottom: 4,
    },
    category: {
        fontSize: 13,
        color: 'rgba(255,255,255,0.9)',
        marginBottom: 8,
    },
    bottomRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    durationRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    duration: {
        fontSize: 13,
        color: 'rgba(255,255,255,0.9)',
        fontWeight: '500',
    },
    emptyContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 60,
    },
    emptyText: {
        fontSize: 18,
        fontWeight: '600',
        color: '#4A5568',
        marginTop: 16,
    },
    emptySubtext: {
        fontSize: 14,
        color: '#718096',
        marginTop: 8,
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'flex-end',
    },
    modalContent: {
        backgroundColor: '#fff',
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        padding: 25,
        paddingBottom: 40,
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    modalTitle: {
        fontSize: 24,
        fontWeight: '700',
        color: '#1A202C',
    },
    searchInputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F7FAFC',
        borderRadius: 12,
        paddingHorizontal: 16,
        paddingVertical: 12,
        marginBottom: 20,
        gap: 10,
    },
    searchInput: {
        flex: 1,
        fontSize: 16,
        color: '#1A202C',
    },
    searchButton: {
        backgroundColor: '#4A5568',
        borderRadius: 12,
        paddingVertical: 16,
        alignItems: 'center',
    },
    searchButtonText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#fff',
    },
});