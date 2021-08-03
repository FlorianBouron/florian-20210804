import { useEffect, useRef } from 'react';
import SocketState from '../enums/socket';
import { marketType } from '../constants/markets';
import { messageType } from '../types/message';

type useSocketProps = {
  url: string;
  message: messageType;
  group: number;
  onError: (_message: string) => void;
  onMessage: (res: MessageEvent) => void;
};

type useSocketReturn = {
  closeSocket: () => void;
};

export default function useSocket({
  url,
  message,
  onError,
  onMessage,
  group,
}: useSocketProps): useSocketReturn {
  const socketRef = useRef<WebSocket>();
  const currentProduct = useRef<marketType[]>();

  const closeSocket = (): void => {
    try {
      if (
        socketRef.current
        && socketRef.current.readyState === (SocketState.OPEN || SocketState.CONNECTING)
      ) {
        socketRef.current.send(
          JSON.stringify({
            ...message,
            ...{
              product_ids: currentProduct.current,
              event: 'unsubscribe',
            },
          }),
        );
      }
    } catch {
      onError('Failed to close the connection');
    }
  };

  useEffect(() => {
    closeSocket();
    try {
      socketRef.current = new WebSocket(url);
      currentProduct.current = message.product_ids;

      socketRef.current.onerror = () => {
        onError('Something went wrong');
      };

      // eslint-disable-next-line func-names
      socketRef.current.onopen = function () {
        this.send(JSON.stringify({ ...message, ...{ event: 'subscribe' } }));

        this.onmessage = (res: MessageEvent) => {
          onMessage(res);
        };
      };
    } catch (_) {
      onError('Impossible to connect');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url, message.product_ids[0], group]);

  return {
    closeSocket,
  };
}
