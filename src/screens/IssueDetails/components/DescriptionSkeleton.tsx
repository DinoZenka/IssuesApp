import Shimmer from '@src/components/Shimmer';
import { FC } from 'react';
import { View, ViewStyle } from 'react-native';

const DescriptionSkeleton: FC<{ containerStyle?: ViewStyle }> = ({
  containerStyle,
}) => (
  <View style={containerStyle}>
    <Shimmer width={60} height={24} />
    <View />
    <Shimmer />
    <Shimmer />
    <Shimmer />
    <View />
    <Shimmer />
    <Shimmer />
    <Shimmer />
    <View />
    <Shimmer />
    <Shimmer />
    <Shimmer />
    <View />
    <Shimmer />
    <Shimmer />
    <Shimmer />
  </View>
);

export default DescriptionSkeleton;
