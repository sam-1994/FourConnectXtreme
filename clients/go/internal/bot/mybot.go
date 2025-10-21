package bot

import "connect4-bot/internal/model"

// MyBot implements the Bot interface for your connect 4 bot.
type MyBot struct {
	// selected column for the next turn
	column int
}

// Run processes the current game state and determines the next selected column.
// In this implementation, the bot simply does nothing right now.
func (b *MyBot) Run(state *model.PlayState) int {
	println("Your Coin ID:", state.CoinId)
	// implement your logic here
	return 0
}

// GetName returns the name of the bot. This name is used for creating the WebSocket URL
// and displaying the bot's name within the game.
func (b *MyBot) GetName() string {
	return "YourAwesomeBotNameHere"
}
