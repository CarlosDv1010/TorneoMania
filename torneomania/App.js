import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import 'bootstrap/dist/css/bootstrap.css';
import * as bs from 'react-bootstrap';
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
        <div className="container">
          <bs.Row>
            <bs.Col md={2}>
            </bs.Col>
              <bs.Col md = {8}>
                <bs.Card>
                  <bs.CardBody style={{ backgroundColor: '#8f0d0d' }}>
                    {showRegister ? (
                      <>
                        <Register onRegister={setUser} />
                        <Button title="Ya tengo una cuenta" onPress={toggleRegister} />
                      </>
                    ) : (
                      <>
                        <Login onLogin={setUser} />
                        <Text>{"\n"}</Text> {/* Salto de línea */}
                        <Button title="Crear una cuenta" onPress={toggleRegister} />
                      </>
                    )}
                  </bs.CardBody>
                </bs.Card>
              </bs.Col>
            <bs.Col md={2}>
            </bs.Col>
          </bs.Row>
        </div>
      )}
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  fullScreen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  centeredCard: {
    width: '80%',
    backgroundColor: '#8f0d0d',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  cardBody: {
    padding: 20,
  },
});
