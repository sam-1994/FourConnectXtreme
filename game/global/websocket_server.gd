extends Node

var websocket: WebSocketMultiplayerPeer
var clients = []
var player_one_active = true
var MAX_CLIENTS = 2
var port = 5051
var default_name = "Human"

var tic: int = 0
var toc: int = 0

var player_timeout: Timer
var timeout_duration_sec = 0.7

signal client_data_received()

func _ready():
	_create_default_clients()
	restart_server_on(port)
	player_timeout = Timer.new()
	player_timeout.one_shot = true
	add_child(player_timeout)
	
	
func _create_default_clients():
	for i in range(MAX_CLIENTS):
		clients.append({
			"id": i + 1,
			"peer": -1,
			"last_column_played": -1,
			"name": default_name + str(i+1)
	})	
	
func restart_server_on(new_port):
	port = new_port
	if websocket:
		websocket.close()
		websocket = null
	websocket = WebSocketMultiplayerPeer.new()
	websocket.create_server(new_port)
	websocket.set_max_queued_packets(1)
	websocket.peer_connected.connect(func(peer): _on_client_connected(peer))
	websocket.peer_disconnected.connect(func(peer): _on_client_disconnected(peer))

func _physics_process(_delta: float) -> void:
	websocket.poll()
	if has_bots() and websocket.get_available_packet_count() > 0:
		var peer = websocket.get_packet_peer()
		var packet = websocket.get_packet()
		_on_data_received(peer, packet)

func _client_to_connect() -> int:
	for i in range(clients.size()):
		if clients[i].peer == -1:
			return i
	return -1

func _client_can_connect() -> bool:
	return _client_to_connect() != -1

func _on_client_connected(peer):
	if _client_can_connect():
		var req_url = websocket.get_peer(peer).get_requested_url()
		var url_parts = Array(req_url.split("/"))
		var player_name = url_parts.back()
		var client_idx = _client_to_connect()
		clients[client_idx].peer = peer
		clients[client_idx].name = player_name
		print("Client verbunden auf peer: ", peer, " mit name: ", player_name)
	print(clients)

func _on_client_disconnected(peer):
	print("Client getrennt: %d" % peer)
	for client in clients:
		if client.peer == peer:
			client.peer = -1
			client.name = default_name
			client.last_column_played = -1

func get_player_one():
	return clients[0]
	
func is_player_one_bot() -> bool:
	return get_player_one().peer != -1
	
func get_player_two():
	return clients[1]

func is_player_two_bot() -> bool:
	return get_player_two().peer != -1

func has_bots() -> bool:
	return is_player_one_bot() or is_player_two_bot()
	
func has_human() -> bool:
	return !is_player_one_bot() or !is_player_two_bot()

func get_active_bot():
	var active_client
	if player_one_active:
		active_client = clients[0]
	else:
		active_client = clients[1]
	
	if active_client.peer != -1:
		return active_client
	else:
		return null

func _on_data_received(peer, packet):
	var req_url = websocket.get_peer(peer).get_requested_url()
	var url_parts = Array(req_url.split("/"))
	var player_name = url_parts.back()
	var msg = packet.get_string_from_utf8()
	var parsed_object = JSON.parse_string(msg)
	
	var active_bot = get_active_bot()
	if active_bot and active_bot.name == player_name:
		toc = Time.get_ticks_msec()
		print("Active Bot: ", active_bot.name)
		print("DEBUG roundtrip time in ms: ", (toc - tic))
		if player_timeout.is_stopped():
			print("Bot has timeout! Discard Data")
			return
			
		player_timeout.stop()
		active_bot.last_column_played = parsed_object.column
		client_data_received.emit()

func send(data: String) -> void:
	tic = Time.get_ticks_msec()
	player_timeout.start(timeout_duration_sec)
	websocket.put_packet(data.to_utf8_buffer())
