import { StatusClosedIcon, StatusOpenIcon } from '@src/assets/icons';
import { IssueStatus } from '@src/types/issue';
import { FC } from 'react';

interface IProps {
  status: IssueStatus;
}

const StatusIcon: FC<IProps> = ({ status }) => {
  switch (status) {
    case 'open':
      return <StatusOpenIcon />;
    case 'closed':
      return <StatusClosedIcon />;
    default:
      return null;
  }
};

export default StatusIcon;
