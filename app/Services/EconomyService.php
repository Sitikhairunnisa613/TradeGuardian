<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;

class EconomyService
{
    public function getEconomy(string $country): array
    {
        $map = [
            "Indonesia" => "IDN",
            "Japan" => "JPN",
            "China" => "CHN",
            "Germany" => "DEU",
            "United States" => "USA",
            "Australia" => "AUS",
            "Brazil" => "BRA",
        ];

        $code = $map[$country] ?? "IDN";

        $gdpResponse = Http::get(
            "https://api.worldbank.org/v2/country/$code/indicator/NY.GDP.MKTP.CD?format=json"
        );

        $inflationResponse = Http::get(
            "https://api.worldbank.org/v2/country/$code/indicator/FP.CPI.TOTL.ZG?format=json"
        );

        $gdp = "-";
        $inflation = "-";
        $labels = [];
        $chart = [];

        if (isset($gdpResponse->json()[1])) {

            foreach ($gdpResponse->json()[1] as $row) {

                if ($row["value"] !== null) {

                    if ($gdp === "-") {
                        $gdp = number_format($row["value"], 0, ".", ",");
                    }

                    $labels[] = $row["date"];
                    $chart[] = round($row["value"] / 1000000000000, 2);
                }
            }
        }

        $labels = array_reverse(array_slice($labels, 0, 10));
        $chart = array_reverse(array_slice($chart, 0, 10));

        if (isset($inflationResponse->json()[1])) {

            foreach ($inflationResponse->json()[1] as $row) {

                if ($row["value"] !== null) {

                    $inflation = number_format($row["value"], 2);

                    break;
                }
            }
        }

        return [

            "gdp" => $gdp,

            "inflation" => $inflation,

            "labels" => $labels,

            "chart" => $chart

        ];
    }
}