import {Forecast, SamuAi2} from "./samu-ai-2";
import {Bomb, PlayState} from "./data";

describe('SamuAI-2 Bot', () => {
  let ai: SamuAi2;

  beforeEach(() => {
    ai = new SamuAi2();
  });

  describe('forecastBestPlayState', () => {
    const makeState = (
      board: number[][],
      bombs: Bomb[] = [],
    ): PlayState => ({
      board,
      round: 1,
      coin_id: 1,
      bombs,
      bot: 'TestBot',
    });

    it('should return the state if iterations is 0', () => {
      const board = [
        [1, 1, 1, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
      ];
      const state = makeState(board);
      const forecastedState = ai.forecastBestPlayState(state, 0, 0) as Forecast;
      expect(forecastedState?.state).toBe(state);
      expect(forecastedState.turns).toEqual([]);
    });

    it('should return the state if player 1 is a winner', () => {
      const board = [
        [1, 1, 1, 1, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
      ];
      const state = makeState(board);
      const forecastedState = ai.forecastBestPlayState(state, 0, 0) as Forecast;
      expect(forecastedState.state).toBe(state);
      expect(forecastedState.turns).toEqual([]);
    });

    it('should return the state if player 2 is a winner', () => {
      const board = [
        [2, 2, 2, 2, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
      ];
      const state = makeState(board);
      const forecastedState = ai.forecastBestPlayState(state, 1, 3) as Forecast;
      expect(forecastedState?.state).toBe(state);
      expect(forecastedState.turns).toEqual([]);
    });

    it('should return the state if both players are winners', () => {
      const board = [
        [0, 1, 0, 2, 0, 0, 0],
        [0, 1, 0, 2, 0, 0, 0],
        [0, 1, 0, 2, 0, 0, 0],
        [0, 1, 0, 2, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
      ];
      const state = makeState(board);
      const forecastedState = ai.forecastBestPlayState(state, 1, 3) as Forecast;
      expect(forecastedState?.state).toBe(state);
      expect(forecastedState.turns).toEqual([]);
    });

    it('should prefers the middle on an empty board with one iteration', () => {
      const board = [
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
      ];
      const state = makeState(board);
      const forecastedState = ai.forecastBestPlayState(state, 1, 1) as Forecast;
      expect(forecastedState.state.board).toEqual([
        [0, 0, 0, 1, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
      ]);
      expect(forecastedState.turns).toEqual([{
        column: 3,
        player: 1,
      }]);
      expect(forecastedState.score).toBe(0);
    });

    it('should add to an existing cell with one iteration', () => {
      let state = makeState([
        [0, 0, 0, 2, 1, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
      ]);
      let forecastedState = ai.forecastBestPlayState(state, 1, 1) as Forecast;
      expect(forecastedState.state.board).toEqual([
        [0, 0, 0, 2, 1, 0, 0],
        [0, 0, 0, 1, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
      ]);
      expect(forecastedState.turns).toEqual([{
        column: 3,
        player: 1,
      }]);
      expect(forecastedState.score).toBe(10);

      state = makeState([
        [0, 0, 2, 2, 1, 0, 0],
        [0, 0, 0, 0, 1, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
      ]);
      forecastedState = ai.forecastBestPlayState(state, 1, 1) as Forecast;
      expect(forecastedState.state.board).toEqual([
        [0, 0, 2, 2, 1, 0, 0],
        [0, 0, 0, 0, 1, 0, 0],
        [0, 0, 0, 0, 1, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
      ]);
      expect(forecastedState.turns).toEqual([{
        column: 4,
        player: 1,
      }]);
      expect(forecastedState.score).toBe(90);

      state = makeState([
        [0, 0, 2, 2, 1, 0, 0],
        [0, 0, 0, 2, 1, 0, 0],
        [0, 0, 0, 0, 1, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
      ]);
      forecastedState = ai.forecastBestPlayState(state, 1, 1) as Forecast;
      expect(forecastedState.state.board).toEqual([
        [0, 0, 2, 2, 1, 0, 0],
        [0, 0, 0, 2, 1, 0, 0],
        [0, 0, 0, 0, 1, 0, 0],
        [0, 0, 0, 0, 1, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
      ]);
      expect(forecastedState.turns).toEqual([{
        column: 4,
        player: 1,
      }]);
      expect(forecastedState.score).toBe(9980);
    });

    it('should add to an existing cell with two iterations', () => {
      let state = makeState([
        [0, 0, 0, 2, 1, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
      ]);
      let forecastedState = ai.forecastBestPlayState(state, 1, 2) as Forecast;
      expect(forecastedState.state.board).toEqual([
        [0, 0, 2, 2, 1, 0, 0],
        [0, 0, 0, 1, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
      ]);
      expect(forecastedState.turns).toEqual([{
        column: 3,
        player: 1,
      }, {
        column: 2,
        player: 2,
      }]);
      expect(forecastedState.score).toBe(0);

      state = makeState([
        [0, 0, 2, 2, 1, 0, 0],
        [0, 0, 0, 0, 1, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
      ]);
      forecastedState = ai.forecastBestPlayState(state, 1, 2) as Forecast;

      expect(forecastedState.state.board).toEqual([
        [0, 1, 2, 2, 1, 0, 0],
        [0, 0, 0, 2, 1, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
      ]);
      expect(forecastedState.turns).toEqual([{
        column: 1,
        player: 1,
      }, {
        column: 3,
        player: 2,
      }]);
      expect(forecastedState.score).toBe(-10);

      state = makeState([
        [0, 2, 2, 2, 1, 0, 0],
        [0, 0, 0, 0, 1, 0, 0],
        [0, 0, 0, 0, 1, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
      ]);
      forecastedState = ai.forecastBestPlayState(state, 1, 2) as Forecast;
      expect(forecastedState.state.board).toEqual([
        [0, 2, 2, 2, 1, 0, 0],
        [0, 0, 0, 0, 1, 0, 0],
        [0, 0, 0, 0, 1, 0, 0],
        [0, 0, 0, 0, 1, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
      ]);
      expect(forecastedState.turns).toEqual([{
        column: 4,
        player: 1,
      }]);
      expect(forecastedState.score).toBe(9900);
    });

    it('should add to an existing cell with four iterations', () => {
      let state = makeState([
        [0, 0, 0, 2, 1, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
      ]);
      let forecastedState = ai.forecastBestPlayState(state, 1, 4) as Forecast;
      expect(forecastedState.state.board).toEqual([
        [0, 1, 2, 2, 1, 0, 0],
        [0, 0, 2, 1, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
      ]);
      expect(forecastedState.turns).toEqual([{
        column: 3,
        player: 1,
      }, {
        column: 2,
        player: 2,
      }, {
        column: 1,
        player: 1,
      }, {
        column: 2,
        player: 2,
      }]);
      expect(forecastedState.score).toBe(-10);

      state = makeState([
        [0, 0, 2, 2, 1, 0, 0],
        [0, 0, 0, 0, 1, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
      ]);
      forecastedState = ai.forecastBestPlayState(state, 1, 4) as Forecast;

      expect(forecastedState.state.board).toEqual([
        [0, 2, 2, 2, 1, 0, 0],
        [0, 0, 2, 1, 1, 0, 0],
        [0, 0, 0, 0, 1, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
      ]);
      expect(forecastedState?.turns).toEqual([{
        column: 3,
        player: 1,
      }, {
        column: 2,
        player: 2,
      }, {
        column: 4,
        player: 1,
      }, {
        column: 1,
        player: 2,
      }]);
      expect(forecastedState.score).toBe(0);

      state = makeState([
        [0, 0, 2, 2, 1, 0, 0],
        [0, 0, 0, 2, 1, 0, 0],
        [0, 0, 0, 0, 1, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
      ]);
      forecastedState = ai.forecastBestPlayState(state, 1, 4) as Forecast;
      expect(forecastedState.state.board).toEqual([
        [0, 0, 2, 2, 1, 0, 0],
        [0, 0, 0, 2, 1, 0, 0],
        [0, 0, 0, 0, 1, 0, 0],
        [0, 0, 0, 0, 1, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
      ]);
      expect(forecastedState.turns).toEqual([{
        column: 4,
        player: 1,
      }]);
      expect(forecastedState.score).toBe(9980);
    });

    it('should prefer my win over preventing opponent win with one iteration', () => {
      let state = makeState([
        [0, 0, 0, 2, 1, 0, 0],
        [0, 0, 0, 2, 1, 0, 0],
        [0, 0, 0, 2, 1, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
      ]);
      const forecastedState = ai.forecastBestPlayState(state, 1, 1) as Forecast;
      expect(forecastedState.state.board).toEqual([
        [0, 0, 0, 2, 1, 0, 0],
        [0, 0, 0, 2, 1, 0, 0],
        [0, 0, 0, 2, 1, 0, 0],
        [0, 0, 0, 0, 1, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
      ]);
      expect(forecastedState.turns).toEqual([{
        column: 4,
        player: 1,
      }]);
      expect(forecastedState.score).toBe(9900);
    });

    it('should prefer my win over preventing opponent win with two iterations', () => {
      let state = makeState([
        [0, 0, 0, 2, 1, 0, 0],
        [0, 0, 0, 2, 1, 0, 0],
        [0, 0, 0, 2, 1, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
      ]);
      const forecastedState = ai.forecastBestPlayState(state, 1, 2) as Forecast;
      expect(forecastedState.state.board).toEqual([
        [0, 0, 0, 2, 1, 0, 0],
        [0, 0, 0, 2, 1, 0, 0],
        [0, 0, 0, 2, 1, 0, 0],
        [0, 0, 0, 0, 1, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
      ]);
      expect(forecastedState.turns).toEqual([{
        column: 4,
        player: 1,
      }]);
      expect(forecastedState.score).toBe(9900);
    });

    it('should prefer my win over preventing opponent win with four iterations', () => {
      let state = makeState([
        [0, 0, 0, 2, 1, 0, 0],
        [0, 0, 0, 2, 1, 0, 0],
        [0, 0, 0, 2, 1, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
      ]);
      const forecastedState = ai.forecastBestPlayState(state, 1, 4) as Forecast;
      expect(forecastedState.state.board).toEqual([
        [0, 0, 0, 2, 1, 0, 0],
        [0, 0, 0, 2, 1, 0, 0],
        [0, 0, 0, 2, 1, 0, 0],
        [0, 0, 0, 0, 1, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
      ]);
      expect(forecastedState.turns).toEqual([{
        column: 4,
        player: 1,
      }]);
      expect(forecastedState.score).toBe(9900);
    });

    it('should prevent opponent win with one iteration', () => {
      let state = makeState([
        [0, 0, 0, 2, 1, 1, 0],
        [0, 0, 0, 2, 1, 0, 0],
        [0, 0, 0, 2, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
      ]);
      const forecastedState = ai.forecastBestPlayState(state, 1, 1) as Forecast;
      expect(forecastedState.state.board).toEqual([
        [0, 0, 0, 2, 1, 1, 0],
        [0, 0, 0, 2, 1, 0, 0],
        [0, 0, 0, 2, 0, 0, 0],
        [0, 0, 0, 1, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
      ]);
      expect(forecastedState.turns).toEqual([{
        column: 3,
        player: 1,
      }]);
      expect(forecastedState.score).toBe(10);
    });

    it('should prevent opponent win with four iterations', () => {
      let state = makeState([
        [0, 0, 0, 2, 1, 1, 0],
        [0, 0, 0, 2, 1, 0, 0],
        [0, 0, 0, 2, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
      ]);
      const forecastedState = ai.forecastBestPlayState(state, 1, 4) as Forecast;
      expect(forecastedState.state.board).toEqual([
        [0, 0, 1, 2, 1, 1, 0],
        [0, 0, 2, 2, 1, 0, 0],
        [0, 0, 0, 2, 2, 0, 0],
        [0, 0, 0, 1, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
      ]);
      expect(forecastedState.turns).toEqual([{
        column: 3,
        player: 1,
      }, {
        column: 4,
        player: 2,
      }, {
        column: 2,
        player: 1,
      }, {
        column: 2,
        player: 2,
      }]);
      expect(forecastedState.score).toBe(-70);
    });
  })

  describe('calculateNextState', () => {
    const makeState = (
      board: number[][],
      bombs: Bomb[] = [],
    ): PlayState => ({
      board,
      round: 1,
      coin_id: 1,
      bombs,
      bot: 'TestBot',
    });

    it('should add turns', () => {
      const board = [
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
      ];
      let nextState = ai.calculateNextState(makeState(board), 1, 1) as PlayState;
      expect(nextState.board).toEqual([
        [0, 1, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
      ]);
      nextState = ai.calculateNextState(nextState, 2, 2) as PlayState;
      expect(nextState.board).toEqual([
        [0, 1, 2, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
      ]);
      nextState = ai.calculateNextState(nextState, 3, 1) as PlayState;
      expect(nextState.board).toEqual([
        [0, 1, 2, 1, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
      ]);
      nextState = ai.calculateNextState(nextState, 0, 2) as PlayState;
      expect(nextState.board).toEqual([
        [2, 1, 2, 1, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
      ]);
      nextState = ai.calculateNextState(nextState, 4, 1) as PlayState;
      expect(nextState.board).toEqual([
        [2, 1, 2, 1, 1, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
      ]);
      nextState = ai.calculateNextState(nextState, 5, 2) as PlayState;
      expect(nextState.board).toEqual([
        [2, 1, 2, 1, 1, 2, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
      ]);
      nextState = ai.calculateNextState(nextState, 4, 1) as PlayState;
      expect(nextState.board).toEqual([
        [2, 1, 2, 1, 1, 2, 0],
        [0, 0, 0, 0, 1, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
      ]);
      nextState = ai.calculateNextState(nextState, 4, 2) as PlayState;
      expect(nextState.board).toEqual([
        [2, 1, 2, 1, 1, 2, 0],
        [0, 0, 0, 0, 1, 0, 0],
        [0, 0, 0, 0, 2, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
      ]);
      nextState = ai.calculateNextState(nextState, 4, 1) as PlayState;
      expect(nextState.board).toEqual([
        [2, 1, 2, 1, 1, 2, 0],
        [0, 0, 0, 0, 1, 0, 0],
        [0, 0, 0, 0, 2, 0, 0],
        [0, 0, 0, 0, 1, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
      ]);
      nextState = ai.calculateNextState(nextState, 4, 2) as PlayState;
      expect(nextState.board).toEqual([
        [2, 1, 2, 1, 1, 2, 0],
        [0, 0, 0, 0, 1, 0, 0],
        [0, 0, 0, 0, 2, 0, 0],
        [0, 0, 0, 0, 1, 0, 0],
        [0, 0, 0, 0, 2, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
      ]);
      nextState = ai.calculateNextState(nextState, 4, 1) as PlayState;
      expect(nextState.board).toEqual([
        [2, 1, 2, 1, 1, 2, 0],
        [0, 0, 0, 0, 1, 0, 0],
        [0, 0, 0, 0, 2, 0, 0],
        [0, 0, 0, 0, 1, 0, 0],
        [0, 0, 0, 0, 2, 0, 0],
        [0, 0, 0, 0, 1, 0, 0],
      ]);
      nextState = ai.calculateNextState(nextState, 6, 2) as PlayState;
      expect(nextState.board).toEqual([
        [2, 1, 2, 1, 1, 2, 2],
        [0, 0, 0, 0, 1, 0, 0],
        [0, 0, 0, 0, 2, 0, 0],
        [0, 0, 0, 0, 1, 0, 0],
        [0, 0, 0, 0, 2, 0, 0],
        [0, 0, 0, 0, 1, 0, 0],
      ]);
    });

    it('returns null for overflow turns', () => {
      const board = [
        [0, 0, 2, 1, 0, 0, 0],
        [0, 0, 1, 2, 0, 0, 0],
        [0, 0, 2, 1, 0, 0, 0],
        [0, 0, 1, 2, 0, 0, 0],
        [0, 0, 2, 1, 0, 0, 0],
        [0, 0, 1, 2, 0, 0, 0],
      ];
      const nextState = ai.calculateNextState(makeState(board), 2, 1) as PlayState;
      expect(nextState).toBeNull();
    });
  })

  describe('copyPlayState', () => {
    const makeState = (board: number[][]): PlayState => ({
      board,
      round: 1,
      coin_id: 1,
      bombs: [],
      bot: 'TestBot',
    });

    it('should deep copy a state', () => {
      const board = [
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
      ];
      const state = makeState(board);
      const copy = ai.copyPlayState(state);
      expect(copy).not.toBe(state);
      expect(copy.bot).toBe(state.bot);
      expect(copy.coin_id).toBe(state.coin_id);
      expect(copy.round).toBe(state.round);
      expect(copy.bombs).not.toBe(state.bombs);
      for (let i = 0; i < state.bombs.length; i++) {
        expect(copy.bombs[i]).not.toBe(state.bombs[i]);
        expect(copy.bombs[i].row).toBe(state.bombs[i].row);
        expect(copy.bombs[i].col).toBe(state.bombs[i].col);
        expect(copy.bombs[i].explode_in_round).toBe(state.bombs[i].explode_in_round);
      }
      expect(copy.board).not.toBe(state.board);
      expect(copy.board).toEqual(state.board);
    });
  });

  describe('checkWinner', () => {
    const makeState = (board: number[][]): PlayState => ({
      board,
      round: 1,
      coin_id: 1,
      bombs: [],
      bot: 'TestBot',
    });

    it('should recognize if nobody wins on empty board', () => {
      const board = [
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
      ];
      const score = ai.checkWinner(makeState(board));
      expect(score).toBe(0);
    });

    it('should recognize if nobody wins on filled board', () => {
      const board = [
        [0, 2, 1, 0, 1, 1, 0],
        [0, 1, 2, 0, 0, 0, 0],
        [0, 2, 2, 0, 0, 0, 0],
        [0, 1, 0, 0, 0, 0, 0],
        [0, 1, 0, 0, 0, 0, 0],
        [0, 1, 0, 0, 0, 0, 0],
      ];
      const score = ai.checkWinner(makeState(board));
      expect(score).toBe(0);
    });

    it('should recognize a horizontal win', () => {
      const board = [
        [0, 1, 1, 1, 1, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
      ];
      const score = ai.checkWinner(makeState(board));
      expect(score).toBe(1);
    });

    it('should recognize a vertical win', () => {
      const board = [
        [0, 1, 0, 0, 0, 0, 0],
        [0, 1, 0, 0, 0, 0, 0],
        [0, 1, 0, 0, 0, 0, 0],
        [0, 1, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
      ];
      const score = ai.checkWinner(makeState(board));
      expect(score).toBe(1);
    });

    it('should recognize a diagonal win', () => {
      const board = [
        [0, 1, 2, 2, 2, 1, 0],
        [0, 0, 1, 1, 2, 2, 0],
        [0, 0, 0, 1, 2, 1, 0],
        [0, 0, 0, 0, 1, 2, 0],
        [0, 0, 0, 0, 0, 1, 0],
        [0, 0, 0, 0, 0, 0, 0],
      ];
      const score = ai.checkWinner(makeState(board));
      expect(score).toBe(1);
    });

    it('should recognize a win for player 2', () => {
      const board = [
        [1, 2, 1, 0, 0, 0, 0],
        [1, 2, 0, 0, 0, 0, 0],
        [1, 2, 0, 0, 0, 0, 0],
        [2, 2, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
      ];
      const score = ai.checkWinner(makeState(board));
      expect(score).toBe(2);
    });

    it('should recognize if both players win', () => {
      const board = [
        [0, 0, 1, 2, 0, 0, 0],
        [0, 0, 1, 2, 0, 0, 0],
        [0, 0, 1, 2, 0, 0, 0],
        [0, 0, 1, 2, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
      ];
      const score = ai.checkWinner(makeState(board));
      expect(score).toBe(3);
    });
  })

  describe('calculateBoardScore', () => {

    const makeState = (board: number[][]): PlayState => ({
      board,
      round: 1,
      coin_id: 1,
      bombs: [],
      bot: 'TestBot',
    });

    it('should return 0 for an empty board', () => {
      const board = Array(6).fill(Array(7).fill(0));
      expect(ai.calculateBoardScore(makeState(board), 1)).toBe(0);
    });

    it('should reward 4 in a row with 10000', () => {
      expect(
        ai.calculateBoardScore(
          makeState([
            [1, 1, 1, 1, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
          ]), 1)
      ).toBe(10000);
      expect(
        ai.calculateBoardScore(
          makeState([
            [0, 0, 0, 0, 1, 0, 0],
            [0, 0, 0, 0, 1, 0, 0],
            [0, 0, 0, 0, 1, 0, 0],
            [0, 0, 0, 0, 1, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
          ]), 1)
      ).toBe(10000);
    });

    it('should reward 3 in a row with 100', () => {
      const board = [
        [1, 1, 1, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
      ];
      const score = ai.calculateBoardScore(makeState(board), 1);
      expect(score).toBe(100);
    });

    it('should reward 2 in a row with 10', () => {
      const board = [
        [1, 1, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
      ];
      const score = ai.calculateBoardScore(makeState(board), 1);
      expect(score).toBe(10);
    });

    it('should penalize single positions adjacent to bombs (-50 per side)', () => {
      let board = [
        [1, 99, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
      ];
      const score = ai.calculateBoardScore(makeState(board), 1);
      expect(score).toBe(-50);
    });

    it('should penalize multiple positions adjacent to bombs (-50 per side)', () => {
      let board = [
        [0, 1, 99, 1, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
      ];
      const score = ai.calculateBoardScore(makeState(board), 1);
      expect(score).toBe(-100);
    });

    it('should handle diagonal streaks correctly', () => {
      const board = [
        [1, 0, 0, 0, 0, 0, 0],
        [0, 1, 0, 0, 0, 0, 0],
        [0, 0, 1, 0, 0, 0, 0],
        [0, 0, 0, 1, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
      ];
      const score = ai.calculateBoardScore(makeState(board), 1);
      expect(score).toBe(10000);
    });

    it('should ignore opponent pieces', () => {
      const board = [
        [2, 2, 2, 2, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
      ];
      const score = ai.calculateBoardScore(makeState(board), 1);
      expect(score).toBe(0);
    });

    it('should count streaks with blocked start but open end', () => {
      const board = [
        [2, 2, 2, 2, 2, 2, 0],
        [0, 1, 2, 2, 2, 2, 0],
        [0, 0, 1, 2, 2, 2, 0],
        [0, 0, 0, 1, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
      ];
      const score = ai.calculateBoardScore(makeState(board), 1);
      expect(score).toBe(100);
    });

    it('should count streaks with blocked end but open start', () => {
      const board = [
        [0, 2, 2, 2, 2, 2, 0],
        [0, 1, 2, 2, 2, 2, 0],
        [0, 0, 1, 2, 2, 2, 0],
        [0, 0, 0, 1, 2, 0, 0],
        [0, 0, 0, 0, 2, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
      ];
      const score = ai.calculateBoardScore(makeState(board), 1);
      expect(score).toBe(100);
    });

    it('should not count blocked streaks into score', () => {
      const board = [
        [2, 1, 1, 1, 2, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
      ];
      const score = ai.calculateBoardScore(makeState(board), 1);
      expect(score).toBe(0);
    });

    it('should recognize borders at start as blocker', () => {
      const board = [
        [1, 1, 1, 2, 2, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
      ];
      const score = ai.calculateBoardScore(makeState(board), 1);
      expect(score).toBe(0);
    });

    it('should recognize borders at end as blocker', () => {
      const board = [
        [0, 2, 2, 2, 1, 1, 1],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
      ];
      const score = ai.calculateBoardScore(makeState(board), 1);
      expect(score).toBe(0);
    });

    it('should double chains with open start and open end', () => {
      const board = [
        [0, 2, 2, 2, 0, 0, 0],
        [0, 1, 1, 1, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
      ];
      const score = ai.calculateBoardScore(makeState(board), 1);
      expect(score).toBe(200);
    });

    it('should correctly calculate crossing chains', () => {
      const board = [
        [0, 0, 0, 1, 2, 0, 0],
        [0, 0, 0, 1, 1, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
      ];
      const score = ai.calculateBoardScore(makeState(board), 1);
      expect(score).toBe(40);
    });
  });
});
