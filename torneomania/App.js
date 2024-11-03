import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home';
import NotificationCenter from './components/NotificationCenter';
import CreateTournament from './components/CreateTournament';
import { getCurrentUser } from './services/backendless';

const Stack = createStackNavigator();

export default function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function fetchCurrentUser() {
      const currentUser = await getCurrentUser();
      if (currentUser) {
        setUser(currentUser);
      }
    }
    fetchCurrentUser();
  }, []);

  return (
    <NavigationContainer>
      {user ? (
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            options={{ title: `Bienvenido, ${user.username}` }}
          >
            {() => <Home user={user} logout={() => setUser(null)} />}
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
        <Stack.Navigator>
          <Stack.Screen
            name="Login"
            options={{ headerShown: false }}
          >
            {(props) => <Login {...props} onLogin={setUser} />}
          </Stack.Screen>
          <Stack.Screen
            name="Register"
            options={{ headerShown: false }}
          >
            {(props) => <Register {...props} onRegister={setUser} />}
          </Stack.Screen>
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
}
