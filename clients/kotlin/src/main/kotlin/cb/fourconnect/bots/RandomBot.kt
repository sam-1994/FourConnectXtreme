package cb.fourconnect.bots

import cb.WebsocketClient
import cb.fourconnect.game.GameData
import cb.fourconnect.game.Response
import kotlin.random.Random

class RandomBot : FourConnectAI {
    override val name: String = "RandomBot"

    override fun play(gamePacket: GameData): Response {
        println(gamePacket)
        val col = Random.nextInt(0, 7)
        return Response(column = col)
    }
}

fun main() {
    val ai = RandomBot()
    WebsocketClient().connect<GameData, Response>(ai = ai, path = ai.name)
}