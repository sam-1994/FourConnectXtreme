# Einen Client mit dem Server verbinden (C#)
Note: Passe eventuell in der CsharpClient.csproj und der Bots.csproj die .net version an die auf deinem System an.

Den C# Client starten <br>
(mit den Settings aus csharpClient\Client\Properties\launch.json)

```
cd csharpClient\Client
dotnet run
```

| Parmeter | Switch         | Beschreibung                                  | Default   |
|----------|----------------|-----------------------------------------------|-----------|
 BotName  | -n or --name   | Name der KI, die gestartet werden soll        | UserBot   |
 Server   | -s or --server | Serveradresse (ip oder dns)                   | localhost |
 Port     | -p or --port   | Port des 4 Connect Servers auf dem Zielserver | 8765      |

Wenn ihr also mehrere Bots geschrieben habt, könnt ihr mit dem Namen das ganze umschalten.
Es ist aber natürlich auch ausreichend den Default zu belassen und alles im "MyAi" zu machen.