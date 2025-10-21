extends Control

@onready var volume_label: Label = %VolumeLabel
@onready var volume: HSlider = $HBoxContainer/Volume


func _ready() -> void:
	volume_label.set_text(str(int(GameManager.volume)))
	volume.value = GameManager.volume
	_set_volume(GameManager.volume)
	

func _on_volume_value_changed(value: float) -> void:
	volume_label.set_text(str(int(value)))
	_set_volume(value)
	
	
func _set_volume(value: float) -> void:
	GameManager.volume = value
	var bus_idx = AudioServer.get_bus_index("Master")
	var volume_db = linear_to_db(value/100)
	AudioServer.set_bus_volume_db(bus_idx, volume_db)
