import React, { memo } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { useAppTheme } from '@src/utils/theme';
import { IssueStatus } from '@src/types/issue';

interface Props {
  count: number;
  type: IssueStatus;
}

const TITLES: Record<IssueStatus, string> = {
  open: 'Open',
  closed: 'Closed',
};

const IssueSummaryCard: React.FC<Props> = ({ count, type }) => {
  const theme = useAppTheme();
  const { colors, shadow } = theme;

  const dotColor = type === 'closed' ? colors.green80 : colors.purple60;
  const styles = createStyles(theme);

  return (
    <View style={[styles.card, { backgroundColor: colors.card, ...shadow.sm }]}>
      <Text style={[styles.label]}>{TITLES[type] || type}</Text>
      <View style={styles.valueRow}>
        <Text style={[styles.value, { color: colors.text }]}>{count}</Text>
        <View style={[styles.dot, { backgroundColor: dotColor }]} />
      </View>
    </View>
  );
};

const createStyles = (theme: ReturnType<typeof useAppTheme>) => {
  const { colors, spacing, typography, shadow } = theme;
  return StyleSheet.create({
    container: {},
    card: {
      flex: 1,
      padding: spacing.md,
      borderRadius: 8,
      gap: 8,
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
