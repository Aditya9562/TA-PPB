// src/screens/Rental.js
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
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { getHotels } from '../service/rentalservice';
import RentalModal from '../components/RentalModal';

const Rental = () => {
  const navigation = useNavigation();
  const [rentals, setRentals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedRental, setSelectedRental] = useState(null);

  useEffect(() => {
    fetchRentals();
  }, []);

  const fetchRentals = async () => {
    try {
      const data = await getHotels();
      setRentals(Object.values(data));
      setLoading(false);
    } catch (error) {
      console.error('Error fetching rentals:', error);
      setLoading(false);
    }
  };

  const formatPrice = (price) => {
    return price.toLocaleString('id-ID', {
      style: 'currency',
      currency: 'IDR'
    });
  };

  const handleRentalPress = (rental) => {
    setSelectedRental(rental);
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
        <Text style={styles.headerTitle}>Car Rental</Text>
        <Text style={styles.headerSubtitle}>{rentals.length} cars available</Text>
      </View>
      <TouchableOpacity style={styles.filterButton}>
        <Icon name="options-outline" size={24} color="#333" />
      </TouchableOpacity>
    </View>
  );

  const renderRentalItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.card}
      activeOpacity={0.95}
      onPress={() => handleRentalPress(item)}
    >
      <View style={styles.imageContainer}>
        <Image 
          source={{ uri: item.image_url }} 
          style={styles.image}
          resizeMode="cover"
        />
        <View style={styles.availabilityBadge}>
          <Text style={styles.availabilityText}>{item.availability}</Text>
        </View>
        <View style={styles.favoriteButton}>
          <Icon name="heart-outline" size={20} color="#fff" />
        </View>
      </View>
      <View style={styles.infoContainer}>
        <View style={styles.mainInfo}>
          <Text style={styles.carModel} numberOfLines={1}>{item.car_model}</Text>
          <View style={styles.companyBadge}>
            <Icon name="business-outline" size={14} color="#50E3C2" />
            <Text style={styles.companyName}>{item.company_name}</Text>
          </View>
        </View>
        
        <View style={styles.locationContainer}>
          <Icon name="location-outline" size={16} color="#666" />
          <Text style={styles.location}>
            {item.location.city}, {item.location.country}
          </Text>
        </View>

        <View style={styles.priceContainer}>
          <Text style={styles.priceLabel}>Start from</Text>
          <Text style={styles.price}>{formatPrice(item.price_per_day)}</Text>
          <Text style={styles.priceUnit}>/day</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#50E3C2" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      {renderHeader()}
      <FlatList
        data={rentals}
        renderItem={renderRentalItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        refreshing={loading}
        onRefresh={fetchRentals}
      />
      <RentalModal 
        visible={modalVisible}
        rental={selectedRental}
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
  availabilityBadge: {
    position: 'absolute',
    left: 16,
    top: 16,
    backgroundColor: '#50E3C2',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  availabilityText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
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
  carModel: {
    fontSize: 18,
    fontWeight: 'bold',
    flex: 1,
    marginRight: 8,
  },
  companyBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0FFF9',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  companyName: {
    fontSize: 12,
    color: '#50E3C2',
    marginLeft: 4,
    fontWeight: '600',
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  location: {
    fontSize: 14,
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
    color: '#50E3C2',
  },
  priceUnit: {
    fontSize: 12,
    color: '#666',
    marginLeft: 4,
  },
});

export default Rental;