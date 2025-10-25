import { BotAI } from './botAI';
import { RandomAI } from './randomAI';
import { SamuAi1 } from './samu-ai-1';
import { SamuAi2 } from './samu-ai-2';

const aiBots: Record<string, new () => BotAI> = {
  'RandomAI': RandomAI,
  'SamuAi1': SamuAi1,
  'SamuAi2': SamuAi2,
};

export function aiFactory(botSelection: string = 'MyAI'): BotAI {
  const BotClass = aiBots[botSelection];
  if (!BotClass) {
    throw new Error(`Bot type '${botSelection}' not found`);
  }
  return new BotClass();
}
