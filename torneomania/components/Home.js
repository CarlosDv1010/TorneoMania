import React, { useState, useEffect } from 'react';
import { View, Text, Button, FlatList, StyleSheet } from 'react-native';
import { getEnrolledTournaments, getFeaturedTournaments } from '../services/backendless';
import LogoutButton from './LogoutButton';

export default function Home({ navigation }) {
  const [enrolledTournaments, setEnrolledTournaments] = useState([]);
  const [featuredTournaments, setFeaturedTournaments] = useState([]);

  useEffect(() => {
    async function fetchTournaments() {
      const enrolled = await getEnrolledTournaments();
      const featured = await getFeaturedTournaments();
      setEnrolledTournaments(enrolled);
      setFeaturedTournaments(featured);
    }
    fetchTournaments();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Torneos Inscritos</Text>
      <FlatList
        data={enrolledTournaments}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <Text>{item.name}</Text>}
      />
      
      <Text style={styles.title}>Torneos Destacados</Text>
      <FlatList
        data={featuredTournaments}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <Text>{item.name}</Text>}
      />
      
      <Button title="Crear Torneo" onPress={() => navigation.navigate('CreateTournament')} />
      <Button title="Ver Notificaciones" onPress={() => navigation.navigate('Notifications')} />
      <LogoutButton />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
  },
  title: {
    fontSize: 24,
    marginBottom: 10,
    textAlign: 'center',
  },
});
