import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import React from 'react';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';
import { useAppContext } from './utils/App.provider';
import { SignIn } from './navigation/SignIn.navigation';

export default function Root() {
  const colorScheme = useColorScheme();
  const appContext = useAppContext();

  return (
    <SafeAreaProvider>
      {appContext.isLoggedIn ? (
        <>
          <Navigation colorScheme={colorScheme} />
          <StatusBar />
        </>
      ) : (
        <SignIn />
      )}
    </SafeAreaProvider>
  );
}
