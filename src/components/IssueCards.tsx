import React, { useCallback, memo } from 'react';
import { FlatList, StyleSheet, View, Text, ListRenderItem } from 'react-native';
import { Issue } from '@src/types/issue';
import IssueItem from './IssueItem';
import { useAppTheme } from '@src/utils/theme';

interface Props {
  issues: Issue[];
  onIssuePress: (id: string) => void;
  isFetching: boolean;
  onRefresh: () => void;
}

const IssueCards: React.FC<Props> = ({
  issues,
  onIssuePress,
  isFetching,
  onRefresh,
}) => {
  const theme = useAppTheme();

  const renderItem: ListRenderItem<Issue> = useCallback(
    ({ item }) => <IssueItem issue={item} onPress={onIssuePress} />,
    [onIssuePress],
  );

  const keyExtractor = useCallback((item: Issue) => item.id, []);

  const styles = createStyles(theme);

  return (
    <FlatList
      data={issues}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      contentContainerStyle={styles.listContent}
      ListEmptyComponent={
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No issues found.</Text>
        </View>
      }
      refreshing={isFetching}
      onRefresh={onRefresh}
      showsVerticalScrollIndicator={false}
    />
  );
};

const createStyles = (theme: ReturnType<typeof useAppTheme>) => {
  const { colors, typography } = theme;

  return StyleSheet.create({
    listContent: {
      flexGrow: 1,
      backgroundColor: colors.card,
    },
    emptyContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    emptyText: {
      fontSize: typography.fontSize.md,
      color: colors.textSecondary,
    },
  });
};

export default memo(IssueCards);
