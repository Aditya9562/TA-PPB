// components/HotelModal.js
import React from 'react';
import {
  Modal,
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from 'react-native';

const { width, height } = Dimensions.get('window');

const HotelModal = ({ visible, hotel, onClose }) => {
  if (!hotel) return null;

  const formatPrice = (price) => {
    return price.toLocaleString('id-ID', {
      style: 'currency',
      currency: 'IDR'
    });
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <Image 
              source={{ uri: hotel.image_url }} 
              style={styles.modalImage}
            />
            
            <TouchableOpacity 
              style={styles.closeButton}
              onPress={onClose}
            >
              <Text style={styles.closeButtonText}>×</Text>
            </TouchableOpacity>

            <View style={styles.modalInfo}>
              <Text style={styles.modalName}>{hotel.name}</Text>
              <Text style={styles.modalLocation}>
                {hotel.location.city}, {hotel.location.country}
              </Text>
              
              <View style={styles.ratingPriceContainer}>
                <Text style={styles.modalRating}>⭐ {hotel.rating}</Text>
                <Text style={styles.modalPrice}>
                  {formatPrice(hotel.price_per_night)}/malam
                </Text>
              </View>

              <View style={styles.divider} />

              <Text style={styles.facilitiesTitle}>Fasilitas</Text>
              <View style={styles.facilitiesGrid}>
                {hotel.facilities.map((facility, index) => (
                  <View key={index} style={styles.facilityItem}>
                    <Text style={styles.facilityText}>• {facility}</Text>
                  </View>
                ))}
              </View>

              <View style={styles.divider} />

              <Text style={styles.locationTitle}>Lokasi</Text>
              <Text style={styles.locationDetails}>
                Latitude: {hotel.location.latitude}
                {'\n'}
                Longitude: {hotel.location.longitude}
              </Text>

              <TouchableOpacity style={styles.bookButton}>
                <Text style={styles.bookButtonText}>Pesan Sekarang</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    marginTop: 50,
    flex: 1,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    overflow: 'hidden',
  },
  modalImage: {
    width: '100%',
    height: 300,
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButtonText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  modalInfo: {
    padding: 20,
  },
  modalName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  modalLocation: {
    fontSize: 16,
    color: '#666',
    marginBottom: 16,
  },
  ratingPriceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  modalRating: {
    fontSize: 16,
    color: '#ffc107',
  },
  modalPrice: {
    fontSize: 18,
    fontWeight: '600',
    color: '#0066cc',
  },
  divider: {
    height: 1,
    backgroundColor: '#e0e0e0',
    marginVertical: 16,
  },
  facilitiesTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  facilitiesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  facilityItem: {
    width: '50%',
    marginBottom: 8,
  },
  facilityText: {
    fontSize: 14,
    color: '#666',
  },
  locationTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  locationDetails: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  bookButton: {
    backgroundColor: '#0066cc',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 24,
  },
  bookButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default HotelModal;