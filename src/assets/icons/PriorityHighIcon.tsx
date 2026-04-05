import { FC } from 'react';
import Svg, { ClipPath, Defs, G, Path, Rect } from 'react-native-svg';

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
  stroke = '#D40303',
}) => (
  <Svg width={width} height={height} viewBox="0 0 20 20" fill={fill}>
    <G clipPath="url(#clip0_2001_245)">
      <Path
        d="M10.0001 5.83342L13.3334 9.16675M10.0001 5.83342L6.66675 9.30592M10.0001 5.83342V13.3334M9.64675 1.18675C9.7405 1.09312 9.86759 1.04053 10.0001 1.04053C10.1326 1.04053 10.2597 1.09312 10.3534 1.18675L18.8134 9.64675C18.9071 9.7405 18.9596 9.86759 18.9596 10.0001C18.9596 10.1326 18.9071 10.2597 18.8134 10.3534L10.3534 18.8134C10.2597 18.9071 10.1326 18.9596 10.0001 18.9596C9.86759 18.9596 9.7405 18.9071 9.64675 18.8134L1.18675 10.3534C1.09312 10.2597 1.04053 10.1326 1.04053 10.0001C1.04053 9.86759 1.09312 9.7405 1.18675 9.64675L9.64675 1.18675Z"
        stroke={stroke}
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </G>
    <Defs>
      <ClipPath id="clip0_2001_245">
        <Rect width={width} height={height} fill="white" />
      </ClipPath>
    </Defs>
  </Svg>
);

export default ClockIcon;
