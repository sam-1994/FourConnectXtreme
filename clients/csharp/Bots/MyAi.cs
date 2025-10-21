using CsClient.Bots.Internal;

namespace CsClient.Bots
{
    public class MyAi : IBot
    {
        private int MyCoinID = -1;

        /// <inheritdoc/>
        public string Name { get; }

        /// <inheritdoc/>
        public int Play(PlayState? playState)
        {
            if (MyCoinID == -1)
            {
                MyCoinID = playState!.CoinId;
            }

            // put your logic here
            return 0;
        }

        public MyAi()
        {
            // give your bot a super duper cool name
            Name = "YourNameHere";
        }
    }
}