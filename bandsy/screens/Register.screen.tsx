import React, { useState } from 'react';
import { Pressable, Text, View, TextInput, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { createUser } from '../services/userServices';
import { userToCreate } from '../Types';
import Colors from '../constants/Colors';

export const Register: React.FC = () => {
  const navigation = useNavigation<any>();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [confirmEmail, setConfirmEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isValid, setIsValid] = useState(true);

  const handleLoginNavigation = () => {
    navigation.navigate('Login');
  };

  const handleRegister = async () => {
    if (!registerValidation()) {
      setIsValid(false);
    }
    const newUser: userToCreate = {
      name: name,
      email: email,
      password: password,
    };
    createUser(newUser).then(() => {
      navigation.navigate('Login');
    });
  };

  const registerValidation = () => {
    if (!name || !email || !confirmEmail || !password || !confirmPassword) {
      return false;
    }
    if (email !== confirmEmail) {
      return false;
    }
    if (password !== confirmPassword) {
      return false;
    }
    return true;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Name</Text>
      <TextInput style={styles.input} onChangeText={value => setName(value)} />
      <Text style={styles.label}>Email</Text>
      <TextInput style={styles.input} onChangeText={value => setEmail(value)} />
      <Text style={styles.label}>Confirm Email</Text>
      <TextInput
        style={styles.input}
        onChangeText={value => setConfirmEmail(value)}
      />
      <Text style={styles.label}>Password</Text>
      <TextInput
        style={styles.input}
        onChangeText={value => setPassword(value)}
        secureTextEntry={true}
      />
      <Text style={styles.label}>Confirm Password</Text>
      <TextInput
        style={styles.input}
        onChangeText={value => setConfirmPassword(value)}
        secureTextEntry={true}
      />
      <Text style={isValid ? styles.valid : null}>
        Please enter valid email and/or password!
      </Text>
      <Pressable onPress={handleRegister} style={styles.register}>
        <Text>Register</Text>
      </Pressable>
      <Pressable onPress={handleLoginNavigation} style={styles.login}>
        <Text>Already have an account? Log In here!</Text>
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
    width: '80%',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  valid: {
    display: 'none',
  },
  label: {
    alignSelf: 'center',
    fontWeight: 'bold',
    fontSize: 17,
  },
  register: {
    backgroundColor: Colors.light.tint,
    marginVertical: 30,
    padding: 20,
    width: '40%',
    borderRadius: 10,
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 20,
  },
  login: {
    marginBottom: 15,
  },
});
