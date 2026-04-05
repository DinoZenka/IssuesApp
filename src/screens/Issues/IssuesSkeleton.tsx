import { IssueItemSkeleton } from '@src/components/IssueItem';
import IssueStatusIndicator from '@src/components/IssueStatusIndicator';
import { IssueSummaryCardSkeleton } from '@src/components/IssueSummaryCard';
import { SearchInputSkeleton } from '@src/components/SearchInput';
import { SegmentedControlSkeleton } from '@src/components/SegmentedControl';
import Shimmer from '@src/components/Shimmer';
import { Issue } from '@src/types/issue';
import { useAppTheme } from '@src/utils/theme';
import { FlatList, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const ISSUES_LIST: Pick<Issue, 'status' | 'priority'>[] = [
  { status: 'open', priority: 'low' },
  { status: 'closed', priority: 'high' },
  { status: 'closed', priority: 'medium' },
  { status: 'open', priority: 'low' },
];

const IssuesSkeleton = () => {
  const theme = useAppTheme();
  const { colors, spacing } = theme;
  const styles = createStyles(theme);

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <View style={styles.header}>
        <View style={styles.titleContainer}>
          <Shimmer width={42} height={12} />
          <Shimmer width={82} height={12} />
        </View>
        <View style={styles.issuesCountWrapper}>
          <Shimmer width="100%" height={38} />
        </View>
        <IssueStatusIndicator
          closedCount={20}
          openCount={50}
          style={styles.statusIndicator}
        />
        <View style={styles.summaryCardsContainer}>
          <IssueSummaryCardSkeleton type="closed" />
          <IssueSummaryCardSkeleton type="open" />
        </View>
      </View>
      <View style={styles.listContainer}>
        <View style={styles.listHeader}>
          <Shimmer width={80} height={18} />
          <SegmentedControlSkeleton />
        </View>
        <SearchInputSkeleton />

        <FlatList
          data={ISSUES_LIST}
          renderItem={({ item }) => (
            <IssueItemSkeleton priority={item.priority} status={item.status} />
          )}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </SafeAreaView>
  );
};

const createStyles = (theme: ReturnType<typeof useAppTheme>) => {
  const { colors, spacing, typography, shadow } = theme;
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    header: {
      padding: spacing.lg,
      marginTop: spacing.xs,
      backgroundColor: 'transparent',
    },
    titleContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    title: {
      fontSize: typography.fontSize.md,
      fontWeight: typography.fontWeight.bold,
      color: colors.textSecondary,
    },
    issuesCountWrapper: {
      marginTop: spacing.xl,
      marginBottom: spacing.xl,
    },
    statusIndicator: {
      height: 8,
      width: '100%',
    },
    summaryCardsContainer: {
      flexDirection: 'row',
      gap: 10,
      marginTop: spacing.lg,
    },
    listContainer: {
      flex: 1,
      backgroundColor: colors.card,
      paddingHorizontal: spacing.xl,
      marginTop: spacing.sm,
      paddingTop: spacing.xl,
      borderTopRightRadius: 16,
      borderTopLeftRadius: 16,
    },
    listHeader: {
      marginBottom: spacing.md,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    listTitle: {
      fontSize: typography.fontSize.lg,
      fontWeight: typography.fontWeight.bold,
      color: colors.text,
    },
    center: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: spacing.xl,
    },
    message: {
      marginTop: spacing.md,
      fontSize: typography.fontSize.md,
      color: colors.textSecondary,
    },
    errorText: {
      color: colors.danger,
    },
    retryButton: {
      marginTop: spacing.lg,
      paddingHorizontal: spacing.xxl,
      paddingVertical: spacing.md,
      backgroundColor: colors.primary,
      borderRadius: spacing.sm,
    },
    retryText: {
      color: '#fff',
      fontWeight: typography.fontWeight.semiBold,
    },
    issueStatusText: {
      fontSize: typography.fontSize.xs,
      fontWeight: typography.fontWeight.medium,
      color: colors.textSecondary,
    },
    issueStatusTextActive: {
      color: colors.text,
      fontWeight: typography.fontWeight.bold,
    },
    shimmerItem: {
      backgroundColor: colors.card,
      padding: spacing.md,
      marginBottom: spacing.sm,
      borderRadius: spacing.sm,
      borderWidth: 1,
      borderColor: colors.border,
      ...shadow.sm,
    },
    shimmerItemHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: spacing.sm,
    },
  });
};

export default IssuesSkeleton;
