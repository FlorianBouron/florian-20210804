import { useState } from 'react';
import { Typography, Select, MenuItem } from '@material-ui/core';

type HeaderProps = {
  market: string;
};

export default function Header({ market }: HeaderProps): JSX.Element {
  const groups = market === 'XBTUSD' ? [0.5, 1, 2.5] : [0.05, 0.1, 0.25];
  const [group, setGroup] = useState(groups[0]);

  const handleChange = (e: React.ChangeEvent<{ value: unknown }>): void => {
    setGroup(Number(e.target.value));
  };

  return (
    <>
      <Typography display="inline">Order book</Typography>
      <Typography display="inline">{market}</Typography>
      <Select value={group} onChange={handleChange}>
        {groups.map((groupChoice: number) => (
          <MenuItem key={groupChoice} value={groupChoice}>
            {`Group ${groupChoice}`}
          </MenuItem>
        ))}
      </Select>
    </>
  );
}
