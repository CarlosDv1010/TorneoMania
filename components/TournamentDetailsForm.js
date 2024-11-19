import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';

export default function TournamentDetailsForm({
  tournamentName,
  setTournamentName,
  tournamentDescription,
  setTournamentDescription,
}) {
  return (
    <View>
      <TextInput
        style={styles.input}
        placeholder="Nombre del Torneo"
        placeholderTextColor={'#ffffff'}
        value={tournamentName}
        onChangeText={setTournamentName}
      />
      <TextInput
        style={styles.input}
        placeholder="Descripción del Torneo"
        placeholderTextColor={'#ffffff'}
        value={tournamentDescription}
        onChangeText={setTournamentDescription}
        multiline
      />
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginVertical: 10,
    borderRadius: 5,
  },
});
