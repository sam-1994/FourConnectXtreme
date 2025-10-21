# Einen Client mit dem Server verbinden (Java)

Den Java Client starten:

```  
cd javaClient   # in den javaClient Ordner wechseln
.\gradlew run   # startet den JavaCleint mit den Standard Settings
```

Um einen anderen Port oder eine andere KI zu verwenden:

```  
.\gradlew run --args="<BotName> <Port>"
``` 

| Parameter | Beschreibung                                           |
|-----------|--------------------------------------------------------|
| BotName   | Name der KI, die gestartet werden soll (default: MyAI) |
| Port      | Port des Servers (default: 5051)                       |

Möchtest du beispielsweise deine eigene KI MyBot starten und der Server läuft auf 5555:

```  
.\gradlew run --args="MyBot 5555"
``` 