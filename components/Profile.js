import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList, ScrollView, Picker } from 'react-native';

const Profile = ({ user, logout, navigation }) => {
  const organizedTournaments = user.organizedTournaments || [];
  const enrolledTournaments = user.enrolledTournaments || [];

  // Datos de prueba para las estadísticas de cada torneo y gráficos
  const tournamentStats = {
    'Torneo 1': {
      scorers: [
        { name: 'Sancho Martinez; Giants', goals: 8 },
        { name: 'Pedro Pardo; Cubitos', goals: 5 },
        { name: 'Ernesto Contreras; Nyx', goals: 3 },
      ],
      assists: [
        { name: 'Saul Perez; Nomads', assists: 4 },
        { name: 'Sancho Martinez; Giants', assists: 4 },
        { name: 'Ernesto Contreras; Nyx', assists: 2 },
      ],
      graphic: 'https://via.placeholder.com/300x200.png?text=Bracket+Torneo+1',
    },
    'Torneo 2': {
      scorers: [
        { name: 'Miguel Lopez; Falcons', goals: 6 },
        { name: 'Carlos Silva; Eagles', goals: 4 },
        { name: 'Luis Perez; Sharks', goals: 3 },
      ],
      assists: [
        { name: 'Juan Torres; Falcons', assists: 5 },
        { name: 'Miguel Lopez; Falcons', assists: 3 },
        { name: 'Carlos Silva; Eagles', assists: 2 },
      ],
      graphic: 'https://via.placeholder.com/300x200.png?text=Bracket+Torneo+2',
    },
  };

  const [selectedTournament, setSelectedTournament] = useState('Torneo 1');

  const handleUpgradeToPremium = () => {
    navigation.navigate('SubscriptionScreen'); // Redirigir a la pantalla de suscripción
  };

  return (
    <ScrollView style={styles.container}>
      {/* Imagen de perfil */}
      <Image
        source={{ uri: 'https://via.placeholder.com/100' }} // Imagen dummy
        style={styles.profileImage}
      />

      {/* Nombre del usuario */}
      <Text style={styles.welcomeText}>Bienvenido, {user.fullName || user.username}</Text>

      {/* Detalles del usuario */}
      <View style={styles.infoContainer}>
        <Text style={styles.label}>Nombre Completo</Text>
        <Text style={styles.info}>{user.fullName || 'Nombre no disponible'}</Text>
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.label}>Correo</Text>
        <Text style={styles.info}>{user.email}</Text>
      </View>

      {/* Botón para mejorar a Premium */}
      <View style={styles.premiumContainer}>
        <Text style={styles.premiumText}>Torneomania Free</Text>
        <Text style={styles.premiumSubtitle}>Upgrade to Premium for $10/year</Text>
        <TouchableOpacity style={styles.upgradeButton} onPress={handleUpgradeToPremium}>
          <Text style={styles.upgradeButtonText}>Upgrade to Premium</Text>
        </TouchableOpacity>
      </View>

      {/* Menú desplegable para seleccionar el torneo */}
      <Text style={styles.sectionTitle}>Seleccionar Torneo</Text>
      <View style={styles.dropdownContainer}>
        <Picker
          selectedValue={selectedTournament}
          style={styles.dropdown}
          onValueChange={(itemValue) => setSelectedTournament(itemValue)}
        >
          {Object.keys(tournamentStats).map((tournament) => (
            <Picker.Item key={tournament} label={tournament} value={tournament} />
          ))}
        </Picker>
      </View>

      {/* Gráfica del torneo */}
      <Text style={styles.sectionTitle}>Gráfica del Torneo</Text>
      <View style={styles.graphicContainer}>
        <Image
          source={{ uri: tournamentStats[selectedTournament].graphic }}
          style={styles.graphicImage}
        />
      </View>

      {/* Sección de estadísticas */}
      <Text style={styles.sectionTitle}>Estadísticas</Text>
      <View style={styles.statsContainer}>
        {/* Goleadores */}
        <View style={styles.statBox}>
          <Text style={styles.statTitle}>Jugadores</Text>
          {tournamentStats[selectedTournament].scorers.map((item, index) => (
            <Text key={index} style={styles.statItem}>
              {item.name} - {item.goals} Goles
            </Text>
          ))}
        </View>

        {/* Asistencias */}
        <View style={styles.statBox}>
          <Text style={styles.statTitle}>Top Asistencias</Text>
          {tournamentStats[selectedTournament].assists.map((item, index) => (
            <Text key={index} style={styles.statItem}>
              {item.name} - {item.assists} Asistencias
            </Text>
          ))}
        </View>
      </View>

      {/* Lista de torneos organizados */}
      <Text style={styles.sectionTitle}>Torneos organizados</Text>
      <FlatList
        data={organizedTournaments}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.tournamentItem}>
            <Text style={styles.tournamentName}>{item.name}</Text>
          </View>
        )}
        ListEmptyComponent={<Text style={styles.emptyListText}>No has organizado torneos.</Text>}
        style={styles.tournamentList}
      />

      {/* Lista de torneos inscritos */}
      <Text style={styles.sectionTitle}>Torneos inscritos</Text>
      <FlatList
        data={enrolledTournaments}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.tournamentItem}>
            <Text style={styles.tournamentName}>{item.name}</Text>
          </View>
        )}
        ListEmptyComponent={<Text style={styles.emptyListText}>No estás inscrito en torneos.</Text>}
        style={styles.tournamentList}
      />

      {/* Botones de acción */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.changePasswordButton}>
          <Text style={styles.buttonText}>Cambiar contraseña</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.logoutButton} onPress={logout}>
          <Text style={styles.buttonText}>CERRAR CUENTA</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#1a1f3e', padding: 20 },
  profileImage: { width: 100, height: 100, borderRadius: 50, marginBottom: 20, alignSelf: 'center' },
  welcomeText: { fontSize: 20, color: '#ffffff', fontWeight: 'bold', textAlign: 'center', marginBottom: 30 },
  infoContainer: { width: '100%', paddingVertical: 10, paddingHorizontal: 15, marginBottom: 15 },
  label: { fontSize: 14, color: '#ffffff' },
  info: { fontSize: 16, color: '#ffffff' },
  premiumContainer: { marginVertical: 20, alignItems: 'center' },
  premiumText: { fontSize: 18, color: '#ffffff', fontWeight: 'bold' },
  premiumSubtitle: { fontSize: 14, color: '#ffffff', marginBottom: 10 },
  upgradeButton: { backgroundColor: '#4CAF50', paddingVertical: 10, paddingHorizontal: 20, borderRadius: 8 },
  upgradeButtonText: { color: '#ffffff', fontWeight: 'bold' },
  sectionTitle: { fontSize: 18, color: '#ffffff', fontWeight: 'bold', marginBottom: 10 },
  dropdownContainer: { backgroundColor: '#ffffff', borderRadius: 5, marginBottom: 20 },
  dropdown: { width: '100%', height: 40 },
  graphicContainer: { alignItems: 'center', marginBottom: 20 },
  graphicImage: { width: 300, height: 200, borderRadius: 10 },
  statsContainer: { flexDirection: 'row', justifyContent: 'space-between', width: '100%', marginBottom: 20 },
  statBox: { flex: 1, backgroundColor: '#D1C4E9', borderRadius: 8, padding: 15, marginHorizontal: 5 },
  statTitle: { fontSize: 16, fontWeight: 'bold', color: '#1a1f3e', marginBottom: 10 },
  statItem: { fontSize: 14, color: '#1a1f3e', marginBottom: 5 },
  tournamentList: { width: '100%', marginBottom: 20 },
  tournamentItem: { backgroundColor: '#FFCDD2', padding: 10, borderRadius: 8, marginBottom: 10 },
  tournamentName: { fontSize: 16, color: '#1a1f3e' },
  emptyListText: { fontSize: 14, color: '#aaaaaa', textAlign: 'center', marginBottom: 10 },
  buttonContainer: { flexDirection: 'row', justifyContent: 'space-between', width: '100%' },
  changePasswordButton: { flex: 1, backgroundColor: '#4CAF50', borderRadius: 5, paddingVertical: 10, alignItems: 'center' },
  logoutButton: { flex: 1, backgroundColor: '#F44336', borderRadius: 5, paddingVertical: 10, alignItems: 'center' },
  buttonText: { color: '#ffffff', fontWeight: 'bold' },
});

export default Profile;
