extends Node

@onready var games_played: Label = %games_played
@onready var player_1_name: Label = %player1_name
@onready var player_2_name: Label = %player2_name
@onready var player_1_wins = %player1_wins
@onready var player_2_wins: Label = %player2_wins
@onready var winning_msg: Label = %winning_msg

func _ready():
	Designer.set_label_text(winning_msg, GameManager.get_winner_name() + " hat's gerissen!", 60, 700)
	games_played.set_text("Games played: " + str(GameManager.games_total))
	Designer.set_label_text(player_1_name, str(WebsocketServer.get_player_one().name) + " wins:", 30, 550)
	Designer.set_label_text(player_2_name, str(WebsocketServer.get_player_two().name) + " wins:", 30, 550)
	player_1_wins.set_text(str(GameManager.player_1_score))
	player_1_wins.add_theme_font_size_override("font_size", player_1_name.get_theme_font_size("font_size"))
	player_2_wins.set_text(str(GameManager.player_2_score))
	player_2_wins.add_theme_font_size_override("font_size", player_2_name.get_theme_font_size("font_size"))

func _on_continue_button_pressed():
	get_tree().change_scene_to_file("res://scenes/startmenu/startmenu.tscn")
