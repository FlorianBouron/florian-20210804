import { Typography, Select, MenuItem } from '@material-ui/core';
import { useGroup } from '../../../contexts/GroupContext';
import { XBTUSD } from '../../../constants/markets';
import { XBTUSD_GROUP, ETHUSD_GROUP } from '../../../constants/groups';
import { marketType } from '../../../types/market';

type HeaderProps = {
  market: marketType;
  isSocketClosed: boolean;
};

export default function Header({ market, isSocketClosed }: HeaderProps): JSX.Element {
  const groups = market === XBTUSD ? XBTUSD_GROUP : ETHUSD_GROUP;
  const { group, updateGroup } = useGroup();

  const handleChange = (e: React.ChangeEvent<{ value: unknown }>): void => {
    updateGroup(Number(e.target.value));
  };

  return (
    <>
      <Typography display="inline">Order book</Typography>
      <Typography display="inline">{market}</Typography>
      <Select value={group} onChange={handleChange} disabled={isSocketClosed}>
        {groups.map((groupChoice: number) => (
          <MenuItem key={groupChoice} value={groupChoice}>
            {`Group ${groupChoice}`}
          </MenuItem>
        ))}
      </Select>
    </>
  );
}
