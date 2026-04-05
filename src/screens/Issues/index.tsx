import React, { useCallback, useMemo, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '@src/navigation/types';
import { useIssues } from '@src/hooks/useIssues';
import IssueCards from '@src/components/IssueCards';
import IssueStatusIndicator from '@src/components/IssueStatusIndicator';
import SegmentedControl from '@src/components/SegmentedControl';
import SearchInput from '@src/components/SearchInput';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAppTheme } from '@src/utils/theme';
import { format } from 'date-fns';
import IssueSummaryCard from '@src/components/IssueSummaryCard';

type Props = NativeStackScreenProps<RootStackParamList, 'Issues'>;

const FILTER_VALUES = ['All', 'Closed', 'Open'];

const IssuesScreen: React.FC<Props> = ({ navigation }) => {
  const theme = useAppTheme();
  const { data: issues, isLoading, isError, refetch, isFetching } = useIssues();

  console.log('DATA: ', isError, issues);
  const [filterIndex, setFilterIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchError, setSearchError] = useState<string | undefined>();

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
        .includes(searchQuery.toLowerCase());

      return matchesStatus && matchesSearch;
    });
  }, [issues, filterIndex, searchQuery]);

  const handleSearchChange = (text: string) => {
    setSearchQuery(text);
    if (text.toLowerCase().includes('error')) {
      setSearchError('An error occured while searching');
    } else {
      setSearchError(undefined);
    }
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

  if (isError) {
    return (
      <View style={styles.center}>
        <Text style={[styles.message, styles.errorText]}>
          Failed to load issues.
        </Text>
        <TouchableOpacity style={styles.retryButton} onPress={() => refetch()}>
          <Text style={styles.retryText}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['bottom', 'top']}>
      <View style={styles.header}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Issues</Text>
          <Text style={styles.dateText}>{currentDay}</Text>
        </View>
        <Text style={styles.counterText}>{issues?.length || '0'}</Text>
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
                {item}
              </Text>
            )}
          />
        </View>
        <SearchInput
          value={searchQuery}
          onChangeText={handleSearchChange}
          error={searchError}
        />
        <IssueCards
          issues={filteredIssues}
          onIssuePress={handleIssuePress}
          isFetching={isFetching}
          onRefresh={refetch}
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
      marginTop: spacing.xs,
      padding: spacing.lg,
      backgroundColor: 'transparent',
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
      paddingHorizontal: 8,
      paddingVertical: 7,
    },
    issueStatusTextActive: {
      ...typography.variants.body2,
      color: colors.dark,
    },
  });
};

export default IssuesScreen;
