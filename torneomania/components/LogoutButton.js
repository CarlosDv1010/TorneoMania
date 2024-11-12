import React from 'react';
import { Button, Alert } from 'react-native';
import { logoutUser } from '../services/backendless';
import { useNavigation } from '@react-navigation/native';
import { CommonActions } from '@react-navigation/native';

export default function LogoutButton() {
  const navigation = useNavigation();

  const handleLogout = async () => {
    try {
      await logoutUser();
      Alert.alert('Sesión cerrada');
      
      // Reinicia el stack de navegación y redirige a Login
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: 'Login' }],
        })
      );
      
    } catch (error) {
      Alert.alert('Error al cerrar sesión', error.message);
    }
  };

  return <Button title="Cerrar Sesión" onPress={handleLogout} />;
}
