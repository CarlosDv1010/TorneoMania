import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

export default function TournamentsDetail({ route, navigation }) {
  const { tournament } = route.params || {}; // Recibe los datos del torneo de las props
  
  if (!tournament) {
    return <Text style={{ color: '#ffffff' }}>No se pudo cargar el torneo.</Text>;
  }
  
  return (
    <View style={styles.container}>
      <Image source={{ uri: tournament.image }} style={styles.image} />
      <Text style={styles.title}>{tournament.name}</Text>
      <Text style={styles.description}>{tournament.description}</Text>
      <TouchableOpacity
        style={styles.registerButton}
        onPress={() => {
          const tournamentId = tournament.objectId
          navigation.navigate('TournamentRegistration', { tournamentId });
        }}
      >
        <Text style={styles.registerButtonText}>Registrarse</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#1a1f3e',
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    color: '#ffffff',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: '#cccccc',
    marginBottom: 10,
  },
  registerButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 10,
    alignSelf: 'flex-start',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  registerButtonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '700',
  },
  details: {
    fontSize: 14,
    color: '#aaaaaa',
  },
});
