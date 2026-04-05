import React, { useCallback, memo, FC } from 'react';
import { FlatList, StyleSheet, View, Text, ListRenderItem } from 'react-native';
import { Issue } from '@src/types/issue';
import IssueItem from './IssueItem';
import { useAppTheme } from '@src/utils/theme';
import ListEmptyComponent from './ListEmptyComponent';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface IProps {
  issues: Issue[];
  onIssuePress: (id: string) => void;
  isFetching: boolean;
  onRefresh: () => void;
  isError?: boolean;
}

const EMPTY_LIST_TITLE = 'No issues yet';
const ERROR_SEARCH_TITLE = 'No issues';
const EMPTY_LIST_DESCRIPTION =
  'You’re all set — there are no open or closed issues right now. \nNew issues will appear here as soon as they’re created.';

const IssueCards: FC<IProps> = ({
  issues,
  onIssuePress,
  isFetching,
  onRefresh,
  isError = false,
}) => {
  const theme = useAppTheme();
  const { bottom } = useSafeAreaInsets();

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
        <ListEmptyComponent
          title={isError ? ERROR_SEARCH_TITLE : EMPTY_LIST_TITLE}
          description={EMPTY_LIST_DESCRIPTION}
        />
      }
      ListFooterComponent={<View style={{ height: bottom }} />}
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
  });
};

export default memo(IssueCards);
