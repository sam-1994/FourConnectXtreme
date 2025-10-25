import {BotAI} from './botAI';
import {PlayState} from './data';

interface Forecast {
  column: number,
  state: PlayState,
  score: number,
}

export class SamuAi1 implements BotAI {
  private name: string = 'SamuAi1';

  getName(): string {
    return this.name;
  }

  play(currentGameState: PlayState): number {
    console.log('--------------------------------------')
    currentGameState.board.forEach((row) => console.log(row.join(' ')));

    let bestColumns: number[] = [];
    let bestScore = -Infinity;
    for (let column = 0; column < currentGameState.board[0].length; column++) {
      if (currentGameState.board[currentGameState.board.length - 1][column] !== 0) {
        continue;
      }
      const nextState = this.calculateNextState(currentGameState, column, currentGameState.coin_id);
      const score = this.calculateBoardScore(nextState, currentGameState.coin_id,);

      if (score > bestScore) {
        bestScore = score;
        bestColumns = [];
        bestColumns.push(column);
      } else if (score === bestScore) {
        bestColumns.push(column);
      }
    }

    const guess = bestColumns.sort((a, b) => Math.abs(3 - a) - Math.abs(3 - b))[0];
    console.log(`Chosen column: ${guess} with score: ${bestScore}`);
    return guess;
  }

  calculateNextState(state: PlayState, column: number, player: number): PlayState {
    const newState = this.copyPlayState(state);
    for (let row = 0; row < newState.board.length; row++) {
      if (newState.board[row][column] === 0) {
        newState.board[row][column] = player;
        break;
      }
    }
    newState.round += 1;

    if (this.checkWinner(newState) !== 0) {
      return newState;
    }

    for (const bomb of newState.bombs) {
      if (bomb.explode_in_round === 0) {
        continue;
      }
      bomb.explode_in_round -= 1;

      if (bomb.explode_in_round === 0) {
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

        if (explodingColumnMax < bombColumn) {
          for (let r = bombRow; r < newState.board.length - 1; r++) {
            newState.board[r][explodingColumnMax] = newState.board[r + 1][explodingColumnMax];
            newState.board[r + 1][explodingColumnMax] = 0;
          }
        }
      }
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
    let score = 0;
    const directions = [
      {directionRow: 0, directionColumn: 1},
      {directionRow: 1, directionColumn: 0},
      {directionRow: 1, directionColumn: 1},
      {directionRow: -1, directionColumn: 1},
    ];
    for (let row = 0; row < state.board.length; row++) {
      for (let column = 0; column < state.board[0].length; column++) {
        if (state.board[row][column] !== player) {
          continue;
        }
        if (row > 0 && state.board[row - 1][column] === 99) {
          score -= 50;
        }
        if (row < state.board.length - 1 && state.board[row + 1][column] === 99) {
          score -= 50;
        }
        if (column > 0 && state.board[row][column - 1] === 99) {
          score -= 50;
        }
        if (column < state.board[0].length - 1 && state.board[row][column + 1] === 99) {
          score -= 50;
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
          if (count === 4) {
            score += 1000;
          } else if (count === 3) {
            score += 100;
          } else if (count === 2) {
            score += 10;
          }
        }
      }
    }
    return score;
  }
}
