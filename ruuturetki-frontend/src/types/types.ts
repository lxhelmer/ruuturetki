export type FormEvent = React.SubmitEvent<HTMLFormElement>;

export type SelectEvent = React.ChangeEvent<
  HTMLSelectElement,
  HTMLSelectElement
>;

export interface IGame {
  rounds: number;
  score: number;
  year: number;
  id: string;
  user: IUser;
}

export interface IUser {
  username: string;
  id: string;
  games: Array<IGame>;
}

export interface LUser {
  token: string;
  username: string;
  admin: boolean;
}

export interface GameSettings {
  dragging: boolean; // Is moving allowed
  timed: Timed;
  ortolayer: MapLayerName;
}

export type Timed = number | null; // Number is the round time in seconds, null means no timer

export type MapLayerName = MapLayerNameHelsinki | MapLayerNameTurku;

export type MapLayerNameHelsinki =
  | "avoindata:Ortoilmakuva_1943"
  | "avoindata:Ortoilmakuva_1969"
  | "avoindata:Ortoilmakuva_1997"
  | "avoindata:Ortoilmakuva_2019_20cm"
  | "avoindata:Ortoilmakuva_2024_5cm";

export type MapLayerNameTurku =
  | "Turku ilmakuva 1939"
  | "Turun Osoitekartta 1945"
  | "Turku ilmakuva 1958"
  | "Turku ilmakuva 1973"
  | "Turku ilmakuva 1998"
  | "Turku ilmakuva 2010"
  | "Ilmakuva 2022 True ortho";

export interface GameState {
  roundId: number;
  locations: L.LatLng[];
  guesses: L.LatLng[];
  zooms: number[];
  score: number[];
  distanceMoved: number;
  picked: boolean;
  skipped: number;
  user: LUser | null;
}

export interface CuratorRound {
  id: number;
  latlng: L.LatLng;
  zoom: number;
  draggable: boolean;
}

export interface DailyChallenge {
  date: string;
  maplayer: MapLayerName;
  moving: boolean;
  timed: Timed;
  dailyChallenge: {
    id: number;
    zoom: number;
    latlng: { lat: number; lng: number };
  }[];
}
