<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;

class WeatherService
{
    public function getWeather(float $lat, float $lng): array
    {
        $response = Http::timeout(10)->get(
            'https://api.open-meteo.com/v1/forecast',
            [
                'latitude' => $lat,
                'longitude' => $lng,
                'current' => implode(',', [
                    'temperature_2m',
                    'relative_humidity_2m',
                    'wind_speed_10m',
                    'weather_code'
                ]),
                'timezone' => 'auto'
            ]
        );

        if (!$response->successful()) {
            throw new \Exception('Weather API failed');
        }

        $json = $response->json();

        if (!isset($json['current'])) {
            throw new \Exception('Weather data not found');
        }

        $current = $json['current'];

        return [
            'temperature' => $current['temperature_2m'] ?? '-',
            'humidity'    => $current['relative_humidity_2m'] ?? '-',
            'wind'        => $current['wind_speed_10m'] ?? '-',
            'weather'     => $this->weatherText(
                $current['weather_code'] ?? -1
            ),
            'weather_code' => $current['weather_code'] ?? -1
        ];
    }

    private function weatherText($code)
    {
        return match ($code) {

            0 => 'Clear Sky',

            1 => 'Mainly Clear',

            2 => 'Partly Cloudy',

            3 => 'Overcast',

            45 => 'Fog',

            48 => 'Depositing Rime Fog',

            51 => 'Light Drizzle',

            53 => 'Moderate Drizzle',

            55 => 'Dense Drizzle',

            61 => 'Slight Rain',

            63 => 'Moderate Rain',

            65 => 'Heavy Rain',

            71 => 'Snow',

            80 => 'Rain Showers',

            95 => 'Thunderstorm',

            default => 'Unknown'
        };
    }
}