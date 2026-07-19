<?php

namespace App\Services;

class DashboardService
{
    public function __construct(

        protected CountryService $countryService,

        protected LocationService $locationService,

        protected WeatherService $weatherService,

        protected EconomyService $economyService,

        protected ExchangeService $exchangeService,

        protected NewsService $newsService,

        protected RiskScoringService $riskService

    ) {}

    public function getDashboard(string $country): array
    {

        /*
        |--------------------------------------------------------------------------
        | Country
        |--------------------------------------------------------------------------
        */

        $countryData = $this->countryService->getCountry($country);

        /*
        |--------------------------------------------------------------------------
        | Location
        |--------------------------------------------------------------------------
        */

        $location = $this->locationService->getCoordinates(

            $countryData['capital']

        );

        /*
        |--------------------------------------------------------------------------
        | Weather
        |--------------------------------------------------------------------------
        */

        $weather = $this->weatherService->getWeather(

            $location['latitude'],

            $location['longitude']

        );

        /*
        |--------------------------------------------------------------------------
        | Economy
        |--------------------------------------------------------------------------
        */

        $economy = $this->economyService->getEconomy(

            $countryData['name']

        );

        /*
        |--------------------------------------------------------------------------
        | Exchange
        |--------------------------------------------------------------------------
        */

        $exchange = $this->exchangeService->getExchange(

            $countryData['currency']

        );

        /*
        |--------------------------------------------------------------------------
        | News
        |--------------------------------------------------------------------------
        */

        $countryCodes = [

            'Indonesia'=>'id',

            'Japan'=>'jp',

            'China'=>'cn',

            'Germany'=>'de',

            'United States'=>'us',

            'Australia'=>'au',

            'Brazil'=>'br'

        ];

        $news = $this->newsService->getNews(

            $countryCodes[$countryData['name']] ?? 'id'

        );

        /*
        |--------------------------------------------------------------------------
        | Risk
        |--------------------------------------------------------------------------
        */

        $risk = $this->riskService->calculate([

            'weather'=>$weather['weather'],

            'wind'=>(float)$weather['wind'],

            'temperature'=>(float)$weather['temperature'],

            'inflation'=>(float)str_replace(',','',$economy['inflation']),

            'exchange_rate'=>(float)str_replace(',','',$exchange['rate']),

            'news'=>$news

        ]);

        return [

            'country'=>$countryData,

            'location'=>$location,

            'weather'=>$weather,

            'economy'=>$economy,

            'exchange'=>$exchange,

            'news'=>$news,

            'risk'=>$risk

        ];

    }
}