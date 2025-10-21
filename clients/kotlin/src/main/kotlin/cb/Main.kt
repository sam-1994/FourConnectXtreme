package cb

import cb.fourconnect.FourConnectMain
import kotlinx.cli.ArgParser
import kotlinx.cli.ArgType
import kotlinx.cli.optional

fun main(args: Array<String>) {
    val parser = ArgParser("CodingBuddies-kotlin-bots")
    val botName by parser.argument(ArgType.String, description = "Bot's Name").optional()
    val portNumber by parser.argument(ArgType.Int, description = "Port's Number").optional()
    println(parser.parse(args))
    val botNameInfo = botName ?: "Null -> default value 'MyAI' is used"
    val portNumberInfo = portNumber ?: "Null -> default value '5051' is used"
    println("Selected bot name is $botNameInfo and port number is $portNumberInfo")
    FourConnectMain.start(botName = botName, port = portNumber)
}