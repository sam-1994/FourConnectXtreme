package cb.bots;

import cb.PlayState;

public interface BotAi {

    int play(PlayState playState);

    String getName();
}
