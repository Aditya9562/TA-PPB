// components/PesawatModal.js
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
import Icon from 'react-native-vector-icons/Ionicons';

const { width, height } = Dimensions.get('window');

const PesawatModal = ({ visible, flight, onClose }) => {
  if (!flight) return null;

  const formatPrice = (price) => {
    return price.toLocaleString('id-ID', {
      style: 'currency',
      currency: 'IDR'
    });
  };

  const formatTime = (dateString) => {
    return new Date(dateString).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
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
              source={{ uri: flight.image_url }} 
              style={styles.modalImage}
            />
            
            <TouchableOpacity 
              style={styles.closeButton}
              onPress={onClose}
            >
              <Text style={styles.closeButtonText}>×</Text>
            </TouchableOpacity>

            <View style={styles.modalInfo}>
              <Text style={styles.modalName}>{flight.airline}</Text>
              
              <View style={styles.flightBadge}>
                <Icon name="airplane" size={16} color="#4A90E2" />
                <Text style={styles.flightDuration}>{flight.duration}</Text>
              </View>
              
              <View style={styles.routeContainer}>
                <View style={styles.cityContainer}>
                  <Text style={styles.cityName}>{flight.departure_city}</Text>
                  <Text style={styles.timeText}>{formatTime(flight.departure_time)}</Text>
                </View>
                
                <View style={styles.flightPath}>
                  <View style={styles.dottedLine} />
                  <Icon name="airplane" size={20} color="#4A90E2" />
                </View>
                
                <View style={styles.cityContainer}>
                  <Text style={styles.cityName}>{flight.arrival_city}</Text>
                  <Text style={styles.timeText}>{formatTime(flight.arrival_time)}</Text>
                </View>
              </View>

              <View style={styles.divider} />

              <Text style={styles.sectionTitle}>Informasi Penerbangan</Text>
              <View style={styles.flightDetails}>
                <View style={styles.detailItem}>
                  <Icon name="calendar-outline" size={20} color="#666" />
                  <Text style={styles.detailText}>
                    {new Date(flight.departure_time).toLocaleDateString()}
                  </Text>
                </View>
                <View style={styles.detailItem}>
                  <Icon name="time-outline" size={20} color="#666" />
                  <Text style={styles.detailText}>{flight.duration}</Text>
                </View>
                <View style={styles.detailItem}>
                  <Icon name="briefcase-outline" size={20} color="#666" />
                  <Text style={styles.detailText}>Bagasi 20kg</Text>
                </View>
              </View>

              <View style={styles.divider} />

              <View style={styles.priceSection}>
                <Text style={styles.sectionTitle}>Harga Tiket</Text>
                <Text style={styles.price}>{formatPrice(flight.price)}</Text>
                <Text style={styles.priceNote}>*Harga per orang</Text>
              </View>

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
    height: 200,
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
    marginBottom: 16,
  },
  flightBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E7F3FF',
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    marginBottom: 20,
  },
  flightDuration: {
    marginLeft: 6,
    color: '#4A90E2',
    fontWeight: '600',
  },
  routeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  cityContainer: {
    flex: 1,
    alignItems: 'center',
  },
  cityName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  timeText: {
    fontSize: 14,
    color: '#666',
  },
  flightPath: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  dottedLine: {
    position: 'absolute',
    top: '50%',
    left: 0,
    right: 0,
    height: 1,
    borderStyle: 'dashed',
    borderWidth: 1,
    borderColor: '#ccc',
  },
  divider: {
    height: 1,
    backgroundColor: '#e0e0e0',
    marginVertical: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  flightDetails: {
    backgroundColor: '#f8f9fa',
    padding: 16,
    borderRadius: 12,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  detailText: {
    marginLeft: 12,
    fontSize: 14,
    color: '#666',
  },
  priceSection: {
    marginBottom: 16,
  },
  price: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4A90E2',
    marginBottom: 4,
  },
  priceNote: {
    fontSize: 12,
    color: '#666',
  },
  bookButton: {
    backgroundColor: '#4A90E2',
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

export default PesawatModal;