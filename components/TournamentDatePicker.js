import React, { useState } from 'react';
import { View, TextInput } from 'react-native';

export default function TournamentDatePicker() {
  const [date, setDate] = useState('');

  return (
    <View>
      <TextInput
        style={{ borderBottomWidth: 1, padding: 10, marginBottom: 20, color: '#ffffff' }}
        placeholder="Introduce la fecha (dd/mm/yyyy)"
        placeholderTextColor="#ffffff"
        color="#ffffff"
        value={date}
        onChangeText={setDate}
        keyboardType="numeric"
      />
    </View>
  );
}
