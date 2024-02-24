import { io } from 'socket.io-client';

export const SERVER_URL =
  process.env.REACT_APP_SERVER_URL ?? 'http://localhost:3333';

export const socketBuilder = ({
  roomId,
  playerName,
}: {
  roomId: string;
  playerName: string;
}) => {
  if (roomId && playerName) {
    return io(SERVER_URL, {
      autoConnect: false,
      query: { roomId, playerName },
    });
  }

  return null;
};
