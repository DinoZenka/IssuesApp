import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import IssuesScreen from '@src/screens/Issues';
import IssueDetailsScreen from '@src/screens/IssueDetails';
import { RootStackParamList } from './types';

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Issues">
      <Stack.Screen name="Issues" component={IssuesScreen} />
      <Stack.Screen name="IssueDetails" component={IssueDetailsScreen} />
    </Stack.Navigator>
  );
};

export default RootNavigator;
