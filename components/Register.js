import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
import { registerUser } from '../services/backendless';

export default function Register({ onRegister, navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [isPressed, setIsPressed] = useState(false);

  const handleRegister = async () => {
    try {
      await registerUser(email, password, username);
      const user = await loginUser(email, password); // Iniciar sesión automáticamente
      console.log("Usuario:", user);
      Alert.alert('Registro exitoso', `Bienvenido, ${user.username}`);
      onRegister(user); // Llama a onRegister si deseas actualizar el estado del usuario
      navigation.navigate('Home'); // Navegar al menú principal (Home)
    } catch (error) {
      Alert.alert('Error de registro', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Image source={require('../components/imagenes/logocompleto.png')} style={styles.logo} />

      <Text style={styles.label}>CORREO ELECTRÓNICO</Text>
      <TextInput
        style={styles.input}
        placeholder="Correo Electrónico"
        placeholderTextColor="#888"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <Text style={styles.label}>NOMBRE DE USUARIO</Text>
      <TextInput
        style={styles.input}
        placeholder="Nombre de Usuario"
        placeholderTextColor="#888"
        value={username}
        onChangeText={setUsername}
      />

      <Text style={styles.label}>CONTRASEÑA</Text>
      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        placeholderTextColor="#888"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <TouchableOpacity
        style={[styles.button, isPressed && styles.buttonPressed]}
        onPressIn={() => setIsPressed(true)}
        onPressOut={() => setIsPressed(false)}
        onPress={handleRegister}
      >
        <Text style={styles.buttonText}>Registrarse</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={styles.loginRedirectText}>¿Ya tienes una cuenta? Inicia sesión</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('LoginAnticipado')}>
        <Text style={styles.registerText}>¿Quieres acceder al Preview? Clic aquí</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
    alignItems: 'center',
    padding: 20,
    justifyContent: 'center',
  },
  logo: {
    width: 200,
    height: 200,
    marginBottom: 40,
    resizeMode: 'contain',
  },
  label: {
    width: '100%',
    color: '#ffffff',
    fontSize: 14,
    marginBottom: 5,
    marginLeft: 10,
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ffffff',
    padding: 15,
    marginVertical: 10,
    borderRadius: 25,
    backgroundColor: '#1a1a1a',
    color: '#ffffff',
    fontSize: 16,
  },
  button: {
    backgroundColor: '#ffffff',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 25,
    marginTop: 20,
    width: '100%',
    alignItems: 'center',
  },
  buttonPressed: {
    backgroundColor: '#cccccc',
  },
  buttonText: {
    color: '#000000',
    fontSize: 16,
    fontWeight: 'bold',
  },
  registerText: {
    color: '#ffffff',
    fontSize: 14,
    marginTop: 20,
    textDecorationLine: 'underline',
  },
  loginRedirectText: {
    color: '#ffffff',
    fontSize: 14,
    marginTop: 20,
    textDecorationLine: 'underline',
  },
});
