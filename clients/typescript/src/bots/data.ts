export interface Bomb {
  row: number;
  col: number;
  explode_in_round: number;
}

export interface PlayState {
  bot: string;
  coin_id: number;
  round: number;
  bombs: Bomb[];
  board: number[][];
}
