import { createSlice } from '@reduxjs/toolkit';
import {
  CARRIER,
  SHIPS,
  BATTLESHIP,
  CRUISER,
  DESTROYER,
  SUBMARINE,
} from 'utils/constants';

export type TShipDetails = {
  name: string;
  health: number;
  index: { i: number; j: number; color: string }[];
};

const initialState: { [name: string]: TShipDetails } = {
  [CARRIER]: {
    name: SHIPS[CARRIER].name,
    health: SHIPS[CARRIER].shots,
    index: [],
  },
  [BATTLESHIP]: {
    name: SHIPS[BATTLESHIP].name,
    health: SHIPS[BATTLESHIP].shots,
    index: [],
  },
  [DESTROYER]: {
    name: SHIPS[DESTROYER].name,
    health: SHIPS[DESTROYER].shots,
    index: [],
  },
  [CRUISER]: {
    name: SHIPS[CRUISER].name,
    health: SHIPS[CRUISER].shots,
    index: [],
  },
  [SUBMARINE]: {
    name: SHIPS[SUBMARINE].name,
    health: SHIPS[SUBMARINE].shots,
    index: [],
  },
};

export const shipStateSlice = createSlice({
  name: 'shipState',
  initialState,
  reducers: {
    damage: (state, action: { payload: string }) => {
      const { payload } = action;
      if (state[payload].health === 0) return;
      state[payload] = {
        ...state[payload],
        health: state[payload].health - 1,
      };
    },
    build: (
      state,
      action: { payload: { index: { i: number; j: number }[]; name: string } },
    ) => {
      const { name } = action.payload;
      const positions = action.payload.index.map((item) => ({
        ...item,
        color: SHIPS[name].color,
      }));

      if (state[name].index.length > SHIPS[name].shots) return;
      state[name] = {
        ...state[name],
        index: [...state[name].index, ...positions],
      };
    },
    destroy: (state, action: { payload: { name: string } }) => {
      const shipName = action.payload.name;
      state[shipName] = {
        name: SHIPS[SUBMARINE].name,
        health: 0,
        index: [],
      };
    },
    reset: (state, action: { payload: string }) => {
      const shipName = action.payload;
      if (shipName) {
        state[shipName] = {
          name: SHIPS[shipName].name,
          health: SHIPS[shipName].shots,
          index: [],
        };
      }
    },
  },
});

export const { damage, build, destroy, reset } = shipStateSlice.actions;
export default shipStateSlice.reducer;
