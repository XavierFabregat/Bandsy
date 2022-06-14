import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Pressable,
  Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { loginUser } from '../services/logServices';
import { userToLogin } from '../Types';
import { useAppContext } from '../utils/App.provider';
import { Entypo } from '@expo/vector-icons';
import Colors from '../constants/Colors';

const imageSrc = require('../assets/images/nameandlogo.png');

export const Login: React.FC = () => {
  const navigation = useNavigation<any>();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isValid, setIsValid] = useState<boolean>(true);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const appContext = useAppContext();

  const handleLogIn = async () => {
    if (validation()) {
      const user: userToLogin = {
        email,
        password,
      };
      const response = await loginUser(user);
      console.log(response);
      console.log(response);
      appContext.setSessionToken(response.id);
      console.log(appContext.sessionToken);
      if (!response.error) {
        appContext.toggleLogin();
      }
    } else {
      setIsValid(false);
    }
  };

  const validation = () => {
    if (!email || !password) {
      return false;
    }
    return true;
  };

  const handleRegisterNavigation = () => {
    navigation.navigate('Register');
  };

  return (
    <View style={styles.container}>
      <Image source={imageSrc} style={styles.logo} />
      <Text style={styles.label}>Email</Text>
      <TextInput style={styles.input} onChangeText={value => setEmail(value)} />
      <Text style={styles.label}>Password</Text>
      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.input}
          onChangeText={value => setPassword(value)}
          secureTextEntry={isVisible ? false : true}
        />
        <Pressable
          onPress={() => setIsVisible(!isVisible)}
          style={styles.showHidePwd}>
          {isVisible ? (
            <Entypo name="eye-with-line" size={24} color="black" />
          ) : (
            <Entypo name="eye" size={24} color="black" />
          )}
        </Pressable>
      </View>
      <Text style={isValid ? styles.valid : null}>
        Please enter valid email and/or password!
      </Text>
      <Pressable onPress={handleLogIn} style={styles.logInButton}>
        <Text>Log In</Text>
      </Pressable>
      <Pressable onPress={handleRegisterNavigation} style={styles.register}>
        <Text>Don't have an account? Register here!</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: '#777',
    padding: 5,
    margin: 10,
    width: '70%',
  },
  container: {
    marginLeft: 30,
    marginVertical: 90,
    alignItems: 'center',
    flex: 1,
  },
  valid: {
    display: 'none',
  },
  logInButton: {
    backgroundColor: Colors.light.tint,
    padding: 20,
    width: '40%',
    borderRadius: 10,
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 20,
  },
  logo: {
    height: '25%',
    width: '70%',
    alignSelf: 'center',
    marginBottom: 40,
    borderRadius: 20,
  },
  register: {
    marginTop: 30,
  },
  label: {
    fontWeight: 'bold',
    fontSize: 17,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  showHidePwd: {
    position: 'absolute',
    right: 20,
  },
});
