import React, { useState } from 'react';
import {
  View,
  KeyboardAvoidingView,
  ImageBackground,
  TouchableOpacity,
  Text,
  TextInput,
  StyleSheet,
} from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Sua tela de perfil (ProfileScreen)
import ProfileScreen from './AppNoticias';

// Criando o Stack Navigator
const Stack = createStackNavigator();

// Componente para a tela de login
function LoginScreen({ navigation }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const isSignUp = name !== '';

  const handleSignIn = () => {
    if (email && password && isSignUp) {
      setMessage('Login Efetuado com Sucesso');
      clearInputs();
      navigation.navigate('Profile');
    } else {
      setMessage('Por favor, corrija os dados ou crie uma conta');
    }
  };

  const handleSignUp = () => {
    if (name && isValidEmail(email) && password) {
      setMessage('Conta Criada com Sucesso');
      clearInputs();
      console.log('Dados do cadastro:', { name, email, password });
    } else {
      setMessage('Por favor, corrija os dados');
    }
  };

  const isValidEmail = (email) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  const clearInputs = () => {
    setName('');
    setEmail('');
    setPassword('');
  };
  return (
    <KeyboardAvoidingView style={styles.background} behavior="padding">
      <ImageBackground
        style={styles.titleImage}
        source={require('./src/img/LOGO.PNG')}
        resizeMode="contain"
      >
        <View style={styles.overlay}>
          <View style={styles.formContainer}>
            {/* Adicionado TextInput para o campo de nome */}
            <TextInput
              style={styles.input}
              onChangeText={(text) => setName(text)}
              value={name}
              placeholderTextColor="#000000"
              placeholder="Name"
              autoCorrect={false}
            />

            <TextInput
              style={[styles.input, email === '' && styles.errorInput]}
              onChangeText={(text) => setEmail(text)}
              value={email}
              placeholderTextColor="#000000"
              placeholder="Email"
              autoCorrect={false}
              keyboardType="email-address"
            />

            <TextInput
              style={[styles.input, password === '' && styles.errorInput]}
              onChangeText={(text) => setPassword(text)}
              value={password}
              placeholderTextColor="#000000"
              placeholder="Password"
              autoCorrect={false}
              secureTextEntry={true}
            />

            <TouchableOpacity style={styles.buttonLogin} onPress={handleSignIn}>
              <Text style={styles.buttonText}> Acessar </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.buttonSignup} onPress={handleSignUp}>
              <Text style={styles.buttonText}>
                {isSignUp ? 'Criar conta' : 'Registre-se'}
              </Text>
            </TouchableOpacity>

            {message !== '' && <Text style={styles.messageText}>{message}</Text>}
          </View>
        </View>
      </ImageBackground>
    </KeyboardAvoidingView>
  );
}


const styles = StyleSheet.create({
  background: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: '#2E2E2E',
  },
  titleImage: {
    flex: 1,
    width: '100%',
    marginBottom: 200,
    marginTop: -180,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.0)',
  },
  formContainer: {
    marginTop: 750,
    alignItems: 'center',
    marginBottom: 20,
  },
  input: {
    width: '70%',
    height: 30,
    backgroundColor: '#FFFFFF',
    marginBottom: 10,
    color: '#000000',
    paddingHorizontal: 10,
    borderRadius: 8,
  },
  buttonLogin: {
    backgroundColor: '#8908bb',
    height: 30,
    width: '70%',
    borderRadius: 8,
    marginTop: 0,
    justifyContent: 'center',
  },
  buttonSignup: {
    backgroundColor: 'transparent',
    height: 30,
    width: 100,
    borderRadius: 8,
    marginTop: 15,
  },
  buttonText: {
    color: '#FFFFFF',
    textAlign: 'center',
    backgroundColor: 'transparent',
    fontSize: 15,
    marginTop: -5,
  },
  errorInput: {
    borderColor: '#DBA901',
  },
  labelError: {
    alignSelf: 'center',
    color: '#FF0000',
    marginBottom: 8,
  },
  messageText: {
    marginTop: 10,
    color: '#848484',
    fontSize: 15,
  },
});

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;