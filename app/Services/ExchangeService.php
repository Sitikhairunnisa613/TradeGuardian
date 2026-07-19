<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;

class ExchangeService
{
    public function getExchange(string $currency): array
    {
        $response = Http::get(
            "https://open.er-api.com/v6/latest/{$currency}"
        );

        if (!$response->successful()) {
            throw new \Exception("Exchange API failed");
        }

        $json = $response->json();

        if (!isset($json['rates']['IDR'])) {
            throw new \Exception("Exchange rate not found");
        }

        return [

            'base' => $currency,

            'target' => 'IDR',

            'rate' => number_format(
                $json['rates']['IDR'],
                2
            )

        ];
    }
}