<?php

declare(strict_types=1);

namespace Fourconnectxtreme\Php;

interface Bot
{
    public function run(PlayState $playState): int;
}
