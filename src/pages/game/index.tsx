import { motion } from 'framer-motion';
import { FaInfo } from 'react-icons/fa6';
import { IoExit } from 'react-icons/io5';

import GridContainer from 'components/grid';
import Wrapper from 'components/wrapper';
import ModalContainer from 'components/modal';
import PositionSelectorContainer from 'components/positionSelector';
import CircleButton from 'components/button/circleButton';
import Button from 'components/button';
import BattleInfo from 'components/battleInfo/BattleInfo';

import {
  useAppDispatch,
  useGlobalStateSelector,
  usePositionStateSelector,
  useShipsStateSelector,
} from 'hooks';

import {
  EPage,
  LOSE_SUBTITLE,
  LOSE_TITLE,
  SHIPS,
  TOTAL_OCCUPIED_GRIDS,
  WON_SUBTITLE,
  WON_TITLE,
} from 'utils/constants';

import {
  notGameLose,
  notGameWon,
  openBattleInfo,
  openShipSelectorModal,
  switchToHome,
} from 'store/reducers/globalState';

import { useGameSocket } from 'hooks/socket';

const GameScreen = () => {
  const dispatch = useAppDispatch();
  const ships = useShipsStateSelector();
  const { shipPositions, attackPositions } = usePositionStateSelector();
  const {
    isShipSelectorModalOpen,
    isBattleInfoModelOpen,
    isMyTurn,
    isGameWon,
    isGameLose,
  } = useGlobalStateSelector();
  const { attack } = useGameSocket();

  return (
    <>
      <Wrapper toGo="left" selectedPage={EPage.GAME}>
        <motion.div className="absolute top-1/2 -translate-y-1/2 left-6 flex gap-8 items-start tra">
          <GridContainer onClick={attack} indexes={attackPositions} />
          <div className="flex flex-col justify-between gap-4">
            <GridContainer
              isAttackGrid={true}
              indexes={shipPositions}
              variant="sm"
            />
            <motion.div className={`border border-black`}>
              {Object.values(ships).map((ship) => {
                const name = ship.name;
                const color = SHIPS[name].color;
                return (
                  <div
                    className="flex justify-between items-center gap-2 p-2"
                    key={name}
                  >
                    <div>
                      <span
                        className="h-3 w-3 rounded-full"
                        style={{ backgroundColor: color }}
                      ></span>
                      <h4>{name}</h4>
                    </div>
                    <div className="flex gap-1">
                      {Array(ship.health)
                        .fill(0)
                        .map((x, index) => {
                          return (
                            <div
                              className="w-3 h-3 rounded-full"
                              style={{ backgroundColor: color }}
                              key={index}
                            ></div>
                          );
                        })}
                    </div>
                  </div>
                );
              })}
            </motion.div>
            {shipPositions.length === TOTAL_OCCUPIED_GRIDS ? (
              isMyTurn ? (
                <Button>Ready for Attack!</Button>
              ) : (
                <Button>Wait for your turn!</Button>
              )
            ) : (
              <Button onClick={() => dispatch(openShipSelectorModal())}>
                Set Ships Position
              </Button>
            )}
          </div>
        </motion.div>
        <motion.div className="absolute right-4 top-6 flex flex-col gap-4 items-end justify-center">
          <CircleButton
            onClick={() => dispatch(openBattleInfo())}
            define="Battle Info"
          >
            <FaInfo size={20} />
          </CircleButton>
        </motion.div>
        <motion.div className="absolute right-4 bottom-6 flex flex-col gap-4 items-center justify-center">
          <CircleButton onClick={() => dispatch(switchToHome())} define="Quit">
            <IoExit size={24} />
          </CircleButton>
        </motion.div>
      </Wrapper>
      <ModalContainer isModelOpen={isShipSelectorModalOpen}>
        <PositionSelectorContainer />
      </ModalContainer>
      <ModalContainer isModelOpen={isBattleInfoModelOpen}>
        <BattleInfo />
      </ModalContainer>
      <ModalContainer isModelOpen={isGameWon}>
        <motion.div className="text-center flex flex-col gap-20 items-center justify-center">
          <h1 className="text-9xl">{WON_TITLE}</h1>
          <h2 className="text-2xl">{WON_SUBTITLE}</h2>
          <Button
            onClick={() => {
              dispatch(notGameWon());
              dispatch(switchToHome());
            }}
          >
            Play Again
          </Button>
        </motion.div>
      </ModalContainer>
      <ModalContainer isModelOpen={isGameLose}>
        <motion.div className="text-center flex flex-col gap-20 items-center justify-center">
          <h1 className="text-9xl">{LOSE_TITLE}</h1>
          <h2 className="text-2xl">{LOSE_SUBTITLE}</h2>
          <Button
            onClick={() => {
              dispatch(notGameLose());
              dispatch(switchToHome());
            }}
          >
            Play Again
          </Button>
        </motion.div>
      </ModalContainer>
    </>
  );
};

export default GameScreen;
