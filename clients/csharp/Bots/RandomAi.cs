using CsClient.Bots.Internal;

namespace CsClient.Bots
{
    public class RandomAi : IBot
    {
        /// <inheritdoc/>
        public string Name { get; }

        /// <inheritdoc/>
        public int Play(PlayState? playState)
        {
            Random random = new Random();
            return random.Next(0, 7);
        }

        public RandomAi()
        {
            Name = "RandomAiCSharp";
        }
    }
}