<?php

namespace App\Services;

class RiskScoringService
{
    public function calculate(array $data): array
    {
        $score = 0;

        /*
        |--------------------------------------------------------------------------
        | Weather Score
        |--------------------------------------------------------------------------
        */

        $badWeather = [

            'Light Drizzle',
            'Moderate Drizzle',
            'Dense Drizzle',
            'Slight Rain',
            'Moderate Rain',
            'Heavy Rain',
            'Rain Showers',
            'Snow',
            'Thunderstorm',
            'Fog',
            'Depositing Rime Fog'

        ];

        if (in_array($data['weather'], $badWeather)) {

            $score += 20;

        }

        /*
        |--------------------------------------------------------------------------
        | Wind Score
        |--------------------------------------------------------------------------
        */

        if ($data['wind'] >= 50) {

            $score += 20;

        } elseif ($data['wind'] >= 30) {

            $score += 10;

        }

        /*
        |--------------------------------------------------------------------------
        | Inflation Score
        |--------------------------------------------------------------------------
        */

        if ($data['inflation'] >= 8) {

            $score += 30;

        } elseif ($data['inflation'] >= 5) {

            $score += 20;

        } elseif ($data['inflation'] >= 3) {

            $score += 10;

        }

        /*
        |--------------------------------------------------------------------------
        | News Score
        |--------------------------------------------------------------------------
        */

        $keywords = [

            'war',
            'earthquake',
            'flood',
            'tsunami',
            'volcano',
            'eruption',
            'typhoon',
            'storm',
            'strike',
            'conflict',
            'sanction',
            'tariff',
            'attack',
            'crisis',
            'disaster'

        ];

        $newsScore = 0;

        foreach ($data['news'] as $item) {

            $title = strtolower($item['title'] ?? '');

            foreach ($keywords as $word) {

                if (str_contains($title, $word)) {

                    $newsScore += 10;

                    break;

                }

            }

        }

        if ($newsScore > 40) {

            $newsScore = 40;

        }

        $score += $newsScore;

        /*
        |--------------------------------------------------------------------------
        | Final Status
        |--------------------------------------------------------------------------
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