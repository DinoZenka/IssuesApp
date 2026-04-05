import { FC } from 'react';
import Svg, { Path } from 'react-native-svg';

interface IProps {
  width?: number;
  height?: number;
  fill?: string;
  stroke?: string;
}

const StatusOpenIcon: FC<IProps> = ({
  width = 20,
  height = 20,
  fill = 'none',
  stroke = '#5850EC',
}) => (
  <Svg width={width} height={height} viewBox="0 0 20 20" fill={fill}>
    <Path
      d="M10.0001 1.66675V5.00008M10.0001 15.0001V18.3334M18.3334 10.0001H15.0001M5.00008 10.0001H1.66675M4.10758 4.10758L6.46425 6.46425M13.5359 13.5359L15.8926 15.8926M15.8926 4.10758L13.5359 6.46425M6.46425 13.5359L4.10841 15.8917"
      stroke={stroke}
      strokeWidth="1.25"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export default StatusOpenIcon;
