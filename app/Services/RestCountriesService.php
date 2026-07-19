<?php

namespace App\Services;

class RiskScoringService
{
    public function calculate(array $data): array
    {
        $score = 0;

        /*
        |---------------------------------
        | Weather
        |---------------------------------
        */

        if (in_array(strtolower($data['weather']), [
            'rain',
            'storm',
            'snow',
            'thunderstorm'
        ])) {

            $score += 20;

        }

        /*
        |---------------------------------
        | Inflation
        |---------------------------------
        */

        if ($data['inflation'] >= 8) {

            $score += 30;

        } elseif ($data['inflation'] >= 5) {

            $score += 20;

        } elseif ($data['inflation'] >= 3) {

            $score += 10;

        }

        /*
        |---------------------------------
        | Exchange Rate
        |---------------------------------
        */

        if ($data['exchange_change'] >= 5) {

            $score += 20;

        } elseif ($data['exchange_change'] >= 2) {

            $score += 10;

        }

        /*
        |---------------------------------
        | News Sentiment
        |---------------------------------
        */

        if ($data['news_sentiment'] === 'negative') {

            $score += 20;

        }

        /*
        |---------------------------------
        | Final Status
        |---------------------------------
        */

        if ($score >= 70) {

            $status = 'High';
            $color = 'danger';

        } elseif ($score >= 40) {

            $status = 'Medium';
            $color = 'warning';

        } else {

            $status = 'Low';
            $color = 'success';

        }

        return [

            'score' => $score,

            'status' => $status,

            'color' => $color

        ];
    }
}