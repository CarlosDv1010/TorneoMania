import React, { useState, useEffect } from 'react'; 
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home';
import TournamentsDetail from './components/TournamentsDetail';
import NotificationCenter from './components/NotificationCenter';
import CreateTournament from './components/CreateTournament';
import TournamentMenu from './components/TournamentMenu';
import SportTournaments from './components/SportTournaments';
import TournamentRegistration from './components/TournamentRegistration';
import Profile from './components/Profile';  // Import Profile component
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

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <NavigationContainer>
      {user ? (
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            options={{ title: `Bienvenido, ${user.username}` }}
          >
            {(props) => <Home {...props} user={user} logout={handleLogout} />}
          </Stack.Screen>
          <Stack.Screen
            name="TournamentMenu"
            component={TournamentMenu}
            options={{ title: 'Torneos' }}
          />
          <Stack.Screen
            name="SportTournaments"
            component={SportTournaments}
            options={({ route }) => ({ title: `Torneos de ${route.params.sport}` })}
          />
          <Stack.Screen
            name="Notifications"
            component={NotificationCenter}
            options={{ title: 'Notificaciones' }}
          />
          <Stack.Screen
            name="TournamentRegistration"
            component={TournamentRegistration}
            options={{ title: 'Detalles del Torneo' }}
          />
          <Stack.Screen
            name="CreateTournament"
            component={CreateTournament}
            options={{ title: 'Crear Torneo' }}
          />
          <Stack.Screen 
            name="TournamentsDetail" 
            component={TournamentsDetail} 
            options={{ title: 'Detalle del Torneo' }} 
          />
          {/* Add Profile screen */}
          <Stack.Screen
            name="Profile"
            component={Profile}
            options={{ title: 'Perfil' }}
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
