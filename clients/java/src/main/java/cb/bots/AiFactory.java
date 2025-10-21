package cb.bots;

public class AiFactory {
    public static BotAi create(String type) {
        switch (type) {
            case "RandomAI":
                return new RandomAI();
            default:
                return new MyAI();
        }
    }
}
