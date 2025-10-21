from Bots.bot_ai import BotAI
from Bots.my_ai import MyAI
from Bots.random_ai import RandomAI

ai_bots = {
    "MyAI": MyAI,
    "RandomAI": RandomAI,
}


def ai_factory(bot_selection="MyAI") -> BotAI:
    return ai_bots[bot_selection]()
