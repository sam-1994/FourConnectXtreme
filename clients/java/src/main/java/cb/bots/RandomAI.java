package cb.bots;

import cb.PlayState;

import java.util.Random;

public class RandomAI implements BotAi {
    private int column = 0;

    public RandomAI() {
    }

    @Override
    public int play(PlayState playState) {
        Random random = new Random();
        column = random.nextInt(0, 7);
        return column;
    }

    @Override
    public String getName() {
        return "RandomBot";
    }
}
