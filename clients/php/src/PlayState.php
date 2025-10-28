<?php

declare(strict_types=1);

namespace Fourconnectxtreme\Php;

use Stringable;

use function array_map;
use function array_reverse;
use function implode;
use function str_pad;

use const STR_PAD_LEFT;

final readonly class PlayState implements Stringable
{
    /**
     * @param Bomb[] $bombs
     * @param int[][] $board
     */
    public function __construct(
        private string $bot,
        private int $coin_id,
        private int $round,
        private array $bombs,
        private array $board
    ) {}

    public function bot(): string
    {
        return $this->bot;
    }

    public function coinId(): int
    {
        return $this->coin_id;
    }

    public function round(): int
    {
        return $this->round;
    }

    public function bombs(): array
    {
        return $this->bombs;
    }

    public function board(): array
    {
        return $this->board;
    }

    public function __toString(): string
    {
        $bombs = implode("\n", array_map(static function ($a) {
            return (string)$a;
        }, $this->bombs));
        $board = implode("\n", array_map(static function ($a) {
            return implode(',', array_map(static function ($b) {
                return str_pad((string)$b, 2, " ", STR_PAD_LEFT);
            }, $a));
        }, array_reverse($this->board)));

        return <<<TEXT
bot: $this->bot
coinId: $this->coin_id
round: $this->round
bombs:
$bombs
board:
$board
TEXT;
    }
}
