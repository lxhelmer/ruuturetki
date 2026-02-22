export type FormEvent = React.FormEvent<HTMLFormElement>;

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
  timed: false | number; // Number is the round time in seconds
  ortolayer: MapLayerName;
}

export type MapLayerName = MapLayerNameHelsinki | MapLayerNameTurku;

export type MapLayerNameHelsinki =
  | "avoindata:Ortoilmakuva_1943"
  | "avoindata:Ortoilmakuva_1969"
  | "avoindata:Ortoilmakuva_1997"
  | "avoindata:Ortoilmakuva_2024_5cm"
  | "avoindata:Ortoilmakuva_2019_20cm";

export type MapLayerNameTurku =
  | "Turku ilmakuva 1939"
  | "Turku ilmakuva 1958"
  | "Turku ilmakuva 1973"
  | "Turku ilmakuva 1998"
  | "Turku ilmakuva 2010"
  | "Ilmakuva 2022 True ortho"
  | "Turun Osoitekartta 1945";

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
  dailyChallenge: {
    id: number;
    zoom: number;
    draggable: boolean;
    latlng: { lat: number; lng: number };
  }[];
}
