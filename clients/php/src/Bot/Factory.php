<?php

declare(strict_types=1);

namespace Fourconnectxtreme\Php\Bot;

use Fourconnectxtreme\Php\Bot;
use UnhandledMatchError;

final readonly class Factory
{
    public static function create(string $name): Bot
    {
        try {
            return match ($name) {
                'MyBot'            => new Champion(),
                'Rando_McRandRand' => new Random(),
            };
        } catch (UnhandledMatchError) {
            throw new BotNotKnown($name);
        }
    }
}
