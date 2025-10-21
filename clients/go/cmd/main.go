package main

import (
	"flag"
	"fmt"
	"log"

	"connect4-bot/internal/bot"
	"connect4-bot/internal/websocket"
)

func main() {
	// Define command-line arguments
	port := flag.Int("port", 5051, "Port on which the game server listens")
	botType := flag.String("bot", "MyBot", "Name of the bot to be used")
	buffer := flag.Int("buffer", 50, "Size of the channel buffer")

	// Parse the command-line arguments
	flag.Parse()

	// Print the port and selected bot information
	fmt.Printf("Server listens on port: %d\n", *port)
	fmt.Printf("Selected bot: %s\n", *botType)
	fmt.Printf("Channel buffer size: %d\n", *buffer)

	// Use the BotFactory to create the desired bot
	factory := &bot.BotFactory{}
	myBot, err := factory.NewBot(*botType)
	if err != nil {
		log.Fatal("Error creating the bot:", err)
	}

	// Create and connect the WebSocket client
	client := websocket.NewClient(myBot, *port, *buffer)

	err = client.Connect()
	if err != nil {
		log.Fatal("Connection failed:", err)
	}

	// Print bot connection success
	fmt.Println("Bot connected:", myBot.GetName())

	// Start goroutines
	go client.Listen()          // Listen for WebSocket messages and convert to PlayState
	go client.ProcessMessages() // Asynchronously process PlayState messages

	// Block the main thread to keep the program running
	select {}
}
