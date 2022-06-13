const baseURL = 'http://192.168.1.124:3030/user';
import { userToCreate, userWithInfo } from '../Types';

export const createUser = async (user: userToCreate) => {
  try {
    const createdUser: userWithInfo = await fetch(baseURL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(user),
    })
      .then(res => res.json())
      .catch(error => console.log(error));
    return createdUser;
  } catch (error) {
    console.log(error);
  }
};

export const getUserById = async (id: string) => {
  try {
    const user = await fetch(`${baseURL}/${id}`, {
      credentials: 'include',
    });
    const userParsed: userWithInfo = await user.json();
    return userParsed;
  } catch (error) {
    console.log(error);
  }
};

// export const postUserSample = async (id: string, sample: string) => {
//   try {
//     const response = await fetch(`${baseURL}/sample/${id}`, {
//       method: 'PUT',
//       credentials: 'include',
//       body: JSON.stringify(sample),
//       headers: { 'Content-Type': 'application/json' },
//     });
//     return await response.json();
//   } catch (error) {
//     console.log(error);
//   }
// };

export const editUserById = async (user: userWithInfo) => {
  try {
    console.log(user.id);
    const userUpd = await fetch(`${baseURL}/${user.id}`, {
      method: 'PUT',
      headers: { 'Content-type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(user),
    });
    console.log(userUpd, 'here');
    return await userUpd.json();
  } catch (error) {
    console.log(error);
  }
};

export const getOtherUsers = async (id: string) => {
  try {
    const otherUsersResponse = await fetch(baseURL + `s/${id}`, {
      credentials: 'include',
    });
    const otherUsers: userWithInfo[] = await otherUsersResponse.json();
    return otherUsers;
  } catch (error) {
    console.log(error);
  }
};
