import { createSlice } from '@reduxjs/toolkit';
import { EPage } from 'utils/constants';

interface TInitialState {
  page: EPage;
  toGo: 'left' | 'right';
  isShipSelectorModalOpen: boolean;
  isJoinGameModalOpen: boolean;
  isGameStarted: boolean;
  isBattleInfoModelOpen: boolean;
  isGameWon: boolean;
  isGameLose: boolean;
  isMyTurn: boolean;
}
const initialState: TInitialState = {
  page: EPage.HOME,
  toGo: 'left',
  isShipSelectorModalOpen: false,
  isJoinGameModalOpen: false,
  isBattleInfoModelOpen: false,
  isGameStarted: false,
  isGameWon: false,
  isGameLose: false,
  isMyTurn: false,
};

export const globalStateSlice = createSlice({
  name: 'globalState',
  initialState: initialState,
  reducers: {
    switchToHome: (state) => {
      state.toGo = state.toGo === 'left' ? 'right' : 'left';
      state.page = EPage.HOME;
    },
    switchToGame: (state) => {
      state.page = EPage.GAME;
      state.toGo = 'left';
    },
    switchToRules: (state) => {
      state.page = EPage.RULES;
      state.toGo = 'right';
    },
    switchToSettings: (state) => {
      state.page = EPage.SETTINGS;
      state.toGo = 'right';
    },
    switchToDashboard: (state) => {
      state.page = EPage.DASHBOARD;
      state.toGo = 'right';
    },
    openShipSelectorModal: (state) => {
      state.isShipSelectorModalOpen = true;
    },
    closeShipSelectorModal: (state) => {
      state.isShipSelectorModalOpen = false;
    },
    openJoinGameModal: (state) => {
      state.isJoinGameModalOpen = true;
    },
    closeJoinGameModal: (state) => {
      state.isJoinGameModalOpen = false;
    },
    startGame: (state) => {
      state.isGameStarted = true;
    },
    stopGame: (state) => {
      state.isGameStarted = false;
    },
    openBattleInfo: (state) => {
      state.isBattleInfoModelOpen = true;
    },
    closeBattleInfo: (state) => {
      state.isBattleInfoModelOpen = false;
    },
    gameWon: (state) => {
      state.isGameWon = true;
      state.isGameStarted = false;
    },
    gameLose: (state) => {
      state.isGameLose = true;
      state.isGameStarted = false;
    },
    notGameWon: (state) => {
      state.isGameWon = false;
    },
    notGameLose: (state) => {
      state.isGameLose = false;
    },
    myTurn: (state) => {
      state.isMyTurn = true;
    },
    notMyTurn: (state) => {
      state.isMyTurn = false;
    },
  },
});
export const {
  switchToGame,
  switchToHome,
  switchToRules,
  switchToDashboard,
  switchToSettings,
  startGame,
  stopGame,
  closeJoinGameModal,
  closeShipSelectorModal,
  openJoinGameModal,
  openShipSelectorModal,
  openBattleInfo,
  closeBattleInfo,
  gameLose,
  gameWon,
  myTurn,
  notMyTurn,
  notGameLose,
  notGameWon,
} = globalStateSlice.actions;
export default globalStateSlice.reducer;
