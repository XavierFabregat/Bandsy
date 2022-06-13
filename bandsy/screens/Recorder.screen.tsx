import { useNavigation, useRoute } from '@react-navigation/native';
import { Audio } from 'expo-av';
import React, { useState } from 'react';
import { Feather } from '@expo/vector-icons';
import {
  Text,
  View,
  StyleSheet,
  Pressable,
  Switch,
  ScrollView,
} from 'react-native';
import Colors from '../constants/Colors';

const RecorderScreen: React.FC = () => {
  const [recording, setRecording] = useState<any>();
  const [recordings, setRecordings] = useState<any[]>([]);
  const [message, setMessage] = useState('');
  const [selectedRecording, setSelectedRecording] = useState<
    (number | Audio.Recording)[] | undefined
  >();
  const [isAlertHidden, setIsAlertHidden] = useState<boolean>(true);

  const navigation = useNavigation<any>();
  const route = useRoute();
  const user = route.params;

  async function startRecording() {
    try {
      const permission = await Audio.requestPermissionsAsync();

      if (permission.status === 'granted') {
        await Audio.setAudioModeAsync({
          allowsRecordingIOS: true,
          playsInSilentModeIOS: true,
        });

        const { recording } = await Audio.Recording.createAsync(
          Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY,
        );

        setRecording(recording);
      } else {
        setMessage('Please grant permission to app to access microphone');
      }
    } catch (err) {
      console.error('Failed to start recording', err);
    }
  }

  async function stopRecording() {
    setRecording(undefined);
    await recording?.stopAndUnloadAsync();

    let updatedRecordings = [...recordings];
    const { sound, status } = await recording?.createNewLoadedSoundAsync();
    updatedRecordings.push({
      sound: sound,
      duration: getDurationFormatted(status.durationMillis),
      file: recording?.getURI(),
    });

    setRecordings(updatedRecordings);
  }

  const getDurationFormatted = (millis: number) => {
    const minutes = millis / 1000 / 60;
    const minutesDisplay = Math.floor(minutes);
    const seconds = Math.round((minutes - minutesDisplay) * 60);
    const secondsDisplay = seconds < 10 ? `0${seconds}` : seconds;
    return `${minutesDisplay}:${secondsDisplay}`;
  };

  const getRecordingLines = () => {
    return recordings.map((recordingLine, index) => {
      return (
        <View key={index} style={styles.row}>
          <Switch
            trackColor={{ false: 'grey', true: Colors.light.tint }}
            onValueChange={() => setSelectedRecording([index, recordingLine])}
            value={selectedRecording && index === selectedRecording[0]}
          />
          <Text style={styles.fill}>
            Recording {index + 1} - {recordingLine.duration}
          </Text>
          <Pressable
            onPress={() => recordingLine.sound.replayAsync()}
            style={styles.button}>
            <Text style={styles.buttonText}>Play</Text>
          </Pressable>
        </View>
      );
    });
  };

  return (
    <View style={styles.container}>
      <Text>{message}</Text>
      <View style={styles.topBar}>
        <Pressable
          onPress={recording ? stopRecording : startRecording}
          style={styles.button}>
          <Text style={styles.buttonText}>
            {recording ? 'Stop Recording' : 'Start Recording'}
          </Text>
        </Pressable>
        <Pressable onPress={() => setIsAlertHidden(!isAlertHidden)}>
          <Feather name="alert-triangle" size={24} color="red" />
        </Pressable>
      </View>
      <ScrollView style={styles.recordingContainer}>
        {getRecordingLines()}
        <Pressable
          style={styles.button}
          onPress={() => {
            !recording &&
              navigation.navigate('UserInfoForm', {
                recording:
                  selectedRecording && JSON.stringify(selectedRecording[1]),
                user,
              });
          }}>
          <Text style={styles.buttonText}>Confirm</Text>
        </Pressable>
      </ScrollView>
      <View
        style={[
          styles.alertContainer,
          isAlertHidden ? { display: 'none' } : null,
        ]}>
        <Text style={styles.alert}>
          All recording but the selected one will be lost upon confirmation!
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  topBar: {
    margin: 25,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  row: {
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.light.tint,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  recordingContainer: {
    width: '100%',
    height: '40%',
    overflow: 'scroll',
  },
  fill: {
    flex: 1,
    margin: 16,
  },
  button: {
    padding: 15,
    backgroundColor: Colors.light.tint,
    margin: 20,
    borderRadius: 10,
  },
  buttonText: {
    alignSelf: 'center',
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.light.background,
  },
  alertContainer: {
    width: '80%',
    height: '30%',
    backgroundColor: 'yellow',
    borderWidth: 1,
    borderColor: 'red',
    borderRadius: 30,
    justifyContent: 'center',
    position: 'absolute',
    marginTop: '50%',
  },
  alert: {
    width: '70%',
    alignSelf: 'center',
    fontSize: 17,
    fontWeight: 'bold',
    textAlign: 'center',
    lineHeight: 40,
    color: 'red',
  },
});

export default RecorderScreen;
