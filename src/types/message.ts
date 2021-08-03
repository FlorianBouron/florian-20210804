import { marketType } from './market';

export type messageType = {
  feed: string;
  product_ids: marketType[];
};
