package cb.bots;

import cb.PlayState;

public class MyAI implements BotAi {
    private int column = 0;
    private int myCoinId = -1;

    public MyAI() {
    }

    @Override
    public int play(PlayState playState) {
        if (myCoinId == -1) {
            myCoinId = playState.getCoinId();
        }
        //  todo: put your logic code here
        return column;
    }

    @Override
    public String getName() {
        //  todo: give your bot a super duper cool name
        return "YourBotName";
    }
}
