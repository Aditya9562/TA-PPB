// src/screens/Pesawat.js
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
import { getHotels } from '../service/pesawatservice';
import PesawatModal from '../components/PesawatModal';

const Pesawat = () => {
  const navigation = useNavigation();
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedFlight, setSelectedFlight] = useState(null);

  useEffect(() => {
    fetchFlights();
  }, []);

  const fetchFlights = async () => {
    try {
      const data = await getHotels();
      setFlights(Object.values(data));
      setLoading(false);
    } catch (error) {
      console.error('Error fetching flights:', error);
      setLoading(false);
    }
  };

  const formatPrice = (price) => {
    return price.toLocaleString('id-ID', {
      style: 'currency',
      currency: 'IDR'
    });
  };

  const handleFlightPress = (flight) => {
    setSelectedFlight(flight);
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
        <Text style={styles.headerTitle}>Flights</Text>
        <Text style={styles.headerSubtitle}>{flights.length} flights found</Text>
      </View>
      <TouchableOpacity style={styles.filterButton}>
        <Icon name="options-outline" size={24} color="#333" />
      </TouchableOpacity>
    </View>
  );

  const renderFlightItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.card}
      activeOpacity={0.95}
      onPress={() => handleFlightPress(item)}
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
          <Text style={styles.name} numberOfLines={1}>{item.airline}</Text>
          <View style={styles.durationBadge}>
            <Text style={styles.duration}>{item.duration}</Text>
          </View>
        </View>
        <View style={styles.routeContainer}>
          <Text style={styles.routeText}>{item.departure_city}</Text>
          <Icon name="arrow-forward" size={16} color="#666" style={styles.routeIcon} />
          <Text style={styles.routeText}>{item.arrival_city}</Text>
        </View>
        <View style={styles.timeContainer}>
          <Text style={styles.timeText}>
            {new Date(item.departure_time).toLocaleTimeString([], { 
              hour: '2-digit', 
              minute: '2-digit' 
            })} 
            - 
            {new Date(item.arrival_time).toLocaleTimeString([], { 
              hour: '2-digit', 
              minute: '2-digit' 
            })}
          </Text>
        </View>
        <View style={styles.priceContainer}>
          <Text style={styles.priceLabel}>Start from</Text>
          <Text style={styles.price}>{formatPrice(item.price)}</Text>
          <Text style={styles.priceUnit}>/person</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#4A90E2" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      {renderHeader()}
      <FlatList
        data={flights}
        renderItem={renderFlightItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        refreshing={loading}
        onRefresh={fetchFlights}
      />
      <PesawatModal 
        visible={modalVisible}
        flight={selectedFlight}
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
  durationBadge: {
    backgroundColor: '#E7F3FF',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  duration: {
    fontSize: 14,
    color: '#4A90E2',
    fontWeight: '600',
  },
  routeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  routeText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  routeIcon: {
    marginHorizontal: 8,
  },
  timeContainer: {
    marginBottom: 16,
  },
  timeText: {
    fontSize: 14,
    color: '#666',
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
    color: '#4A90E2',
  },
  priceUnit: {
    fontSize: 12,
    color: '#666',
    marginLeft: 4,
  },
});

export default Pesawat;