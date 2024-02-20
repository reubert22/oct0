import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Pressable, Text} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';

import {History} from '../screens/History';
import {TaskEditor} from '../screens/TaskEditor';
import {TasksList} from '../screens/TasksList';
import {Settings} from '../screens/Settings';
import {useGlobalActorRef} from '../contexts/GlobalContext';
import {ACTION_TYPES, COLORS} from '../utils/constants';

const Tab = createBottomTabNavigator();

const Tabs = () => (
  <Tab.Navigator
    screenOptions={{
      headerShown: false,
    }}
    sceneContainerStyle={{margin: 12}}>
    <Tab.Screen
      name="List"
      component={TasksList}
      options={{
        tabBarIcon: ({focused}) => (
          <FontAwesome
            name="list-ul"
            size={20}
            color={focused ? COLORS.lightBlue : COLORS.gray}
          />
        ),
        tabBarActiveTintColor: COLORS.lightBlue,
        tabBarInactiveTintColor: COLORS.gray,
      }}
    />
    <Tab.Screen
      name="History"
      component={History}
      options={{
        tabBarIcon: ({focused}) => (
          <FontAwesome
            name="history"
            size={20}
            color={focused ? COLORS.lightBlue : COLORS.gray}
          />
        ),
        tabBarActiveTintColor: COLORS.lightBlue,
        tabBarInactiveTintColor: COLORS.gray,
      }}
    />
    <Tab.Screen
      name="Settings"
      component={Settings}
      options={{
        tabBarIcon: ({focused}) => (
          <Feather
            name="settings"
            size={20}
            color={focused ? COLORS.lightBlue : COLORS.gray}
          />
        ),
        tabBarActiveTintColor: COLORS.lightBlue,
        tabBarInactiveTintColor: COLORS.gray,
      }}
    />
  </Tab.Navigator>
);

const AddNewTask = () => {
  const {send} = useGlobalActorRef();

  return (
    <Pressable
      style={{
        height: 30,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 4,
      }}
      onPress={() => send(ACTION_TYPES.SHOW_EDITOR)}>
      <Text style={{color: COLORS.lightBlue, fontFamily: 'Roboto-Regular'}}>
        ADD NEW TASK
      </Text>
    </Pressable>
  );
};

const RootStack = createNativeStackNavigator<RootStackParamList>();

export const MainNavigation = () => (
  <RootStack.Navigator
    screenOptions={{
      headerTitle: 'Tasks List',
    }}>
    <RootStack.Group
      screenOptions={{
        headerRight: AddNewTask,
        contentStyle: {
          backgroundColor: COLORS.white,
        },
      }}>
      <RootStack.Screen name="Tabs" component={Tabs} />
    </RootStack.Group>

    <RootStack.Group screenOptions={{presentation: 'modal'}}>
      <Tab.Screen name="TaskEditor" component={TaskEditor} />
    </RootStack.Group>
  </RootStack.Navigator>
);

export type RootStackParamList = {
  TaskEditor: {};
  Tabs: {};
};
