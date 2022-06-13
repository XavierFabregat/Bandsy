import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { userWithInfo } from '../Types';
import { useNavigation } from '@react-navigation/native';
import Colors from '../constants/Colors';

type UserCardProps = {
  user: userWithInfo;
};

export const UserCard: React.FC<UserCardProps> = ({ user }) => {
  const navigation = useNavigation<any>();

  const handleInvite = () => {
    navigation.navigate('SelectJamGroup', { id: user.id });
  };

  return (
    <View style={styles.cardContainer}>
      <Text style={styles.name}>{user.name.split(' ')[0]}</Text>
      <Text style={styles.instrument}>Instruments:{user.instruments}</Text>
      <Pressable style={styles.sampleButton}>
        <Text>Play Sample</Text>
      </Pressable>
      <View style={styles.buttonContainer}>
        <Pressable style={styles.button}>
          <Text style={styles.buttonText}>Dismiss</Text>
        </Pressable>
        <Pressable onPress={handleInvite} style={styles.button}>
          <Text style={styles.buttonText}>Invite</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: Colors.light.tint,
    borderColor: '#a19e57',
    borderWidth: 1,
    marginHorizontal: '10%',
    height: '60%',
    borderRadius: 20,
    justifyContent: 'space-around',
  },
  name: {
    color: Colors.light.background,
    alignSelf: 'center',
    fontSize: 35,
    fontWeight: 'bold',
  },
  instrument: {
    color: Colors.light.background,
    alignSelf: 'center',
    fontSize: 20,
    fontWeight: 'bold',
  },
  sampleButton: {
    alignSelf: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    alignSelf: 'center',
    width: '70%',
    justifyContent: 'space-around',
  },
  groupContainer: {
    paddingVertical: 10,
  },
  buttonText: {
    color: Colors.light.background,
    fontWeight: 'bold',
    fontSize: 17,
    alignSelf: 'center',
  },
  confirmCloseContainer: {
    paddingVertical: 30,
  },
  button: {
    padding: 10,
    borderWidth: 1,
    borderColor: Colors.light.background,
    borderRadius: 10,
    width: '45%',
  },
});
