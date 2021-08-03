import { marketType } from '../constants/markets';

export type messageType = {
  feed: string;
  product_ids: marketType[];
};
