# Connect 4 Extreme Tournament - PHP client

## Overview

This is a PHP client for the Connect 4 Extreme game.

## Installation

### Prerequisites

- PHP 8.2 or higher
- composer

### Steps to install

1. **Install Dependencies**
   Make sure to install the necessary PHP dependencies. You can do this by running: ```composer install```

2. **Start the bot**
   You can start the bot with the following command: ```php bot.php```

3. **Configuration**
   You can configure the bot by passing arguments when starting the bot:
    - **`--port`**: Port where the game server is running (default: `5051`)
    - **`--name`**: Name of the bot (default: `Rando_McRandRand`; use `MyBot` for Champion)  
      Example: ```php bot.php --name="champion" --port="42069"```

There is a working example bot for testing which uses just random numbers.

### Create Your Own Bot

1. Implement the method stubs in src/Bot/Champion.php
2. Win

Good luck and have fun!
