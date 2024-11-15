import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
import { loginUser, registerUser } from '../services/backendless';

export default function LoginAnticipado({ onRegister, navigation }) {
  const [email, setEmail] = useState('');
  const [isPressed, setIsPressed] = useState(false);

  const handleRegisterAnticipado = async () => {
     // Configuramos el username y password predeterminados
    const username = email; // El username será el email ingresado
    const password = "defaultPassword123"; // Contraseña predeterminada
    console.log("Email:", email, "Username:", username, "Password:", password);

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
      
      <Text style={styles.label}>Correo Electrónico</Text>
      <TextInput
        style={styles.input}
        placeholder="Correo Electrónico"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        placeholderTextColor="#888"
      />

      <TouchableOpacity style={[styles.button, isPressed && styles.buttonPressed]}
        onPressIn={() => setIsPressed(true)}
        onPressOut={() => setIsPressed(false)}
        onPress={handleRegisterAnticipado}>
        <Text style={styles.loginButtonText}>Acceder al Preview</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={styles.loginButtonBText}>¿Ya tienes cuenta? Iniciar Sesión</Text>
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
  loginButton: {
    backgroundColor: '#ffffff',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 25,
    marginTop: 20,
    width: '100%',
    alignItems: 'center',
  },
  loginButtonText: {
    color: '#000000',
    fontSize: 16,
    fontWeight: 'bold',
  },
  loginButtonBText: {
    color: '#ffffff',
    fontSize: 16,
    marginTop: 20,
    textDecorationLine: 'underline',
  },
  registerText: {
    color: '#ffffff',
    fontSize: 14,
    marginTop: 20,
    textDecorationLine: 'underline',
  },
});
