from random import randrange

from Bots.bot_ai import BotAI
from Bots.data import PlayState


class RandomAI(BotAI):
    column = 0

    def play(self, state: PlayState):
        col = randrange(0, 7)
        return col

    def _print_board(self, board):
        for row in board[::-1]:
            print(row)
        print("")

    def get_name(self):
        return self.name

    def __init__(self):
        self.name = "RandomAI"
