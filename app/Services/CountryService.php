<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;

class CountryService
{
    public function getCountry(string $country): array
    {
        $response = Http::withToken(env('REST_COUNTRY_API_KEY'))
            ->get(
                "https://api.restcountries.com/countries/v5/names.common/{$country}",
                [
                    'response_fields' =>
                        'names.common,capitals,region,population,currencies,flag'
                ]
            );

        if (!$response->successful()) {
            throw new \Exception('Country not found');
        }

        $json = $response->json();

        if (
            empty($json['data']['objects']) ||
            !isset($json['data']['objects'][0])
        ) {
            throw new \Exception('Country data not found');
        }

        $countryData = $json['data']['objects'][0];

        return [

            'name' => $countryData['names']['common'],

            'capital' => $countryData['capitals'][0]['name'] ?? '-',

            'population' => $countryData['population'],

            'region' => $countryData['region'],

            'currency' => $countryData['currencies'][0]['code'] ?? '-',

            'currency_name' => $countryData['currencies'][0]['name'] ?? '-',

            'currency_symbol' => $countryData['currencies'][0]['symbol'] ?? '-',

            'flag' => $countryData['flag']['url_png'],

            'flag_svg' => $countryData['flag']['url_svg'],

            'emoji' => $countryData['flag']['emoji']

        ];
    }
}