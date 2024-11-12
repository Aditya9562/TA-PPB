// src/screens/Explore.js
import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView, 
  Platform, 
  StatusBar,
  ScrollView,
  TouchableOpacity,
  Image,
  ActivityIndicator
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const exploreCategories = [
  {
    id: 1,
    title: "Hotels",
    description: "Find perfect places to stay",
    icon: "bed-outline", 
    color: "#FF385C",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3"
  },
  {
    id: 2,
    title: "Flights", 
    description: "Search flights worldwide",
    icon: "airplane-outline",
    color: "#4A90E2",
    image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?ixlib=rb-4.0.3" 
  },
  {
    id: 3,
    title: "Car Rental",
    description: "Rent vehicles for your trip",
    icon: "car-outline",
    color: "#50E3C2",
    image: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?ixlib=rb-4.0.3"
  }
];

const exploreRegions = [
  {
    id: 1,
    name: "Bali",
    count: "245 Properties",
    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?ixlib=rb-4.0.3"
  },
  {
    id: 2, 
    name: "Jakarta",
    count: "185 Properties",
    image: "https://images.unsplash.com/photo-1555899434-94d1368aa7af?ixlib=rb-4.0.3"
  },
  {
    id: 3,
    name: "Yogyakarta",
    count: "152 Properties", 
    image: "https://images.unsplash.com/photo-1584810359583-96fc3448beaa?ixlib=rb-4.0.3"
  },
  {
    id: 4,
    name: "Bandung",
    count: "126 Properties",
    image: "https://images.unsplash.com/photo-1555899434-94d1368aa7af?ixlib=rb-4.0.3"
  }
];

const learningTopics = [
  {
    id: 1,
    title: "Best Deals",
    lessons: "Special offers",
    icon: "pricetag-outline",
    color: "#FF8C00"
  },
  {
    id: 2, 
    title: "Travel Tips",
    lessons: "Essential guides",
    icon: "bookmark-outline",
    color: "#9B59B6"
  },
  {
    id: 3,
    title: "Popular Places",
    lessons: "Top destinations",
    icon: "location-outline",
    color: "#2ECC71"
  }
];

const Explore = () => {
  const navigation = useNavigation();
  const [imageLoading, setImageLoading] = useState({});

  const handleCategoryPress = (category) => {
    if(category.title === "Hotels") {
      navigation.navigate('Hotel');
    } else if(category.title === "Flights") {
      navigation.navigate('Pesawat');
    } else if(category.title === "Car Rental") {
      navigation.navigate('Rental');
    }
  };

  const renderCategoryCard = (category) => (
    <TouchableOpacity 
      key={category.id}
      style={styles.categoryCard}
      activeOpacity={0.7}
      onPress={() => handleCategoryPress(category)}
    >
      <View style={styles.imageWrapper}>
        <Image 
          source={{ uri: category.image }}
          style={styles.categoryImage}
          onLoadStart={() => setImageLoading(prev => ({ ...prev, [`category_${category.id}`]: true }))}
          onLoadEnd={() => setImageLoading(prev => ({ ...prev, [`category_${category.id}`]: false }))}
        />
        {imageLoading[`category_${category.id}`] && (
          <View style={styles.imageLoadingContainer}>
            <ActivityIndicator size="small" color="#4A90E2" />
          </View>
        )}
      </View>
      <View style={styles.categoryContent}>
        <View style={[styles.categoryIcon, { backgroundColor: category.color + '15' }]}>
          <Ionicons name={category.icon} size={22} color={category.color} />
        </View>
        <Text style={styles.categoryTitle}>{category.title}</Text>
        <Text style={styles.categoryDescription}>{category.description}</Text>
      </View>
    </TouchableOpacity>
  );

  const renderRegionCard = (region) => (
    <TouchableOpacity 
      key={region.id}
      style={styles.regionCard}
      activeOpacity={0.9}
    >
      <View style={styles.imageWrapper}>
        <Image 
          source={{ uri: region.image }}
          style={styles.regionImage}
          onLoadStart={() => setImageLoading(prev => ({ ...prev, [`region_${region.id}`]: true }))}
          onLoadEnd={() => setImageLoading(prev => ({ ...prev, [`region_${region.id}`]: false }))}
        />
        {imageLoading[`region_${region.id}`] && (
          <View style={styles.imageLoadingContainer}>
            <ActivityIndicator size="small" color="#4A90E2" />
          </View>
        )}
      </View>
      <View style={styles.regionOverlay}>
        <Text style={styles.regionName}>{region.name}</Text>
        <Text style={styles.regionCount}>{region.count}</Text>
      </View>
    </TouchableOpacity>
  );

  const renderLearningCard = (topic) => (
    <TouchableOpacity 
      key={topic.id}
      style={styles.learningCard}
      activeOpacity={0.9}
    >
      <View style={[styles.learningIcon, { backgroundColor: topic.color + '20' }]}>
        <Ionicons name={topic.icon} size={24} color={topic.color} />
      </View>
      <View style={styles.learningContent}>
        <Text style={styles.learningTitle}>{topic.title}</Text>
        <Text style={styles.learningLessons}>{topic.lessons}</Text>
      </View>
      <Ionicons name="chevron-forward" size={20} color="#666" />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      
      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Explore</Text>
          <Text style={styles.headerSubtitle}>Discover your next adventure</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Categories</Text>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoriesContainer}
          >
            {exploreCategories.map(renderCategoryCard)}
          </ScrollView>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Popular Destinations</Text>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.regionsContainer}
          >
            {exploreRegions.map(renderRegionCard)}
          </ScrollView>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Travel Guide</Text>
          <View style={styles.learningContainer}>
            {learningTopics.map(renderLearningCard)}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContent: {
    padding: 12,
    paddingBottom: Platform.OS === 'ios' ? 90 : 70,
  },
  header: {
    paddingHorizontal: 4,
    paddingTop: Platform.OS === 'ios' ? 20 : 40,
    paddingBottom: 24,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: 2,
    letterSpacing: -0.5,
  },
  headerSubtitle: {
    fontSize: 18,
    color: '#666',
    marginBottom: 24,
    fontWeight: '500',
    letterSpacing: -0.3,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: 16,
    paddingHorizontal: 4,
    letterSpacing: -0.4,
  },
  categoriesContainer: {
    paddingRight: 16,
    gap: 16,
  },
  categoryCard: {
    width: 220,
    backgroundColor: '#fff',
    borderRadius: 20,
    marginLeft: 4,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#f0f0f0',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  imageWrapper: {
    position: 'relative',
    backgroundColor: '#f8f8f8',
  },
  imageLoadingContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(248, 248, 248, 0.7)',
  },
  categoryImage: {
    width: '100%',
    height: 120,
  },
  categoryContent: {
    padding: 16,
  },
  categoryIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  categoryTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: 6,
    letterSpacing: -0.3,
  },
  categoryDescription: {
    fontSize: 13,
    color: '#666',
    lineHeight: 18,
    letterSpacing: -0.2,
  },
  regionsContainer: {
    paddingRight: 16,
    gap: 12,
  },
  regionCard: {
    width: 160,
    height: 200,
    borderRadius: 16,
    marginLeft: 4,
    overflow: 'hidden',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
      },
      android: {
        elevation: 6,
      },
    }),
  },
  regionImage: {
    width: '100%',
    height: '100%',
  },
  regionOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 12,
    paddingTop: 32,
    backgroundColor: 'rgba(0,0,0,0.45)',
  },
  regionName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 4,
    letterSpacing: -0.3,
  },
  regionCount: {
    fontSize: 14,
    color: '#fff',
    opacity: 0.9,
  },
  learningContainer: {
    paddingHorizontal: 4,
    gap: 12,
  },
  learningCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
      },
      android: {
        elevation: 6,
      },
    }),
  },
  learningIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  learningContent: {
    flex: 1,
  },
  learningTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: 4,
    letterSpacing: -0.3,
  },
  learningLessons: {
    fontSize: 14,
    color: '#666',
    letterSpacing: -0.2,
  },
});

export default Explore;