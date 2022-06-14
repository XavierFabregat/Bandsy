import React, { useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { userWithInfo } from '../Types';
import { editUserById } from '../services/userServices';
import Colors from '../constants/Colors';
import { Audio } from 'expo-av';
import { readAsStringAsync } from 'expo-file-system';

export const UserInfoFormModal: React.FC = () => {
  const route = useRoute<any>();

  var user: userWithInfo = route.params.user
    ? route.params.user
    : {
        id: route.params.id,
        name: route.params.name,
        location: route.params.location,
        instruments: route.params.instruments,
        jamgroups: route.params.jamgroups,
        sample: route.params.sample,
      };

  const [name, setName] = useState(user.name);
  const [location, setLocation] = useState(user.location || '');
  const [instruments, setInstruments] = useState(user.instruments || ['']);
  const [sample, setSample] = useState<any | undefined>(undefined);
  const [audio, setAudio] = useState<any | undefined>(undefined); // Audio.Recording

  const navigation = useNavigation<any>();

  async function handlePress() {
    console.log(validateForm());
    if (validateForm()) {
      if (audio) {
        const audioFile = await readAsStringAsync(audio.file);
        setSample(audioFile);
      }
      console.log(user);
      const userUpdatedInfo: userWithInfo = {
        id: user.id,
        name: name || user.name,
        location: location || user.location,
        jamgroups: user.jamgroups,
        sample: sample || user.sample,
        instruments: instruments[0] ? instruments : user.instruments,
      };
      const updatedUser = await editUserById(userUpdatedInfo);
      console.log(updatedUser);
      navigation.navigate('Profile', audio);
    }
  }

  function validateForm(): Boolean {
    const name_Regex = /^[a-zA-Z\s]*$/;
    const location_Regex = /^[a-zA-Z\s]*$/;
    const instruments_Regex = /^[a-zA-Z\s]*$/;
    if (instruments.length) {
      for (let instrument of instruments) {
        if (!instruments_Regex.test(instrument)) {
          return false;
        }
      }
    }
    if (
      name &&
      location &&
      (!name_Regex.test(name) || !location_Regex.test(location))
    ) {
      return false;
    }
    return true;
  }

  const playSound = async (audio: any) => {
    const sound = new Audio.Sound();
    await sound.loadAsync({ uri: audio.file });
    await sound.replayAsync();
  };

  React.useEffect(() => {
    if (route.params.recording) {
      setAudio(JSON.parse(route.params.recording));
    }
  }, [route.params]);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Name</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={value => setName(value)}
      />
      <Text style={styles.label}>Location</Text>
      <TextInput
        style={styles.input}
        value={location}
        placeholder="No location yet provided..."
        onChangeText={value => setLocation(value)}
      />
      <Text style={styles.label}>Instruments</Text>
      <TextInput
        style={styles.input}
        // value={instruments[0] && `${instruments[0]}`}
        placeholder="Instrument 1, instrument 2..."
        onChangeText={value => {
          const instrumentString = String(value);
          let instrumentArrayTemp = instrumentString.split(',');
          let instrumentArray: string[] = [];
          for (let instrument of instrumentArrayTemp) {
            instrumentArray.push(instrument.trim());
          }
          setInstruments(instrumentArray);
        }}
      />
      {audio && (
        <View style={styles.sampleContainer}>
          <Text style={styles.label}> Your Sample</Text>
          <View style={styles.row}>
            <Text style={styles.fill}>Recording - {audio?.duration}</Text>
            <Pressable onPress={() => playSound(audio)} style={styles.button}>
              <Text style={styles.buttonText}>Play</Text>
            </Pressable>
          </View>
        </View>
      )}
      <Pressable onPress={() => navigation.navigate('Recorder', user)}>
        <Text style={styles.label}>New Sample</Text>
      </Pressable>

      <Pressable onPress={handlePress} style={styles.submit}>
        <Text style={styles.submitText}>Done</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: '#777',
    padding: 5,
    margin: 10,
    width: '80%',
  },
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
    alignItems: 'center',
    paddingTop: 50,
  },
  label: {
    color: Colors.light.tint,
    fontSize: 24,
    fontWeight: 'bold',
  },
  submitText: {
    fontSize: 26,
    fontWeight: 'bold',
    color: Colors.light.background,
  },
  submit: {
    backgroundColor: Colors.light.tint,
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 20,
    alignSelf: 'flex-end',
    marginRight: 40,
    marginTop: 20,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: Colors.light.tint,
    borderRadius: 10,
    width: '95%',
  },
  fill: {
    flex: 1,
    margin: 16,
  },
  button: {
    margin: 16,
    backgroundColor: Colors.light.tint,
    padding: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  sampleContainer: {
    alignItems: 'center',
  },
  buttonText: {
    alignSelf: 'center',
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.light.background,
  },
});
