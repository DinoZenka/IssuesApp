import React, { memo } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { useAppTheme, useThemedStyles } from '@src/utils/theme';
import { IssueStatus } from '@src/types/issue';
import { issueStatusLabel } from '@src/utils/typeLabels';
import Shimmer from '@src/components/Shimmer';

interface Props {
  count: number;
  type: IssueStatus;
  showSkeleton?: boolean;
}

const SummaryCard: React.FC<Props> = ({ count, type, showSkeleton }) => {
  const theme = useAppTheme();
  const { colors } = theme;

  const styles = useThemedStyles(createStyles);
  const dotTyped = type === 'closed' ? styles.dotClosed : styles.dotOpen;

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
        <View style={[styles.dot, dotTyped]} />
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
    dotClosed: {
      backgroundColor: colors.green80,
    },
    dotOpen: {
      backgroundColor: colors.purple60,
    },
  });
};

export default memo(SummaryCard);
