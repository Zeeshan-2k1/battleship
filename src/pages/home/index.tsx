import { motion } from 'framer-motion';
import { IoSettings } from 'react-icons/io5';
import { useContext, useEffect } from 'react';
import { generate } from 'random-words';

import { EPage, SUBTITLE, TITLE, SOCKET_EVENTS } from 'utils/constants';

import { useAppDispatch, useGlobalStateSelector } from 'hooks';

import {
  closeJoinGameModal,
  openJoinGameModal,
  openShipSelectorModal,
  switchToDashboard,
  switchToGame,
  switchToRules,
  switchToSettings,
} from 'store/reducers/globalState';

import Wrapper from 'components/wrapper';
import ModalContainer from 'components/modal';
import Tooltip from 'components/tooltip';
import Button from 'components/button';

import { ISocketContextType, SocketContext } from 'context/SocketContext';

function Home(): JSX.Element {
  const dispatch = useAppDispatch();
  const { toGo, isJoinGameModalOpen } = useGlobalStateSelector();
  const { playerName, roomId, setPlayerName, setRoomId, socket } = useContext(
    SocketContext,
  ) as ISocketContextType;

  const handleStartGame = (): void => {
    dispatch(openJoinGameModal());
  };

  const handleJoinGame = (): void => {
    socket?.connect();
  };

  useEffect(() => {
    socket?.on(SOCKET_EVENTS.CONNECTION_SUCCESS, (data) => {
      if (data.isConnected) {
        dispatch(switchToGame());
        dispatch(closeJoinGameModal());
        dispatch(openShipSelectorModal());
      }
    });
  }, [socket, dispatch]);

  const generateRoomId = (): void => {
    const stringArray = generate({
      exactly: 2,
      maxLength: 4,
      minLength: 4,
    }) as string[];
    setRoomId(stringArray.join('-'));
  };

  return (
    <>
      <Wrapper selectedPage={EPage.HOME} toGo={toGo}>
        <motion.div className="flex flex-col gap-20 justify-center items-center h-full">
          <motion.div className="text-center">
            <h1 className="text-9xl">{TITLE}</h1>
            <h2 className="text-2xl">{SUBTITLE}</h2>
          </motion.div>
          <motion.div className="flex flex-col gap-6 justify-center items-stretch">
            <Button onClick={handleStartGame}>Start Game!</Button>
            <Button onClick={() => dispatch(switchToDashboard())}>
              Dashboard
            </Button>
            <Button onClick={() => dispatch(switchToSettings())}>
              Settings
            </Button>
            <Button onClick={() => dispatch(switchToRules())}>Rules</Button>
          </motion.div>
        </motion.div>
        <motion.footer className="absolute w-full bottom-1">
          <div className="text-center p-2">
            <p>
              &copy; 2024 Zeeshan Ashraf. All rights reserved. This project is
              licensed under the{' '}
              <a
                href="https://opensource.org/licenses/MIT"
                rel="noreferrer"
                target="_blank"
                className="text-sky-500"
              >
                MIT License
              </a>
              .
            </p>
          </div>
        </motion.footer>
      </Wrapper>
      <ModalContainer isModelOpen={isJoinGameModalOpen}>
        <div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleJoinGame();
            }}
            className="flex flex-col gap-2"
          >
            <input
              className="border border-black px-2 py-4 rounded-sm text-xl outline-none"
              type="text"
              minLength={3}
              required
              placeholder="Name"
              value={playerName}
              onChange={({ target }) => setPlayerName(target.value)}
            />
            <div className="flex flex-nowrap w-full">
              <input
                className="border border-black px-2 py-4 rounded-r-none rounded-b-none rounded-sm text-xl border-r-0 outline-none"
                type="text"
                minLength={3}
                required
                placeholder="Room Id"
                value={roomId}
                onChange={({ target }) => setRoomId(target.value)}
              />
              <div
                onKeyDown={(e) => {
                  if (e.key === 'Enter') generateRoomId();
                }}
                aria-label="Generate Room Id"
                role="button"
                tabIndex={0}
                onClick={generateRoomId}
                className="border border-black text-center p-1 px-2 flex justify-center items-center cursor-pointer"
              >
                <Tooltip tooltipText="Generate Room Id" direction="left">
                  <IoSettings size={24} />
                </Tooltip>
              </div>
            </div>
            <Button
              disabled={!playerName?.length || !roomId?.length}
              type="submit"
            >
              Join Game
            </Button>
          </form>
        </div>
      </ModalContainer>
    </>
  );
}

export default Home;
