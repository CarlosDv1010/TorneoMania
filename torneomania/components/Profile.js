import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList } from 'react-native';

const Profile = ({ user, logout }) => {
  const organizedTournaments = user.organizedTournaments || []; // Torneos organizados por el usuario
  const enrolledTournaments = user.enrolledTournaments || []; // Torneos en los que el usuario está inscrito

  return (
    <View style={styles.container}>
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
        <Text style={styles.info}>{user.fullName || "Nombre no disponible"}</Text>
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.label}>Correo</Text>
        <Text style={styles.info}>{user.email}</Text>
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

      {/* Lista de torneos en los que está inscrito */}
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1f3e',
    padding: 20,
    alignItems: 'center',
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
  },
  welcomeText: {
    fontSize: 20,
    color: '#ffffff',
    fontWeight: 'bold',
    marginBottom: 30,
  },
  infoContainer: {
    width: '100%',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: '#ffffff',
    borderRadius: 8,
    marginBottom: 15,
  },
  label: {
    fontSize: 14,
    color: '#ffffff',
    marginBottom: 5,
  },
  info: {
    fontSize: 16,
    color: '#ffffff',
  },
  sectionTitle: {
    fontSize: 18,
    color: '#ffffff',
    fontWeight: 'bold',
    marginBottom: 10,
    alignSelf: 'flex-start',
  },
  tournamentList: {
    width: '100%',
    marginBottom: 20,
  },
  tournamentItem: {
    backgroundColor: '#FFCDD2',
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
  tournamentName: {
    fontSize: 16,
    color: '#1a1f3e',
  },
  emptyListText: {
    fontSize: 14,
    color: '#aaaaaa',
    textAlign: 'center',
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  changePasswordButton: {
    flex: 1,
    backgroundColor: '#4CAF50',
    borderRadius: 5,
    paddingVertical: 10,
    marginRight: 10,
    alignItems: 'center',
  },
  logoutButton: {
    flex: 1,
    backgroundColor: '#F44336',
    borderRadius: 5,
    paddingVertical: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
});

export default Profile;
