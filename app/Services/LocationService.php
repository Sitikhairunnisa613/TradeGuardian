<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;

class LocationService
{
    public function getCoordinates(string $country): array
    {
        $response = Http::withHeaders([
            'User-Agent' => 'TradeGuardian'
        ])->get(
            'https://nominatim.openstreetmap.org/search',
            [
                'q' => $country,
                'format' => 'json',
                'limit' => 1
            ]
        );

        if (!$response->successful() || empty($response->json())) {
            throw new \Exception('Location not found');
        }

        $location = $response->json()[0];

        return [
            'latitude' => (float) $location['lat'],
            'longitude' => (float) $location['lon'],
        ];
    }
}