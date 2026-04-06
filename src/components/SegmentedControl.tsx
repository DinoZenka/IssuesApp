import React, { memo, ReactNode, useCallback, useEffect, useMemo } from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  LayoutChangeEvent,
  StyleProp,
  ViewStyle,
} from 'react-native';
import Animated, {
  useAnimatedStyle,
  withSpring,
  useSharedValue,
} from 'react-native-reanimated';
import { useAppTheme } from '@src/utils/theme';
import Shimmer from './Shimmer';

interface Props<T> {
  values: T[];
  selectedValue?: T;
  onSelectedValueChange?: (value: T) => void;
  selectedIndex?: number;
  onChange?: (index: number) => void;

  renderItem: (item: T, isSelected: boolean) => ReactNode;
  containerStyle?: StyleProp<ViewStyle>;
  fullWidth?: boolean;
  disabled?: boolean;
}

const SPRING_CONFIG = {
  damping: 20,
  stiffness: 150,
  mass: 0.8,
};

function SegmentedControl<T>({
  values,
  selectedValue,
  onSelectedValueChange,
  selectedIndex,
  onChange,
  renderItem,
  containerStyle,
  fullWidth = false,
  disabled = false,
}: Props<T>) {
  const theme = useAppTheme();
  const [layouts, setLayouts] = React.useState<{ x: number; width: number }[]>(
    [],
  );

  const activeIndex = useMemo(() => {
    if (selectedIndex !== undefined) return selectedIndex;
    if (selectedValue !== undefined) return values.indexOf(selectedValue);
    return 0;
  }, [selectedIndex, selectedValue, values]);

  const translateX = useSharedValue(0);
  const indicatorWidth = useSharedValue(0);
  const opacity = useSharedValue(0);

  useEffect(() => {
    const currentLayout = layouts[activeIndex];
    if (currentLayout) {
      translateX.value = withSpring(currentLayout.x, SPRING_CONFIG);
      indicatorWidth.value = withSpring(currentLayout.width, SPRING_CONFIG);
      opacity.value = withSpring(1);
    }
  }, [activeIndex, layouts]);

  const handlePress = useCallback(
    (item: T, index: number) => {
      onChange?.(index);
      onSelectedValueChange?.(item);
    },
    [onChange, onSelectedValueChange],
  );

  const onLayout = useCallback(
    (index: number) => (event: LayoutChangeEvent) => {
      const { x, width } = event.nativeEvent.layout;
      setLayouts(prev => {
        const next = [...prev];
        next[index] = { x, width };
        return next;
      });
    },
    [],
  );

  const animatedIndicatorStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
    width: indicatorWidth.value,
    opacity: opacity.value,
  }));

  const styles = createStyles(theme);

  return (
    <View
      style={[styles.container, fullWidth && styles.fullWidth, containerStyle]}
    >
      <Animated.View style={[styles.activeIndicator, animatedIndicatorStyle]} />

      {values.map((item, index) => (
        <TouchableOpacity
          disabled={disabled}
          key={index.toString()}
          onLayout={onLayout(index)}
          style={[styles.segment, fullWidth && styles.flexSegment]}
          onPress={() => handlePress(item, index)}
          activeOpacity={0.8}
        >
          {renderItem(item, activeIndex === index)}
        </TouchableOpacity>
      ))}
    </View>
  );
}

export const SegmentedControlSkeleton = () => {
  const theme = useAppTheme();
  const styles = createStyles(theme);

  return (
    <View style={[styles.container, styles.skeletonContainer]}>
      <View style={styles.skeletonActiveItem}>
        <Shimmer width={18} height={12} />
      </View>
      <Shimmer width={42} height={12} />
      <Shimmer width={42} height={12} />
    </View>
  );
};

const createStyles = (theme: ReturnType<typeof useAppTheme>) => {
  const { colors } = theme;
  return StyleSheet.create({
    container: {
      flexDirection: 'row',
      backgroundColor: colors.background,
      borderRadius: 8,
      paddingVertical: 4,
      paddingHorizontal: 4,
      alignSelf: 'flex-start',
      borderWidth: 2,
      borderColor: colors.dark40,
    },
    fullWidth: {
      alignSelf: 'stretch',
    },
    activeIndicator: {
      position: 'absolute',
      height: '100%',
      backgroundColor: colors.card,
      borderRadius: 4,
      marginTop: 4,
      marginLeft: -2,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.15,
      shadowRadius: 2,
      elevation: 3,
    },
    segment: {
      paddingHorizontal: 8,
      paddingVertical: 7,
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1,
    },
    flexSegment: {
      flex: 1,
    },
    skeletonContainer: {
      height: 40,
      alignItems: 'center',
      gap: 12,
      padding: 4,
      paddingRight: 12,
      backgroundColor: colors.background,
    },
    skeletonActiveItem: {
      height: '100%',
      padding: 8,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'white',
      borderRadius: 8,
    },
  });
};

export default memo(SegmentedControl) as typeof SegmentedControl;
