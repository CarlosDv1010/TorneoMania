// LogoutButton.js
import React, { useState } from 'react';
import { Button, Alert, ActivityIndicator, View } from 'react-native';
import { logoutUser } from '../services/backendless';

export default function LogoutButton({ onLogout }) {
  const [isLoading, setIsLoading] = useState(false);

  const handleLogout = async () => {
    setIsLoading(true);
    try {
      await logoutUser();
      Alert.alert('Sesión cerrada');
      onLogout(); // Llamamos a la función pasada como prop
    } catch (error) {
      Alert.alert('Error al cerrar sesión', error?.message || 'Inténtalo de nuevo más tarde.');
    } finally {
      setIsLoading(false);
    }
  };

  return isLoading ? (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator size="large" color="#0000ff" />
    </View>
  ) : (
    <Button title="Cerrar Sesión" onPress={handleLogout} />
  );
}