package bot

import (
	"connect4-bot/internal/model"
	"math/rand"
	"time"
)

// RandomBot implements the Bot interface for an example bot.
// The bot makes decisions based on the player's Y position and adjusts its flying state.
type RandomBot struct {
	// selected column for the next turn
	column int
}

// Run processes the current game state and determines the next selected column.
// In this implementation, the bot simply select a random column for the next turn
func (b *RandomBot) Run(state *model.PlayState) int {
	source := rand.NewSource(time.Now().UnixNano())
	random := rand.New(source)
	return random.Intn(7)
}

// GetName returns the name of the bot. This name is used for creating the WebSocket URL
// and displaying the bot's name within the game.
func (b *RandomBot) GetName() string {
	return "RandomBotGo"
}
