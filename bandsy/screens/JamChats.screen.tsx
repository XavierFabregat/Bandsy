import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { JamChatCard } from '../components/JamChatCard';
import Colors from '../constants/Colors';
import { jamGroup } from '../Types';

type JamChatsProps = {
  setCurrentPage: React.Dispatch<React.SetStateAction<string>>;
  jamChats: jamGroup[];
};

export const JamChats: React.FC<JamChatsProps> = ({
  setCurrentPage,
  jamChats,
}) => {
  const handleHomeNavigation = () => {
    setCurrentPage('Home');
  };

  return (
    <View style={styles.background}>
      <ScrollView>
        {jamChats &&
          jamChats.map(chat => {
            return <JamChatCard key={chat.id} chat={chat} />;
          })}
      </ScrollView>
      <Pressable onPress={handleHomeNavigation} style={styles.button}>
        <Text style={styles.buttonText}>Go Back</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  button: {
    position: 'absolute',
    top: '85%',
    left: '60%',
    padding: 25,
    borderRadius: 10,
    backgroundColor: Colors.light.tint,
    width: '30%',
    alignSelf: 'flex-end',
  },
  buttonText: {
    alignSelf: 'center',
    color: Colors.light.background,
  },
});
