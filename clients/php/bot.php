<?php

declare(strict_types=1);

use Fourconnectxtreme\Php\Bot\Factory;
use Fourconnectxtreme\Php\Client;

include_once 'vendor/autoload.php';

$options = getopt('', ['port::', 'name::']);
$port    = (int)($options['port'] ?? 5051);
$name    = $options['name'] ?? 'Rando_McRandRand';

$bot    = Factory::create($name);
$client = Client::create($bot, $port);
try {
    $client->process();
} catch (Exception $exception) {
    printf("Exception: %s, closing", $exception->getMessage());
}
