import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect, useState } from 'react';
import {
    ActivityIndicator,
    FlatList,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const categories = [
    { id: 1, name: 'Stress Relief', icon: 'cloud-outline', color: '#10B981' },
    { id: 2, name: 'Anxiety', icon: 'heart-outline', color: '#EC4899' },
    { id: 3, name: 'Depression', icon: 'sunny-outline', color: '#F59E0B' },
    { id: 4, name: 'Sleep', icon: 'moon-outline', color: '#6366F1' },
    { id: 5, name: 'Focus', icon: 'bulb-outline', color: '#8B5CF6' },
    { id: 6, name: 'Meditation', icon: 'person-outline', color: '#0EA5E9' },
    { id: 7, name: 'Relaxation', icon: 'leaf-outline', color: '#059669' },
    { id: 8, name: 'Energy Boost', icon: 'flash-outline', color: '#EF4444' },
    { id: 9, name: 'Self-Love', icon: 'heart-circle-outline', color: '#F472B6' },
    { id: 10, name: 'Breathing', icon: 'fitness-outline', color: '#14B8A6' },
    { id: 11, name: 'Pain Relief', icon: 'medical-outline', color: '#DC2626' },
    { id: 12, name: 'Confidence', icon: 'trophy-outline', color: '#F97316' },
    { id: 13, name: 'Gratitude', icon: 'gift-outline', color: '#84CC16' },
    { id: 14, name: 'Healing', icon: 'bandage-outline', color: '#06B6D4' },
    { id: 15, name: 'Morning', icon: 'cafe-outline', color: '#FBBF24' },
    { id: 16, name: 'Night', icon: 'moon', color: '#4F46E5' },
    { id: 17, name: 'Yoga', icon: 'body-outline', color: '#7C3AED' },
    { id: 18, name: 'Nature', icon: 'partly-sunny-outline', color: '#22C55E' },
    { id: 19, name: 'Chakra', icon: 'aperture-outline', color: '#A855F7' },
    { id: 20, name: 'Mindfulness', icon: 'infinite-outline', color: '#0891B2' },
];

const allPlaylists = [
    { id: 1, name: 'Morning Meditation', category: 'Morning', duration: '45 min', uri: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3' },
    { id: 2, name: 'Sleep Sounds', category: 'Sleep', duration: '2h 30min', uri: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3' },
    { id: 3, name: 'Nature Sounds', category: 'Nature', duration: '1h 45min', uri: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3' },
    { id: 4, name: 'Deep Focus', category: 'Focus', duration: '1h 10min', uri: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3' },
    { id: 5, name: 'Rain Calm', category: 'Relaxation', duration: '50 min', uri: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3' },
    { id: 6, name: 'Healing Vibes', category: 'Healing', duration: '1h', uri: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3' },
    { id: 7, name: 'Chakra Balance', category: 'Chakra', duration: '2h', uri: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3' },
    { id: 8, name: 'Ocean Waves', category: 'Nature', duration: '1h 15min', uri: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3' },
    { id: 9, name: 'Temple Bells', category: 'Meditation', duration: '25 min', uri: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3' },
    { id: 10, name: 'Stress Buster', category: 'Stress Relief', duration: '35 min', uri: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3' },
    { id: 11, name: 'Anxiety Relief', category: 'Anxiety', duration: '40 min', uri: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3' },
    { id: 12, name: 'Depression Help', category: 'Depression', duration: '55 min', uri: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3' },
    { id: 13, name: 'Energy Flow', category: 'Energy Boost', duration: '30 min', uri: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3' },
    { id: 14, name: 'Self Love Journey', category: 'Self-Love', duration: '45 min', uri: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3' },
    { id: 15, name: 'Breathing Exercise', category: 'Breathing', duration: '20 min', uri: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3' },
    { id: 16, name: 'Pain Management', category: 'Pain Relief', duration: '1h 5min', uri: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3' },
    { id: 17, name: 'Confidence Builder', category: 'Confidence', duration: '38 min', uri: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3' },
    { id: 18, name: 'Gratitude Practice', category: 'Gratitude', duration: '28 min', uri: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3' },
    { id: 19, name: 'Night Relaxation', category: 'Night', duration: '1h 50min', uri: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3' },
    { id: 20, name: 'Yoga Flow', category: 'Yoga', duration: '1h 20min', uri: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3' },
    { id: 21, name: 'Mindful Moments', category: 'Mindfulness', duration: '42 min', uri: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3' },
];

export default function Music_Screen() {
    const navigation = useNavigation();
    const [search, setSearch] = useState('');
    const [data, setData] = useState([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState('All');

    const pageSize = 6;

    useEffect(() => {
        loadMore();
    }, []);

    const loadMore = () => {
        if (loading) return;
        setLoading(true);
        setTimeout(() => {
            const newData = allPlaylists.slice(0, page * pageSize);
            setData(newData);
            setPage(page + 1);
            setLoading(false);
        }, 500);
    };

    const filteredData = data.filter(item => {
        const matchesSearch = item.name.toLowerCase().includes(search.toLowerCase());
        const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    const renderItem = ({ item }) => {
        const categoryData = categories.find(cat => cat.name === item.category);
        return (
            <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => navigation.navigate('Single_Music', { track: item })}
            >
                <LinearGradient
                    colors={['#ffffff', '#f8f5ff']}
                    style={styles.card}
                >
                    <View style={[styles.categoryBadge, { backgroundColor: categoryData?.color + '20' || '#E5E7EB' }]}>
                        <Ionicons name={categoryData?.icon || 'musical-notes-outline'} size={24} color={categoryData?.color || '#666'} />
                    </View>
                    <View style={{ flex: 1 }}>
                        <Text style={styles.name}>{item.name}</Text>
                        <Text style={styles.category}>{item.category}</Text>
                        <Text style={styles.duration}>{item.duration}</Text>
                    </View>
                    <TouchableOpacity style={styles.playButton}>
                        <Ionicons name="play-circle" size={40} color="#EA580C" />
                    </TouchableOpacity>
                </LinearGradient>
            </TouchableOpacity>
        );
    };

    const renderCategoryItem = ({ item }) => {
        const isSelected = selectedCategory === item.name;
        return (
            <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => setSelectedCategory(item.name)}
            >
                <LinearGradient
                    colors={isSelected ? [item.color, item.color + 'CC'] : ['#ffffff', '#f8f5ff']}
                    style={styles.categoryCard}
                >
                    <Ionicons
                        name={item.icon}
                        size={20}
                        color={isSelected ? '#fff' : item.color}
                    />
                    <Text style={[styles.categoryName, isSelected && styles.categoryNameSelected]}>
                        {item.name}
                    </Text>
                </LinearGradient>
            </TouchableOpacity>
        );
    };

    return (
        <LinearGradient
            colors={['#E8624E', '#F3A469']}
            style={styles.container}
        >
            <SafeAreaView style={{ flex: 1 }} edges={['top']}>
                {/* Header */}
                <View style={styles.header}>
                    <TouchableOpacity
                        onPress={() => navigation.goBack()}
                        style={styles.backButton}
                    >
                        <Ionicons name="arrow-back" size={24} color="#fff" />
                    </TouchableOpacity>
                    <Text style={styles.title}>Meditation Music</Text>
                    <View style={styles.placeholder} />
                </View>

                {/* Search Bar */}
                <View style={styles.searchContainer}>
                    <Ionicons name="search" size={20} color="#666" style={styles.searchIcon} />
                    <TextInput
                        placeholder="Search music..."
                        placeholderTextColor="#999"
                        style={styles.searchInput}
                        value={search}
                        onChangeText={setSearch}
                    />
                    {search.length > 0 && (
                        <TouchableOpacity onPress={() => setSearch('')}>
                            <Ionicons name="close-circle" size={20} color="#666" />
                        </TouchableOpacity>
                    )}
                </View>

                {/* Categories */}
                <View style={styles.categoriesSection}>
                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={styles.categoriesScroll}
                    >
                        <TouchableOpacity
                            activeOpacity={0.7}
                            onPress={() => setSelectedCategory('All')}
                        >
                            <LinearGradient
                                colors={selectedCategory === 'All' ? ['#EA580C', '#F59E0B'] : ['#ffffff', '#f8f5ff']}
                                style={styles.categoryCard}
                            >
                                <Ionicons
                                    name="grid-outline"
                                    size={20}
                                    color={selectedCategory === 'All' ? '#fff' : '#EA580C'}
                                />
                                <Text style={[styles.categoryName, selectedCategory === 'All' && styles.categoryNameSelected]}>
                                    All
                                </Text>
                            </LinearGradient>
                        </TouchableOpacity>
                        <FlatList
                            data={categories}
                            renderItem={renderCategoryItem}
                            keyExtractor={(item) => item.id.toString()}
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            scrollEnabled={false}
                        />
                    </ScrollView>
                </View>

                {/* Music List */}
                <FlatList
                    data={filteredData}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id.toString()}
                    contentContainerStyle={{ paddingBottom: 100, paddingHorizontal: 10 }}
                    onEndReached={loadMore}
                    onEndReachedThreshold={0.5}
                    ListFooterComponent={loading ? (
                        <View style={styles.loaderContainer}>
                            <ActivityIndicator size="large" color="#EA580C" />
                        </View>
                    ) : null}
                    ListEmptyComponent={
                        !loading && (
                            <View style={styles.emptyContainer}>
                                <Ionicons name="musical-notes-outline" size={60} color="#999" />
                                <Text style={styles.emptyText}>No music found</Text>
                            </View>
                        )
                    }
                />
            </SafeAreaView>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        paddingVertical: 15,
    },
    backButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: 'rgba(255,255,255,0.2)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 22,
        fontFamily: 'Lato-Bold',
        color: '#fff',
        flex: 1,
        textAlign: 'center',
    },
    placeholder: {
        width: 40,
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 12,
        paddingHorizontal: 15,
        paddingVertical: 12,
        marginHorizontal: 10,
        marginBottom: 15,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    searchIcon: {
        marginRight: 10,
    },
    searchInput: {
        flex: 1,
        fontSize: 16,
        color: '#2c2c2c',
        fontFamily: 'Lato-Regular',
    },
    categoriesSection: {
        marginBottom: 15,
    },
    categoriesScroll: {
        paddingHorizontal: 10,
        gap: 10,
    },
    categoryCard: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderRadius: 20,
        marginRight: 10,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
        gap: 8,
    },
    categoryName: {
        fontSize: 14,
        fontFamily: 'Lato-Bold',
        color: '#2c2c2c',
    },
    categoryNameSelected: {
        color: '#fff',
    },
    card: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
        borderRadius: 16,
        marginBottom: 12,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 4,
    },
    categoryBadge: {
        width: 50,
        height: 50,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    name: {
        fontSize: 17,
        fontFamily: 'Lato-Bold',
        color: '#2c2c2c',
        marginBottom: 4,
    },
    category: {
        fontSize: 13,
        fontFamily: 'Lato-Regular',
        color: '#666',
        marginBottom: 2,
    },
    duration: {
        color: '#999',
        fontSize: 12,
        fontFamily: 'Lato-Regular',
    },
    playButton: {
        marginLeft: 10,
    },
    loaderContainer: {
        paddingVertical: 20,
        alignItems: 'center',
    },
    emptyContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 60,
    },
    emptyText: {
        fontSize: 16,
        color: '#fff',
        marginTop: 10,
        fontFamily: 'Lato-Regular',
    },
});