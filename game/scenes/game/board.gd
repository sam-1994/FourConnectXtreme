extends Node2D

class_name Board

var board: Array[Array] = []
var max_columns: int = 7
var max_rows: int = 6
var last_insert: Vector2 = Vector2(0,0)

var winning_streak: int = 4
var winning_coins: Array[Vector2] = []

func _ready():
	init()
			
func init():
	winning_coins = []
	board = _empty_board(max_rows, max_columns)
			
func get_winning_coins() -> Array[Vector2]:
	return winning_coins

func insert(player_id: int, column: int) -> int:
	var free_row = get_free_row(column)
	if free_row != -1:
		board[free_row][column] = player_id
		last_insert = Vector2(column, free_row)
	return free_row
	
func get_free_row(column: int) -> int:
	for row in range(board.size()):
		if board[row][column] == 0:
			return row
	return -1
		
func is_winner(player_id: int) -> bool:
	var col = last_insert.x
	var row = last_insert.y
	var direction_array = [Vector2(1,0), Vector2(0,-1), Vector2(1,1), Vector2(1,-1)]
	for direction in direction_array:
		var coin_list: Array[Vector2] = [Vector2(row,col)]
		coin_list.append_array(_count_in_direction(row, col, direction, player_id))
		coin_list.append_array(_count_in_direction(row, col, -direction, player_id))
		if len(coin_list) >= winning_streak:
			winning_coins = coin_list
			return true
	return false
	
func has_winner_from_cell(row: int, col: int) -> int:
	var player_id = board[row][col]
	if player_id == 0:
		return 0
	var direction_array = [Vector2(1,0), Vector2(0,-1), Vector2(1,1), Vector2(1,-1)]
	for direction in direction_array:
		var coin_list: Array[Vector2] = [Vector2(row, col)]
		coin_list.append_array(_count_in_direction(row, col, direction, player_id))
		coin_list.append_array(_count_in_direction(row, col, -direction, player_id))
		if coin_list.size() >= winning_streak:
			winning_coins = coin_list
			return player_id
	return 0
	
func detect_winner_full_scan() -> int:
	for r in range(max_rows):
		for c in range(max_columns):
			if board[r][c] != 0:
				var res = has_winner_from_cell(r, c)
				if res != 0:
					return res
	return 0
	
func _count_in_direction(row: int, col: int, direction: Vector2, player_id: int) -> Array[Vector2]:
	var count_list: Array[Vector2] = []
	row += direction.y
	col += direction.x
	while _in_bounds(row, col):
		if board[row][col] == player_id:
			count_list.append(Vector2(row,col))
			row += direction.y
			col += direction.x
		else:
			return count_list
	return count_list
	
func _in_bounds(row: int, col: int) -> bool:
	return true if 0 <= col && col < max_columns && 0 <= row && row < max_rows else false
	
func print_board():
	for row in range(board.size()-1,-1,-1):
		print(board[row])
	print("")

func _position_is_empty(row: int, col: int) -> bool:
	return board[row][col] == 0

func _empty_board(rows: int, cols: int) -> Array[Array]:
	var matrix: Array[Array] = []
	for r in range(rows):
		matrix.append([])
		for c in range(cols):
			matrix[r].append(0)
	return matrix

func _apply_gravity():
	var processed_board = _empty_board(max_rows, max_columns)
	var rows = board.size()
	var cols = board[0].size()
	
	for c in range(cols):
		var non_zeros = []
		for r in range(rows):
			var value = board[r][c]
			if value != 0:
				non_zeros.append(value)
		for r in range(non_zeros.size()):
			processed_board[r][c] = non_zeros[r]

	board = processed_board

func update_after_detonation(detonation_row: int, detonation_col: int) -> Array[Vector2]:
	var positions_to_check: Array[Vector2] = [
		Vector2(detonation_row, detonation_col - 1),
		Vector2(detonation_row, detonation_col + 1),
		Vector2(detonation_row + 1, detonation_col),
		Vector2(detonation_row - 1, detonation_col)
	]
	var exploding_coins: Array[Vector2] = []
	
	board[detonation_row][detonation_col] = 0
	for pos_to_check in positions_to_check:
		if _in_bounds(pos_to_check.x, pos_to_check.y) and not _position_is_empty(pos_to_check.x, pos_to_check.y):
			exploding_coins.append(pos_to_check)
			board[pos_to_check.x][pos_to_check.y] = 0
	_apply_gravity()
	return exploding_coins
