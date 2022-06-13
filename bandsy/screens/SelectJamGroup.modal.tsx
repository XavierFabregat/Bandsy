import React from 'react';
import { FlatList, Text, View } from 'react-native';
import {
  getJamGroupsIAdmin,
  inviteUserToMyJamGroup,
} from '../services/jamGroupServices';
import { useAppContext } from '../utils/App.provider';
import { jamGroup } from '../Types';
import JamGroupSelectorCard from '../components/JamGroupSelectorCard';
import { useRoute } from '@react-navigation/native';

const SelectJamGroupModal: React.FC = () => {
  const [groupsIAdmin, setGroupsIAdmin] = React.useState<jamGroup[]>([]);
  const appContext = useAppContext();
  const userToInviteId: string = useRoute<any>().params?.id;
  React.useEffect(() => {
    const fetchGroupIAdmin = async () => {
      var response = await getJamGroupsIAdmin(appContext.sessionToken);
      if (!(response instanceof Error)) {
        setGroupsIAdmin(response);
      }
    };
    fetchGroupIAdmin();
  }, []);
  return (
    <View>
      {groupsIAdmin && (
        <FlatList
          keyExtractor={item => item.id}
          data={groupsIAdmin}
          renderItem={({ item }) => (
            <JamGroupSelectorCard
              jamGroup={item}
              userToInvite={userToInviteId}
            />
          )}
        />
      )}
    </View>
  );
};

export default SelectJamGroupModal;
