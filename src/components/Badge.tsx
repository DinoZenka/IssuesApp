import { useOnlineStatus } from '@src/hooks/useOnlineStatus';
import { useAppTheme } from '@src/utils/theme';
import { FC } from 'react';
import { StyleSheet, Text, View } from 'react-native';

export const OfflineBadge = () => {
  const theme = useAppTheme();
  const styles = createStyles(theme);

  return (
    <View style={[styles.badgeWrapper, styles.offlineBadge]}>
      <Text style={[styles.badgeText, styles.offlineText]}>Offline Mode</Text>
    </View>
  );
};

export const PendingBadge = () => {
  const theme = useAppTheme();
  const styles = createStyles(theme);

  return (
    <View style={[styles.badgeWrapper, styles.pendingBadge]}>
      <Text style={[styles.badgeText, styles.pendingText]}>Pending Sync</Text>
    </View>
  );
};

export const SynchronizedBadge = () => {
  const theme = useAppTheme();
  const styles = createStyles(theme);

  return (
    <View style={[styles.badgeWrapper, styles.synchronizedBadge]}>
      <Text style={[styles.badgeText, styles.synchronizedText]}>
        Synchronized
      </Text>
    </View>
  );
};

interface IProps {
  isLoading?: boolean;
}

const IssueDetailsBadge: FC<IProps> = ({ isLoading = false }) => {
  const isOnline = useOnlineStatus();

  if (isLoading) {
    return <PendingBadge />;
  }
  if (!isOnline) {
    return <OfflineBadge />;
  }
  return <SynchronizedBadge />;
};

const createStyles = (theme: ReturnType<typeof useAppTheme>) => {
  const { colors, spacing, typography } = theme;
  return StyleSheet.create({
    badgeWrapper: {
      paddingHorizontal: spacing.md,
      paddingVertical: 2,
      borderRadius: 24,
    },
    badgeText: {
      ...typography.variants.bodyRegular,
      color: colors.dark,
    },
    offlineBadge: {
      backgroundColor: colors.secondary,
    },
    pendingBadge: {
      backgroundColor: `${colors.orange}14`,
    },
    synchronizedBadge: {
      backgroundColor: `${colors.success}1F`,
    },
    offlineText: {
      color: colors.dark,
    },
    pendingText: {
      color: colors.orange,
    },
    synchronizedText: {
      color: colors.success,
    },
  });
};

export default IssueDetailsBadge;
