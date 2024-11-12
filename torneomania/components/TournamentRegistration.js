import React, { useState, useEffect } from 'react';
import { View, Text, Button, Alert, TextInput } from 'react-native';
import { getTournamentDetails, createFootballTeamAndAddToTournament, requestToJoinTeam, sendNotificationToLeader } from '../services/backendless';

export default function TournamentRegistration({ route, navigation }) {
  const { tournamentId } = route.params; // Obtener el tournamentId del parámetro
  const [teamName, setTeamName] = useState(''); // Para ingresar el nombre del equipo
  const [tournamentDetails, setTournamentDetails] = useState(null);
  const [userId, setUserId] = useState(''); // Aquí debes obtener el userId actual del usuario

  // Simulación de obtención del userId, en tu app debería ser dinámico
  useEffect(() => {
    const getUserId = async () => {
      // Aquí puedes llamar a Backendless.UserService para obtener el usuario actual.
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
      // Llamar a la función para crear el equipo y asociarlo al torneo
      const result = await createFootballTeamAndAddToTournament(tournamentId, teamName, userId);
      
      Alert.alert('Éxito', `Equipo ${teamName} creado y añadido al torneo`);
      
      // Puedes realizar alguna acción adicional, como redirigir o actualizar la UI
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
    return <Text>Cargando detalles del torneo...</Text>;
  }

  return (
    <View style={{ padding: 20 }}>
      <Text>{tournamentDetails.tournament.name}</Text>
      <Text>Equipos inscritos: {tournamentDetails.teams.length}</Text>
      <Text>Cupos disponibles: {tournamentDetails.availableSlots}</Text>

      {/* Campo para ingresar el nombre del equipo */}
      <TextInput
        placeholder="Nombre del equipo"
        value={teamName}
        onChangeText={setTeamName}
        style={{ borderBottomWidth: 1, marginVertical: 10, padding: 10 }}
      />

      {tournamentDetails.availableSlots > 0 ? (
        <Button title="Crear equipo de fútbol" onPress={handleCreateTeam} />
      ) : (
        <Text>No hay cupos disponibles para crear un equipo.</Text>
      )}

      <Text>O</Text>
      <Text>Únete a un equipo existente:</Text>
      {tournamentDetails.teams.map((team) => (
        <Button
          key={team.objectId}
          title={`Unirse al equipo ${team.name}`} // Mostrar el nombre del equipo
          onPress={() => handleJoinTeamRequest(team.objectId)}
        />
      ))}
    </View>
  );
}
