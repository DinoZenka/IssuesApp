import React from 'react';
import { View, Text, Button } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '@src/navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'Issues'>;

const IssuesScreen: React.FC<Props> = ({ navigation }) => {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Issues Screen</Text>
      <Button
        title="Go to Issue"
        onPress={() => navigation.navigate('IssueDetails', { ID: '1' })}
      />
    </View>
  );
};

export default IssuesScreen;
