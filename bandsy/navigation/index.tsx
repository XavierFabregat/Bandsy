/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import {
  Feather,
  FontAwesome,
  Ionicons,
  MaterialCommunityIcons,
} from '@expo/vector-icons';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import { ColorSchemeName, Pressable } from 'react-native';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import NotFoundScreen from '../screens/NotFoundScreen';
import { ProfileScreen } from '../screens/Profile.screen';
import { HomeScreen } from '../screens/Home.screen';
import { UserInfoFormModal } from '../screens/UserInfoForm.modal';
import { getUserById } from '../services/userServices';
import {
  RootStackParamList,
  RootTabParamList,
  RootTabScreenProps,
  userWithInfo,
} from '../types';
import { useAppContext } from '../utils/App.provider';
import LinkingConfiguration from './LinkingConfiguration';
import { JamGroup } from '../screens/JamGroups.screen';
import SelectJamGroupModal from '../screens/SelectJamGroup.modal';
import RecorderScreen from '../screens/Recorder.screen';

export default function Navigation({
  colorScheme,
}: {
  colorScheme: ColorSchemeName;
}) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <RootNavigator />
    </NavigationContainer>
  );
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Root"
        component={MainTabNavigator}
        options={{
          title: 'Bandsy',
          headerShadowVisible: false,
          headerStyle: { backgroundColor: Colors.light.tint },
          headerTintColor: Colors.light.background,
        }}
      />
      <Stack.Screen
        name="NotFound"
        component={NotFoundScreen}
        options={{ title: 'Oops!' }}
      />
      <Stack.Group>
        {/*screenOptions={{ presentation: 'modal' }} */}
        <Stack.Screen name="UserInfoForm" component={UserInfoFormModal} />
        <Stack.Screen name="SelectJamGroup" component={SelectJamGroupModal} />
        <Stack.Screen name="Recorder" component={RecorderScreen} />
      </Stack.Group>
    </Stack.Navigator>
  );
}

/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
const MainTab = createMaterialTopTabNavigator<RootTabParamList>();

function MainTabNavigator() {
  const colorScheme = useColorScheme();
  const [user, setUser] = React.useState<userWithInfo | undefined>(undefined);
  const appContext = useAppContext();

  React.useEffect(() => {
    const fetchUser = async () => {
      const response = await getUserById(appContext.sessionToken);
      setUser(response);
    };
    fetchUser();
  }, []);

  return user ? (
    <MainTab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme].background,
        tabBarStyle: {
          backgroundColor: Colors[colorScheme].tint,
        },
        tabBarIndicatorStyle: {
          backgroundColor: Colors[colorScheme].background,
          height: 4,
        },
        tabBarLabelStyle: {
          fontWeight: 'bold',
        },
        tabBarShowIcon: true,
      }}>
      <MainTab.Screen
        name="Profile"
        children={() => <ProfileScreen user={user} />}
        options={({ navigation }: RootTabScreenProps<'Profile'>) => ({
          tabBarShowLabel: false,
          title: 'Profile',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="account-music"
              size={24}
              color={color}
            />
          ),
        })}
      />
      <MainTab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: 'Home',
          tabBarShowLabel: false,
          tabBarIcon: ({ color }) => (
            <Feather name="music" size={24} color={color} />
          ),
        }}
      />
      <MainTab.Screen
        name="JamGroups"
        component={JamGroup}
        options={{
          tabBarShowLabel: false,
          title: 'Tab Three',
          tabBarIcon: ({ color }) => (
            <Ionicons name="ios-chatbubble-ellipses" size={24} color={color} />
          ),
        }}
      />
    </MainTab.Navigator>
  ) : null;
}
