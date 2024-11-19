import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, Picker, CheckBox } from 'react-native';
import TournamentDetailsForm from './TournamentDetailsForm';
import TournamentSportSelector from './TournamentSportSelector';
import TournamentDatePicker from './TournamentDatePicker';
import Backendless from 'backendless';
import { getCurrentUser } from '../services/backendless';

export default function CreateTournament() {
  const [tournamentName, setTournamentName] = useState('');
  const [selectedSport, setSelectedSport] = useState('');
  const [tournamentDescription, setTournamentDescription] = useState('');
  const [sportsList, setSportsList] = useState([]);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [prize, setPrize] = useState(false);
  const [individualCompetition, setIndividualCompetition] = useState(false);
  const [groupCompetition, setGroupCompetition] = useState(false);
  const [groupCount, setGroupCount] = useState(8);
  const [participantsPerGroup, setParticipantsPerGroup] = useState(11);
  const [teamSize, setTeamSize] = useState(5);
  const prizeOptions = ["Trofeo", "Medallas", "Certificados", "Premio en efectivo", "Producto de patrocinador"];

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
    if (!tournamentName || !selectedSport || !startDate || !endDate) {
      Alert.alert('Error', 'Todos los campos son obligatorios');
      return;
    }

    try {
      const currentUser = await getCurrentUser();
      if (!currentUser) {
        Alert.alert('Error', 'No se pudo obtener el usuario actual');
        return;
      }

      const tournamentData = {
        name: tournamentName,
        startDate,
        endDate,
        description: tournamentDescription,
        prize,
        individualCompetition,
        groupCompetition,
        groupCount,
        participantsPerGroup,
        teamSize,
        createdAt: new Date(),
        ownerId: currentUser.objectId,
      };

      const savedTournament = await Backendless.Data.of('Tournaments').save(tournamentData);
      const selectedSportData = sportsList.find((sport) => sport.name === selectedSport);

      await Backendless.Data.of('Tournaments').setRelation(savedTournament.objectId, 'sport', [selectedSportData.objectId]);

      Alert.alert('Éxito', 'El torneo se ha creado correctamente');
      setTournamentName('');
      setSelectedSport('');
      setTournamentDescription('');
      setPrize(false);
      setIndividualCompetition(false);
      setGroupCompetition(false);
      setGroupCount(8);
      setParticipantsPerGroup(11);
      setTeamSize(5);
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

      <Text style={styles.label}>Fecha de Inicio</Text>
      <TournamentDatePicker
        tournamentDate={startDate}
        setTournamentDate={setStartDate}
      />

      <Text style={styles.label}>Fecha de Cierre</Text>
      <TournamentDatePicker
        tournamentDate={endDate}
        setTournamentDate={setEndDate}
      />

      <Text style={styles.label}>Seleccione</Text>
      <View style={styles.checkboxContainer}>
        <CheckBox
          value={prize}
          onValueChange={setPrize}
        />
        <Text style={styles.checkboxLabel}>Premio del Torneo</Text>
      </View>

      {prize && (
        <Picker
          selectedValue={prize}
          onValueChange={(itemValue) => setPrize(itemValue)}
          style={styles.picker}
        >
          {prizeOptions.map((prizeOption, index) => (
            <Picker.Item key={index} label={prizeOption} value={prizeOption} />
          ))}
        </Picker>
      )}

      <View style={styles.checkboxContainer}>
        <CheckBox
          value={individualCompetition}
          onValueChange={setIndividualCompetition}
        />
        <Text style={styles.checkboxLabel}>Competidor singular</Text>
      </View>

      <View style={styles.checkboxContainer}>
        <CheckBox
          value={groupCompetition}
          onValueChange={setGroupCompetition}
        />
        <Text style={styles.checkboxLabel}>Competencia grupal</Text>
      </View>

      {groupCompetition && (
        <>
          <Text style={styles.label}>Tu torneo es para más de uno? Selecciona el número de integrantes por equipo:</Text>
          <Picker
            selectedValue={teamSize}
            onValueChange={(itemValue) => setTeamSize(itemValue)}
            style={styles.picker}
          >
            {[...Array(20).keys()].map(i => (
              <Picker.Item key={i} label={`${i + 1}`} value={i + 1} />
            ))}
          </Picker>

          <Text style={styles.label}>Cantidad de grupos</Text>
          <Picker
            selectedValue={groupCount}
            onValueChange={(itemValue) => setGroupCount(itemValue)}
            style={styles.picker}
          >
            {[...Array(16).keys()].map(i => (
              <Picker.Item key={i} label={`${i + 1}`} value={i + 1} />
            ))}
          </Picker>

          <Text style={styles.label}>Participantes por grupo</Text>
          <Picker
            selectedValue={participantsPerGroup}
            onValueChange={(itemValue) => setParticipantsPerGroup(itemValue)}
            style={styles.picker}
          >
            {[...Array(20).keys()].map(i => (
              <Picker.Item key={i} label={`${i + 1}`} value={i + 1} />
            ))}
          </Picker>
        </>
      )}

      <Button title="Crear Torneo" onPress={handleCreateTournament} />
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#121530', // Fondo uniforme y moderno
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
    color: '#ffffff',
    fontWeight: '700',
  },
  input: {
    borderWidth: 1,
    borderColor: '#3a4b72',
    padding: 12,
    marginVertical: 10,
    borderRadius: 10,
    backgroundColor: '#1c2340',
    color: '#ffffff',
  },
  label: {
    color: '#ffffff',
    marginTop: 10,
    fontWeight: '600',
    fontSize: 16,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  checkboxLabel: {
    color: '#ffffff',
    marginLeft: 8,
    fontSize: 14,
  },
  picker: {
    height: 50,
    width: '100%',
    backgroundColor: '#1c2340',
    borderRadius: 10,
    color: '#ffffff',
    marginVertical: 10,
    paddingHorizontal: 10,
  },
  buttonContainer: {
    backgroundColor: '#4CAF50',
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '700',
  },
});
