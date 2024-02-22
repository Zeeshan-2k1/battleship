import { useDispatch, useSelector } from 'react-redux';
import type { TypedUseSelectorHook } from 'react-redux';
import { AppDispatch, RootState } from 'store/store';

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useGlobalStateSelector = () =>
  useAppSelector((state) => state.globalState);

export const useShipsStateSelector = () =>
  useAppSelector((state) => state.shipState);

export const usePositionStateSelector = () =>
  useAppSelector((state) => state.positionState);
