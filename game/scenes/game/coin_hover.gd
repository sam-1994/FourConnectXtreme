extends TextureRect

const tile_size: int = 64
const offset: int = 5
const max_columns: int = 7
const height: int = 146

var chip_red: Resource = preload("res://assets/graphics/coin_red.png")
var chip_green: Resource = preload("res://assets/graphics/coin_green.png")

signal new_spawn_pos(position, column)

func _ready() -> void:
	WebsocketServer.client_data_received.connect(_on_client_data_received)
	_update_chip()

func _update_chip():
	self.texture = chip_red if WebsocketServer.player_one_active else chip_green
	
func update_chip_to_next_starting_player():
	_update_chip()
	
func _get_column(mouse_position) -> int:
	return (int(mouse_position.x) - 320) / tile_size
	
func _is_in_game_bounds(mouse_position) -> bool:
	var left_bound = offset * tile_size
	var right_bound = (offset + max_columns) * tile_size
	return mouse_position.x > left_bound and mouse_position.x < right_bound

func _calc_chip_position(mouse_position) -> Vector2:
	var column: int = _get_column(mouse_position)
	var processed_pos = Vector2(offset * tile_size + column * tile_size + tile_size/2, height)
	return processed_pos

func _on_client_data_received() -> void:
	var state = GameManager.getState()
	if state != GameManager.GameState.ITEM_FALLING and state != GameManager.GameState.FINISHED and state != GameManager.GameState.EXPLOSION:
		var bot = WebsocketServer.get_active_bot()
		if bot != null:
			var bot_col = bot.last_column_played
			var pos = Vector2(offset * tile_size + bot_col * tile_size + tile_size/2, height)
			new_spawn_pos.emit(pos, bot_col)
			_update_chip()

func _physics_process(delta: float) -> void:
	visible = WebsocketServer.get_active_bot() == null

func _input(event: InputEvent) -> void:	
	var mouse_position = get_viewport().get_mouse_position()
	if not _is_in_game_bounds(mouse_position):
		return 
	var pos = _calc_chip_position(mouse_position)
	if event is InputEventMouseMotion:
		set_position(pos  - get_rect().size / 2)
	if event.is_action_pressed("left_click"):
		if WebsocketServer.player_one_active and WebsocketServer.is_player_one_bot():
			return
		if not WebsocketServer.player_one_active and WebsocketServer.is_player_two_bot():
			return
		var state = GameManager.getState()
		if state != GameManager.GameState.ITEM_FALLING and state != GameManager.GameState.FINISHED and state != GameManager.GameState.EXPLOSION:
			new_spawn_pos.emit(pos, _get_column(mouse_position))
			_update_chip()
	
