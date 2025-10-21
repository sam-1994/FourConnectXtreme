import { PlayState } from './data';

export interface BotAI {
  play(currentGameState: PlayState): number;
  getName(): string;
}
