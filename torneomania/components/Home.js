import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { getEnrolledTournaments, getFeaturedTournaments, getOrganizedTournaments } from '../services/backendless';
import { useNavigation } from '@react-navigation/native';
import LogoutButton from './LogoutButton';
import SubscriptionsMenu from './SubscriptionsMenu';
import CreateTournamentButton from './CreateTournamentButton';

export default function Home() {
  const navigation = useNavigation();
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
    navigation.navigate('TournamentDetails', { tournament });
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
      <ScrollView>
        {/* Botón para navegar al menú de torneos */}
        <TouchableOpacity
          style={styles.searchContainer}
          onPress={() => navigation.navigate('TournamentMenu')}
        >
          <Text style={styles.searchText}>BÚSQUEDA DE TORNEOS</Text>
        </TouchableOpacity>

        {/* Botón para crear torneo */}
        <CreateTournamentButton />

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
                <Image source={{ uri: item.sport }} style={styles.tournamentImage} />
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
        />

        <Text style={styles.sectionTitle}>Mis Torneos Creados</Text>
        <FlatList
          data={organizedTournaments}
          keyExtractor={(item) => item.objectId}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handleTournamentPress(item)}>
              <View style={styles.tournamentCard}>
                <Image source={{ uri: item.sport }} style={styles.tournamentImage} />
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
                <Image source={{ uri: item.sport }} style={styles.tournamentImage} />
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

        <LogoutButton />
      </ScrollView>
    </View>
    
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1f3e', // Fondo similar al de la imagen
  },
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#1a1f3e',
  },
  logo: {
    width: 50,
    height: 50,
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
  },
  navButton: {
    backgroundColor: '#ffffff',
    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginLeft: 10,
  },
  navButtonText: {
    color: '#1a1f3e',
    fontSize: 14,
    fontWeight: 'bold',
  },
  searchContainer: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: '#ffffff',
    borderRadius: 10,
    marginHorizontal: 20,
    marginBottom: 20,
    alignItems: 'center',
  },
  searchText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  sectionTitle: {
    fontSize: 20,
    color: '#ffffff',
    fontWeight: 'bold',
    marginHorizontal: 20,
    marginBottom: 10,
  },
  tournamentCard: {
    flexDirection: 'row',
    backgroundColor: '#2c365d',
    borderRadius: 10,
    padding: 10,
    marginHorizontal: 20,
    marginBottom: 10,
    alignItems: 'center',
  },
  tournamentImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginRight: 10,
  },
  tournamentInfo: {
    flex: 1,
  },
  tournamentName: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  tournamentDescription: {
    color: '#aaaaaa',
    fontSize: 14,
    marginBottom: 10,
  },
  registerButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    alignSelf: 'flex-start',
  },
  registerButtonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  playerCard: {
    flexDirection: 'row',
    backgroundColor: '#2c365d',
    borderRadius: 10,
    padding: 10,
    marginHorizontal: 20,
    marginBottom: 10,
    alignItems: 'center',
  },
  playerAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  playerInfo: {
    flex: 1,
  },
  playerName: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  playerDetails: {
    color: '#aaaaaa',
    fontSize: 14,
  },
});
