import React, { useState } from 'react';
import { View, TextInput } from 'react-native';

export default function TournamentDatePicker() {
  const [date, setDate] = useState('');

  const handleDateChange = (input) => {
    const formattedInput = input.replace(/\//g, '-'); // Reemplaza "/" con "-"
    setDate(formattedInput);
  };

  const displayDate = date.replace(/-/g, '/'); // Muestra "-" como "/"

  return (
    <View>
      <TextInput
        style={{ borderBottomWidth: 1, padding: 10, marginBottom: 20, color: '#ffffff' }}
        placeholder="Introduce la fecha (dd-mm-yyyy)"
        placeholderTextColor="#ffffff"
        color="#ffffff"
        value={displayDate}
        onChangeText={handleDateChange}
        keyboardType="numeric"
      />
    </View>
  );
}
