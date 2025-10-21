extends CharacterBody2D
class_name Coin

@onready var animation: AnimatedSprite2D = %Sprite2D
@onready var coin_dropped_audio = $coin_dropped_audio
@onready var coin_movement_audio = $coin_movement_audio
@onready var coin_explode_audio = $coin_explode_audio

var chip_green: Resource = preload("res://assets/graphics/coin_green.png")
var moving: bool = true
var column: int = 0
var row: int = 0
const coin_drop_sound = preload("res://assets/sounds/chip_dropped.mp3")
var drop_speed := 800.0
signal end_movement(column)
var already_dropped_once: bool = false

signal exploded

func _ready():
	coin_movement_audio.play(0.15)
	GameManager.setState(GameManager.GameState.ITEM_FALLING)
	
func set_column(col: int):
	column = col
	
func set_row(r: int):
	row = r
	
func change_chip():
	animation.play("green")
	
func is_wrong():
	if animation.animation == "green":
		animation.play("green_wrong")
	if animation.animation == "red":
		animation.play("red_wrong")

func _set_drop_speed() -> float:
	return drop_speed * GameManager.speed
	
func _physics_process(delta):
	velocity.y = _set_drop_speed()
	if moving:
		var collision := move_and_collide(velocity * delta,false,0.0,false)
		if collision:
			position.y -= collision.get_depth()
			coin_dropped_audio.play(0.08)
			if not already_dropped_once:
				end_movement.emit(column)
			moving = false
			already_dropped_once = true
			
	if not test_move(transform,velocity * delta) and not moving:
		var movement_starting_point = randf_range(0,0.2)
		coin_movement_audio.play(movement_starting_point)
		moving = true
			
	
func highlight() -> void:
	# we can change the image.. this is just for visualization
	self.modulate = Color(255.0, 255.0, 255.0, 1.0)

func explode() -> void:
	var explosion_starting_point = randf_range(0,0.2)
	coin_explode_audio.play(explosion_starting_point)
	animation.play("explode")
	
func _on_sprite_2d_animation_finished() -> void:
	exploded.emit()
	queue_free()
