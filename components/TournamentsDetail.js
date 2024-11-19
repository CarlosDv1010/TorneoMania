import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { getTournamentDetails } from '../services/backendless';

export default function TournamentsDetail({ route, navigation }) {
  const { tournament } = route.params || {};
  const [tournamentDetails, setTournamentDetails] = useState(null);

  useEffect(() => {
    const fetchTournamentDetails = async () => {
      if (!tournament || !tournament.objectId) return;

      try {
        const details = await getTournamentDetails(tournament.objectId);
        setTournamentDetails(details);
      } catch (error) {
        Alert.alert('Error', 'No se pudieron obtener los detalles del torneo');
      }
    };

    fetchTournamentDetails();
  }, [tournament]);

  if (!tournamentDetails) {
    return <Text style={styles.loadingText}>Cargando detalles del torneo...</Text>;
  }

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Image source={{ uri: tournament.image }} style={styles.image} />
        <Text style={styles.title}>{tournament.name}</Text>
        <Text style={styles.description}>{tournament.description}</Text>

        <Text style={styles.sectionTitle}>Equipos inscritos:</Text>
        {tournamentDetails.teams.length > 0 ? (
          <ScrollView style={styles.teamsContainer}>
            {tournamentDetails.teams.map((team) => (
              <TouchableOpacity key={team.objectId} style={styles.teamButton}>
                <Text style={styles.teamButtonText}>{team.name}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        ) : (
          <Text style={styles.noTeamsText}>No hay equipos inscritos.</Text>
        )}
      </ScrollView>

      <TouchableOpacity
        style={styles.registerButton}
        onPress={() => {
          const tournamentId = tournament.objectId;
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
    backgroundColor: '#1c2340',
  },
  scrollContent: {
    padding: 20,
  },
  loadingText: {
    color: '#ffffff',
    fontSize: 18,
    textAlign: 'center',
    marginTop: 20,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 15,
  },
  title: {
    fontSize: 24,
    color: '#ffffff',
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'left',
  },
  description: {
    color: '#cccccc',
    fontSize: 16,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    color: '#ffffff',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  teamsContainer: {
    maxHeight: 200, // Controla la altura máxima del contenedor de equipos
    marginBottom: 10,
  },
  teamButton: {
    backgroundColor: '#333a56',
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
  teamButtonText: {
    color: '#ffffff',
    fontSize: 16,
  },
  noTeamsText: {
    color: '#ff4d4d',
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
  registerButton: {
    backgroundColor: '#4CAF50',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    margin: 20,
  },
  registerButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
