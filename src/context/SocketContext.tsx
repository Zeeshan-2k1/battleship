import React, { createContext, useEffect, useState } from 'react';
import toast from 'react-simple-toasts';
import { Socket } from 'socket.io-client';
import { useDispatch } from 'react-redux';

import { socketBuilder } from 'utils/socket';
import {
  LS_PLAYER_NAME_KEY,
  LS_ROOM_KEY,
  SOCKET_EVENTS,
} from 'utils/constants';
import { getShipNameByColor } from 'utils/helper/shipHelper';

import { damage } from 'store/reducers/shipsState';
import {
  gameLose,
  gameWon,
  myTurn,
  notMyTurn,
  startGame,
} from 'store/reducers/globalState';

export interface ISocketContextType {
  playerName: string;
  roomId: string;
  socket: Socket | null;
  setPlayerName: React.Dispatch<React.SetStateAction<string>>;
  setRoomId: React.Dispatch<React.SetStateAction<string>>;
}

export const SocketContext = createContext<ISocketContextType | null>(null);

export const SocketProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const dispatch = useDispatch();
  const savedPlayerName = window.localStorage.getItem(LS_PLAYER_NAME_KEY);
  const savedRoomId = window.localStorage.getItem(LS_ROOM_KEY);

  const [playerName, setPlayerName] = useState<string>(savedPlayerName ?? '');
  const [roomId, setRoomId] = useState<string>(savedRoomId ?? '');

  const socket = socketBuilder({ roomId, playerName });

  useEffect(() => {
    socket?.on(SOCKET_EVENTS.NOTIFICATION, (data) => {
      toast(data.message);
    });

    socket?.on(SOCKET_EVENTS.ATTACK, (color: string) => {
      try {
        const shipName = getShipNameByColor(color);
        if (!shipName) {
          throw new Error('Ship details not found. Something went wrong!');
        }
        dispatch(damage(shipName));
        toast(`Your ${shipName} is attacked. Be careful`);
      } catch (error: any) {
        console.log(error);
        toast(error);
      }
    });

    socket?.on(SOCKET_EVENTS.WON, () => {
      toast('You Won!!');
      dispatch(gameWon());
    });

    socket?.on(SOCKET_EVENTS.LOSE, () => {
      toast('You Lost!!');
      dispatch(gameLose());
    });

    socket?.on(SOCKET_EVENTS.START, () => {
      toast('Game started, waiting for your turn');
      dispatch(startGame());
    });

    socket?.on(SOCKET_EVENTS.TURN, () => {
      toast('Your turn');
      console.log('triggred turn');
      dispatch(myTurn());
    });

    socket?.on(SOCKET_EVENTS.NOT_TURN, () => {
      console.log('triggred not turn');
      dispatch(notMyTurn());
    });

    return () => {
      socket?.disconnect();
    };
  }, [socket, dispatch]);

  return (
    <SocketContext.Provider
      value={{
        playerName,
        roomId,
        socket,
        setPlayerName,
        setRoomId,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};
