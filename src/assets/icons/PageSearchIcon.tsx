import { FC } from 'react';
import Svg, { Path } from 'react-native-svg';

interface IProps {
  width?: number;
  height?: number;
  fill?: string;
  stroke?: string;
}

const PageSearchIcon: FC<IProps> = ({
  width = 48,
  height = 48,
  fill = 'none',
  stroke = '#919191',
}) => (
  <Svg width={width} height={height} viewBox="0 0 48 48" fill={fill}>
    <Path
      d="M40 24V11.498C40.0001 11.3401 39.9691 11.1838 39.9087 11.0379C39.8483 10.8921 39.7597 10.7596 39.648 10.648L33.352 4.352C33.1272 4.12689 32.8222 4.00028 32.504 4H9.2C8.88174 4 8.57652 4.12643 8.35147 4.35147C8.12643 4.57652 8 4.88174 8 5.2V42.8C8 43.1183 8.12643 43.4235 8.35147 43.6485C8.57652 43.8736 8.88174 44 9.2 44H22M16 20H32M16 12H24M16 28H22M41 41L44 44"
      stroke={stroke}
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M32 4V10.8C32 11.1183 32.1264 11.4235 32.3515 11.6485C32.5765 11.8736 32.8817 12 33.2 12H40M30 36C30 37.5913 30.6321 39.1174 31.7574 40.2426C32.8826 41.3679 34.4087 42 36 42C37.5913 42 39.1174 41.3679 40.2426 40.2426C41.3679 39.1174 42 37.5913 42 36C42 34.4087 41.3679 32.8826 40.2426 31.7574C39.1174 30.6321 37.5913 30 36 30C34.4087 30 32.8826 30.6321 31.7574 31.7574C30.6321 32.8826 30 34.4087 30 36Z"
      stroke={stroke}
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export default PageSearchIcon;
