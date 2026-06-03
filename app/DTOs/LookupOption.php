<?php

namespace App\DTOs;

use Illuminate\Contracts\Support\Arrayable;
use JsonSerializable;

class LookupOption implements Arrayable, JsonSerializable
{
    public function __construct(
        public readonly string|int $value,
        public readonly string $label,
        public readonly array $meta = []
    ) {}

    public function toArray(): array
    {
        return [
            'value' => $this->value,
            'label' => $this->label,
            'meta' => $this->meta,
        ];
    }

    public function jsonSerialize(): mixed
    {
        return $this->toArray();
    }
}
