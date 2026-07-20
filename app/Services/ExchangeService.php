<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;

class ExchangeService
{
    public function getExchange(string $currency): array
    {
        $response = Http::get(
            "https://open.er-api.com/v6/latest/USD"
        );

        if(!$response->successful()){
            throw new \Exception("Exchange API Failed");
        }

        $json = $response->json();

        if(!isset($json["rates"][$currency])){
            throw new \Exception("Currency not found");
        }

        return [

            "base" => "USD",

            "target" => $currency,

            "rate" => round(
                $json["rates"][$currency],
                2
            )

        ];
    }
}