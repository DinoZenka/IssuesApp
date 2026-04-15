import Shimmer from '@src/components/Shimmer';
import { useAppTheme, useThemedStyles } from '@src/utils/theme';
import { memo } from 'react';
import { StyleSheet, Text, View, ViewStyle } from 'react-native';

interface SegmentItemProps {
  label: string;
  icon: React.ReactNode;
  isSelected: boolean;
  isLoading?: boolean;
  shimmerWidth?: number;
  containerStyle?: ViewStyle;
}

const SegmentItem = memo(
  ({
    label,
    icon,
    isSelected,
    isLoading,
    shimmerWidth,
    containerStyle,
  }: SegmentItemProps) => {
    const styles = useThemedStyles(createStyles);

    return (
      <View style={[styles.container, containerStyle]}>
        {icon}
        {isLoading ? (
          <Shimmer width={shimmerWidth ?? 60} height={16} />
        ) : (
          <Text style={[styles.text, isSelected && styles.textActive]}>
            {label}
          </Text>
        )}
      </View>
    );
  },
);

const createStyles = (theme: ReturnType<typeof useAppTheme>) => {
  const { colors, spacing, typography } = theme;
  return StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: spacing.sm,
    },
    text: {
      ...typography.variants.bodyTab,
      color: colors.dark80,
    },
    textActive: {
      ...typography.variants.body2,
      color: colors.dark,
    },
  });
};

export default SegmentItem;
