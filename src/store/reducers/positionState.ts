import { createSlice } from '@reduxjs/toolkit';
import { TCoodrinates } from 'utils/constants';

const initialState: {
  shipPositions: TCoodrinates[];
  attackPositions: TCoodrinates[];
  isPositionSaved: boolean;
} = {
  shipPositions: [],
  attackPositions: [],
  isPositionSaved: false,
};

export const positionStateSlice = createSlice({
  name: 'positionState',
  initialState: initialState,
  reducers: {
    addShipPosition: (
      state,
      action: { payload: TCoodrinates[]; type?: string },
    ) => {
      state.shipPositions = [...state.shipPositions, ...action.payload];
    },
    removeShipPosition: (
      state,
      action: { payload: TCoodrinates; type?: string },
    ) => {
      state.shipPositions = state.shipPositions.filter((position) => {
        return (
          action.payload.i !== position.i && action.payload.j !== position.j
        );
      });
    },
    removeShipPositions: (
      state,
      action: { payload: string; type?: string },
    ) => {
      state.shipPositions = state.shipPositions.filter(
        (position) => position.color !== action.payload,
      );
    },
    addAttackPosition: (
      state,
      action: { payload: TCoodrinates[]; type?: string },
    ) => {
      state.attackPositions = [...state.attackPositions, ...action.payload];
    },
    removeAttackPosition: (
      state,
      action: { payload: TCoodrinates; type?: string },
    ) => {
      state.attackPositions = state.attackPositions.filter((position) => {
        return (
          action.payload.i !== position.i && action.payload.j !== position.j
        );
      });
    },
    deleteAllShipPostions: (state) => {
      state.shipPositions = [];
    },
    savePosition: (state) => {
      state.isPositionSaved = true;
    },
  },
});

export const {
  addShipPosition,
  removeShipPosition,
  removeShipPositions,
  addAttackPosition,
  removeAttackPosition,
  savePosition,
  deleteAllShipPostions,
} = positionStateSlice.actions;
export default positionStateSlice.reducer;
