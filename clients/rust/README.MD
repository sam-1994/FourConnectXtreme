# Four Connect Rust Client

Welcome to **Four Connect.rs**! This project offers a streamlined WebSocket client in Rust for the Coding Buddies Challenge, helping you quickly set up and handle WebSocket messaging in an async Rust environment.

## Getting Started

To dive in:
1. Head over to [four_connect_bot/src/main.rs](four_connect_bot/src/main.rs) to see a **basic setup**. This example shows you how to:
    - Implement the [FourConnectConsumer](four_connect_lib/src/lib.rs#L16) trait on a struct.
    - Start a WebSocket client with `FourConnectBot`, connecting to a game server and echoing back any received messages.

2. **Run the Example Bot**: You can test the echo bot immediately by running:
    ```bash
    cargo run --bin four_connect_bot
    ```

3. **Customize the example**:
   - You can **replace** the provided [MyFourConnectConsumer](four_connect_bot/src/main.rs#L8) struct or define your own that implements the [FourConnectConsumer](four_connect_lib/src/lib.rs#L16) trait.
   - To get started, specify the game server's WebSocket URL, adjust the name, customize the message handling logic in your consumer, and call the `start` method with your URL, name and consumer instance in the `main` function to establish the connection.

### Basic Echo Example:

Here’s the complete example from `main.rs`, demonstrating how to handle messages:

```rust
use async_trait::async_trait;
use four_connect_lib::{FourConnectBot, FourConnectConsumer, PlayState, Trigger};
use tracing::subscriber;
use tracing_subscriber::filter::LevelFilter;
use tracing_subscriber::FmtSubscriber;

struct MyFourConnectConsumer {
    column: i32,
    my_coin_id: i32
}

#[async_trait]
impl FourConnectConsumer for MyFourConnectConsumer {
    async fn handle_message(&mut self, play_state: PlayState) -> Trigger {
        if self.my_coin_id == -1 {
            self.my_coin_id = play_state.coin_id;
        }
        // Debug output for visibility
        tracing::debug!("{:?}", play_state);
       // todo: put your logic code here
        Trigger { state: "play".to_string(), column: self.column } // Return the Trigger message back out to the server
    }
}

#[tokio::main]
async fn main() {
    let subscriber = FmtSubscriber::builder()
        .with_max_level(LevelFilter::TRACE)
        .finish();

    subscriber::set_global_default(subscriber).expect("setting default subscriber failed");

    let url = "wss://echo.websocket.org";
    let name = "GrouvieImplementedTheFirstRustClient<3";

    let my_four_connect_consumer = MyFourConnectConsumer {
        column: i32,
        my_coin_id: i32
    };

    if let Err(error) = FourConnectBot.start(url, name, my_four_connect_consumer).await {
        tracing::error!("{error}");
    };
}
```

Happy coding with **Four Connect.rs**!