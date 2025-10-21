package model

// Bomb represents the bomb's attributes within the game.
type Bomb struct {
	Row             int `json:"row"`               // row of the bomb
	Col             int `json:"col"`               // column of the bomb
	ExplodedInRound int `json:"exploded_in_round"` // round when the bomb explodes
}

// PlayState represents the state of the game at any given moment.
type PlayState struct {
	Bot    string  `json:"bot"`     // name of the bot
	CoinId int     `json:"coin_id"` // bot's coin ID
	Round  int     `json:"round"`   // Current round of the match
	Bombs  []Bomb  `json:"bombs"`   // List of bombs in the game
	Board  [][]int `json:"board"`   // current representation of the game board
}
