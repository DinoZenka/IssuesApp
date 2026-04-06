import { FC } from 'react';
import Svg, { Path } from 'react-native-svg';

interface IProps {
  width?: number;
  height?: number;
  fill?: string;
  stroke?: string;
}

const ArrowLeft: FC<IProps> = ({
  width = 20,
  height = 20,
  fill = 'none',
  stroke = '#5850EC',
}) => (
  <Svg width={width} height={height} viewBox="0 0 20 20" fill={fill}>
    <Path
      d="M17.5 10.0001H2.5M2.5 10.0001L9.58333 2.91675M2.5 10.0001L9.58333 17.0834"
      stroke={stroke}
      strokeWidth="1.25"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export default ArrowLeft;
