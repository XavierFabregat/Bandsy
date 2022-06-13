import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { jamGroup } from '../Types';

type JamChatCardProps = {
  chat: jamGroup;
};

export const JamChatCard: React.FC<JamChatCardProps> = ({ chat }) => {
  return (
    <View style={styles.chatCardContainer}>
      <Text>{chat.name}</Text>
      <Text>Number of members: {chat.users.length}</Text>
    </View>
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
