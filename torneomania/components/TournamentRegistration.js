import React, { useState, useEffect } from 'react';
import { View, Text, Button, Alert, TextInput, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { getTournamentDetails, createFootballTeamAndAddToTournament, requestToJoinTeam, sendNotificationToLeader } from '../services/backendless';

export default function TournamentRegistration({ route, navigation }) {
  const { tournamentId } = route.params;
  const [teamName, setTeamName] = useState('');
  const [tournamentDetails, setTournamentDetails] = useState(null);
  const [userId, setUserId] = useState('');

  useEffect(() => {
    const getUserId = async () => {
      const currentUser = await Backendless.UserService.getCurrentUser();
      if (currentUser) {
        setUserId(currentUser.objectId);
      }
    };
    getUserId();
  }, []);

  useEffect(() => {
    const fetchTournamentDetails = async () => {
      try {
        const details = await getTournamentDetails(tournamentId);
        setTournamentDetails(details);
      } catch (error) {
        Alert.alert('Error', 'No se pudo obtener los detalles del torneo');
      }
    };
    fetchTournamentDetails();
  }, [tournamentId]);

  const handleCreateTeam = async () => {
    if (!teamName) {
      Alert.alert('Error', 'El nombre del equipo es obligatorio');
      return;
    }
    try {
      const result = await createFootballTeamAndAddToTournament(tournamentId, teamName, userId);
      Alert.alert('Éxito', `Equipo ${teamName} creado y añadido al torneo`);
    } catch (error) {
      Alert.alert('Error', 'Hubo un problema al crear el equipo');
    }
  };

  const handleJoinTeamRequest = async (teamId) => {
    try {
      await requestToJoinTeam(teamId, userId);
      await sendNotificationToLeader(teamId, userId);
      Alert.alert('Solicitud enviada');
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  if (!tournamentDetails) {
    return <Text style={styles.loadingText}>Cargando detalles del torneo...</Text>;
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>{tournamentDetails.tournament.name}</Text>
      <Text style={styles.infoText}>Equipos inscritos: {tournamentDetails.teams.length}</Text>
      <Text style={styles.infoText}>Cupos disponibles: {tournamentDetails.availableSlots}</Text>

      <TextInput
        placeholder="Nombre del equipo"
        placeholderTextColor="#aaa"
        value={teamName}
        onChangeText={setTeamName}
        style={styles.input}
      />

      {tournamentDetails.availableSlots > 0 ? (
        <TouchableOpacity style={styles.createButton} onPress={handleCreateTeam}>
          <Text style={styles.createButtonText}>Crear equipo</Text>
        </TouchableOpacity>
      ) : (
        <Text style={styles.noSlotsText}>No hay cupos disponibles para crear un equipo.</Text>
      )}

      <Text style={styles.sectionTitle}>Únete a un equipo existente:</Text>
      {tournamentDetails.teams.map((team) => (
        <TouchableOpacity
          key={team.objectId}
          style={styles.teamButton}
          onPress={() => handleJoinTeamRequest(team.objectId)}
        >
          <Text style={styles.teamButtonText}>Unirse al equipo {team.name}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#1c2340',
    flexGrow: 1,
  },
  loadingText: {
    color: '#ffffff',
    fontSize: 18,
    textAlign: 'center',
    marginTop: 20,
  },
  title: {
    fontSize: 24,
    color: '#ffffff',
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  infoText: {
    color: '#cccccc',
    fontSize: 16,
    marginBottom: 10,
  },
  input: {
    borderBottomWidth: 1,
    borderColor: '#4CAF50',
    color: '#ffffff',
    marginVertical: 15,
    padding: 10,
  },
  createButton: {
    backgroundColor: '#4CAF50',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
  },
  createButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  noSlotsText: {
    color: '#ff4d4d',
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 20,
    color: '#ffffff',
    fontWeight: 'bold',
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
});
