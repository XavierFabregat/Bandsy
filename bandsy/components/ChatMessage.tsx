import moment from 'moment';
import React from 'react';
import { Text, View } from 'react-native';
import { Message } from '../types';

import { StyleSheet } from 'react-native';
import Colors from '../constants/Colors';

import { useAppContext } from '../utils/App.provider';

export type ChatMessageProps = {
  message: Message;
};

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const [date, setDate] = React.useState<Date>();
  const appContext = useAppContext();
  const isMyMessage = () => {
    return message.userId === appContext.sessionToken;
  };

  React.useEffect(() => {
    var dateNotFormatted = new Date(Number(message.timestamp));
    setDate(dateNotFormatted);
  }, []);

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.messageBox,
          {
            backgroundColor: isMyMessage() ? '#DCF8CF' : 'white',
            marginLeft: isMyMessage() ? 50 : 0,
            marginRight: isMyMessage() ? 0 : 50,
          },
          isMyMessage()
            ? { borderBottomRightRadius: 0 }
            : { borderBottomLeftRadius: 0 },
        ]}>
        {!isMyMessage() && <Text style={styles.name}>{message.user.name}</Text>}
        <Text style={styles.message}>{message.content}</Text>
        <Text
          style={[
            styles.time,
            isMyMessage() ? null : { alignSelf: 'flex-end' },
          ]}>
          {moment(date).format('HH:MM A')}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  messageBox: {
    backgroundColor: '#fff',
    marginRight: 50,
    borderRadius: 7,
    padding: 10,
  },
  name: {
    color: Colors.light.tint,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  message: {},
  time: {
    fontWeight: '100',
    fontSize: 12,
    marginTop: 10,
  },
});

export default ChatMessage;
