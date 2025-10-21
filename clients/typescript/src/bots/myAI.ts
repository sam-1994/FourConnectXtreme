import { BotAI } from './botAI';
import { PlayState } from './data';

export class MyAI implements BotAI {
  private name: string = 'YourBotName';

  play(currentGameState: PlayState): number {
    console.log("Your Coin ID is: " + currentGameState.coin_id);
    return 0;
  }

  getName(): string {
    return this.name;
  }
}
