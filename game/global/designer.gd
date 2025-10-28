extends Node

func set_label_text(player_name: Label, text: String, font_size: int, max_width: float):
	_update_font_size_for(player_name, text, font_size, max_width)
	player_name.set_text(text)

func _update_font_size_for(text_label: Label, text: String, max_font_size: int, max_width) -> void:
	var min_font_size = 8
	var font = text_label.get_theme_font("font")
	if not font:
		return

	var font_size = max_font_size
	while font_size > min_font_size:
		var text_width = font.get_string_size(text, HORIZONTAL_ALIGNMENT_CENTER, -1, font_size).x
		if text_width <= max_width:
			break
		font_size -= 1
	text_label.add_theme_font_size_override("font_size", font_size)
