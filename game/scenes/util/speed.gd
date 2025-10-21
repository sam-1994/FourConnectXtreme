extends Control

@onready var speed_control: HSlider = %SpeedControl
@onready var speed_value: Label = %SpeedValue

func _ready() -> void:
	speed_value.set_text("x" + str(GameManager.speed))
	speed_control.value = GameManager.speed

func _on_speed_control_value_changed(value: float) -> void:
	GameManager.speed = value
	speed_value.set_text("x" + str(GameManager.speed))
	
