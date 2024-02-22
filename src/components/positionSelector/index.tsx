import React, { useState } from 'react';
import {
  GridCoordinatesOptions,
  SHIPS,
  TCoodrinates,
  horizontal,
  vertical,
} from 'utils/constants';
import {
  useAppDispatch,
  usePositionStateSelector,
  useShipsStateSelector,
} from 'hooks';
import { useShipPosition } from 'hooks/ship';
import Button from '../button';
import { closeShipSelectorModal } from 'store/reducers/globalState';
import GridContainer from '../grid';
import { getShipOrientation } from '../../utils/helper/shipHelper';
import toast from 'react-simple-toasts';

import { useGameSocket } from 'hooks/socket';

const PositionSelectorContainer = () => {
  const { shipPositions } = usePositionStateSelector();
  const dispatch = useAppDispatch();
  const { buildFleet } = useGameSocket();

  return (
    <>
      <div className="w-full flex gap-1 items-center flex-wrap lg:flex-nowrap">
        <div className="w-full basis-1/3">
          <GridContainer variant="sm" indexes={shipPositions} />
        </div>
        <div className="flex-col w-full basis-2/3">
          <h1 className="text-3xl text-center mb-6">
            Position your battle ships
          </h1>
          <div className="flex flex-col items-stretch gap-4 px-4 m-auto">
            {Object.values(SHIPS).map(({ name }) => {
              return <PositionSelector key={name} name={name} />;
            })}
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center gap-6">
        <Button customClassName="mt-6" onClick={buildFleet}>
          Save
        </Button>
        <Button
          customClassName="mt-6"
          onClick={() => dispatch(closeShipSelectorModal())}
        >
          Close
        </Button>
      </div>
    </>
  );
};

const PositionSelector = ({ name }: { name: string }) => {
  const shipState = useShipsStateSelector();
  const [rowName, setRowName] = useState<string>(
    `${shipState[name]?.index[0]?.i}` ?? ''
  );
  const [colName, setColName] = useState<string>(
    `${shipState[name]?.index[0]?.j}` ?? ''
  );
  const [align, setAlign] = useState<string>(
    getShipOrientation(shipState[name]?.index)
  );
  const { setShipPosition } = useShipPosition();

  const handleChange = () => {
    if (colName === '' || rowName === '' || align === '') return;

    const row = +rowName;
    const col = +colName;

    const coordinate: TCoodrinates = {
      i: row,
      j: col,
      color: SHIPS[name].color,
    };

    setShipPosition(name, coordinate, align, () => {
      toast(`Your ${name} is ready for battle.`);
    });
  };

  return (
    <div className="flex justify-between items-center gap-4">
      <div className="flex w-full justify-between items-center border p-2 rounded">
        <div className="flex items-center gap-2">
          <span
            style={{ backgroundColor: SHIPS[name].color }}
            className="w-2 h-2 rounded-full block"
          ></span>
          <h3 className="text-xl">{name}</h3>
        </div>
        <div className="flex gap-10 items-center justify-between">
          <select
            value={rowName}
            onChange={({ target }) => setRowName(target.value)}
          >
            <option value={''}>Select Row</option>
            {GridCoordinatesOptions.rows.map((value, index) => {
              return (
                <option key={index} value={index}>
                  {value}
                </option>
              );
            })}
          </select>
          <select
            value={colName}
            onChange={({ target }) => setColName(target.value)}
          >
            <option value={''}>Select Column</option>
            {GridCoordinatesOptions.cols.map((value, index) => {
              return (
                <option key={index} value={index}>
                  {value}
                </option>
              );
            })}
          </select>
          <select
            value={align}
            onChange={({ target }) => setAlign(target.value)}
            className="capitalize"
          >
            <option value={''}>Select Direction</option>
            <option key={vertical} value={vertical}>
              {vertical}
            </option>
            <option key={horizontal} value={horizontal}>
              {horizontal}
            </option>
          </select>
        </div>
      </div>
      <Button size="small" onClick={() => handleChange()}>
        Save
      </Button>
    </div>
  );
};

export default PositionSelectorContainer;
