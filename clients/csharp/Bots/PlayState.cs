using System.Text.Json.Serialization;

namespace CsClient.Bots
{
    /// <summary>
    /// Antwortdata vom Server bzgl. game data
    /// </summary>
    public class PlayState
    {
        [JsonPropertyName("bot")] public string Bot { get; set; }

        [JsonPropertyName("coin_id")] public int CoinId { get; set; }

        [JsonPropertyName("round")] public int Round { get; set; }

        [JsonPropertyName("bombs")] public List<Bomb> Bombs { get; set; }

        [JsonPropertyName("board")] public List<List<int>> Board { get; set; }

        public PlayState()
        {
        }

        public PlayState(string bot, int coinId, int round, List<Bomb> bombs, List<List<int>> board)
        {
            Bot = bot;
            CoinId = coinId;
            Round = round;
            Bombs = bombs;
            Board = board;
        }
    }
}