using CommandLine;
using CsClient.Bots.Internal;
using CsClient.CsharpClient;

var result = Parser.Default.ParseArguments<Options>(args);

if (result.Tag == ParserResultType.NotParsed)
{
    OnError(result.Errors);
    return -1;
}

await Run(result.Value);
return 0;

static async Task Run(Options o)
{
#if DEBUG
    Console.WriteLine("Debug Mode");
#endif

    string serverUrl = $"ws://{o.Server}:{o.Port}";
    Console.WriteLine($"Run Bot {o.Name} with Serveraddress: {serverUrl}");

    Connect4WebsocketClient myClient = new Connect4WebsocketClient(
        BotFactory.GetBotByName(o.Name!));

    myClient.OnOpen += (s, e) => { Console.WriteLine("Connected!"); };
    myClient.OnClose += async (s, e) =>
    {
        await myClient.Disconnect();
        Console.WriteLine("Closed");
    };

    await myClient.Connect(serverUrl);
}

static void OnError(IEnumerable<Error> errors)
{
    Console.WriteLine(string.Join(Environment.NewLine, errors));
}

public class Options
{
    [Option('n', "name", Default = "MyAi", HelpText = "Name for your bot")]
    public string? Name { get; set; }

    [Option('s', "server", Default = "localhost", HelpText = "Server with running Connect 4 Service")]
    public string? Server { get; set; }

    [Option('p', "port", Default = 5051, HelpText = "Used Port for server connection")]
    public int Port { get; set; }
}