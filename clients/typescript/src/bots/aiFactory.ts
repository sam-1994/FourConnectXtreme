import { BotAI } from './botAI';
import { RandomAI } from './randomAI';
import { MyAI } from './myAI';

const aiBots: Record<string, new () => BotAI> = {
  'RandomAI': RandomAI,
  'MyAI': MyAI,
};

export function aiFactory(botSelection: string = 'MyAI'): BotAI {
  const BotClass = aiBots[botSelection];
  if (!BotClass) {
    throw new Error(`Bot type '${botSelection}' not found`);
  }
  return new BotClass();
}
