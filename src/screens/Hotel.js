import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import axios from 'axios';
import HotelModal from '../components/ModalHotel';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

const HotelList = () => {
  const navigation = useNavigation();
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedHotel, setSelectedHotel] = useState(null);

  useEffect(() => {
    fetchHotels();
  }, []);

  const fetchHotels = async () => {
    try {
      const response = await axios.get('https://travel-api2024-default-rtdb.asia-southeast1.firebasedatabase.app/hotel.json');
      const hotelsArray = Object.values(response.data);
      setHotels(hotelsArray);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching hotels:', error);
      setLoading(false);
    }
  };

  const formatPrice = (price) => {
    return price.toLocaleString('id-ID', {
      style: 'currency',
      currency: 'IDR'
    });
  };

  const handleHotelPress = (hotel) => {
    setSelectedHotel(hotel);
    setModalVisible(true);
  };

  const renderHeader = () => (
    <View style={styles.header}>
      <TouchableOpacity 
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Icon name="arrow-back" size={24} color="#333" />
      </TouchableOpacity>
      <View style={styles.headerTextContainer}>
        <Text style={styles.headerTitle}>Hotels</Text>
        <Text style={styles.headerSubtitle}>{hotels.length} properties found</Text>
      </View>
      <TouchableOpacity style={styles.filterButton}>
        <Icon name="options-outline" size={24} color="#333" />
      </TouchableOpacity>
    </View>
  );

  const renderHotelItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.card}
      onPress={() => handleHotelPress(item)}
      activeOpacity={0.95}
    >
      <View style={styles.imageContainer}>
        <Image 
          source={{ uri: item.image_url }} 
          style={styles.image}
          resizeMode="cover"
        />
        <View style={styles.favoriteButton}>
          <Icon name="heart-outline" size={20} color="#fff" />
        </View>
      </View>
      <View style={styles.infoContainer}>
        <View style={styles.mainInfo}>
          <Text style={styles.name} numberOfLines={1}>{item.name}</Text>
          <View style={styles.ratingBadge}>
            <Text style={styles.rating}>⭐ {item.rating}</Text>
          </View>
        </View>
        <View style={styles.locationContainer}>
          <Icon name="location-outline" size={16} color="#666" />
          <Text style={styles.location} numberOfLines={1}>
            {item.location.city}, {item.location.country}
          </Text>
        </View>
        <View style={styles.facilitiesContainer}>
          <View style={styles.facilityBadge}>
            <Icon name="wifi" size={14} color="#666" />
            <Text style={styles.facilityText}>Free Wifi</Text>
          </View>
          <View style={styles.facilityBadge}>
            <Icon name="car" size={14} color="#666" />
            <Text style={styles.facilityText}>Parking</Text>
          </View>
        </View>
        <View style={styles.priceContainer}>
          <Text style={styles.priceLabel}>Start from</Text>
          <Text style={styles.price}>{formatPrice(item.price_per_night)}</Text>
          <Text style={styles.priceUnit}>/night</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#FF385C" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      {renderHeader()}
      <FlatList
        data={hotels}
        renderItem={renderHotelItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        refreshing={loading}
        onRefresh={fetchHotels}
      />
      <HotelModal 
        visible={modalVisible}
        hotel={selectedHotel}
        onClose={() => setModalVisible(false)}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  backButton: {
    padding: 8,
  },
  headerTextContainer: {
    flex: 1,
    marginLeft: 16,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  filterButton: {
    padding: 8,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listContainer: {
    padding: 16,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 16,
    marginBottom: 20,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    overflow: 'hidden',
  },
  imageContainer: {
    position: 'relative',
  },
  image: {
    width: '100%',
    height: 200,
  },
  favoriteButton: {
    position: 'absolute',
    right: 16,
    top: 16,
    backgroundColor: 'rgba(0,0,0,0.3)',
    borderRadius: 20,
    padding: 8,
  },
  infoContainer: {
    padding: 16,
  },
  mainInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    flex: 1,
    marginRight: 8,
  },
  ratingBadge: {
    backgroundColor: '#FFF9E7',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  rating: {
    fontSize: 14,
    color: '#FFB800',
    fontWeight: '600',
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  location: {
    fontSize: 14,
    color: '#666',
    marginLeft: 4,
    flex: 1,
  },
  facilitiesContainer: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  facilityBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
    marginRight: 8,
  },
  facilityText: {
    fontSize: 12,
    color: '#666',
    marginLeft: 4,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  priceLabel: {
    fontSize: 12,
    color: '#666',
    marginRight: 4,
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FF385C',
  },
  priceUnit: {
    fontSize: 12,
    color: '#666',
    marginLeft: 4,
  },
});

export default HotelList;