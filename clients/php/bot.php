<?php

declare(strict_types=1);

use Fourconnectxtreme\Php\Bot\Random;
use Fourconnectxtreme\Php\Client;

include_once 'vendor/autoload.php';

$options = getopt('', ['port::', 'name::']);
$port    = (int)($options['port'] ?? 5051);
$name    = $options['name'] ?? "Rando_McRandRand";

// TODO: change this bot with your Champion implementation
$bot = new Random();

$client = Client::create($bot, $port, $name);
try {
    $client->process();
} catch (Exception $exception) {
    printf("Exception: %s, closing", $exception->getMessage());
}
