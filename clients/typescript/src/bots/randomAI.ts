import {BotAI} from './botAI';
import {PlayState} from './data';

export class RandomAI implements BotAI {
    private name: string = 'TypeScriptTestBot';

    play(currentGameState: PlayState): number {
        console.log("Your Coin ID is: " + currentGameState.coin_id);
        console.log(currentGameState.board)
        const randomColumn: number = Math.floor(Math.random() * 7);
        return randomColumn;
    }

    getName(): string {
        return this.name;
    }
}
