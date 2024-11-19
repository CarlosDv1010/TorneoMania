import React from 'react';
import { Button, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function CreateTournamentButton() {
  const navigation = useNavigation();

  const handleCreateTournament = () => {
    Alert.alert('Navegando a crear torneo');
    navigation.navigate('CreateTournament');
  };

  return <Button title="Crear Torneo" onPress={handleCreateTournament} />;
}
