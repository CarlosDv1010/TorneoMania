import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { getEnrolledTournaments, getFeaturedTournaments, getOrganizedTournaments, getSport } from '../services/backendless';
import { useNavigation } from '@react-navigation/native';
import LogoutButton from './LogoutButton';
import SubscriptionsMenu from './SubscriptionsMenu';
import CreateTournamentButton from './CreateTournamentButton';

export default function Home({ user, handleLogout, navigation }) {
  const [organizedTournaments, setOrganizedTorunaments] = useState([]);
  const [featuredTournaments, setFeaturedTournaments] = useState([]);
  const [enrolledTournaments, setEnrolledTournaments] = useState([]);

  
  useEffect(() => {
    const fetchTournaments = async () => {
      try {
        const enrolled = await getEnrolledTournaments();
        const organized = await getOrganizedTournaments();
        const featured = await getFeaturedTournaments();
        setOrganizedTorunaments(organized);
        setFeaturedTournaments(featured);
        setEnrolledTournaments(enrolled);
        
      } catch (error) {
        Alert.alert('Error', 'No se pudieron cargar los torneos');
        console.error('Error al cargar torneos:', error);
      }
    };

    fetchTournaments();
  }, []);

  const handleTournamentPress = (tournament) => {
    navigation.navigate('TournamentsDetail', { tournament });
  };

  return (
    <View style={styles.container}>
      {/* Barra de navegación */}
      <View style={styles.navbar}>
        <Image source={{ uri: 'https://via.placeholder.com/50' }} style={styles.logo} />
        <View style={styles.navButtons}>
          <TouchableOpacity onPress={() => navigation.navigate('Notifications')} style={styles.notificationIconContainer}>
            <Image source={{ uri: 'https://via.placeholder.com/30' }} style={styles.notificationIcon} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.navButton}>
            <Text style={styles.navButtonText}>Regístrate</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navButton}>
            <Text style={styles.navButtonText}>Log In</Text>
          </TouchableOpacity>
        </View>
      </View>
      
      <SubscriptionsMenu show={true}></SubscriptionsMenu>
      {/* Botón para navegar al menú de torneos */}
      <View style={styles.buttonRow}>
        <TouchableOpacity
          style={[styles.searchContainer, { flex: 1, marginRight: 10 }]} // Flex: 1 hace que los botones se distribuyan proporcionalmente
          onPress={() => navigation.navigate('TournamentMenu')}
        >
          <Text style={styles.searchText}>BÚSQUEDA DE TORNEOS</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.searchContainer, { flex: 1 }]}
          onPress={() => navigation.navigate('CreateTournament')}
        >
          <Text style={styles.searchText}>CREAR TORNEO</Text>
        </TouchableOpacity>
      </View>

      {/* Botón para ir a perfil */}
      <TouchableOpacity
        style={styles.searchContainer}
        onPress={() => navigation.navigate('Profile')}
      >
        <Text style={styles.searchText}>Ir al Perfil</Text>
      </TouchableOpacity>
      <Text style={styles.sectionTitle}>Lo más popular</Text>
      <FlatList
        data={featuredTournaments}
        keyExtractor={(item) => item.objectId}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleTournamentPress(item)}>
            <View style={styles.tournamentCard}>
              <Image source={{ uri: item.image }} style={styles.tournamentImage} />
              <View style={styles.tournamentInfo}>
                <Text style={styles.tournamentName}>{item.name}</Text>
                <Text style={styles.tournamentDescription}>{item.description}</Text>
                <TouchableOpacity
                  style={styles.registerButton}
                  onPress={() => {
                    const tournamentId = item.objectId;
                    navigation.navigate('TournamentRegistration', { tournamentId });
                  }}
                >
                  <Text style={styles.registerButtonText}>Registrarse</Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableOpacity>
        )}
        horizontal // Habilita el desplazamiento horizontal
        showsHorizontalScrollIndicator={true}
        contentContainerStyle={{ paddingHorizontal: 5 }} // Ajusta el espacio alrededor
      />



      <Text style={styles.sectionTitle}>Mis Torneos Creados</Text>
      <FlatList
        data={organizedTournaments}
        keyExtractor={(item) => item.objectId}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleTournamentPress(item)}>
            <View style={styles.tournamentCard}>
              <Image source={{ uri: item.image }} style={styles.tournamentImage} />
              <View style={styles.tournamentInfo}>
                <Text style={styles.tournamentName}>{item.name}</Text>
                <Text style={styles.tournamentDescription}>{item.description}</Text>
                <TouchableOpacity style={styles.registerButton}>
                  <Text style={styles.registerButtonText}>Ver información</Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />

      <Text style={styles.sectionTitle}>Mis Torneos</Text>
      <FlatList
        data={enrolledTournaments}
        keyExtractor={(item) => item.objectId}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleTournamentPress(item)}>
            <View style={styles.tournamentCard}>
              <Image source={{ uri: item.image }} style={styles.tournamentImage} />
              <View style={styles.tournamentInfo}>
                <Text style={styles.tournamentName}>{item.name}</Text>
                <Text style={styles.tournamentDescription}>{item.description}</Text>
                <TouchableOpacity style={styles.registerButton}>
                  <Text style={styles.registerButtonText}>Ver información</Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />

      <Text style={styles.sectionTitle}>Ranking de jugadores</Text>
      <FlatList
        data={enrolledTournaments}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.playerCard}>
            <Image source={{ uri: item.avatar }} style={styles.playerAvatar} />
            <View style={styles.playerInfo}>
              <Text style={styles.playerName}>{item.name}</Text>
              <Text style={styles.playerDetails}>{item.sport} - {item.winRate}% Winrate - {item.gamesPlayed} Games</Text>
            </View>
          </View>
        )}
      />

      <View style={styles.logoutButtonContainer}>
        <LogoutButton onLogout={handleLogout} />
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121530', // Fondo más moderno y elegante.
  },
  buttonRow: {
    flexDirection: 'row',
    //marginHorizontal: 20, // Espacio en los lados del contenedor
    marginTop: 20,
  },
  logoutButtonContainer: {
    backgroundColor: '#ff4d4d', // Fondo rojo claro para el contenedor
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginHorizontal: 20,
    marginBottom: 20,
    alignItems: 'center', // Centra el contenido
  },
  searchContainer: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: '#ffffff',
    borderRadius: 10,
    alignItems: 'center',
    backgroundColor: '#2c365d', // Ajustar color de fondo si es necesario
  },
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#1c2340',
    borderBottomWidth: 1,
  },
  logo: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  navButtons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  notificationIconContainer: {
    marginRight: 10,
  },
  notificationIcon: {
    width: 30,
    height: 30,
    tintColor: '#ffffff',
  },
  navButton: {
    backgroundColor: '#3a4b72',
    borderRadius: 20,
    paddingVertical: 5,
    paddingHorizontal: 15,
    marginLeft: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  navButtonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
  },
  searchContainer: {
    paddingVertical: 12,
    paddingHorizontal: 25,
    backgroundColor: '#3a4b72',
    borderRadius: 20,
    marginHorizontal: 20,
    marginBottom: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  searchText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '700',
  },
  sectionTitle: {
    fontSize: 22,
    color: '#ffffff',
    fontWeight: '700',
    marginHorizontal: 20,
    marginBottom: 10,
    borderBottomWidth: 2,
    borderBottomColor: '#4CAF50',
  },
  tournamentCard: {
    width: 250, // Establece un ancho fijo para las tarjetas
    height: 150, // Establece una altura fija para las tarjetas
    flexDirection: 'row',
    backgroundColor: '#1c2340',
    borderRadius: 15,
    padding: 15,
    marginHorizontal: 10,
    marginBottom: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  tournamentImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginRight: 15,
  },
  tournamentInfo: {
    flex: 1,
  },
  tournamentName: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 5,
  },
  tournamentDescription: {
    color: '#cccccc',
    fontSize: 14,
    marginBottom: 10,
  },
  registerButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 10,
    alignSelf: 'flex-start',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  registerButtonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '700',
  },
  playerCard: {
    flexDirection: 'row',
    backgroundColor: '#1c2340',
    borderRadius: 15,
    padding: 15,
    marginHorizontal: 20,
    marginBottom: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  playerAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  playerInfo: {
    flex: 1,
  },
  playerName: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '700',
  },
  playerDetails: {
    color: '#cccccc',
    fontSize: 14,
  },
});
