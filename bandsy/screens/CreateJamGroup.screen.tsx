import React from 'react';
import { Pressable, Text, View, TextInput, StyleSheet } from 'react-native';
import { useAppContext } from '../utils/App.provider';
import { createJamGroup } from '../services/jamGroupServices';
import { jamGroupToCreate } from '../Types';
import Colors from '../constants/Colors';

type CreateJamGroupProps = {
  setCurrentPage: React.Dispatch<React.SetStateAction<string>>;
};

export const CreateJamGroup: React.FC<CreateJamGroupProps> = ({
  setCurrentPage,
}) => {
  const [groupName, setGroupName] = React.useState<string>('');
  const [responseError, setRespsonseError] = React.useState<boolean>(false);

  const appContext = useAppContext();

  const handleHomeNavigation = () => {
    setCurrentPage('Home');
  };

  const handleCreate = async () => {
    const newJamGroup: jamGroupToCreate = {
      name: groupName,
      admin: appContext.sessionToken,
    };
    const newJamGroupResponse = await createJamGroup(newJamGroup);
    if (newJamGroupResponse instanceof Error) {
      setRespsonseError(true);
      console.log(newJamGroupResponse);
    } else {
      setCurrentPage('Home');
    }
  };

  return (
    <View style={styles.background}>
      <View style={styles.form}>
        <Text style={styles.inputLabel}>Group Name: </Text>
        <TextInput
          style={styles.input}
          placeholder="Type the group name here..."
          onChangeText={value => setGroupName(value)}
        />
      </View>
      <View style={styles.buttonContainer}>
        <Pressable style={styles.goBackButton} onPress={handleHomeNavigation}>
          <Text style={styles.buttonText}>Go Back</Text>
        </Pressable>
        <Pressable style={styles.createButton} onPress={handleCreate}>
          <Text style={styles.buttonText}>Create</Text>
        </Pressable>
      </View>
      <Text style={responseError ? null : styles.responseError}>
        Something went wrong, please try again!
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    backgroundColor: Colors.light.tint,
    color: Colors.light.background,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#777',
    padding: 10,
    margin: 10,
    width: '80%',
  },
  background: {
    flex: 1,
    backgroundColor: Colors.light.background,
    alignItems: 'center',
  },
  form: {
    margin: 50,
    marginBottom: 30,
  },
  createButton: {
    alignSelf: 'flex-end',
    padding: 25,
    borderRadius: 10,
    backgroundColor: Colors.light.tint,
  },
  goBackButton: {
    padding: 25,
    borderRadius: 10,
    backgroundColor: Colors.light.tint,
    marginRight: 50,
  },
  buttonContainer: {
    marignTop: 25,
    flexDirection: 'row',
  },
  responseError: {
    display: 'none',
  },
  buttonText: {
    color: Colors.light.background,
  },
  inputLabel: {
    color: Colors.light.tint,
    fontSize: 20,
    fontWeight: 'bold',
    alignSelf: 'center',
    marginBottom: 20,
  },
});
