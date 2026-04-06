import React, { memo } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { useAppTheme } from '@src/utils/theme';
import { IssueStatus } from '@src/types/issue';
import Shimmer from './Shimmer';
import { issueStatusLabel } from '@src/utils/typeLabels';

interface Props {
  count: number;
  type: IssueStatus;
  showSkeleton?: boolean;
}

const IssueSummaryCard: React.FC<Props> = ({ count, type, showSkeleton }) => {
  const theme = useAppTheme();
  const { colors } = theme;

  const dotColor = type === 'closed' ? colors.green80 : colors.purple60;
  const styles = createStyles(theme);

  return (
    <View
      style={[styles.card, showSkeleton && styles.skeletonCard]}
      accessible={false}
      accessibilityElementsHidden={!!showSkeleton}
      importantForAccessibility={showSkeleton ? 'no-hide-descendants' : 'auto'}
    >
      {showSkeleton ? (
        <Shimmer width={60} height={14} />
      ) : (
        <Text style={[styles.label]}>{issueStatusLabel[type] || type}</Text>
      )}
      <View style={styles.valueRow}>
        {showSkeleton ? (
          <Shimmer width={30} height={18} />
        ) : (
          <Text style={[styles.value, { color: colors.text }]}>{count}</Text>
        )}
        <View style={[styles.dot, { backgroundColor: dotColor }]} />
      </View>
    </View>
  );
};

const createStyles = (theme: ReturnType<typeof useAppTheme>) => {
  const { colors, spacing, typography, shadow } = theme;
  return StyleSheet.create({
    card: {
      flex: 1,
      padding: spacing.md,
      borderRadius: 8,
      gap: spacing.sm,
      backgroundColor: colors.card,
      ...shadow.sm,
    },
    skeletonCard: {
      gap: spacing.xl,
    },
    label: {
      ...typography.variants.body2,
      color: colors.dark80,
    },
    valueRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
    },
    value: {
      ...typography.variants.subtitle1,
      color: colors.dark,
    },
    dot: {
      width: 8,
      height: 8,
      borderRadius: 4,
    },
  });
};

export default memo(IssueSummaryCard);
