import React, { useEffect } from 'react';
import { StyleSheet, View, ViewStyle, DimensionValue } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
  interpolate,
} from 'react-native-reanimated';
import { useAppTheme } from '@src/utils/theme';

interface Props {
  width?: DimensionValue;
  height?: DimensionValue;
  borderRadius?: number;
  style?: ViewStyle;
}

const Shimmer: React.FC<Props> = ({
  width = '100%',
  height = 20,
  borderRadius = 4,
  style,
}) => {
  const theme = useAppTheme();
  const progress = useSharedValue(0);

  useEffect(() => {
    progress.value = withRepeat(withTiming(1, { duration: 1500 }), -1, false);
  }, [progress]);

  const animatedStyle = useAnimatedStyle(() => {
    const opacity = interpolate(progress.value, [0, 0.5, 1], [0.3, 0.7, 0.3]);
    return {
      opacity,
    };
  });

  return (
    <Animated.View
      style={[
        styles.container,
        {
          width,
          height,
          borderRadius,
          backgroundColor: theme.isDark ? '#1A1A1A' : '#BDBDBD',
        },
        animatedStyle,
        style,
      ]}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
  },
});

export default Shimmer;
