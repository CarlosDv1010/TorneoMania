import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {/* Aquí irán las pantallas de tu aplicación */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
