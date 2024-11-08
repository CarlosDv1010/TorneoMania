import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

export default function TournamentDetails({ route }) {
  const { tournament } = route.params || {}; // Recibe los datos del torneo de las props

  if (!tournament) {
    return <Text style={{ color: '#ffffff' }}>No se pudo cargar el torneo.</Text>;
  }
  
  return (
    <View style={styles.container}>
      <Image source={{ uri: tournament.image || tournament.avatar }} style={styles.image} />
      <Text style={styles.title}>{tournament.name}</Text>
      <Text style={styles.description}>{tournament.description || `Deporte: ${tournament.sport}`}</Text>
      {tournament.winRate && (
        <Text style={styles.details}>Winrate: {tournament.winRate}% - Games Played: {tournament.gamesPlayed}</Text>
      )}
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
  details: {
    fontSize: 14,
    color: '#aaaaaa',
  },
});
