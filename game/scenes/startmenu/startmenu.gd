extends Node

@onready var games: SpinBox = $Panel/GamePanel/VBoxContainer/HBoxContainer/Games
@onready var player_one_name: Label = %PlayerOneName
@onready var player_two_name: Label = %PlayerTwoName

@onready var current_port_number: SpinBox = $Port/HBoxContainer/port_number


func _ready():
	current_port_number.set_value_no_signal(WebsocketServer.port)
	
func _process(_delta: float) -> void:
	Designer.set_label_text(player_one_name, WebsocketServer.get_player_one().name, 26, 150.0)
	Designer.set_label_text(player_two_name, WebsocketServer.get_player_two().name, 26, 150.0)
	
func _on_button_pressed():
	var amount = int(games.value)
	GameManager.init(amount)
	get_tree().change_scene_to_file("res://scenes/game/game.tscn")

func _on_port_number_value_changed(value: int):
	WebsocketServer.restart_server_on(int(value))
