extends Node

enum GameState {
	STARTED,
	NEXT,
	ITEM_FALLING,
	EXPLOSION,
	FINISHED,
}

var player_1_score = 0
var player_2_score = 0

var starting_player_id = 1

var current_state: GameState = GameState.STARTED
var games_left: int = 1
var games_total: int

var gravity = 19
var collision_detection = RigidBody2D.CCD_MODE_CAST_SHAPE
var mass = 0.001

var volume = 75.0
var speed = 1.0

func init(games: int):
	player_1_score = 0
	player_2_score = 0
	games_left = games
	games_total = games
	self.setState(GameState.STARTED)
	
func getState() -> GameState:
	return self.current_state
	
func get_winner_name() -> String:
	if player_1_score > player_2_score:
		return WebsocketServer.get_player_one().name
	elif player_2_score > player_1_score:
		return WebsocketServer.get_player_two().name
	else:
		return "Keiner"

func set_next_starting_player():
	if starting_player_id == 1:
		starting_player_id = 2
		WebsocketServer.player_one_active = false
	else:
		starting_player_id = 1
		WebsocketServer.player_one_active = true
		
func setState(state: GameState): 
	self.current_state = state
	
func won(player_ids: Array[int]):
	for id in player_ids:
		if id == 1:
			GameManager.player_1_score += 1
		else:
			GameManager.player_2_score += 1
	GameManager.games_left -= 1
