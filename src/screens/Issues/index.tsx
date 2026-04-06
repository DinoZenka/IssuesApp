import React, { useCallback, useMemo, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '@src/navigation/types';
import { useIssues } from '@src/hooks/useIssues';
import IssueCards from '@src/components/IssueCards';
import IssueStatusIndicator from '@src/components/IssueStatusIndicator';
import SegmentedControl from '@src/components/SegmentedControl';
import SearchInput from '@src/components/SearchInput';
import {
  SafeAreaView,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import { useAppTheme } from '@src/utils/theme';
import { format } from 'date-fns';
import IssueSummaryCard from '@src/components/IssueSummaryCard';
import IssuesSkeleton from './IssuesSkeleton';
import { useDebounce } from '@src/hooks/useDebounce';
import LinearGradient from 'react-native-linear-gradient';
import { FILTER_VALUES } from '@src/utils/constants';
import { issueFilterLaber } from '@src/utils/typeLabels';

type Props = NativeStackScreenProps<RootStackParamList, 'Issues'>;

const IssuesScreen: React.FC<Props> = ({ navigation }) => {
  const theme = useAppTheme();
  const {
    data: issues,
    isLoading,
    isError: isQueryError,
    refetch,
    isFetching,
  } = useIssues();

  const { bottom } = useSafeAreaInsets();

  const [filterIndex, setFilterIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');

  const debouncedSearchQuery = useDebounce(searchQuery, 300);

  const { closedCount, openCount } = useMemo(() => {
    if (!issues) return { closedCount: 0, openCount: 0 };
    return issues.reduce(
      (acc, issue) => {
        if (issue.status === 'closed') acc.closedCount++;
        else if (issue.status === 'open') acc.openCount++;
        return acc;
      },
      { closedCount: 0, openCount: 0 },
    );
  }, [issues]);

  const filteredIssues = useMemo(() => {
    if (!issues) return [];

    return issues.filter(issue => {
      const matchesStatus =
        filterIndex === 0 ||
        (filterIndex === 1 && issue.status === 'closed') ||
        (filterIndex === 2 && issue.status === 'open');

      const matchesSearch = issue.title
        .toLowerCase()
        .includes(debouncedSearchQuery.toLowerCase());

      return matchesStatus && matchesSearch;
    });
  }, [issues, filterIndex, debouncedSearchQuery]);

  const isFilterError =
    debouncedSearchQuery.length > 0 && filteredIssues.length === 0;

  const handleSearchChange = (text: string) => {
    setSearchQuery(text);
  };

  const currentDay = useMemo(() => {
    const now = new Date();
    return format(now, 'MMMM dd, yyyy');
  }, []);

  const handleIssuePress = useCallback(
    (id: string) => {
      navigation.navigate('IssueDetails', { ID: id });
    },
    [navigation],
  );

  const styles = createStyles(theme);

  if (isLoading) {
    return <IssuesSkeleton />;
  }

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Issues</Text>
          <Text style={styles.dateText}>{currentDay}</Text>
        </View>
        <Text style={styles.counterText}>{issues?.length || 'N/A'}</Text>
        <IssueStatusIndicator
          closedCount={closedCount}
          openCount={openCount}
          style={styles.statusIndicator}
        />
        <View style={styles.summaryCardsContainer}>
          <IssueSummaryCard count={closedCount} type="closed" />
          <IssueSummaryCard count={openCount} type="open" />
        </View>
      </View>
      <View style={styles.listContainer}>
        <View style={styles.listHeader}>
          <Text style={styles.listTitle}>Issues</Text>
          <SegmentedControl
            values={FILTER_VALUES}
            selectedIndex={filterIndex}
            onChange={setFilterIndex}
            renderItem={(item, isSelected) => (
              <Text
                style={[
                  styles.issueStatusText,
                  isSelected && styles.issueStatusTextActive,
                ]}
              >
                {issueFilterLaber[item] || item}
              </Text>
            )}
          />
        </View>
        <SearchInput
          value={searchQuery}
          onChangeText={handleSearchChange}
          error={isFilterError ? 'An error occured while searching' : undefined}
        />
        <IssueCards
          issues={filteredIssues}
          onIssuePress={handleIssuePress}
          isFetching={isFetching}
          onRefresh={refetch}
          isError={isQueryError || isFilterError}
        />
      </View>
      <LinearGradient
        start={{ x: 0, y: 1 }}
        end={{ x: 0, y: 0 }}
        colors={[theme.colors.card, `${theme.colors.card}00`]}
        style={[styles.shadowGradient, { height: 10 + bottom }]}
        pointerEvents="none"
      />
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
      marginTop: spacing.xs,
      padding: spacing.lg,
      paddingTop: 22,
    },
    titleContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: spacing.xs,
    },
    title: {
      ...typography.variants.subtitle2,
      color: colors.dark,
    },
    dateText: {
      ...typography.variants.bodyRegular,
      color: colors.dark80,
    },
    counterText: {
      ...typography.variants.display1,
      color: colors.text,
    },
    statusIndicator: {
      height: 8,
      width: '100%',
      marginTop: spacing.lg,
    },
    summaryCardsContainer: {
      flexDirection: 'row',
      marginTop: spacing.lg,
      gap: 10,
    },
    listContainer: {
      flex: 1,
      backgroundColor: colors.card,
      paddingHorizontal: spacing.lg,
      paddingTop: spacing.xxl,
      marginTop: spacing.sm,
      borderTopLeftRadius: 16,
      borderTopRightRadius: 16,
    },
    listHeader: {
      marginBottom: spacing.md,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    listTitle: {
      ...typography.variants.header2,
      color: colors.dark,
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
      ...typography.variants.bodyTab,
      color: colors.dark80,
      paddingHorizontal: 4,
    },
    issueStatusTextActive: {
      ...typography.variants.body2,
      color: colors.dark,
    },
    shadowGradient: {
      position: 'absolute',
      left: 0,
      right: 0,
      bottom: 0,
    },
  });
};

export default IssuesScreen;
