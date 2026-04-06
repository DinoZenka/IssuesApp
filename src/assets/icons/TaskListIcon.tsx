import { FC } from 'react';
import Svg, { Path } from 'react-native-svg';

interface IProps {
  width?: number;
  height?: number;
  fill?: string;
  stroke?: string;
}

const TaskListIcon: FC<IProps> = ({
  width = 20,
  height = 20,
  fill = 'none',
  stroke = '#6F6F6F',
}) => (
  <Svg width={width} height={height} viewBox="0 0 20 20" fill={fill}>
    <Path
      d="M7.50008 5.00016H16.6667M3.16675 4.8335L3.83341 5.50016L5.50008 3.8335M3.16675 9.8335L3.83341 10.5002L5.50008 8.8335M3.16675 14.8335L3.83341 15.5002L5.50008 13.8335M7.50008 10.0002H16.6667M7.50008 15.0002H16.6667"
      stroke={stroke}
      strokeWidth="1.25"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export default TaskListIcon;
