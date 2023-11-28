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

import ProfileScreen from './AppNoticias';

const Stack = createStackNavigator();

function LoginScreen({ navigation }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isRegistered, setIsRegistered] = useState(false);

  const isValidEmail = (email) => /\S+@\S+\.\S+/.test(email);
  const isValidPassword = (password) => password.length >= 4;

  const handleSignIn = () => {
    if (!isRegistered) {
      setMessage('Por favor, cadastre-se primeiro.');
    } else if (!isValidEmail(email) || !isValidPassword(password)) {
      setMessage('Corrija os dados por favor.');
    } else {
      setMessage('Login Efetuado com Sucesso');
      navigation.navigate('Profile');
    }
  };

  const handleSignUp = () => {
    if (!isValidEmail(email) || !isValidPassword(password)) {
      setMessage('Corrija os dados por favor.');
    } else {
      setMessage('Cadastro Criado com Sucesso');
      setIsRegistered(true);
      clearInputs();
      console.log('Dados do cadastro:', { name, email, password });
    }
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
            <TextInput
              style={styles.input}
              onChangeText={(text) => setName(text)}
              value={name}
              placeholderTextColor="#000000"
              placeholder="Name"
              autoCorrect={false}
            />

            <TextInput
              style={styles.input}
              onChangeText={(text) => setEmail(text)}
              value={email}
              placeholderTextColor="#000000"
              placeholder="Email"
              autoCorrect={false}
              keyboardType="email-address"
            />

            <TextInput
              style={styles.input}
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
              <Text style={styles.buttonText}> Cadastrar-se </Text>
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
  messageText: {
    marginTop: 10,
    color: '#848484',
    fontSize: 15,
  },
});


function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator headerMode='none'>
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }}  />
        <Stack.Screen name="Profile" component={ProfileScreen} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;