using System.Text.Json.Serialization;

namespace CsClient.Bots
{
    public class Bomb
    {
        [JsonPropertyName("row")] public int Row { get; set; }

        [JsonPropertyName("col")] public int Col { get; set; }

        [JsonPropertyName("explode_in_round")] public int ExplodeInRound { get; set; }

        [JsonConstructor]
        public Bomb(int row, int col, int explodeInRound)
        {
            Row = row;
            Col = col;
            ExplodeInRound = explodeInRound;
        }
    }
}