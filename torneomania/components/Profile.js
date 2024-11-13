import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

const Profile = ({ user, logout }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Perfil de Usuario</Text>

      {/* Display user details */}
      <View style={styles.profileContainer}>
        <Text style={styles.label}>Nombre de Usuario:</Text>
        <Text style={styles.info}>{user.username}</Text>
      </View>

      <View style={styles.profileContainer}>
        <Text style={styles.label}>Correo Electrónico:</Text>
        <Text style={styles.info}>{user.email}</Text>
      </View>

      {/* Logout button */}
      <Button title="Cerrar Sesión" onPress={logout} style={styles.logoutButton} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1f3e',
    padding: 20,
  },
  title: {
    fontSize: 24,
    color: '#ffffff',
    fontWeight: 'bold',
    marginBottom: 20,
  },
  profileContainer: {
    marginBottom: 10,
  },
  label: {
    color: '#ffffff',
    fontSize: 16,
  },
  info: {
    color: '#aaaaaa',
    fontSize: 16,
    marginTop: 5,
  },
  logoutButton: {
    marginTop: 20,
    backgroundColor: '#4CAF50',
    borderRadius: 5,
  },
});

export default Profile;
