// LogoutButton.js
import React, { useState } from 'react';
import { Button, ActivityIndicator, View } from 'react-native';

export default function LogoutButton({ onLogout }) {
  const [isLoading, setIsLoading] = useState(false);

  const handlePress = async () => {
    setIsLoading(true);
    try {
      await onLogout();
    } finally {
      setIsLoading(false);
    }
  };

  return isLoading ? (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator size="large" color="#0000ff" />
    </View>
  ) : (
    <Button title="Cerrar Sesión" onPress={handlePress} />
  );
}