import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const Profile = ({ user, logout }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Perfil de Usuario</Text>
      
      <View style={styles.profileContainer}>
        <Text style={styles.label}>Nombre de Usuario:</Text>
        <Text style={styles.info}>{user.username}</Text>
      </View>

      <View style={styles.profileContainer}>
        <Text style={styles.label}>Correo Electrónico:</Text>
        <Text style={styles.info}>{user.email}</Text>
      </View>

      <Button title="Cerrar sesión" onPress={logout} color="#f00" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  profileContainer: {
    marginBottom: 10,
    width: '100%',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  info: {
    fontSize: 16,
    marginBottom: 10,
    color: 'gray',
  },
});

export default Profile;
