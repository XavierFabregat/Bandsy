import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';
import { jamGroup } from '../Types';

type JamChatCardProps = {
  chat: jamGroup;
};

export const JamChatCard: React.FC<JamChatCardProps> = ({ chat }) => {
  const navigation = useNavigation<any>();
  const handleNavigation = () => {
    navigation.navigate('ChatRoom', chat);
  };
  return (
    <Pressable style={styles.chatCardContainer} onPress={handleNavigation}>
      <Text>{chat.name}</Text>
      <Text>Number of members: {chat.users.length}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  chatCardContainer: {
    borderWidth: 1,
    flexDirection: 'row',
    height: 60,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
});
