import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';

const sports = [
  { id: '1', name: 'Fútbol', emoji: '⚽️' },
  { id: '2', name: 'Basketball', emoji: '🏀' },
  { id: '3', name: 'Tenis', emoji: '🎾' },
  { id: '4', name: 'Voleibol', emoji: '🏐' },
  { id: '5', name: 'Balonmano', emoji: '🤾' },
  { id: '6', name: 'Juegos de mesa', emoji: '♟️' },
  { id: '7', name: 'eSports', emoji: '🎮' },
  { id: '8', name: 'Otros', emoji: '🎲' },
];

const tournaments = {
  Fútbol: Array(30).fill({ name: 'Torneo de Fútbol', image: 'https://via.placeholder.com/100' }),
  Basketball: Array(20).fill({ name: 'Torneo de Basketball', image: 'https://via.placeholder.com/100' }),
  Tenis: Array(15).fill({ name: 'Torneo de Tenis', image: 'https://via.placeholder.com/100' }),
  Voleibol: Array(10).fill({ name: 'Torneo de Voleibol', image: 'https://via.placeholder.com/100' }),
  Balonmano: Array(5).fill({ name: 'Torneo de Balonmano', image: 'https://via.placeholder.com/100' }), 
  'Juegos de mesa': Array(5).fill({ name: 'Torneo de Juegos de Mesa', image: 'https://via.placeholder.com/100' }), 
  eSports: Array(10).fill({ name: 'Torneo de eSports', image: 'https://via.placeholder.com/100' }), 
  Otros: Array(10).fill({ name: 'Torneo de Otros', image: 'https://via.placeholder.com/100' }), 
};

export default function TournamentMenu({ navigation }) {
  const [selectedSport, setSelectedSport] = useState('Todos');

  const handleFilterPress = (sport) => {
    setSelectedSport(sport);
  };

  const handleTournamentPress = (tournament) => {
    navigation.navigate('TournamentsDetail', { tournament });
  };


  const filteredTournaments =
    selectedSport === 'Todos' ? Object.values(tournaments).flat() : tournaments[selectedSport];

  return (
    <View style={styles.container}>
      {/* Barra de navegación */}
      <View style={styles.navbar}>
        <Image source={{ uri: 'https://via.placeholder.com/50' }} style={styles.logo} />
        <Text style={styles.title}>Torneos</Text>
      </View>

      {/* Menú de filtros */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.filterMenu}
      >
        <TouchableOpacity
          style={[
            styles.filterButton,
            selectedSport === 'Todos' && styles.selectedFilterButton,
          ]}
          onPress={() => handleFilterPress('Todos')}
        >
          <Text style={styles.filterText}>🔍 Todos</Text>
        </TouchableOpacity>
        {sports.map((sport) => (
          <TouchableOpacity
            key={sport.id}
            style={[
              styles.filterButton,
              selectedSport === sport.name && styles.selectedFilterButton,
            ]}
            onPress={() => handleFilterPress(sport.name)}
          >
            <Text style={styles.filterText}>{sport.emoji} {sport.name}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Contenedor con scroll para los torneos */}
      <View style={styles.tournamentContainer}>
        <ScrollView>
          <View style={styles.tournamentList}>
            {filteredTournaments.map((item, index) => (
              <TouchableOpacity onPress={() => handleTournamentPress(item)}>
                  <View key={index.toString()} style={styles.tournamentCard}>
                  <Image source={{ uri: item.image }} style={styles.tournamentImage} />
                  <Text style={styles.tournamentName}>{item.name}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1f3e',
  },
  navbar: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#1a1f3e',
  },
  logo: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  title: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  filterMenu: {
    paddingVertical: 5,
    backgroundColor: '#1a1f3e',
    maxHeight: 100,
  },
  filterButton: {
    paddingVertical: 10,
    paddingHorizontal: 44,
    borderRadius: 15,
    backgroundColor: '#2c365d',
    marginHorizontal: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedFilterButton: {
    backgroundColor: '#4CAF50',
  },
  filterText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  tournamentContainer: {
    flex: 1,
    marginVertical: 10,
    paddingHorizontal: 10,
    maxHeight: 400,
  },
  tournamentList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  tournamentCard: {
    width: 250, // Establece un ancho fijo para las tarjetas
    height: 150, // Establece una altura fija para las tarjetas
    backgroundColor: '#2c365d',
    borderRadius: 10,
    padding: 10,
    margin: 5,
    alignItems: 'center',
    width: '30%',
  },
  tournamentImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
  },
  tournamentName: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 5,
  },
});
