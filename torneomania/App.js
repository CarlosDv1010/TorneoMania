import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './components/Login';
import Register from './components/Register';
import LogoutButton from './components/LogoutButton';
import Home from './components/Home';
import NotificationCenter from './components/NotificationCenter';
import CreateTournament from './components/CreateTournament';
import { getCurrentUser } from './services/backendless';

const Stack = createStackNavigator();

export default function App() {
  const [user, setUser] = useState(null);
  const [showRegister, setShowRegister] = useState(false);

  useEffect(() => {
    async function fetchCurrentUser() {
      const currentUser = await getCurrentUser();
      if (currentUser) {
        setUser(currentUser);
      }
    }
    fetchCurrentUser();
  }, []);

  const toggleRegister = () => {
    setShowRegister(!showRegister);
  };

  return (
    <NavigationContainer>
      {user ? (
        <Stack.Navigator>
          <Stack.Screen name="Home" options={{ title: `Bienvenido, ${user.username}` }}>
            {() => (
              <Home
                user={user}
                logout={() => setUser(null)}
              />
            )}
          </Stack.Screen>
          <Stack.Screen
            name="Notifications"
            component={NotificationCenter}
            options={{ title: 'Notificaciones' }}
          />
          <Stack.Screen
            name="CreateTournament"
            component={CreateTournament}
            options={{ title: 'Crear Torneo' }}
          />
        </Stack.Navigator>
      ) : (
        <View style={styles.container}>
          {showRegister ? (
            <>
              <Register onRegister={setUser} />
              <Button title="Ya tengo una cuenta" onPress={toggleRegister} />
            </>
          ) : (
            <>
              <Login onLogin={setUser} />
              <Button title="Crear una cuenta" onPress={toggleRegister} />
            </>
          )}
        </View>
      )}
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
});
