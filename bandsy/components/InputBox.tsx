import { StyleSheet } from 'react-native';
import Colors from '../constants/Colors';
import {
  Entypo,
  FontAwesome5,
  Fontisto,
  MaterialCommunityIcons,
  MaterialIcons,
} from '@expo/vector-icons';
import React, { useEffect, useRef } from 'react';
import { View, TextInput, Pressable } from 'react-native';
import { jamGroup, Message, MessageToPost } from '../types';
import { postMessageToGroup } from '../services/messageServices';
import { useAppContext } from '../utils/App.provider';
import io from 'socket.io-client';

type InputBoxProps = {
  jamGroup: jamGroup;
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
};

const InputBox: React.FC<InputBoxProps> = ({ jamGroup, setMessages }) => {
  const [message, setMessage] = React.useState('');
  const appContext = useAppContext();
  const socketRef = useRef<any>();
  const onMicrophonePress = () => {
    console.log('microphone');
  };

  const onSendPress = async () => {
    console.log('Sending: ', message);
    const messageToSend: MessageToPost = {
      authorid: appContext.sessionToken,
      jamgroupid: jamGroup.id,
      content: message,
      timestamp: Date.now(),
    };
    const messageCreated = await postMessageToGroup(messageToSend);
    setMessages(prevState => {
      const newState = [...prevState, messageCreated];
      return newState;
    });
    console.log(messageCreated);
    socketRef.current = io('http://192.168.1.124:3030');
    socketRef.current.emit('message', messageCreated);
    setMessage('');
  };

  const onPress = () => {
    if (!message) {
      onMicrophonePress();
    } else {
      onSendPress();
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.mainContainer}>
        <FontAwesome5 name="laugh-beam" size={24} color="grey" />
        <TextInput
          placeholder="Type a message..."
          style={styles.textInput}
          multiline={true}
          value={message}
          onChangeText={setMessage}
        />

        <Entypo name="attachment" size={24} color="grey" style={styles.icon} />

        {!message && (
          <Fontisto name="camera" size={24} color="grey" style={styles.icon} />
        )}
      </View>
      <Pressable style={styles.buttonContainer} onPress={onPress}>
        {message ? (
          <MaterialIcons name="send" color="white" size={24} />
        ) : (
          <MaterialCommunityIcons name="microphone" size={24} color="white" />
        )}
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    // bottom: 0,
    // position: 'absolute',
  },
  mainContainer: {
    flexDirection: 'row',
    backgroundColor: 'white',
    padding: 10,
    margin: 10,
    borderRadius: 20,
    marginRight: 10,
    flex: 1,
    alignItems: 'flex-end',
    marginBottom: 10,
  },
  textInput: {
    flex: 1,
    marginHorizontal: 10,
    fontSize: 15,
  },
  icon: {
    marginHorizontal: 5,
  },
  buttonContainer: {
    backgroundColor: Colors.light.tint,
    alignSelf: 'flex-end',
    // padding: 10,
    borderRadius: 50,
    height: 50,
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
    marginBottom: 10,
  },
});

export default InputBox;
