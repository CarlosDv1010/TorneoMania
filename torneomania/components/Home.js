import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { getEnrolledTournaments, getFeaturedTournaments } from '../services/backendless';
import { useNavigation } from '@react-navigation/native';
import LogoutButton from './LogoutButton';

export default function Home() {
  const navigation = useNavigation();
  const [enrolledTournaments, setEnrolledTournaments] = useState([]);
  const [featuredTournaments, setFeaturedTournaments] = useState([]);

  useEffect(() => {
    // Simulación de datos con imágenes dummy
    const enrolled = [
      { id: '1', name: 'Enigma876', sport: 'Fútbol', winRate: 95, gamesPlayed: 127, avatar: 'https://via.placeholder.com/50' },
      { id: '2', name: 'Elitotrop98', sport: 'Voleibol', winRate: 87, gamesPlayed: 98, avatar: 'https://via.placeholder.com/50' },
      { id: '3', name: 'CrateDuL8o', sport: 'Valorant', winRate: 82.5, gamesPlayed: 64, avatar: 'https://via.placeholder.com/50' },
    ];
    const featured = [
      { id: '1', name: 'Copa de Fútbol', description: 'Un torneo emocionante para todos los niveles.', image: 'https://via.placeholder.com/100' },
      { id: '2', name: 'Voleibol Playa', description: 'Compite en la arena y demuestra tu habilidad.', image: 'https://via.placeholder.com/100' },
      { id: '3', name: 'Torneo de Valorant', description: 'Demuestra tu destreza en este juego de disparos.', image: 'https://via.placeholder.com/100' },
    ];
    setEnrolledTournaments(enrolled);
    setFeaturedTournaments(featured);
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
          {/* Botón de la campana de notificaciones */}
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

      <ScrollView>
        <Image source={{ uri: 'https://via.placeholder.com/300x150' }} style={styles.banner} />
        
        <View style={styles.searchContainer}>
          <Text style={styles.searchText}>BÚSQUEDA DE TORNEOS</Text>
        </View>

        <Text style={styles.sectionTitle}>Lo más popular</Text>
        <FlatList
          data={featuredTournaments}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => navigation.navigate('TournamentsDetail', {tournament: item})}>
              <View style={styles.tournamentCard}>
                <Image source={{ uri: item.image }} style={styles.tournamentImage} />
                <View style={styles.tournamentInfo}>
                  <Text style={styles.tournamentName}>{item.name}</Text>
                  <Text style={styles.tournamentDescription}>{item.description}</Text>
                  <TouchableOpacity style={styles.registerButton}>
                    <Text style={styles.registerButtonText}>Registrarse</Text>
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
  banner: {
    width: '100%',
    height: 150,
    marginBottom: 20,
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
