import React, { useContext, useState } from 'react';
import { initialGroupState } from '../../constants/group';

type contextType = {
  group: number;
  updateGroup: (group: number) => void;
};

const GroupContext = React.createContext<contextType>({
  group: initialGroupState,
  // eslint-disable-next-line max-len
  // eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/no-unused-vars
  updateGroup: (group: number) => {},
});

function useGroup(): contextType {
  return useContext(GroupContext);
}

const GroupProvider = ({ children }: { children: React.ReactNode }): JSX.Element => {
  const [group, setGroup] = useState(initialGroupState);

  const updateGroup = (newGroup: number): void => {
    setGroup(newGroup);
  };

  const value: contextType = {
    group,
    updateGroup,
  };

  return <GroupContext.Provider value={value}>{children}</GroupContext.Provider>;
};

export { GroupProvider, useGroup };
