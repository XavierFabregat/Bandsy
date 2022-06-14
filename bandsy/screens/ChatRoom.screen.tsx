import { useRoute } from '@react-navigation/native';
import React, { useEffect, useRef } from 'react';
import { StyleSheet, FlatList, Text, ImageBackground } from 'react-native';
import InputBox from '../components/InputBox';
import ChatMessage from '../components/ChatMessage';
import { Message } from '../types';
import { getAllGroupMessages } from '../services/messageServices';
import io from 'socket.io-client';

const imageSrc = require('../assets/images/chatBackground.png');

const ChatRoomScreen: React.FC = () => {
  const route = useRoute<any>();
  const jamGroup = route.params;
  const [messages, setMessages] = React.useState<Message[]>([]);
  const socketRef = useRef<any>();

  const fetchMessagesForThisGroup = async () => {
    const messagesForThisGroup = await getAllGroupMessages(jamGroup.id);
    setMessages(messagesForThisGroup);
  };

  useEffect(() => {
    fetchMessagesForThisGroup();
  }, []);

  useEffect(() => {
    socketRef.current = io('http://192.168.1.131:3030');
    socketRef.current.on('message', (message: Message) => {
      console.log(
        'message jam id : ',
        message.jamgroupid,
        'this jam id : ',
        jamGroup.id,
      );
      if (message.jamgroupid === jamGroup.id) {
        setMessages([...messages, message]);
      }
    });
    return () => {
      socketRef.current.disconnect();
    };
  }, [messages]);

  return (
    <ImageBackground style={styles.container} source={imageSrc}>
      {messages ? (
        <FlatList
          data={messages}
          keyExtractor={item => item.id}
          renderItem={({ item }) => <ChatMessage message={item} />}
        />
      ) : (
        <Text>No messages yet</Text>
      )}
      <InputBox jamGroup={jamGroup} setMessages={setMessages} />
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
  },
});

export default ChatRoomScreen;
