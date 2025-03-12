export type FormEvent = React.FormEvent<HTMLFormElement>

export interface IGame {
  rounds: number,
  score: number,
  id: string,
  user: IUser,
}

export interface IUser {
  username: string,
  is: string,
  games: Array<IGame>
}

