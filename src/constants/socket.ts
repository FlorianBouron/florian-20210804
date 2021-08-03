import { XBTUSD } from './markets';

export const endpoint = 'wss://www.cryptofacilities.com/ws/v1';
export const message = {
  feed: 'book_ui_1',
  product_ids: [XBTUSD],
};
