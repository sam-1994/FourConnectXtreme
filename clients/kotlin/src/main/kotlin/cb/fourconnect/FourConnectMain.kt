package cb.fourconnect

import cb.WebsocketClient
import cb.fourconnect.bots.FourConnectAIFactory
import cb.fourconnect.game.GameData
import cb.fourconnect.game.Response
import kotlinx.cli.ArgParser
import kotlinx.cli.ArgType
import kotlinx.cli.default
import kotlinx.cli.optional

object FourConnectMain
{
    fun start(botName: String? = "MyAI", port: Int? = 5051)
    {
        val botNameValue = botName ?: "MyAI"
        val portValue = port ?: 5051
        val ai = FourConnectAIFactory.create(botNameValue)
        WebsocketClient().connect<GameData, Response>(ai = ai, port = portValue, path = ai.name)
    }
}