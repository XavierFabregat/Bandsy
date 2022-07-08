import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, Pressable } from 'react-native';
import { userWithInfo } from '../Types';
import { useNavigation, useRoute } from '@react-navigation/native';
import { EvilIcons } from '@expo/vector-icons';
// import { ProfileStackParamList } from '../screens/Profile.screen';
import { logout } from '../services/logServices';
import { useAppContext } from '../utils/App.provider';
import Colors from '../constants/Colors';
import { Audio } from 'expo-av';
type userInfoDisplayProps = {
  user: userWithInfo;
};

// type UserInfoDisplayProp = NativeStackNavigationProp<
//   ProfileStackParamList,
//   'UserInfoForm'
// >;

export const ProfileScreen: React.FC<userInfoDisplayProps> = ({ user }) => {
  const [audio, setAudio] = useState<any>(undefined);
  const navigation = useNavigation<any>();
  const appContext = useAppContext();
  const route = useRoute<any>();

  function handlePress() {
    navigation.navigate('UserInfoForm', user);
  }

  const handleLogout = async () => {
    logout()
      .then(res => {
        if (res.error) {
          console.log(res.message);
        } else {
          appContext.toggleLogin();
        }
      })
      .catch(error => console.log(error));
  };

  useEffect(() => {
    if (route.params) {
      setAudio(route.params);
    }
  });

  const playSound = async (audio: any) => {
    const sound = new Audio.Sound();
    await sound.loadAsync({ uri: audio.file });
    await sound.replayAsync();
  };

  return (
    <View style={styles.infoContainer}>
      <View>
        <Text style={styles.nameText}>Name:</Text>
        <Text style={styles.instrument}>{user.name}</Text>
        <Text style={styles.infoText}>Location: {user.location}</Text>
        <Text style={styles.infoText}>Instruments:</Text>
        {user.instruments.map(instrument => (
          <Text
            key={instrument}
            style={styles.instrument}>{`\u2022 ${instrument}`}</Text>
        ))}
      </View>
      <Pressable onPress={audio ? () => playSound(audio) : null}>
        <EvilIcons name="play" size={150} color={Colors.light.tint} />
      </Pressable>
      <View style={styles.bottomButtonBasket}>
        <Pressable onPress={handleLogout} style={styles.logOut}>
          <Text style={styles.logOutText}>Log Out</Text>
        </Pressable>
        <Pressable style={styles.edit} onPress={handlePress}>
          <Text style={styles.editText}>Edit</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  infoContainer: {
    backgroundColor: Colors.light.background,
    padding: 10,
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  nameText: {
    color: Colors.light.text,
    fontSize: 25,
    fontWeight: 'bold',
  },
  instrument: {
    alignSelf: 'center',
    fontSize: 18,
  },
  infoText: {
    fontWeight: 'bold',
    fontSize: 25,
    marginBottom: 10,
  },
  edit: {
    backgroundColor: Colors.light.tint,
    paddingVertical: 20,
    paddingHorizontal: 40,
    borderRadius: 15,
  },
  editText: {
    color: Colors.light.background,
    fontWeight: 'bold',
    fontSize: 20,
  },
  logOut: {
    backgroundColor: '#ff726f',
    paddingVertical: 20,
    paddingHorizontal: 40,
    marginRight: 50,
    borderRadius: 15,
  },
  logOutText: {
    color: Colors.light.background,
    fontWeight: 'bold',
    fontSize: 20,
  },
  bottomButtonBasket: {
    alignSelf: 'center',
    flexDirection: 'row',
    padding: 40,
    justifyContent: 'space-between',
  },
});
