import React, { useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { userWithInfo } from '../Types';
import { editUserById } from '../services/userServices';
import Colors from '../constants/Colors';

export const UserInfoFormModal: React.FC = () => {
  const route = useRoute<any>();

  var user: userWithInfo = {
    id: route.params.id,
    name: route.params.name,
    location: route.params.location,
    instruments: route.params.instruments,
    hashpassword: route.params.hashpassword,
    jamgroups: route.params.jamgroups,
    sample: route.params.sample,
  };

  const [name, setName] = useState(user.name);
  const [location, setLocation] = useState(user.location || '');
  const [instruments, setInstruments] = useState(user.instruments || ['']);

  const navigation = useNavigation<any>();

  async function handlePress() {
    console.log(validateForm());
    if (validateForm()) {
      const userUpdatedInfo: userWithInfo = {
        id: user.id,
        name: name || user.name,
        hashpassword: user.hashpassword,
        location: location || user.location,
        jamgroups: user.jamgroups,
        sample: user.sample,
        instruments: instruments[0] ? instruments : user.instruments,
      };
      const updatedUser = await editUserById(userUpdatedInfo);
      console.log(updatedUser);
      navigation.navigate('Profile');
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
      <Text style={styles.label}>New Sample</Text>
      <TextInput style={styles.input} />
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
});
