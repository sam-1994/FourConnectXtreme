<?php

declare(strict_types=1);

namespace Fourconnectxtreme\Php;

use Stringable;

final readonly class Bomb implements Stringable
{
    public function __construct(private int $row, private int $col, private int $explode_in_round) {}

    public function row(): int
    {
        return $this->row;
    }

    public function col(): int
    {
        return $this->col;
    }

    public function explodeInRound(): int
    {
        return $this->explode_in_round;
    }

    public function __toString(): string
    {
        return <<<TEXT
row: $this->row; col: $this->col; explodeInRound: $this->explode_in_round
TEXT;
    }
}
