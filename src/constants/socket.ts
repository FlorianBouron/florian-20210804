import { XBTUSD } from './markets';
import { messageType } from '../types/message';

export const endpoint = 'wss://www.cryptofacilities.com/ws/v1';
export const message: messageType = {
  feed: 'book_ui_1',
  product_ids: [XBTUSD],
};
