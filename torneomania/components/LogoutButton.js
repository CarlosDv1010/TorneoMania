import React from 'react';
import { Button, Alert } from 'react-native';
import { logoutUser } from '../services/backendless';

export default function LogoutButton({ onLogout }) {
  const handleLogout = async () => {
    try {
      await logoutUser();
      Alert.alert('Sesión cerrada');
      onLogout();
    } catch (error) {
      Alert.alert('Error al cerrar sesión', error.message);
    }
  };

  return <Button title="Cerrar Sesión" onPress={handleLogout} />;
}
