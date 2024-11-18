import React, { useState, useEffect } from 'react'; 
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './components/Login';
import Register from './components/Register';
import LoginAnticipado from './components/LoginAnticipado';
import Home from './components/Home';
import TournamentsDetail from './components/TournamentsDetail';
import NotificationCenter from './components/NotificationCenter';
import CreateTournament from './components/CreateTournament';
import TournamentMenu from './components/TournamentMenu';
import SportTournaments from './components/SportTournaments';
import TournamentRegistration from './components/TournamentRegistration';
import Profile from './components/Profile';
import SubscriptionScreen from './components/Subscriptionscreen'; 
import { getCurrentUser, logoutUser } from './services/backendless';
import 'bootstrap/dist/css/bootstrap.min.css';

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

  const handleLogout = async () => {
    try {
      await logoutUser();
      setUser(null);
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  return (
    <NavigationContainer>
      {user ? (
        <Stack.Navigator
          screenOptions={{
            headerStyle: {
              backgroundColor: '#2c365d',
              borderBottomWidth: 0,
              shadowColor: 'transparent',
            },
            headerTintColor: '#ffffff',
          }}
        >
          <Stack.Screen
            name="Home"
            options={{ title: `Bienvenido, ${user.username}` }}
          >
            {(props) => <Home {...props} user={user} handleLogout={handleLogout} />}
          </Stack.Screen>
          <Stack.Screen
            name="TournamentMenu"
            component={TournamentMenu}
            options={{ title: 'Volver' }}
          />
          <Stack.Screen
            name="SportTournaments"
            component={SportTournaments}
            options={({ route }) => ({ title: `Torneos de ${route.params.sport}` })}
          />
          <Stack.Screen
            name="Notifications"
            component={NotificationCenter}
            options={{ title: 'Volver' }}
          />
          <Stack.Screen
            name="TournamentRegistration"
            component={TournamentRegistration}
            options={{ title: 'Detalles del Torneo' }}
          />
          <Stack.Screen
            name="CreateTournament"
            component={CreateTournament}
            options={{ title: 'Volver' }}
          />
          <Stack.Screen 
            name="TournamentsDetail" 
            component={TournamentsDetail} 
            options={{ title: 'Detalle del Torneo' }} 
          />
          <Stack.Screen
            name="Profile"
            options={{ title: 'Perfil' }}
          >
            {(props) => <Profile {...props} user={user} logout={handleLogout} />}
          </Stack.Screen>

          <Stack.Screen
            name="SubscriptionScreen"
            component={SubscriptionScreen}
            options={{ title: 'Suscripción Premium' }}
          />
          


        </Stack.Navigator>
      ) : (
        <Stack.Navigator>
          <Stack.Screen
            name="LoginAnticipado"
            options={{ headerShown: false }}
          >
            {(props) => <LoginAnticipado {...props} onRegister={setUser} />}
          </Stack.Screen>
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
