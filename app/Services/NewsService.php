<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;

class NewsService
{
    public function getNews(string $countryCode): array
    {
        $apiKey = env('GNEWS_API_KEY');

        $countryMap = [
            'id' => 'Indonesia',
            'jp' => 'Japan',
            'cn' => 'China',
            'de' => 'Germany',
            'us' => 'United States',
            'au' => 'Australia',
            'br' => 'Brazil',
        ];

        $countryName = $countryMap[strtolower($countryCode)] ?? 'World';

        try {

            $response = Http::timeout(20)->get(
                'https://gnews.io/api/v4/search',
                [
                    'q'       => $countryName,
                    'lang'    => 'en',
                    'max'     => 5,
                    'apikey'  => $apiKey,
                ]
            );

            if (!$response->successful()) {
                return [];
            }

            $json = $response->json();

            if (!isset($json['articles'])) {
                return [];
            }

            return collect($json['articles'])
                ->map(function ($item) {

                    return [
                        'title'  => $item['title'] ?? 'No Title',
                        'url'    => $item['url'] ?? '#',
                        'source' => $item['source']['name'] ?? 'Unknown',
                        'date'   => $item['publishedAt'] ?? '',
                    ];

                })
                ->toArray();

        } catch (\Throwable $e) {

            return [];

        }
    }
}