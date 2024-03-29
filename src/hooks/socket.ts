import { useContext } from 'react';
import { useDispatch } from 'react-redux';
import toast from 'react-simple-toasts';

import { ISocketContextType, SocketContext } from 'context/SocketContext';

import { addAttackPosition, savePosition } from 'store/reducers/positionState';
import { closeShipSelectorModal } from 'store/reducers/globalState';

import { IAcknowledgement, SOCKET_EVENTS, TCoodrinates } from 'utils/constants';
import { getShipNameByColor } from 'utils/helper/shipHelper';
import { useGlobalStateSelector, usePositionStateSelector } from '.';

type TAttackParam = {
  i: number;
  j: number;
};

type TGameSocketHook = {
  buildFleet: () => void;
  attack: (args: TAttackParam) => void;
};

export const useGameSocket = (): TGameSocketHook => {
  const { socket } = useContext(SocketContext) as ISocketContextType;
  const dispatch = useDispatch();
  const { shipPositions } = usePositionStateSelector();
  const { isMyTurn } = useGlobalStateSelector();

  const buildFleet = (): void => {
    if (shipPositions?.length) {
      socket?.emit(
        SOCKET_EVENTS.SET_SHIP_POSITION,
        shipPositions,
        (res: IAcknowledgement) => {
          if (res.isSuccess) {
            dispatch(savePosition());
            dispatch(closeShipSelectorModal());
            toast('Your fleet is ready.');
          } else {
            toast(res?.message ?? "Couldn't set ship positions.");
          }
        },
      );
    } else {
      toast('Please select ship positions');
    }
  };

  const attack = ({ i, j }: TAttackParam): void => {
    if (!isMyTurn) {
      toast('Getting your ammunition ready. Please wait.');
      return;
    }

    socket?.emit('ATTACK', { i, j }, (res: IAcknowledgement) => {
      if (res.isSuccess) {
        const shipName = getShipNameByColor(res?.data);
        const attackCoordinate: TCoodrinates = { i, j, color: 'red' };
        dispatch(addAttackPosition([attackCoordinate]));
        toast(`Hit!! You hit enemy's ${shipName}.`);
      } else {
        const attackCoordinate: TCoodrinates = { i, j, color: 'green' };
        dispatch(addAttackPosition([attackCoordinate]));
        toast(`Oh, it's a miss`);
      }
    });
  };

  return { buildFleet, attack };
};
