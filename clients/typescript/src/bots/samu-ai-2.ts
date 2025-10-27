import {BotAI} from './botAI';
import {PlayState} from './data';

export interface Forecast {
  turns: { player: number, column: number }[],
  state: PlayState,
  score: number,
  myScore: number,
  opponentScore: number,
}

export class SamuAi2 implements BotAI {
  private name: string = 'SamuAi2';

  getName(): string {
    return this.name;
  }

  play(currentGameState: PlayState): number {
    console.log('--------------------------------------')
    currentGameState.board.forEach((row) => console.log(row.join(' ')));

    const bestForecast = this.forecastBestPlayState(currentGameState, currentGameState.coin_id, 6);
    if (!bestForecast || bestForecast.turns.length === 0) {
      return Math.floor(Math.random() * 7);
    }

    return bestForecast.turns[0].column;
  }

  forecastBestPlayState(state: PlayState, player: number, iterations: number): Forecast | null {
    if (iterations === 0 || this.checkWinner(state) !== 0) {
      const myScore = this.calculateBoardScore(state, player);
      const opponentScore = this.calculateBoardScore(state, 3 - player);
      return {
        turns: [],
        state: state,
        score: myScore - opponentScore,
        myScore,
        opponentScore,
      };
    }

    const forecasts: (Forecast | null)[] = [];

    for (let column = 0; column < state.board[0].length; column++) {
      const nextState = this.calculateNextState(state, column, player);
      if (nextState) {
        if (iterations === 1) {
          const myScore = this.calculateBoardScore(nextState, player);
          const opponentScore = this.calculateBoardScore(nextState, 3 - player);
          const scoreDiff = myScore - opponentScore;
          forecasts.push({
            turns: [{player, column}],
            state: nextState,
            score: scoreDiff,
            myScore,
            opponentScore,
          });
        } else {
          const nextForecast = this.forecastBestPlayState(nextState, 3 - player, iterations - 1) as Forecast;
          const myScore = this.calculateBoardScore(nextForecast.state, player);
          const opponentScore = this.calculateBoardScore(nextForecast.state, 3 - player);
          const scoreDiff = myScore - opponentScore;
          forecasts.push({
            turns: [{player, column}, ...nextForecast.turns],
            state: nextForecast.state,
            score: scoreDiff,
            myScore,
            opponentScore,
          });
        }
      } else {
        forecasts.push(null);
      }
    }

    return forecasts.reduce((
      bestForecast,
      currentForecast,
      index
    ): Forecast | null => {
      if (currentForecast === null) {
        return bestForecast;
      }
      if (
        !bestForecast  // No best forecast yet
        || bestForecast.score < currentForecast.score  // Better score found
        || (bestForecast.score === currentForecast.score && (
            bestForecast.myScore < currentForecast.myScore // Same score but better myScore
            || (
              bestForecast.myScore === currentForecast.myScore &&
              Math.abs(3 - index) < Math.abs(3 - bestForecast.turns[0].column) // Same scores but column is more in the center
            )
          )
        )
      ) {
        return currentForecast;
      } else {
        return bestForecast;
      }
    });
  }

  calculateNextState(state: PlayState, column: number, player: number): PlayState | null {
    if (state.board[state.board.length - 1][column] !== 0) {
      return null;
    }
    const newState = this.copyPlayState(state);
    for (let row = 0; row < newState.board.length; row++) {
      if (newState.board[row][column] === 0) {
        newState.board[row][column] = player;
        break;
      }
    }
    newState.round += 1;

    for (const bomb of newState.bombs) {
      if (bomb.explode_in_round > 0) {
        bomb.explode_in_round -= 1;
      }
    }

    if (this.checkWinner(newState) !== 0) {
      return newState;
    }

    for (const bomb of newState.bombs) {
      if (bomb.explode_in_round > 0) {
        continue;
      }

      const bombColumn = bomb.col;
      const bombRow = bomb.row;

      const explodingRowMin = Math.max(0, bombRow - 1);
      const explodingRowMax = Math.min(newState.board.length - 1, bombRow + 1);
      const explodingColumnMin = Math.max(0, bombColumn - 1);
      const explodingColumnMax = Math.min(newState.board[0].length - 1, bombColumn + 1);

      for (let row = explodingRowMin; row <= explodingRowMax; row++) {
        newState.board[row][bombColumn] = 0;
      }
      for (let col = explodingColumnMin; col <= explodingColumnMax; col++) {
        newState.board[bombRow][col] = 0;
      }

      if (explodingColumnMin < bombColumn) {
        for (let r = bombRow; r < newState.board.length - 1; r++) {
          newState.board[r][explodingColumnMin] = newState.board[r + 1][explodingColumnMin];
          newState.board[r + 1][explodingColumnMin] = 0;
        }
      }

      let bombColumnDrop = bombRow === 0 ? 2 : 3;
      for (let r = explodingRowMin; r < newState.board.length - bombColumnDrop; r++) {
        newState.board[r][bombColumn] = newState.board[r + bombColumnDrop][bombColumn];
        newState.board[r + bombColumnDrop][bombColumn] = 0;
      }

      if (bombColumn < explodingColumnMax) {
        for (let r = bombRow; r < newState.board.length - 1; r++) {
          newState.board[r][explodingColumnMax] = newState.board[r + 1][explodingColumnMax];
          newState.board[r + 1][explodingColumnMax] = 0;
        }
      }

      const bombIndex = newState.bombs.indexOf(bomb);
      newState.bombs.splice(bombIndex, 1);
    }
    return newState;
  }

  copyPlayState(state: PlayState): PlayState {
    return {
      bot: state.bot,
      coin_id: state.coin_id,
      round: state.round,
      bombs: state.bombs.map(bomb => ({...bomb})),
      board: state.board.map(row => [...row])
    };
  }

  checkWinner(state: PlayState): number {
    let winner = 0;

    const directions = [
      {directionRow: 0, directionColumn: 1},
      {directionRow: 1, directionColumn: 0},
      {directionRow: 1, directionColumn: 1},
      {directionRow: -1, directionColumn: 1},
    ];
    for (let row = 0; row < state.board.length; row++) {
      for (let column = 0; column < state.board[0].length; column++) {
        const player = state.board[row][column];
        if (player === 0 || player === 99) {
          continue;
        }
        for (const {directionRow, directionColumn} of directions) {
          let count = 1;
          for (let step = 1; step < 4; step++) {
            const indexRow = row + directionRow * step;
            const indexColumn = column + directionColumn * step;
            if (
              indexRow >= 0
              && indexRow < state.board.length
              && indexColumn >= 0
              && indexColumn < state.board[0].length
              && state.board[indexRow][indexColumn] === player
            ) {
              count++;
            } else {
              break;
            }
          }
          if (count === 4 && winner !== player && winner !== 3) {
            winner += player;
          }
        }
      }
    }

    return winner;
  }

  calculateBoardScore(state: PlayState, player: number): number {
    const checkWinner = this.checkWinner(state);
    if (checkWinner === player || checkWinner === 3) {
      return 10000;
    }

    let score = 0;
    const directions = [
      {directionRow: 0, directionColumn: 1},
      {directionRow: 1, directionColumn: 0},
      {directionRow: 1, directionColumn: 1},
      {directionRow: -1, directionColumn: 1},
    ];
    for (let row = 0; row < state.board.length; row++) {
      for (let column = 0; column < state.board[0].length; column++) {

        if (state.board[row][column] === 99) {
          if (row > 0 && state.board[row - 1][column] === player) {
            score -= 50;
          }
          if (row < state.board.length - 1 && state.board[row + 1][column] === player) {
            score -= 50;
          }
          if (column > 0 && state.board[row][column - 1] === player) {
            score -= 50;
          }
          if (column < state.board[0].length - 1 && state.board[row][column + 1] === player) {
            score -= 50;
          }
          continue;
        }

        if (state.board[row][column] !== player) {
          continue;
        }

        for (const {directionRow, directionColumn} of directions) {
          let blockedStart = false;
          let blockedEnd = false;

          if (
            row - directionRow >= 0
            && row - directionRow < state.board.length
            && column - directionColumn >= 0
            && column - directionColumn < state.board[0].length
          ) {
            const beforeStartCell = state.board[row - directionRow][column - directionColumn];
            if (beforeStartCell === 3 - player || beforeStartCell === 99) {
              blockedStart = true;
            } else if (beforeStartCell === player) {
              continue;
            }
          } else {
            blockedStart = true;
          }
          const maxRow = row + directionRow * 3
          const maxColumn = column + directionColumn * 3
          if (
            maxRow < 0
            || state.board.length <= maxRow
            || maxColumn < 0
            || state.board[0].length <= maxColumn
          ) {
            blockedEnd = true;
          }

          if (blockedStart && blockedEnd) {
            continue;
          }

          let count = 1;
          for (let step = 1; step < 4; step++) {
            const indexRow = row + directionRow * step;
            const indexColumn = column + directionColumn * step;
            if (
              indexRow >= 0
              && indexRow < state.board.length
              && indexColumn >= 0
              && indexColumn < state.board[0].length
            ) {
              if (state.board[indexRow][indexColumn] === player) {
                count++;
              } else if (state.board[indexRow][indexColumn] === 3 - player) {
                blockedEnd = true;
                break;
              } else {
                break;
              }
            } else {
              break;
            }
          }

          const multiplicator = !blockedStart && !blockedEnd ? 2 : 1;

          if (!blockedStart || !blockedEnd) {
            if (count === 3) {
              score += 100 * multiplicator;
            } else if (count === 2) {
              score += 10 * multiplicator;
            }
          }
        }
      }
    }
    return score;
  }
}
