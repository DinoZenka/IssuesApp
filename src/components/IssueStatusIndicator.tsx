import React, { memo } from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import { useAppTheme } from '@src/utils/theme';
import { SKELETON_ISSUES } from '@src/utils/constants';

interface Props {
  closedCount: number;
  openCount: number;
  style?: ViewStyle;
  showSkeleton?: boolean;
}

const IssueStatusIndicator: React.FC<Props> = ({
  closedCount = 0,
  openCount = 0,
  style,
  showSkeleton = false,
}) => {
  const theme = useAppTheme();

  const closed = showSkeleton ? SKELETON_ISSUES.closed : closedCount;
  const open = showSkeleton ? SKELETON_ISSUES.open : openCount;

  const total = closed + open;
  const styles = createStyles(theme);
  const emptyLine = total < 1;

  return (
    <View style={[styles.container, style]}>
      {emptyLine && <View style={[styles.segment, styles.segmentEmpty]} />}
      {!emptyLine && (
        <>
          <View
            style={[styles.segment, styles.segmentClosed, { flex: closed }]}
          />
          <View style={[styles.segment, styles.segmentOpen, { flex: open }]} />
        </>
      )}
    </View>
  );
};

const createStyles = (theme: ReturnType<typeof useAppTheme>) => {
  const { colors } = theme;
  return StyleSheet.create({
    container: {
      flexDirection: 'row',
      height: 4,
      borderRadius: 2,
      overflow: 'hidden',
      gap: 2,
    },
    segment: {
      height: '100%',
      borderRadius: 14,
    },
    segmentClosed: {
      backgroundColor: colors.green80,
    },
    segmentOpen: {
      backgroundColor: colors.purple60,
    },
    segmentEmpty: {
      backgroundColor: colors.dark40,
      flex: 1,
    },
    closedSegment: {
      borderTopLeftRadius: 2,
      borderBottomLeftRadius: 2,
    },
  });
};

export default memo(IssueStatusIndicator);
