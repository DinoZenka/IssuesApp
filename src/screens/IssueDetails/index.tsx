import React from 'react';
import { View, Text } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '@src/navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'IssueDetails'>;

const IssueDetailsScreen: React.FC<Props> = ({ route }) => {
  const { ID } = route.params;

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Issue Details</Text>
    </View>
  );
};

export default IssueDetailsScreen;
