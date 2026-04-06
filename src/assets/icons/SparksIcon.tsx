import { FC } from 'react';
import Svg, { Path } from 'react-native-svg';

interface IProps {
  width?: number;
  height?: number;
  fill?: string;
  stroke?: string;
}

const SparksIcon: FC<IProps> = ({
  width = 20,
  height = 20,
  fill = 'none',
  stroke = '#6F6F6F',
}) => (
  <Svg width={width} height={height} viewBox="0 0 20 20" fill={fill}>
    <Path
      d="M6.66663 12.5001C10.7291 12.5001 12.5 10.7909 12.5 6.66675C12.5 10.7909 14.2583 12.5001 18.3333 12.5001C14.2583 12.5001 12.5 14.2584 12.5 18.3334C12.5 14.2584 10.7291 12.5001 6.66663 12.5001ZM1.66663 5.41675C4.27829 5.41675 5.41663 4.31841 5.41663 1.66675C5.41663 4.31841 6.54746 5.41675 9.16663 5.41675C6.54746 5.41675 5.41663 6.54758 5.41663 9.16675C5.41663 6.54758 4.27829 5.41675 1.66663 5.41675Z"
      stroke={stroke}
      strokeWidth="1.25"
      strokeLinejoin="round"
    />
  </Svg>
);

export default SparksIcon;
