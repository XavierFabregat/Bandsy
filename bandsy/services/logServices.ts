const baseURL = 'http://192.168.1.124:3030';
import { userToLogin } from '../Types';

export const loginUser = async (user: userToLogin) => {
  try {
    const response = await fetch(baseURL + '/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(user),
    })
      .then(res => res.json())
      .catch(error => console.log(error));
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const logout = async () => {
  try {
    const result = await fetch(`${baseURL}/logout`, {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
    });
    const resposnse = await result.json();
    return resposnse;
  } catch (error) {
    console.log(error);
  }
};
