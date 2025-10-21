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

    let url = "ws://localhost:5051";
    // todo: give your bot a super duper cool name
    let name = "MyAI";

    let my_four_connect_consumer = MyFourConnectConsumer {
        column: 0,
        my_coin_id: -1
    };

    if let Err(error) = FourConnectBot.start(url, name, my_four_connect_consumer).await {
        tracing::error!("{error}");
    };
}
