import React, { useEffect, useState } from 'react';
import { 
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  Image,
  Dimensions,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { fetchAttractions } from '../service/AtraksiService';
import Icon from 'react-native-vector-icons/Ionicons';

const { width } = Dimensions.get('window');

const Home = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [filteredData, setFilteredData] = useState([]);

  const categories = ['All', 'Popular', 'Recommended', 'New'];

  const getData = async () => {
    try {
      const result = await fetchAttractions();
      setData(result);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    if (data.length > 0) {
      setFilteredData(data);
    }
  }, [data]);

  const onRefresh = async () => {
    setRefreshing(true);
    await getData();
    setRefreshing(false); // Ensure refreshing state is reset
  };

  const handleCategoryPress = (category) => {
    setSelectedCategory(category);
    filterData(category);
  };

  const filterData = (category) => {
    let filtered = data;

    if (category !== 'All') {
      switch(category) {
        case 'Popular':
          filtered = filtered.filter(item => item.rating >= 4);
          break;
        case 'Recommended':
          filtered = filtered.slice(0, 5);
          break;
        case 'New':
          filtered = filtered.slice(-5);
          break;
      }
    }

    setFilteredData(filtered);
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.card} activeOpacity={0.95}>
      {item.photo && item.photo.images && item.photo.images.small && (
        <View style={styles.imageContainer}>
          <Image 
            source={{ uri: item.photo.images.small.url }}
            style={styles.image}
            resizeMode="cover"
          />
          <View style={styles.overlay} />
          <View style={styles.cardOverlay}>
            <View style={styles.cardHeader}>
              <View style={styles.tagContainer}>
                <Text style={styles.tag}>Featured</Text>
              </View>
              <TouchableOpacity style={styles.favoriteButton}>
                <Icon name="heart-outline" size={24} color="#fff" />
              </TouchableOpacity>
            </View>
            <View style={styles.cardContent}>
              <Text style={styles.title} numberOfLines={2}>{item.name}</Text>
              <View style={styles.infoRow}>
                <Icon name="location-outline" size={16} color="#fff" />
                <Text style={styles.location} numberOfLines={1}>{item.location_string}</Text>
              </View>
              <View style={styles.statsContainer}>
                <View style={styles.stat}>
                  <Icon name="star" size={16} color="#FFD700" />
                  <Text style={styles.statText}>4.5</Text>
                </View>
                <View style={styles.stat}>
                  <Icon name="time-outline" size={16} color="#fff" />
                  <Text style={styles.statText}>2-3 hours</Text>
                </View>
                <View style={styles.priceTag}>
                  <Text style={styles.priceText}>$50</Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      )}
    </TouchableOpacity>
  );

  const renderHeader = () => (
    <View style={styles.header}>
      <View style={styles.headerTop}>
        <View>
          <Text style={styles.welcomeText}>Hello, Traveler!</Text>
          <Text style={styles.headerTitle}>Discover Amazing Places</Text>
        </View>
        <TouchableOpacity style={styles.profileButton}>
          <Image 
            source={{ uri: 'https://randomuser.me/api/portraits/men/1.jpg' }}
            style={styles.profileImage}
          />
        </TouchableOpacity>
      </View>

      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categoriesContainer}
      >
        {categories.map((category) => (
          <TouchableOpacity 
            key={category}
            style={[
              styles.categoryButton,
              selectedCategory === category && styles.categoryButtonActive
            ]}
            onPress={() => handleCategoryPress(category)}
          >
            <Text style={[
              styles.categoryText,
              selectedCategory === category && styles.categoryTextActive
            ]}>{category}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#FF385C" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <FlatList
        data={filteredData}
        keyExtractor={(item) => item.id?.toString()}
        renderItem={renderItem}
        ListHeaderComponent={renderHeader}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        refreshing={refreshing}
        onRefresh={onRefresh}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    padding: 20,
    backgroundColor: '#fff',
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  welcomeText: {
    fontSize: 16,
    color: '#666',
    marginBottom: 4,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1A1A1A',
  },
  profileButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: '#FF385C',
  },
  profileImage: {
    width: '100%',
    height: '100%',
  },
  categoriesContainer: {
    paddingVertical: 10,
  },
  categoryButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginRight: 12,
    borderRadius: 25,
    backgroundColor: '#f8f9fa',
    borderWidth: 1,
    borderColor: '#eee',
  },
  categoryButtonActive: {
    backgroundColor: '#FF385C',
    borderColor: '#FF385C',
  },
  categoryText: {
    fontSize: 15,
    fontWeight: '500',
    color: '#666',
  },
  categoryTextActive: {
    color: '#fff',
  },
  list: {
    padding: 20,
  },
  card: {
    marginBottom: 20,
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor: '#fff',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  imageContainer: {
    position: 'relative',
    height: width * 0.6,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  overlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  cardOverlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    padding: 20,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  tagContainer: {
    backgroundColor: '#FF385C',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  tag: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  favoriteButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  location: {
    fontSize: 16,
    color: '#fff',
    marginLeft: 4,
    flex: 1,
  },
  statsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  stat: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  statText: {
    marginLeft: 4,
    fontSize: 14,
    color: '#fff',
    fontWeight: '500',
  },
  priceTag: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginLeft: 'auto',
  },
  priceText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Home;
