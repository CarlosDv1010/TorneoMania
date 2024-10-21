import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { createTournament } from '../services/backendless';

export default function CreateTournament() {
  const [name, setName] = useState('');
  const [sport, setSport] = useState('');

  const handleCreate = async () => {
    if (name === '' || sport === '') {
      Alert.alert('Error', 'Por favor, rellena todos los campos');
      return;
    }

    try {
      await createTournament({ name, sport });
      Alert.alert('Torneo creado', `El torneo "${name}" ha sido creado exitosamente`);
      setName('');
      setSport('');
    } catch (error) {
      Alert.alert('Error al crear torneo', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Crear Torneo</Text>
      <TextInput
        style={styles.input}
        placeholder="Nombre del Torneo"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Deporte"
        value={sport}
        onChangeText={setSport}
      />
      <Button title="Crear Torneo" onPress={handleCreate} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
  },
  title: {
    fontSize: 24,
    marginBottom: 10,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginVertical: 10,
    borderRadius: 5,
  },
});
