import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect, useState } from 'react';
import {
    ActivityIndicator,
    FlatList,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';

const allPlaylists = [
    { id: 1, name: 'Morning Meditation', icon: '🌅', duration: '45 min', uri: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3' },
    { id: 2, name: 'Sleep Sounds', icon: '🌙', duration: '2h 30min', uri: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3' },
    { id: 3, name: 'Nature Sounds', icon: '🌿', duration: '1h 45min', uri: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3' },
    { id: 4, name: 'Deep Focus', icon: '🧘', duration: '1h 10min', uri: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3' },
    { id: 5, name: 'Rain Calm', icon: '🌧️', duration: '50 min', uri: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3' },
    { id: 6, name: 'Healing Vibes', icon: '💫', duration: '1h', uri: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3' },
    { id: 7, name: 'Chakra Balance', icon: '🔮', duration: '2h', uri: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3' },
    { id: 8, name: 'Ocean Waves', icon: '🌊', duration: '1h 15min', uri: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3' },
    { id: 9, name: 'Temple Bells', icon: '🔔', duration: '25 min', uri: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3' },
];

export default function Music_Screen() {
    const navigation = useNavigation();
    const [search, setSearch] = useState('');
    const [data, setData] = useState([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);

    const pageSize = 4;

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

    const filteredData = data.filter(item =>
        item.name.toLowerCase().includes(search.toLowerCase())
    );

    const renderItem = ({ item }) => (
        <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => navigation.navigate('Single_Music', { track: item })}
        >
            <LinearGradient
                colors={['#ffffff', '#f8f5ff']}
                style={styles.card}
            >
                <Text style={styles.icon}>{item.icon}</Text>
                <View style={{ flex: 1 }}>
                    <Text style={styles.name}>{item.name}</Text>
                    <Text style={styles.duration}>{item.duration}</Text>
                </View>
                <Text style={styles.play}>▶️</Text>
            </LinearGradient>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <LinearGradient
                colors={['#E0EAFC', '#CFDEF3']}
                style={StyleSheet.absoluteFillObject}
            />
            <Text style={styles.title}>Meditation Music</Text>
            <TextInput
                placeholder="Search music..."
                placeholderTextColor="#555"
                style={styles.searchInput}
                value={search}
                onChangeText={setSearch}
            />
            <FlatList
                data={filteredData}
                renderItem={renderItem}
                keyExtractor={(item) => item.id.toString()}
                contentContainerStyle={{ paddingBottom: 100 }}
                onEndReached={loadMore}
                onEndReachedThreshold={0.5}
                ListFooterComponent={loading ? <ActivityIndicator size="large" /> : null}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, paddingTop: 50 },
    title: { fontSize: 28, fontWeight: '700', marginBottom: 15, color: '#2c2c2c' },
    searchInput: {
        backgroundColor: '#fff',
        borderRadius: 10,
        paddingHorizontal: 15,
        paddingVertical: 10,
        marginBottom: 20,
        fontSize: 16,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    card: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
        borderRadius: 15,
        marginBottom: 12,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 3,
    },
    icon: { fontSize: 30, marginRight: 10 },
    name: { fontSize: 17, fontWeight: '600', color: '#2c2c2c' },
    duration: { color: '#666', fontSize: 13 },
    play: { fontSize: 20, color: '#3b82f6' },
});
