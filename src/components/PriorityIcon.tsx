import {
  PriorityHighIcon,
  PriorityLowIcon,
  PriorityMediumIcon,
} from '@src/assets/icons';
import { IssuePriority } from '@src/types/issue';
import { FC } from 'react';

interface IProps {
  priority: IssuePriority;
}

const PriorityIcon: FC<IProps> = ({ priority }) => {
  switch (priority) {
    case 'low':
      return <PriorityLowIcon />;
    case 'medium':
      return <PriorityMediumIcon />;
    case 'high':
      return <PriorityHighIcon />;
    default:
      return null;
  }
};

export default PriorityIcon;
