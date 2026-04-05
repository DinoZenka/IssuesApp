import { FC } from 'react';
import Svg, { Path } from 'react-native-svg';

interface IProps {
  width?: number;
  height?: number;
  fill?: string;
  stroke?: string;
}

const CrossIcon: FC<IProps> = ({
  width = 20,
  height = 20,
  fill = 'none',
  stroke = 'none',
}) => (
  <Svg width={width} height={height} viewBox="0 0 21 21" fill={fill}>
    <Path
      d="m15.5 15.5l-10-10zm0-10l-10 10"
      fill={stroke}
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export default CrossIcon;
