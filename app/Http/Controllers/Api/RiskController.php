<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Services\CountryService;
use App\Services\LocationService;
use App\Services\WeatherService;
use App\Services\EconomyService;
use App\Services\ExchangeService;
use App\Services\NewsService;
use App\Services\RiskScoringService;

class RiskController extends Controller
{
    public function show(

    string $country,

    DashboardService $dashboard

)
{

    $dashboardData =

        $dashboard->getDashboard($country);

    return response()->json(

        $dashboardData['risk']

    );

}

        /*
        |--------------------------------------------------------------------------
        | Country
        |--------------------------------------------------------------------------
        */

        $countryData = $countryService->getCountry($country);

        /*
        |--------------------------------------------------------------------------
        | Location
        |--------------------------------------------------------------------------
        */

        $location = $locationService->getCoordinates(
            $countryData['capital']
        );

        /*
        |--------------------------------------------------------------------------
        | Weather
        |--------------------------------------------------------------------------
        */

        $weather = $weatherService->getWeather(
            $location['latitude'],
            $location['longitude']
        );

        /*
        |--------------------------------------------------------------------------
        | Economy
        |--------------------------------------------------------------------------
        */

        $economy = $economyService->getEconomy(
            $countryData['name']
        );

        /*
        |--------------------------------------------------------------------------
        | Exchange
        |--------------------------------------------------------------------------
        */

        $exchange = $exchangeService->getExchange(
            $countryData['currency']
        );

        /*
        |--------------------------------------------------------------------------
        | Country Code News
        |--------------------------------------------------------------------------
        */

        $countryCodes = [

            'Indonesia'     => 'id',
            'Japan'         => 'jp',
            'China'         => 'cn',
            'Germany'       => 'de',
            'United States' => 'us',
            'Australia'     => 'au',
            'Brazil'        => 'br',

        ];

        $news = $newsService->getNews(

            $countryCodes[$countryData['name']] ?? 'id'

        );

        /*
        |--------------------------------------------------------------------------
        | Risk Data
        |--------------------------------------------------------------------------
        */

        $riskData = [

            'weather' => $weather['weather'],

            'wind' => (float) $weather['wind'],

            'temperature' => (float) $weather['temperature'],

            'inflation' => (float) str_replace(',', '', $economy['inflation']),

            'exchange_rate' => (float) str_replace(',', '', $exchange['rate']),

            'news' => $news

        ];

        return response()->json(

            $riskService->calculate($riskData)

        );

    }
}