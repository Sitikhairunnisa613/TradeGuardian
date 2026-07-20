<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;

class CountryService
{
    public function getCountry(string $country): array
    {
        $response = Http::withHeaders([
            'Authorization' => 'Bearer ' . env('REST_COUNTRY_API_KEY'),
            'Accept' => 'application/json',
        ])->timeout(15)->get(
            "https://api.restcountries.com/countries/v5/names.common/{$country}",
            [
                'response_fields' => 'names.common,capitals,region,population,currencies,flag'
            ]
        );

        if (!$response->successful()) {
            throw new \Exception('REST Countries API Error');
        }

        $json = $response->json();

        if (!isset($json['data']['objects'][0])) {
            throw new \Exception('Country not found');
        }

        $countryData = $json['data']['objects'][0];

        // Capital
        $capital = $countryData['capitals'][0]['name'] ?? "-";

        // Currency
        $currencyCode = "-";
        $currencyName = "-";
        $currencySymbol = "-";

        if (!empty($countryData['currencies'][0])) {
            $currencyCode = $countryData['currencies'][0]['code'] ?? "-";
            $currencyName = $countryData['currencies'][0]['name'] ?? "-";
            $currencySymbol = $countryData['currencies'][0]['symbol'] ?? "-";
        }

        // Flag
        $flag = $countryData['flag']['url_png'] ?? "";
        $emoji = $countryData['flag']['emoji'] ?? "";

        return [
            "name" => $countryData["names"]["common"] ?? "-",
            "capital" => $capital,
            "region" => $countryData["region"] ?? "-",
            "population" => $countryData["population"] ?? 0,
            "currency" => $currencyCode,
            "currency_name" => $currencyName,
            "currency_symbol" => $currencySymbol,
            "flag" => $flag,
            "emoji" => $emoji,
        ];
    }
}