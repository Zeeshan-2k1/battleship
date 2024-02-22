export const SUBTITLE: string =
  'March to Mayhem: Unleash Tactical Havoc in the Most Epic Online War Game Blitz!';
export const TITLE: string = 'BattleShip';

export const WON_TITLE: string = 'Congrats! You Won';
export const WON_SUBTITLE: string =
  'It was a great battle, and in last victory is yours.';

export const LOSE_TITLE: string = 'Ohh! You Lost';
export const LOSE_SUBTITLE: string =
  'It was a great battle, but better luck next time.';

export const GRID_SIZE = 11;

export const CARRIER: string = 'Carrier';
export const BATTLESHIP: string = 'Battleship';
export const CRUISER: string = 'Cruiser';
export const SUBMARINE: string = 'Submarine';
export const DESTROYER: string = 'Destroyer';

export const SHIPS = {
  [CARRIER]: { name: CARRIER, shots: 5, color: 'olive' },
  [BATTLESHIP]: { name: BATTLESHIP, shots: 4, color: 'maroon' },
  [CRUISER]: { name: CRUISER, shots: 3, color: 'orange' },
  [SUBMARINE]: { name: SUBMARINE, shots: 3, color: 'aqua' },
  [DESTROYER]: { name: DESTROYER, shots: 2, color: 'lime' },
};

export const TOTAL_OCCUPIED_GRIDS = Object.values(SHIPS).reduce(
  (a, b) => a + b.shots,
  0
);

export enum EPage {
  HOME,
  GAME,
  RULES,
  SETTINGS,
  DASHBOARD,
}

export type TCoodrinates = {
  i: number;
  j: number;
  color: string;
};

export const GridCoordinatesOptions = {
  rows: [
    'Row 1',
    'Row 2',
    'Row 3',
    'Row 4',
    'Row 5',
    'Row 6',
    'Row 7',
    'Row 8',
    'Row 9',
    'Row 10',
    'Row 11',
  ],
  cols: [
    'Col 1',
    'Col 2',
    'Col 3',
    'Col 4',
    'Col 5',
    'Col 6',
    'Col 7',
    'Col 8',
    'Col 9',
    'Col 10',
    'Col 11',
  ],
};

export const vertical = 'vertical';
export const horizontal = 'horizontal';

export const LS_PLAYER_NAME_KEY = '__battleShip_player_name';
export const LS_ROOM_KEY = '__battleShip_room_id';

export enum SOCKET_EVENTS {
  NOTIFICATION = 'NOTIFICATION',
  CONNECTION_SUCCESS = 'CONNECTION_SUCCESS',
  CONNECTION_ERROR = 'CONNECTION_ERROR',
  SET_SHIP_POSITION = 'SET_SHIP_POSITION',
  ATTACK = 'ATTACK',
  WON = 'WON',
  LOSE = 'LOSE',
  START = 'START',
  TURN = 'TURN',
  NOT_TURN = 'NOT_TURN',
}

export interface IAcknowledgement {
  isSuccess: boolean;
  message?: string;
  data?: any;
}
