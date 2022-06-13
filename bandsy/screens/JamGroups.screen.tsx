import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useAppContext } from '../utils/App.provider';
import { getJamGroupsUserBelongsTo } from '../services/jamGroupServices';
import { jamGroup } from '../Types';
import { CreateJamGroup } from './CreateJamGroup.screen';
import { JamChats } from './JamChats.screen';
import Colors from '../constants/Colors';

// type currentPageType = 'Home' | 'Chats' | 'Create';

export const JamGroup: React.FC = () => {
  const [currentPage, setCurrentPage] = React.useState<string>('Home');
  const [jamChats, setJamChats] = React.useState<jamGroup[]>([]);
  const appContext = useAppContext();

  const fetchJamChats = async () => {
    const userChats = await getJamGroupsUserBelongsTo(appContext.sessionToken);
    if (userChats && !(userChats instanceof Error)) {
      setJamChats(userChats);
    } else if (userChats instanceof Error) {
      console.log(userChats);
    }
  };

  React.useEffect(() => {
    fetchJamChats();
  }, []); //eslint-disable-line react-hooks/exhaustive-deps

  const handleCreateJamGroupNavigation = () => {
    setCurrentPage('Create');
  };
  const handleJamChatsNavigation = () => {
    setCurrentPage('Chats');
  };

  return currentPage === 'Home' ? (
    <View style={styles.background}>
      <View style={styles.buttonContainer}>
        <Pressable
          style={styles.button}
          onPress={handleCreateJamGroupNavigation}>
          <Text style={styles.buttonText}>New JamGroup</Text>
        </Pressable>
        <Pressable style={styles.button} onPress={handleJamChatsNavigation}>
          <Text style={styles.buttonText}>My JamGroups</Text>
        </Pressable>
      </View>
    </View>
  ) : currentPage === 'Create' ? (
    <CreateJamGroup setCurrentPage={setCurrentPage} />
  ) : (
    <JamChats setCurrentPage={setCurrentPage} jamChats={jamChats} />
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: Colors.light.background,
    justifyContent: 'space-around',
  },
  buttonContainer: {
    alignItems: 'center',
    justifyContent: 'space-around',
    height: '80%',
  },
  button: {
    backgroundColor: Colors.light.tint,
    height: 200,
    width: 200,
    justifyContent: 'center',
    borderRadius: 10,
  },
  buttonText: {
    alignSelf: 'center',
    color: Colors.light.background,
    fontWeight: 'bold',
    fontSize: 20,
  },
});
