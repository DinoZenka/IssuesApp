import React, { FC, memo } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Issue, IssuePriority, IssueStatus } from '@src/types/issue';
import { format } from 'date-fns';
import { useAppTheme } from '@src/utils/theme';
import {
  ClockIcon,
  SearchIcon,
  StatusClosedIcon,
  StatusOpenIcon,
} from '@src/assets/icons';
import PriorityIcon from './PriorityIcon';
import Shimmer from './Shimmer';
import { issuePriorityLabel, issueStatusLabel } from '@src/utils/typeLabels';

interface IProps {
  issue: Issue;
  onPress: (id: string) => void;
}

const IssueItem: FC<IProps> = ({ issue, onPress }) => {
  const theme = useAppTheme();
  const { colors } = theme;

  const handlePress = () => onPress(issue.id);

  const formattedDate = React.useMemo(() => {
    try {
      return format(new Date(issue.updatedAt), 'hh:mm a, dd MMM yyyy');
    } catch {
      return issue.updatedAt;
    }
  }, [issue.updatedAt]);

  const styles = createStyles(theme);
  const statusIcon =
    issue.status == 'open' ? <StatusOpenIcon /> : <StatusClosedIcon />;

  const statusLabel = issueStatusLabel[issue.status] || issue.status;
  const priorityLabel = issuePriorityLabel[issue.priority] || issue.priority;

  return (
    <TouchableOpacity
      onPress={handlePress}
      style={styles.container}
      accessible={true}
      accessibilityLabel={`Issue: ${issue.title}, Status: ${issue.status}, Priority: ${issue.priority}`}
      activeOpacity={0.7}
    >
      <View style={styles.header}>
        <View style={styles.badgeWrapper}>
          {statusIcon}
          <Text style={styles.badgeText}>{statusLabel}</Text>
        </View>
        <View style={styles.badgeWrapper}>
          <PriorityIcon priority={issue.priority} />
          <Text style={styles.badgeText}>{priorityLabel}</Text>
        </View>
      </View>

      <View style={styles.divider} />

      <View style={styles.body}>
        <Text style={styles.title} numberOfLines={1} ellipsizeMode="tail">
          {issue.title}
        </Text>
        <Text style={styles.description} numberOfLines={2} ellipsizeMode="tail">
          {issue.description}
        </Text>
      </View>

      <View style={styles.footer}>
        <ClockIcon />
        <Text style={styles.updatedAt}>Updated on: {formattedDate}</Text>
      </View>
    </TouchableOpacity>
  );
};

interface IssueItemSkeletonProps {
  status: IssueStatus;
  priority: IssuePriority;
}

export const IssueItemSkeleton: FC<IssueItemSkeletonProps> = ({
  status,
  priority,
}) => {
  const theme = useAppTheme();
  const { colors } = theme;

  const styles = createStyles(theme);
  const statusIcon =
    status == 'open' ? <StatusOpenIcon /> : <StatusClosedIcon />;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.badgeWrapper}>
          {statusIcon}
          <Shimmer width={80} height={12} />
        </View>
        <View style={styles.badgeWrapper}>
          <PriorityIcon priority={priority} />
          <Shimmer width={60} height={12} />
        </View>
      </View>

      <View style={styles.divider} />

      <View style={styles.body}>
        <Shimmer width="100%" height={13} />
        <View />
        <Shimmer width="100%" height={11} />
        <Shimmer width="100%" height={11} />
      </View>

      <View style={styles.footer}>
        <ClockIcon />
        <Shimmer width={200} height={12} />
      </View>
    </View>
  );
};

const createStyles = (theme: ReturnType<typeof useAppTheme>) => {
  const { colors, spacing, typography, shadow } = theme;

  return StyleSheet.create({
    container: {
      backgroundColor: colors.card,
      padding: spacing.lg,
      marginTop: spacing.lg,
      borderRadius: spacing.sm,
      borderWidth: 1,
      borderColor: colors.border,
      ...shadow.sm,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    badgeWrapper: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: spacing.sm,
    },
    badgeText: {
      ...typography.variants.bodyRegular,
      color: colors.dark,
    },
    divider: {
      height: 1,
      width: '100%',
      backgroundColor: colors.border,
      marginVertical: spacing.md,
    },
    body: {
      gap: spacing.sm,
    },
    title: {
      ...typography.variants.subtitle2,
      color: colors.dark,
    },
    description: {
      ...typography.variants.body2,
      color: colors.dark80,
    },
    footer: {
      marginTop: spacing.md,
      flexDirection: 'row',
      alignItems: 'center',
      gap: spacing.sm,
    },
    updatedAt: {
      ...typography.variants.body2,
      color: colors.dark80,
    },
  });
};

export default memo(IssueItem);
