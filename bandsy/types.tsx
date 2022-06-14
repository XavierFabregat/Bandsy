/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import {
  CompositeScreenProps,
  NavigatorScreenParams,
} from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

export type RootStackParamList = {
  Root: NavigatorScreenParams<RootTabParamList> | undefined;
  SelectJamGroup: undefined;
  UserInfoForm: undefined;
  Recorder: undefined;
  NotFound: undefined;
  ChatRoom: undefined;
};

export type RootStackScreenProps<Screen extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, Screen>;

export type RootTabParamList = {
  Profile: undefined;
  Home: undefined;
  JamGroups: undefined;
};

export type RootTabScreenProps<Screen extends keyof RootTabParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<RootTabParamList, Screen>,
    NativeStackScreenProps<RootStackParamList>
  >;

export type userToCreate = {
  email: string;
  name: string;
  password: string;
};

export type userToLogin = {
  email: string;
  password: string;
};

export type userWithInfo = {
  id: string;
  name: string;
  hashpassword: string;
  jamgroups: string[];
  instruments: string[];
  location?: string;
  sample?: string;
};

export type jamGroupToCreate = {
  name: string;
  admin: string;
};

export type jamGroup = {
  id: string;
  name: string;
  admin: string;
  users: string[];
};

export type errorMessage = {
  error: any;
  message: string;
};

export type Message = {
  id: string;
  authorid: string;
  jamgroupid: string;
  content: string;
  timestamp: number;
};

export type MessageToPost = {
  authorid: string;
  jamgroupid: string;
  content: string;
  timestamp: number;
};
