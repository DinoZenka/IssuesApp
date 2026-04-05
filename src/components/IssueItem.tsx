import React, { memo } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Issue } from '@src/types/issue';
import { format } from 'date-fns';
import { useAppTheme } from '@src/utils/theme';
import {
  ClockIcon,
  PriorityHighIcon,
  PriorityLowIcon,
  PriorityMediumIcon,
  SearchIcon,
  StatusClosedIcon,
  StatusOpenIcon,
} from '@src/assets/icons';
import PriorityIcon from './PriorityIcon';

interface Props {
  issue: Issue;
  onPress: (id: string) => void;
}

const IssueItem: React.FC<Props> = ({ issue, onPress }) => {
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
          <Text style={styles.badgeText}>{issue.status}</Text>
        </View>
        <View style={styles.badgeWrapper}>
          <PriorityIcon priority={issue.priority} />
          <Text style={styles.badgeText}>{issue.priority}</Text>
        </View>
      </View>

      <View style={styles.divider} />

      <View style={styles.body}>
        <Text style={styles.title} numberOfLines={1} ellipsizeMode="tail">
          {issue.title}
        </Text>
      </View>

      <View style={styles.footer}>
        <ClockIcon />
        <Text style={styles.updatedAt}>Updated on: {formattedDate}</Text>
      </View>
    </TouchableOpacity>
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
      fontSize: typography.fontSize.md,
      fontWeight: typography.fontWeight.semiBold,
      color: colors.text,
      lineHeight: 22,
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
