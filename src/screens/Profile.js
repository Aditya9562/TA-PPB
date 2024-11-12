// src/screens/Profile.js
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Image,
  TouchableOpacity,
  Linking,
  Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const Profile = () => {
  const developer = {
    name: "Aditya Putra Afendi",
    role: "Mobile Developer",
    email: "adit@gmail.com",
    github: "Aditya9562",
    linkedin: "adityaputraafendi",
    about: "A passionate mobile developer specialized in React Native development. Creating innovative solutions for modern mobile applications.",
    photo: "https://avatars.githubusercontent.com/u/118952914?v=4",
    skills: ["React Native", "JavaScript", "UI/UX Design", "Mobile Development"]
  };

  const openLink = (type) => {
    let url;
    switch(type) {
      case 'github':
        url = `https://github.com/${developer.github}`;
        break;
      case 'linkedin':
        url = `https://linkedin.com/in/${developer.linkedin}`;
        break;
      case 'email':
        url = `mailto:${developer.email}`;
        break;
    }
    Linking.openURL(url);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header Section */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Profile</Text>
          <TouchableOpacity style={styles.settingsButton}>
            <Icon name="settings-outline" size={24} color="#333" />
          </TouchableOpacity>
        </View>

        {/* Developer Info Section - Moved to top */}
        <View style={styles.developerHero}>
          <Image
            source={{ uri: developer.photo }}
            style={styles.developerPhoto}
            defaultSource={require('../../assets/splash.png')}
          />
          <View style={styles.heroInfo}>
            <Text style={styles.developerName}>{developer.name}</Text>
            <Text style={styles.developerRole}>{developer.role}</Text>
          </View>
        </View>

        {/* Skills Section */}
        <View style={styles.skillsContainer}>
          {developer.skills.map((skill, index) => (
            <View key={index} style={styles.skillBadge}>
              <Text style={styles.skillText}>{skill}</Text>
            </View>
          ))}
        </View>

        {/* About Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About Me</Text>
          <View style={styles.card}>
            <Text style={styles.aboutText}>{developer.about}</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Connect With Me</Text>
          <View style={styles.card}>
            <TouchableOpacity 
              style={styles.socialLink}
              onPress={() => openLink('github')}
            >
              <Icon name="logo-github" size={24} color="#4A90E2" />
              <Text style={styles.socialLinkText}>GitHub Profile</Text>
              <Icon name="chevron-forward" size={20} color="#999" />
            </TouchableOpacity>

            <View style={styles.divider} />

            <TouchableOpacity 
              style={styles.socialLink}
              onPress={() => openLink('linkedin')}
            >
              <Icon name="logo-linkedin" size={24} color="#4A90E2" />
              <Text style={styles.socialLinkText}>LinkedIn Profile</Text>
              <Icon name="chevron-forward" size={20} color="#999" />
            </TouchableOpacity>

            <View style={styles.divider} />

            <TouchableOpacity 
              style={styles.socialLink}
              onPress={() => openLink('email')}
            >
              <Icon name="mail" size={24} color="#4A90E2" />
              <Text style={styles.socialLinkText}>Contact Email</Text>
              <Icon name="chevron-forward" size={20} color="#999" />
            </TouchableOpacity>
          </View>
        </View>

        {/* App Info Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>App Information</Text>
          <View style={styles.card}>
            <View style={styles.appInfoRow}>
              <Icon name="phone-portrait-outline" size={24} color="#4A90E2" />
              <View style={styles.appInfoContent}>
                <Text style={styles.appName}>Travel App</Text>
                <Text style={styles.appVersion}>Version 1.0.0</Text>
              </View>
            </View>
            <View style={styles.divider} />
            <Text style={styles.appDescription}>
              Your all-in-one travel companion for booking hotels, flights, and car rentals.
              Making travel planning easier and more convenient.
            </Text>
          </View>
        </View>

        {/* Copyright Section */}
        <View style={styles.copyrightSection}>
          <Text style={styles.copyrightText}>
            © 2024 Travel App. All rights reserved.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    paddingTop: Platform.OS === 'android' ? 40 : 20,
    backgroundColor: '#fff',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  settingsButton: {
    padding: 8,
  },
  developerHero: {
    backgroundColor: '#fff',
    alignItems: 'center',
    padding: 24,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 12,
      },
      android: {
        elevation: 8,
      },
    }),
  },
  developerPhoto: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 16,
    borderWidth: 3,
    borderColor: '#4A90E2',
  },
  heroInfo: {
    alignItems: 'center',
  },
  developerName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  developerRole: {
    fontSize: 16,
    color: '#666',
  },
  skillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 16,
    justifyContent: 'center',
    gap: 8,
  },
  skillBadge: {
    backgroundColor: '#E3F2FD',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  skillText: {
    color: '#4A90E2',
    fontSize: 14,
    fontWeight: '500',
  },
  section: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  aboutText: {
    fontSize: 15,
    color: '#666',
    lineHeight: 22,
  },
  socialLink: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  socialLinkText: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
    color: '#333',
  },
  divider: {
    height: 1,
    backgroundColor: '#f0f0f0',
    marginVertical: 8,
  },
  appInfoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  appInfoContent: {
    marginLeft: 12,
  },
  appName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  appVersion: {
    fontSize: 14,
    color: '#666',
  },
  appDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  copyrightSection: {
    padding: 16,
    alignItems: 'center',
    marginBottom: Platform.OS === 'ios' ? 40 : 20,
  },
  copyrightText: {
    fontSize: 12,
    color: '#999',
  },
});

export default Profile;