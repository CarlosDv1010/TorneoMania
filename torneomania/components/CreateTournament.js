import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, Alert } from 'react-native';
import TournamentDetailsForm from './TournamentDetailsForm';
import TournamentSportSelector from './TournamentSportSelector';
import TournamentDatePicker from './TournamentDatePicker';
import Backendless from 'backendless';
import { getCurrentUser } from '../services/backendless'; // Asegúrate de que esta función está disponible

export default function CreateTournament() {
  const [tournamentName, setTournamentName] = useState('');
  const [selectedSport, setSelectedSport] = useState('');
  const [tournamentDate, setTournamentDate] = useState(new Date());
  const [tournamentDescription, setTournamentDescription] = useState('');
  const [sportsList, setSportsList] = useState([]);

  useEffect(() => {
    const fetchSports = async () => {
      try {
        const sports = await Backendless.Data.of('Sports').find();
        setSportsList(sports);
      } catch (error) {
        Alert.alert('Error', 'No se pudieron cargar los deportes');
      }
    };

    fetchSports();
  }, []);

  const handleCreateTournament = async () => {
    const selectedSportData = sportsList.find((sport) => sport.name === selectedSport);

    if (!selectedSportData) {
      Alert.alert('Error', 'El deporte seleccionado no es válido');
      return;
    }

    if (!tournamentName || !selectedSport || !tournamentDate) {
      Alert.alert('Error', 'Todos los campos son obligatorios');
      return;
    }

    try {
      // Obtener el usuario actual
      const currentUser = await getCurrentUser();
      if (!currentUser) {
        Alert.alert('Error', 'No se pudo obtener el usuario actual');
        return;
      }

      const tournamentData = {
        name: tournamentName,
        date: tournamentDate,
        description: tournamentDescription,
        createdAt: new Date(),
        ownerId: currentUser.objectId, // Asignar el usuario actual como owner
      };

      // Guardar el torneo
      const savedTournament = await Backendless.Data.of('Tournaments').save(tournamentData);

      // Luego, establece la relación con el deporte usando setRelation
      await Backendless.Data.of('Tournaments').setRelation(savedTournament.objectId, 'sport', [selectedSportData.objectId]);

      Alert.alert('Éxito', 'El torneo se ha creado correctamente');
      // Limpiar formulario después de la creación
      setTournamentName('');
      setSelectedSport('');
      setTournamentDate(new Date());
      setTournamentDescription('');
    } catch (error) {
      Alert.alert('Error', 'No se pudo crear el torneo');
      console.error('Error al crear el torneo: ', error);
    }
  };
  
  

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Crear un Torneo</Text>
      
      <TournamentDetailsForm
        tournamentName={tournamentName}
        setTournamentName={setTournamentName}
        tournamentDescription={tournamentDescription}
        setTournamentDescription={setTournamentDescription}
      />

      <TournamentSportSelector
        selectedSport={selectedSport}
        setSelectedSport={setSelectedSport}
        sportsList={sportsList}
      />

      <TournamentDatePicker
        tournamentDate={tournamentDate}
        setTournamentDate={setTournamentDate}
      />

      <Button title="Crear Torneo" onPress={handleCreateTournament} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
});
