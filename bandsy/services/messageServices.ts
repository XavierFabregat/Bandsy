import { Message, MessageToPost } from '../types';

const baseURL = 'http://192.168.1.124:3030/messages';

export const postMessageToGroup = async (
  message: MessageToPost,
): Promise<Message | Error> => {
  const body = JSON.stringify(message);
  console.log(body);
  const response = await fetch(`${baseURL}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body,
  });
  if (response.status >= 300) {
    return new Error('Something went wrong');
  } else {
    const postedMessage: Message = await response.json();
    return postedMessage;
  }
};

export const getAllGroupMessages = async (jamGroupId: string) => {
  const response = await fetch(`${baseURL}/${jamGroupId}`, {
    credentials: 'include',
  });
  if (response.status >= 300) {
    const error = await response.json();
    return new Error(error.Message);
  } else {
    const messages = await response.json();
    return messages;
  }
};
