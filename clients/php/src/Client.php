<?php

declare(strict_types=1);

namespace Fourconnectxtreme\Php;

use Amp\ByteStream\BufferException;
use Amp\Http\Client\HttpException;
use Amp\Websocket\Client\WebsocketConnectException;
use Amp\Websocket\Client\WebsocketHandshake;
use Amp\Websocket\WebsocketClosedException;
use Exception;
use Symfony\Component\PropertyInfo\Extractor\PhpDocExtractor;
use Symfony\Component\PropertyInfo\PropertyInfoExtractor;
use Symfony\Component\Serializer\Encoder\JsonEncoder;
use Symfony\Component\Serializer\Exception\ExceptionInterface;
use Symfony\Component\Serializer\Normalizer\ArrayDenormalizer;
use Symfony\Component\Serializer\Normalizer\ObjectNormalizer;
use Symfony\Component\Serializer\Serializer;

use function Amp\Websocket\Client\connect;
use function printf;

final readonly class Client
{
    private function __construct(
        private Bot $bot,
        private Serializer $serializer,
        private WebsocketHandshake $handshake
    ) {}

    public static function create(Bot $bot, int $port): self
    {
        $encoders   = [new JsonEncoder()];
        $extractor  = new PropertyInfoExtractor([], [new PhpDocExtractor()]);
        $normalizer = [new ObjectNormalizer(null, null, null, $extractor), new ArrayDenormalizer()];
        $serializer = new Serializer($normalizer, $encoders);
        $handshake  = new WebsocketHandshake('ws://localhost:' . $port . '/' . $bot->name());

        return new self($bot, $serializer, $handshake);
    }

    /**
     * @throws HttpException
     * @throws WebsocketConnectException
     * @throws WebsocketClosedException
     * @throws BufferException
     */
    public function process(): void
    {
        $connection = connect($this->handshake);
        foreach ($connection as $message) {
            $payload = $message->buffer();
            try {
                /**@var PlayState $playstate */
                $playstate = $this->serializer->deserialize($payload, PlayState::class, 'json');
            } catch (Exception|ExceptionInterface) {
                printf("Received `%s` instead of playstate\n", $payload);

                continue;
            }
            if ($playstate->bot() !== $this->bot->name()) {
                continue;
            }

            printf("Received playstate: \n%s\n\n", $playstate);
            $column = $this->bot->run($playstate);
            printf("Sending column: %s\n", $column);
            $connection->sendText('{"column": ' . $column . '}');
        }
    }
}
