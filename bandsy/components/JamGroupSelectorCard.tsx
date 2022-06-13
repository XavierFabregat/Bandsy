import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Alert, Text, Pressable, StyleSheet } from 'react-native';
import Colors from '../constants/Colors';
import { jamGroup } from '../types';
import { inviteUserToMyJamGroup } from '../services/jamGroupServices';

type JamGroupSelectorCardProps = {
  jamGroup: jamGroup;
  userToInvite: string;
};

const JamGroupSelectorCard: React.FC<JamGroupSelectorCardProps> = ({
  jamGroup,
  userToInvite,
}) => {
  const navigation = useNavigation();
  const confirmSlection = () =>
    Alert.alert('Confirm Selection', `Confirm invitation to ${jamGroup.name}`, [
      {
        text: 'Cancel',
        onPress: () => {},
        style: 'cancel',
      },
      {
        text: 'Confirm',
        onPress: () => {
          inviteUserToMyJamGroup(userToInvite, jamGroup.id);
          // TODO: ADD A CONFIRM, AND CANCEL.
          navigation.goBack();
        },
        style: 'default',
      },
    ]);
  return (
    <Pressable onPress={confirmSlection} style={styles.container}>
      <Text>{jamGroup.name}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flex: 1,
    paddingVertical: 15,
    backgroundColor: Colors.light.background,
    borderBottomWidth: 1,
    borderBottomColor: Colors.light.tint,
    justifyContent: 'center',
    color: Colors.light.tint,
  },
});

export default JamGroupSelectorCard;
