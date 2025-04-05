export type FormEvent = React.FormEvent<HTMLFormElement>

export interface IGame {
  rounds: number,
  score: number,
  id: string,
  user: IUser,
}

export interface IUser {
  username: string,
  id: string,
  games: Array<IGame>
}

export interface LUser {
  token: string,
  username: string,
  admin: boolean,
}

export interface GameSettings {
  map: string,
  year: number
}

export type GameState = {
  rounds: number,
  locations: L.LatLng[],
  guesses: L.LatLng[],
  score: number,
  picked: boolean,
  skipped: number,
  user: LUser | null
}
