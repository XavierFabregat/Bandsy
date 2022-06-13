import { jamGroup, jamGroupToCreate } from '../Types';

const baseURL = 'http://192.168.1.124:3030/jamgroup';

export const createJamGroup = async (
  newJamGroup: jamGroupToCreate,
): Promise<jamGroup | Error> => {
  const jamGroupCreatedResponse = await fetch(baseURL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify(newJamGroup),
  });
  if (jamGroupCreatedResponse.status >= 300) {
    const response = await jamGroupCreatedResponse.json();
    return new Error(response.message);
  }
  try {
    const jamGroupCreated: jamGroup = await jamGroupCreatedResponse.json();
    return jamGroupCreated;
  } catch (error) {
    console.log(error);
    return new Error('Unable to parse response.');
  }
};

export const getJamGroupsUserBelongsTo = async (
  id: string,
): Promise<jamGroup[] | Error> => {
  const jamGroupUserBelongsToResponse = await fetch(`${baseURL}/${id}`, {
    credentials: 'include',
  });
  if (jamGroupUserBelongsToResponse.status >= 300) {
    const response = await jamGroupUserBelongsToResponse.json();
    return new Error(response.message);
  }
  const jamGroupUserBelongsTo: jamGroup[] =
    await jamGroupUserBelongsToResponse.json();
  return jamGroupUserBelongsTo;
};

export const inviteUserToMyJamGroup = async (
  id: string,
  jamGroupId: string,
): Promise<jamGroup | Error> => {
  const jamGroupUpdatedResponse = await fetch(`${baseURL}/${jamGroupId}`, {
    method: 'PUT',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id: id }),
  });
  if (jamGroupUpdatedResponse.status >= 300) {
    const response = await jamGroupUpdatedResponse.json();
    return new Error(response.message);
  }
  const jamGroupUpdated = await jamGroupUpdatedResponse.json();
  return jamGroupUpdated;
};

export const getJamGroupsIAdmin = async (
  id: string,
): Promise<jamGroup[] | Error> => {
  const jamGroupIAdminResponse = await fetch(`${baseURL}/admin/${id}`, {
    credentials: 'include',
  });
  if (jamGroupIAdminResponse.status >= 300) {
    const response = await jamGroupIAdminResponse.json();
    return new Error(response.message);
  }
  const jamGroupIAdmin: jamGroup[] = await jamGroupIAdminResponse.json();
  return jamGroupIAdmin;
};
