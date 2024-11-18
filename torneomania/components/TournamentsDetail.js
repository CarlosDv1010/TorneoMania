import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Alert, FlatList } from 'react-native';
import Backendless from 'backendless';

export default function TournamentsDetail({ route, navigation }) {
  const { tournament } = route.params || {};
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    const fetchTournamentDetails = async () => {
      try {
        // Consulta los detalles del torneo con la relación de equipos
        const tournamentWithTeams = await Backendless.Data.of('Tournaments').findById({
          objectId: tournament.objectId,
          relations: ['teams'],
        });
        setTeams(tournamentWithTeams.teams || []);
      } catch (error) {
        Alert.alert('Error', 'No se pudo obtener los detalles del torneo');
        console.error('Error fetching tournament details:', error);
      }
    };

    if (tournament && tournament.objectId) {
      fetchTournamentDetails();
    }
  }, [tournament]);

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
          const tournamentId = tournament.objectId;
          navigation.navigate('TournamentRegistration', { tournamentId });
        }}
      >
        <Text style={styles.registerButtonText}>Registrarse</Text>
      </TouchableOpacity>

      <Text style={styles.subtitle}>Equipos Inscritos</Text>
      {teams.length > 0 ? (
        <FlatList
          data={teams}
          keyExtractor={(item) => item.objectId}
          renderItem={({ item }) => (
            <View style={styles.teamCard}>
              <Text style={styles.teamName}>{item.name}</Text>
            </View>
          )}
        />
      ) : (
        <Text style={{ color: '#ffffff' }}>No hay equipos registrados.</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1c2340',
    padding: 15,
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
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: '#cccccc',
    marginBottom: 20,
  },
  registerButton: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 20,
  },
  registerButtonText: {
    color: '#ffffff',
    fontSize: 16,
  },
  subtitle: {
    fontSize: 20,
    color: '#ffffff',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  teamCard: {
    backgroundColor: '#333a56',
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
  teamName: {
    color: '#ffffff',
    fontSize: 16,
  },
});
