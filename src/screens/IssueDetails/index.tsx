import React, { useCallback, useMemo, useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
  RefreshControl,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '@src/navigation/types';
import { useIssue, useUpdateIssue } from '@src/hooks/useIssues';
import { useAppTheme } from '@src/utils/theme';
import { useOnlineStatus } from '@src/hooks/useOnlineStatus';
import {
  SafeAreaView,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import { format } from 'date-fns';
import {
  ArrowLeft,
  ClockIcon,
  SparksIcon,
  TaskListIcon,
} from '@src/assets/icons';
import { IssuePriority, IssueStatus } from '@src/types/issue';
import SegmentedControl from '@src/components/SegmentedControl';
import PriorityIcon from '@src/components/PriorityIcon';
import { issuePriorityLabel, issueStatusLabel } from '@src/utils/typeLabels';
import StatusIcon from '@src/components/StatusIcon';
import IssueDetailsBadge, { OfflineBadge } from '@src/components/Badge';
import LinearGradient from 'react-native-linear-gradient';

type Props = NativeStackScreenProps<RootStackParamList, 'IssueDetails'>;

const PRIORITIES: IssuePriority[] = ['low', 'medium', 'high'];
const STATUSES: IssueStatus[] = ['closed', 'open'];

const IssueDetailsScreen: React.FC<Props> = ({ route, navigation }) => {
  const { ID } = route.params;
  const theme = useAppTheme();
  const { colors } = theme;

  const {
    data: issue,
    isLoading,
    isError,
    isFetching,
    isPending,
    refetch,
  } = useIssue(ID);
  const { mutate: updateIssue, isPending: isUpdating } = useUpdateIssue();
  const isOnline = useOnlineStatus();

  const [priority, setPriority] = useState<IssuePriority | undefined>();
  const [status, setStatus] = useState<IssueStatus | undefined>(issue?.status);

  const { top } = useSafeAreaInsets();

  useEffect(() => {
    if (issue) {
      setPriority(issue.priority);
      setStatus(issue.status);
    }
  }, [issue]);

  const handleBack = () => {
    navigation.goBack();
  };

  const handleRefresh = () => {
    refetch();
  };

  const handleSave = useCallback(() => {
    if (!priority || !status) return;
    updateIssue({ id: ID, updates: { priority, status } });
  }, [ID, priority, status, updateIssue]);

  const formattedDate = useMemo(() => {
    if (!issue?.updatedAt) return '';
    try {
      return format(new Date(issue.updatedAt), 'hh:mm a, dd MMM yyyy');
    } catch {
      return issue.updatedAt;
    }
  }, [issue?.updatedAt]);

  const styles = createStyles(theme);

  const isChanged = priority !== issue?.priority || status !== issue?.status;

  if (isLoading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  if (isError || !issue) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>Failed to load issue details.</Text>
        <TouchableOpacity style={styles.backButton} onPress={handleBack}>
          <Text style={styles.backText}>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <View style={[styles.topInset, { height: top }]} />
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.backIconWrapper}>
          <ArrowLeft />
          <Text style={styles.headerBackText}>Go Back</Text>
        </TouchableOpacity>

        <IssueDetailsBadge isLoading={isFetching || isUpdating} />
      </View>

      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={isPending}
            onRefresh={handleRefresh}
            tintColor={colors.primary}
            colors={[colors.primary]}
          />
        }
      >
        <View style={styles.contentWrapper}>
          <View style={styles.titleRow}>
            <Text style={styles.title}>{issue.title}</Text>
          </View>

          <View style={styles.updatedRow}>
            <ClockIcon />
            <Text style={styles.updatedText}>Updated on: {formattedDate}</Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.segmentSection}>
            <View style={styles.segmentTitleWrapper}>
              <SparksIcon />
              <Text style={styles.segmentTitle}>Priority</Text>
            </View>
            <SegmentedControl
              fullWidth
              values={PRIORITIES}
              selectedValue={priority}
              onSelectedValueChange={setPriority}
              renderItem={(item, isSelected) => (
                <View style={styles.segmentContent}>
                  <PriorityIcon priority={item} />
                  <Text
                    style={[
                      styles.segmentText,
                      isSelected && styles.segmentTextActive,
                    ]}
                  >
                    {issuePriorityLabel[item] || item}
                  </Text>
                </View>
              )}
            />
          </View>

          <View style={styles.divider} />

          <View style={styles.segmentSection}>
            <View style={styles.segmentTitleWrapper}>
              <TaskListIcon />
              <Text style={styles.segmentTitle}>Status</Text>
            </View>
            <SegmentedControl
              fullWidth
              values={STATUSES}
              selectedValue={status}
              onSelectedValueChange={setStatus}
              renderItem={(item, isSelected) => (
                <View style={styles.segmentContent}>
                  <StatusIcon status={item} />
                  <Text
                    style={[
                      styles.segmentText,
                      isSelected && styles.segmentTextActive,
                    ]}
                  >
                    {issueStatusLabel[item] || item}
                  </Text>
                </View>
              )}
            />
          </View>
        </View>
        <View style={styles.descriptionWrapper}>
          <Text style={styles.descriptionTitle}>Description</Text>
          <Text style={styles.descriptionBody}>{issue.description}</Text>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <LinearGradient
          start={{ x: 0, y: 1 }}
          end={{ x: 0, y: 0 }}
          colors={[theme.colors.background, `${theme.colors.background}00`]}
          style={[styles.shadowGradient]}
          pointerEvents="none"
        />
        <TouchableOpacity
          style={[
            styles.saveButton,
            (!isChanged || isUpdating) && styles.saveButtonDisabled,
          ]}
          onPress={handleSave}
          disabled={!isChanged || isUpdating}
        >
          {isUpdating ? (
            <ActivityIndicator color={colors.card} />
          ) : (
            <Text style={styles.saveButtonText}>Save Changes</Text>
          )}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const createStyles = (theme: ReturnType<typeof useAppTheme>) => {
  const { colors, spacing, typography } = theme;
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    topInset: {
      backgroundColor: colors.card,
    },
    center: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: spacing.lg,
    },
    header: {
      backgroundColor: colors.card,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: spacing.lg,
      paddingTop: 22,
    },
    headerBackText: {
      ...typography.variants.bodyRegular,
      color: colors.purple60,
    },
    backIconWrapper: {
      padding: spacing.xs,
      flexDirection: 'row',
      alignItems: 'center',
      gap: spacing.sm,
    },
    contentWrapper: {
      backgroundColor: colors.card,
      paddingHorizontal: spacing.lg,
      paddingBottom: spacing.xxl,
      borderBottomLeftRadius: 16,
      borderBottomRightRadius: 16,
    },
    titleRow: {
      marginBottom: spacing.sm,
    },
    title: {
      ...typography.variants.header1,
      color: colors.dark,
    },
    updatedRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: spacing.xs,
      marginTop: spacing.md,
      marginBottom: spacing.xs,
    },
    updatedText: {
      ...typography.variants.bodyRegular,
      color: colors.dark80,
    },
    descriptionWrapper: {
      padding: spacing.lg,
      paddingTop: spacing.xxl,
    },
    descriptionTitle: {
      ...typography.variants.subtitle1,
      color: colors.dark,
      marginBottom: spacing.lg,
    },
    descriptionBody: {
      ...typography.variants.bodyLight,
      color: colors.dark80,
    },
    divider: {
      height: 1,
      width: '100%',
      backgroundColor: colors.border,
      marginVertical: spacing.lg,
    },
    footer: {
      backgroundColor: colors.background,
      paddingHorizontal: spacing.lg,
      paddingBottom: 20,
    },
    saveButton: {
      backgroundColor: colors.primary,
      height: 50,
      borderRadius: 12,
      justifyContent: 'center',
      alignItems: 'center',
    },
    saveButtonDisabled: {
      opacity: 0.5,
    },
    saveButtonText: {
      color: colors.card,
      fontSize: typography.fontSize.md,
      fontWeight: typography.fontWeight.bold,
    },
    errorText: {
      fontSize: typography.fontSize.md,
      color: colors.danger,
      marginBottom: spacing.lg,
    },
    backButton: {
      paddingHorizontal: spacing.xl,
      paddingVertical: spacing.md,
      backgroundColor: colors.primary,
      borderRadius: 8,
    },
    backText: {
      color: colors.card,
      fontWeight: 'bold',
    },
    segmentContent: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: spacing.sm,
    },
    segmentText: {
      ...typography.variants.bodyRegular,
      color: colors.dark80,
    },
    segmentTextActive: {
      ...typography.variants.body2,
      color: colors.dark,
    },
    segmentSection: {
      gap: spacing.sm,
    },
    segmentTitleWrapper: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      gap: spacing.sm,
    },
    segmentTitle: {
      ...typography.variants.bodyRegular,
      color: colors.dark80,
    },
    shadowGradient: {
      position: 'absolute',
      left: 0,
      right: 0,
      top: -20,
      height: 20,
    },
  });
};

export default IssueDetailsScreen;
