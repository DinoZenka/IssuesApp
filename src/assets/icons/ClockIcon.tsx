import { FC } from 'react';
import Svg, { Path } from 'react-native-svg';

interface IProps {
  width?: number;
  height?: number;
  fill?: string;
  stroke?: string;
}

const ClockIcon: FC<IProps> = ({
  width = 20,
  height = 20,
  fill = 'none',
  stroke = '#919191',
}) => (
  <Svg width={width} height={height} viewBox="0 0 20 20" fill={fill}>
    <Path
      d="M10 5.00024V10.0002H15"
      stroke={stroke}
      strokeWidth="1.25"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M10.0001 18.3334C14.6026 18.3334 18.3334 14.6026 18.3334 10.0001C18.3334 5.39758 14.6026 1.66675 10.0001 1.66675C5.39758 1.66675 1.66675 5.39758 1.66675 10.0001C1.66675 14.6026 5.39758 18.3334 10.0001 18.3334Z"
      stroke={stroke}
      strokeWidth="1.25"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export default ClockIcon;
