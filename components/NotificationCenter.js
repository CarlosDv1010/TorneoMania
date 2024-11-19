import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Image, ScrollView } from 'react-native';

export default function NotificationCenter() {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    // Notificaciones de ejemplo
    const exampleNotifications = Array.from({ length: 30 }, (_, index) => ({
      id: index.toString(),
      title: `Notificación #${index + 1}`,
      message: `Este es el mensaje de la notificación número ${index + 1}.`,
      icon: 'https://via.placeholder.com/50',
    }));

    setNotifications(exampleNotifications);
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Text style={styles.title}>NOTIFICACIONES</Text>
        <View style={styles.notificationListContainer}>
          <FlatList
            data={notifications}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.notification}>
                <Image source={{ uri: item.icon }} style={styles.icon} />
                <View style={styles.textContainer}>
                  <Text style={styles.notificationTitle}>{item.title}</Text>
                  <Text style={styles.notificationMessage}>{item.message}</Text>
                </View>
              </View>
            )}
            nestedScrollEnabled={true} // Habilitar scroll interno
          />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  container: {
    flex: 1,
    backgroundColor: '#1a1f3e', // Fondo oscuro similar al de la imagen
    padding: 20,
  },
  title: {
    fontSize: 24,
    color: '#ffffff',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  notificationListContainer: {
    height: 1500, // Limitar la altura del listado
  },
  notification: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2c365d', // Fondo de la notificación similar al diseño
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
  },
  icon: {
    width: 50,
    height: 50,
    borderRadius: 10,
    marginRight: 15,
  },
  textContainer: {
    flex: 1,
  },
  notificationTitle: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  notificationMessage: {
    color: '#bbbbbb',
    fontSize: 14,
  },
});
