import React from 'react';
import { View, StyleSheet } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Login } from '../screens/LogIn.screen';
import { Register } from '../screens/Register.screen';
import { NavigationContainer } from '@react-navigation/native';

export type SignInStackParamList = {
  Login: undefined;
  Register: undefined;
};

const Stack = createNativeStackNavigator();

export const SignIn: React.FC = () => {
  return (
    <NavigationContainer>
      <View style={styles.profileWrapper}>
        <Stack.Navigator initialRouteName="LogIn">
          <Stack.Screen name="Login" options={{ headerShown: false }}>
            {() => <Login />}
          </Stack.Screen>
          <Stack.Screen name="Register">{() => <Register />}</Stack.Screen>
        </Stack.Navigator>
      </View>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  profileWrapper: {
    flex: 1,
  },
});
