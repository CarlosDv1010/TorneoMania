import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';

const SubscriptionScreen = ({ navigation }) => {
  const handleUpgrade = () => {
    alert('Redirigiendo a la pasarela de pagos...');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Torneomania Free</Text>
      </View>

      {/* Lista de características Free */}
      <View style={styles.featuresContainer}>
        <View style={styles.featureItem}>
          <Text style={styles.featureText}>Participar en más de un torneo a la vez</Text>
          <Text style={styles.featureStatus}>∞ UNLIM</Text>
        </View>
        <View style={styles.featureItem}>
          <Text style={styles.featureText}>Publicidad para tus torneos</Text>
          <Text style={styles.featureStatus}>∞ UNLIM</Text>
        </View>
        <View style={styles.featureItem}>
          <Text style={styles.featureText}>Creación ilimitada de torneos</Text>
          <Text style={styles.featureStatus}>∞ UNLIM</Text>
        </View>
        <View style={styles.featureItem}>
          <Text style={styles.featureText}>Acceso a torneos exclusivos</Text>
          <Text style={styles.featureStatus}>∞ UNLIM</Text>
        </View>
        <View style={styles.featureItem}>
          <Text style={styles.featureText}>Acceso a analíticas para tu cuenta</Text>
          <Text style={styles.featureStatus}>✔ YES</Text>
        </View>
      </View>

      {/* Divider */}
      <View style={styles.divider} />

      {/* Sección Premium */}
      <View style={styles.premiumContainer}>
        <Text style={styles.premiumTitle}>Premium Features</Text>
        <Text style={styles.premiumPrice}>$10 / year</Text>
        <TouchableOpacity style={styles.upgradeButton} onPress={handleUpgrade}>
          <Text style={styles.upgradeButtonText}>Upgrade to Premium</Text>
        </TouchableOpacity>
      </View>

      {/* Lista de características Premium */}
      <View style={styles.premiumFeaturesContainer}>
        <View style={styles.premiumFeatureItem}>
          <Text style={styles.premiumFeatureTitle}>Create additional blogs</Text>
          <Text style={styles.premiumFeatureDescription}>
            Couple words about the plan and its features.
          </Text>
        </View>
        <View style={styles.premiumFeatureItem}>
          <Text style={styles.premiumFeatureTitle}>Turn off ads</Text>
          <Text style={styles.premiumFeatureDescription}>
            Couple words about the plan and its features.
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#1a1f3e',
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    color: '#ffffff',
    fontWeight: 'bold',
  },
  featuresContainer: {
    width: '90%',
    backgroundColor: '#2c365d',
    borderRadius: 8,
    padding: 15,
    marginBottom: 20,
    alignSelf: 'center',
  },
  featureItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#3a3f5b',
    paddingBottom: 5,
  },
  featureText: {
    color: '#ffffff',
    fontSize: 14,
  },
  featureStatus: {
    color: '#4CAF50',
    fontWeight: 'bold',
  },
  divider: {
    height: 1,
    backgroundColor: '#3a3f5b',
    marginVertical: 20,
    width: '90%',
    alignSelf: 'center',
  },
  premiumContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  premiumTitle: {
    fontSize: 20,
    color: '#ffffff',
    fontWeight: 'bold',
  },
  premiumPrice: {
    fontSize: 18,
    color: '#4CAF50',
    marginBottom: 10,
  },
  upgradeButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 30,
    paddingHorizontal: 60,
    borderRadius: 10,
  },
  upgradeButtonText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  premiumFeaturesContainer: {
    width: '90%',
    backgroundColor: '#2c365d',
    borderRadius: 8,
    padding: 15,
    alignSelf: 'center',
  },
  premiumFeatureItem: {
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#3a3f5b',
    paddingBottom: 10,
  },
  premiumFeatureTitle: {
    fontSize: 14,
    color: '#ffffff',
    fontWeight: 'bold',
  },
  premiumFeatureDescription: {
    fontSize: 12,
    color: '#aaaaaa',
  },
});

export default SubscriptionScreen;
