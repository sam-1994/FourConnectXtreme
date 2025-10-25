<?php

declare(strict_types=1);

namespace Fourconnectxtreme\Php\Bot;

use Fourconnectxtreme\Php\Bot;
use Fourconnectxtreme\Php\PlayState;
use Random\RandomException;

use function random_int;

final readonly class Random implements Bot
{

    /**
     * @throws RandomException
     */
    public function run(PlayState $playState): int
    {
        return random_int(0, 6);
    }
}
