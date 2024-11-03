import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
import { loginUser } from '../services/backendless';

export default function Login({ onLogin, navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isPressed, setIsPressed] = useState(false);

  const handleLogin = async () => {
    try {
      const user = await loginUser(email, password);
      Alert.alert('Login exitoso', `Bienvenido, ${user.username}`);
      onLogin(user);
    } catch (error) {
      Alert.alert('Error de login', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Image source={require('../components/imagenes/logocompleto.png')} style={styles.logo} />
      
      <Text style={styles.label}>USUARIO</Text>
      <TextInput
        style={styles.input}
        placeholder="Correo Electrónico"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        placeholderTextColor="#888"
      />
      
      <Text style={styles.label}>CONTRASEÑA</Text>
      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        placeholderTextColor="#888"
      />
      
      <TouchableOpacity
        style={[styles.loginButton, isPressed && styles.loginButtonPressed]}
        onPressIn={() => setIsPressed(true)}
        onPressOut={() => setIsPressed(false)}
        onPress={handleLogin}
      >
        <Text style={styles.loginButtonText}>Iniciar Sesión</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Register')}>
        <Text style={styles.registerText}>¿No tienes cuenta? Regístrate</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
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
  loginButton: {
    backgroundColor: '#ffffff',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 25,
    marginTop: 20,
    width: '100%',
    alignItems: 'center',
  },
  loginButtonPressed: {
    backgroundColor: '#cccccc', // Color del botón cuando se presiona
  },
  loginButtonText: {
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
});
