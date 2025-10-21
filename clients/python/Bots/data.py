from __future__ import annotations

from abc import ABC, abstractmethod
from dataclasses import dataclass
from typing import List


class FromServerPacket(ABC):
    @staticmethod
    @abstractmethod
    def from_dict(data: dict) -> FromServerPacket:
        pass


@dataclass
class PlayState(FromServerPacket):
    bot: str
    coin_id: int
    round: int
    bombs: [dict[str, int]]
    board: List[List[int]]

    @staticmethod
    def from_dict(data: dict) -> PlayState:
        return PlayState(data["bot"], data["coin_id"], data["round"], data["bombs"], data["board"])
