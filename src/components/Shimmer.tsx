import React from 'react';
import { StyleSheet, ViewStyle, DimensionValue } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
  interpolate,
  useReducedMotion,
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

  const shouldReduceMotion = useReducedMotion();
  const progress = useSharedValue(0);

  React.useEffect(() => {
    if (!shouldReduceMotion) {
      progress.value = withRepeat(withTiming(1, { duration: 1500 }), -1, false);
    } else {
      progress.value = 0;
    }
  }, [shouldReduceMotion, progress]);

  const animatedStyle = useAnimatedStyle(() => {
    if (shouldReduceMotion) {
      return { opacity: 0.4 };
    }

    const opacity = interpolate(progress.value, [0, 0.5, 1], [0.3, 0.7, 0.3]);
    return { opacity };
  });

  const backgroundColor = theme.isDark ? '#1A1A1A' : '#BDBDBD';

  return (
    <Animated.View
      accessible={false}
      importantForAccessibility="no-hide-descendants"
      style={[
        styles.container,
        {
          width,
          height,
          borderRadius,
          backgroundColor,
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
