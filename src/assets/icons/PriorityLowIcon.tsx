import { FC } from 'react';
import Svg, { ClipPath, Defs, G, Path, Rect } from 'react-native-svg';

interface IProps {
  width?: number;
  height?: number;
  fill?: string;
  stroke?: string;
}

const PriorityLowIcon: FC<IProps> = ({
  width = 20,
  height = 20,
  fill = 'none',
  stroke = '#329D47',
}) => (
  <Svg width={width} height={height} viewBox="0 0 20 20" fill={fill}>
    <G clip-path="url(#clip0_2001_157)">
      <Path
        d="M10.0001 13.3334L13.3334 10.0001M10.0001 13.3334L6.66675 9.86092M10.0001 13.3334V5.83342M9.64675 1.18675C9.7405 1.09312 9.86759 1.04053 10.0001 1.04053C10.1326 1.04053 10.2597 1.09312 10.3534 1.18675L18.8134 9.64675C18.9071 9.7405 18.9596 9.86759 18.9596 10.0001C18.9596 10.1326 18.9071 10.2597 18.8134 10.3534L10.3534 18.8134C10.2597 18.9071 10.1326 18.9596 10.0001 18.9596C9.86759 18.9596 9.7405 18.9071 9.64675 18.8134L1.18675 10.3534C1.09312 10.2597 1.04053 10.1326 1.04053 10.0001C1.04053 9.86759 1.09312 9.7405 1.18675 9.64675L9.64675 1.18675Z"
        stroke={stroke}
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </G>
    <Defs>
      <ClipPath id="clip0_2001_157">
        <Rect width={width} height={height} fill="white" />
      </ClipPath>
    </Defs>
  </Svg>
);

export default PriorityLowIcon;
