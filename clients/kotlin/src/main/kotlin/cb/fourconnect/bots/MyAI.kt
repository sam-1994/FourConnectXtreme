package cb.fourconnect.bots

import cb.WebsocketClient
import cb.fourconnect.game.GameData
import cb.fourconnect.game.Response

class MyAI : FourConnectAI {
    // todo: give your bot a super duper cool name
    override val name: String = "MyAI"
    var coinId: Int = -1

    override fun play(gamePacket: GameData): Response {
        if (coinId == -1) {
            coinId = gamePacket.coinId
        }

        // todo: put your logic code here
        return Response(0)
    }
}

fun main() {
    val ai = MyAI()
    WebsocketClient().connect<GameData, Response>(ai = ai, path = ai.name)
}