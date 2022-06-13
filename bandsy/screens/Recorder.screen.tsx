import { Audio } from 'expo-av';
import React, { useState } from 'react';
import { Text, View, StyleSheet, Pressable } from 'react-native';

const RecorderScreen: React.FC = () => {
  const [isRecording, setIsRecording] = useState();
  const [recordings, setRecordings] = useState<Audio.Recording | undefined>();
  const [message, setMessage] = useState('');

  const startRecording = async () => {
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

        setRecordings(recording);
      } else {
        setMessage('Please grant permission to app to access microphone');
      }
    } catch (error) {
      console.log('Failed to start recording', error);
    }
  };

  const stopRecording = async () => {
    setIsRecording(undefined);
    await recording.stopAndUnloadAsync();

    let updatedRecordings = [...recordings];
  };

  return (
    <View style={styles.container}>
      <Text>{message}</Text>
      <Pressable onPress={isRecording ? stopRecording : startRecording}>
        <Text>{isRecording ? 'Stop Recording' : 'Start Recording'}</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default RecorderScreen;
