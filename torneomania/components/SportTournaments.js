import React from 'react';
import { View, Text, FlatList, StyleSheet, Image } from 'react-native';

// Lista de torneos para cada deporte
const tournaments = [
  { id: '1', name: 'Torneo de Fútbol 1', sport: 'Fútbol', image: 'https://via.placeholder.com/100' },
  { id: '2', name: 'Torneo de Fútbol 2', sport: 'Fútbol', image: 'https://via.placeholder.com/100' },
  { id: '3', name: 'Torneo de Fútbol 3', sport: 'Fútbol', image: 'https://via.placeholder.com/100' },
  // Agrega más torneos para el deporte Fútbol y otros deportes
  { id: '11', name: 'Torneo de Volley 1', sport: 'Voleibol', image: 'https://via.placeholder.com/100' },
  { id: '12', name: 'Torneo de Volley 2', sport: 'Voleibol', image: 'https://via.placeholder.com/100' },
  // Más torneos para otros deportes
];

export default function SportTournaments({ route }) {
  const { sport } = route.params; // Obtener el deporte seleccionado de la navegación

  // Filtrar torneos para el deporte seleccionado
  const filteredTournaments = tournaments.filter(tournament => tournament.sport === sport);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Torneos de {sport}</Text>
      <FlatList
        data={filteredTournaments}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.tournamentCard}>
            <Image source={{ uri: item.image }} style={styles.tournamentImage} />
            <Text style={styles.tournamentName}>{item.name}</Text>
          </View>
        )}
        numColumns={3} // Mostrar los torneos en 3 columnas
        columnWrapperStyle={styles.columnWrapper}
        contentContainerStyle={styles.tournamentList}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1f3e',
    padding: 10,
  },
  title: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  tournamentList: {
    paddingBottom: 20,
  },
  columnWrapper: {
    justifyContent: 'space-between',
  },
  tournamentCard: {
    flex: 1,
    backgroundColor: '#2c365d',
    borderRadius: 10,
    padding: 10,
    margin: 5,
    alignItems: 'center',
    maxWidth: '30%',
  },
  tournamentImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginBottom: 10,
  },
  tournamentName: {
    color: '#ffffff',
    fontSize: 14,
    textAlign: 'center',
  },
});
