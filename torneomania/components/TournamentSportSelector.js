import React from 'react';
import { View, Picker, StyleSheet } from 'react-native';

export default function TournamentSportSelector({ selectedSport, setSelectedSport, sportsList }) {
  return (
    <View>
      <Picker
        selectedValue={selectedSport}
        onValueChange={(itemValue) => setSelectedSport(itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="Seleccionar Deporte" value="" />
        {sportsList.map((sport) => (
          <Picker.Item key={sport.objectId} label={sport.name} value={sport.name} />
        ))}
      </Picker>
    </View>
  );
}

const styles = StyleSheet.create({
  picker: {
    height: 50,
    borderColor: '#ccc',
    marginVertical: 10,
  },
});
