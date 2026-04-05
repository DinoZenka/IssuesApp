import React, { memo } from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import { useAppTheme } from '@src/utils/theme';

interface Props {
  closedCount: number;
  openCount: number;
  style?: ViewStyle;
}

const IssueStatusIndicator: React.FC<Props> = ({
  closedCount = 0,
  openCount = 0,
  style,
}) => {
  const theme = useAppTheme();

  const total = closedCount + openCount;
  const styles = createStyles(theme);

  return (
    <View style={[styles.container, style]}>
      {total > 0 && (
        <>
          <View
            style={[
              styles.segment,
              styles.segmentClosed,
              { flex: closedCount },
            ]}
          />
          <View
            style={[styles.segment, styles.segmentOpen, { flex: openCount }]}
          />
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
    closedSegment: {
      borderTopLeftRadius: 2,
      borderBottomLeftRadius: 2,
    },
  });
};

export default memo(IssueStatusIndicator);
