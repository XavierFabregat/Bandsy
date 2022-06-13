import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import Colors from '../constants/Colors';
const imageSrc = require('../assets/images/nameandlogo.png');

export const StartLoadingScreen: React.FC = () => {
  return (
    <View style={styles.background}>
      <Image source={imageSrc} style={styles.logo} />
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: Colors.light.tint,
    justifyContent: 'center',
  },
  logo: {
    width: '80%',
    height: '20%',
    alignSelf: 'center',
  },
});
