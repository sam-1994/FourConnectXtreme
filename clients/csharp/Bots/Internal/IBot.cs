

// ns is not corret, that is intendet

namespace CsClient.Bots.Internal
{
    public interface IBot
    {
        /// <summary>
        /// Name des Spielers.
        /// </summary>
        string Name { get; }
        /// <summary>
        /// Spielmethode.
        /// </summary>
        /// <param name="playState">Der aktuelle Spielzustand (Board, Bomben, aktuelle Runde)</param>
        /// <returns>Die gewünschte Spalte für den nächsten Chip</returns>
        int Play(PlayState playState);

    }
}
