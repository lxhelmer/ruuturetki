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

export interface GameSettings extends WMSOptions {
  dragging: boolean; // Is moving allowed
  timed: false | number; // Number is the round time in seconds
  city: "Helsinki" | "Turku";
}

export interface WMSOptions {
  ortolayer:
    | "avoindata:Ortoilmakuva_1943"
    | "avoindata:Ortoilmakuva_1969"
    | "avoindata:Ortoilmakuva_1997"
    | "avoindata:Ortoilmakuva_2024_5cm"
    | "avoindata:Ortoilmakuva_2019_20cm"
    | "Turku ilmakuva 1939"
    | "Turku ilmakuva 1958"
    | "Turku ilmakuva 1973"
    | "Turku ilmakuva 1998"
    | "Turku ilmakuva 2010"
    | "Ilmakuva 2022 True ortho"
    | "Turun Osoitekartta 1945";

  wmsurl:
    | "https://kartta.hel.fi/ws/geoserver/avoindata/wms?"
    | "https://turku.asiointi.fi/teklaogcweb/WMS.ashx";
  attribution:
    | '&copy; <a href=https://hri.fi/data/fi/dataset/helsingin-ortoilmakuvat target="_blank">Helsingin kaupunki, kaupunkimittauspalvelut 2025</a>'
    | '&copy; <a href=https://www.avoindata.fi/data/fi/dataset/turun-seudun-ilmakuva target="_blank">Turun Kaupunkiympäristö</a>';
  wmsversion: "1.1.1" | "1.1.1.1";
  wmsformat: "image/png";
}

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
