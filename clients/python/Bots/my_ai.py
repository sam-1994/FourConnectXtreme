from Bots.bot_ai import BotAI
from Bots.data import PlayState


class MyAI(BotAI):
    column = 0
    my_coin_id = -1

    def play(self, state: PlayState):
        if self.my_coin_id == -1:
            self.my_coin_id = state.coin_id
        # todo: put your logic code here
        return self.column

    def get_name(self):
        return self.name

    def __init__(self):
        # todo: give your bot a super duper cool name
        self.name = "MyAi"
