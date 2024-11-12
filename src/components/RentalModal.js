// components/RentalModal.js
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

const RentalModal = ({ visible, rental, onClose }) => {
  if (!rental) return null;

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
              source={{ uri: rental.image_url }} 
              style={styles.modalImage}
            />
            
            <TouchableOpacity 
              style={styles.closeButton}
              onPress={onClose}
            >
              <Text style={styles.closeButtonText}>×</Text>
            </TouchableOpacity>

            <View style={styles.modalInfo}>
              <View style={styles.availabilityBadge}>
                <Text style={styles.availabilityText}>{rental.availability}</Text>
              </View>
              
              <Text style={styles.modalCarModel}>{rental.car_model}</Text>
              <View style={styles.companyContainer}>
                <Icon name="business-outline" size={20} color="#666" />
                <Text style={styles.modalCompanyName}>{rental.company_name}</Text>
              </View>
              
              <View style={styles.locationContainer}>
                <Icon name="location-outline" size={20} color="#666" />
                <Text style={styles.modalLocation}>
                  {rental.location.city}, {rental.location.country}
                </Text>
              </View>

              <View style={styles.divider} />

              <Text style={styles.sectionTitle}>Included in Price</Text>
              <View style={styles.featuresGrid}>
                <View style={styles.featureItem}>
                  <Icon name="shield-checkmark-outline" size={20} color="#50E3C2" />
                  <Text style={styles.featureText}>Insurance</Text>
                </View>
                <View style={styles.featureItem}>
                  <Icon name="car-sport-outline" size={20} color="#50E3C2" />
                  <Text style={styles.featureText}>24/7 Support</Text>
                </View>
                <View style={styles.featureItem}>
                  <Icon name="location-outline" size={20} color="#50E3C2" />
                  <Text style={styles.featureText}>Free Delivery</Text>
                </View>
                <View style={styles.featureItem}>
                  <Icon name="medical-outline" size={20} color="#50E3C2" />
                  <Text style={styles.featureText}>First Aid Kit</Text>
                </View>
              </View>

              <View style={styles.divider} />

              <View style={styles.priceSection}>
                <Text style={styles.sectionTitle}>Rental Price</Text>
                <View style={styles.priceRow}>
                  <Text style={styles.modalPrice}>{formatPrice(rental.price_per_day)}</Text>
                  <Text style={styles.priceUnit}>/day</Text>
                </View>
              </View>

              <TouchableOpacity style={styles.bookButton}>
                <Text style={styles.bookButtonText}>Book Now</Text>
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
    height: 250,
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
  availabilityBadge: {
    alignSelf: 'flex-start',
    backgroundColor: '#50E3C2',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    marginBottom: 16,
  },
  availabilityText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  modalCarModel: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  companyContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  modalCompanyName: {
    fontSize: 16,
    color: '#666',
    marginLeft: 8,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  modalLocation: {
    fontSize: 16,
    color: '#666',
    marginLeft: 8,
  },
  divider: {
    height: 1,
    backgroundColor: '#e0e0e0',
    marginVertical: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  featuresGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -8,
  },
  featureItem: {
    width: '50%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    marginBottom: 16,
  },
  featureText: {
    marginLeft: 8,
    fontSize: 14,
    color: '#666',
  },
  priceSection: {
    marginBottom: 16,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  modalPrice: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#50E3C2',
  },
  priceUnit: {
    fontSize: 14,
    color: '#666',
    marginLeft: 4,
  },
  bookButton: {
    backgroundColor: '#50E3C2',
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

export default RentalModal;