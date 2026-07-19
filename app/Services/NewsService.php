<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;

class NewsService
{
    public function getNews(string $countryCode): array
    {
        $apiKey = env('NEWSDATA_API_KEY');

        $countryMap = [

            'id' => 'Indonesia',
            'jp' => 'Japan',
            'cn' => 'China',
            'de' => 'Germany',
            'us' => 'United States',
            'au' => 'Australia',
            'br' => 'Brazil',

        ];

        $countryName = $countryMap[strtolower($countryCode)] ?? '';

        $response = Http::connectTimeout(10)
            ->timeout(30)
            ->retry(3,1000)
            ->get(
                'https://newsdata.io/api/1/latest',
                [

                    'apikey'=>$apiKey,

                    'country'=>strtolower($countryCode),

                    'language'=>'en',

                    'category'=>'business',

                    'q'=>$countryName,

                    'size'=>5

                ]
            );

        if(!$response->successful()){

            throw new \Exception('News API failed');

        }

        $json = $response->json();

        if(

            isset($json['status']) &&

            $json['status']=='error'

        ){

            throw new \Exception(

                $json['results']['message'] ??

                'News API Error'

            );

        }

        if(

            !isset($json['results'])

        ){

            return [];

        }

        return collect($json['results'])

            ->map(function($item){

                return [

                    'title'=>$item['title'] ?? 'No Title',

                    'url'=>$item['link'] ?? '#',

                    'source'=>$item['source_name'] ?? 'Unknown',

                    'date'=>$item['pubDate'] ?? ''

                ];

            })

            ->toArray();

    }
}