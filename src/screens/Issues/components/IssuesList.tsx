import React, { useCallback, FC } from 'react';
import { FlatList, StyleSheet, View, ListRenderItem } from 'react-native';
import { Issue } from '@src/types/issue';
import { useAppTheme, useThemedStyles } from '@src/utils/theme';
import ListEmpty from './ListEmpty';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { SKELETON_ISSUES_LIST } from '@src/utils/constants';
import LinearGradient from 'react-native-linear-gradient';
import ListItem, { ListItemSkeleton } from './ListItem';

interface IProps {
  issues: Issue[];
  onIssuePress: (id: string) => void;
  isFetching: boolean;
  onRefresh: () => void;
  isError?: boolean;
  showSkeleton?: boolean;
}

const EMPTY_LIST_TITLE = 'No issues yet';
const ERROR_SEARCH_TITLE = 'No issues';
const EMPTY_LIST_DESCRIPTION =
  'You’re all set — there are no open or closed issues right now. \nNew issues will appear here as soon as they’re created.';

const IssuesList: FC<IProps> = ({
  issues,
  onIssuePress,
  isFetching,
  onRefresh,
  isError = false,
}) => {
  const theme = useAppTheme();
  const { bottom } = useSafeAreaInsets();

  const renderItem: ListRenderItem<Issue> = useCallback(
    ({ item }) => <ListItem issue={item} onPress={onIssuePress} />,
    [onIssuePress],
  );

  const keyExtractor = useCallback((item: Issue) => item.id, []);

  const styles = useThemedStyles(createStyles);

  return (
    <View style={styles.container}>
      <FlatList
        data={issues}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        contentContainerStyle={styles.listContent}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag"
        ListEmptyComponent={
          <ListEmpty
            title={isError ? ERROR_SEARCH_TITLE : EMPTY_LIST_TITLE}
            description={EMPTY_LIST_DESCRIPTION}
          />
        }
        ListFooterComponent={<View style={{ height: bottom }} />}
        refreshing={isFetching}
        onRefresh={onRefresh}
        showsVerticalScrollIndicator={false}
      />
      <LinearGradient
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        colors={[theme.colors.card, `${theme.colors.card}00`]}
        style={styles.topShadowGradient}
        pointerEvents="none"
      />
    </View>
  );
};

export const IssuesCardsSkeleton = () => {
  const { bottom } = useSafeAreaInsets();
  const theme = useAppTheme();

  const styles = useThemedStyles(createStyles);
  return (
    <View style={styles.container}>
      <FlatList
        data={SKELETON_ISSUES_LIST}
        contentContainerStyle={styles.listContent}
        accessible={false}
        accessibilityElementsHidden
        importantForAccessibility="no-hide-descendants"
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag"
        renderItem={({ item }) => (
          <ListItemSkeleton priority={item.priority} status={item.status} />
        )}
        ListFooterComponent={<View style={{ height: bottom }} />}
        showsVerticalScrollIndicator={false}
      />
      <LinearGradient
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        colors={[theme.colors.card, `${theme.colors.card}00`]}
        style={styles.topShadowGradient}
        pointerEvents="none"
      />
    </View>
  );
};

const createStyles = (theme: ReturnType<typeof useAppTheme>) => {
  const { colors, spacing } = theme;

  return StyleSheet.create({
    container: {
      flex: 1,
    },
    listContent: {
      flexGrow: 1,
      backgroundColor: colors.card,
      gap: spacing.lg,
      paddingTop: spacing.md,
    },
    topShadowGradient: {
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
      height: spacing.md,
    },
  });
};

export default IssuesList;
