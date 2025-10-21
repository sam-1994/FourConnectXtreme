extends Node

@onready var games_played: Label = %games_played
@onready var player_1_name: Label = %player1_name
@onready var player_2_name: Label = %player2_name
@onready var player_1_wins = %player1_wins
@onready var player_2_wins: Label = %player2_wins
@onready var winning_msg = %winning_msg

func _ready():
	
	winning_msg.set_text(GameManager.get_winner_name() + " hat's gerissen!")
	games_played.set_text("Games played: " + str(GameManager.games_total))
	player_1_name.set_text(str(WebsocketServer.get_player_one().name) + " wins:")
	player_2_name.set_text(str(WebsocketServer.get_player_two().name) + " wins:")
	player_1_wins.set_text(str(GameManager.player_1_score))
	player_2_wins.set_text(str(GameManager.player_2_score))

func _on_continue_button_pressed():
	get_tree().change_scene_to_file("res://scenes/startmenu/startmenu.tscn")
