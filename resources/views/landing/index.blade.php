@extends('layouts.app')

@section('content')

{{-- ================= NAVBAR ================= --}}
<nav class="navbar navbar-expand-lg navbar-custom">

    <div class="container">

        <a class="navbar-brand logo-text" href="#">
            TradeGuardian
        </a>

        <div>
            <a href="/login" class="btn btn-outline-light me-2">
                Login
            </a>

            <a href="/register" class="btn btn-info text-white">
                Register
            </a>
        </div>

    </div>

</nav>

{{-- ================= HERO ================= --}}
<section class="hero d-flex align-items-center">

    <div class="container hero-content">

        <div class="row align-items-center">

            <div class="col-lg-5">

                <span class="badge bg-info mb-4">
                    Global Supply Chain Platform
                </span>

                <h1>
                    TradeGuardian
                </h1>

                <p class="mt-4">
                    Monitor economy, exchange rates,
                    weather, international news,
                    and country risks in one dashboard.
                </p>

                <a href="/login"
                    class="btn-start mt-4 d-inline-block text-decoration-none">

                    Explore Dashboard

                </a>

            </div>

            <div class="col-lg-7">

                <div id="globe"
                    style="height:650px;width:100%;">

                </div>

            </div>

        </div>

    </div>

</section>

{{-- ================= STATS ================= --}}
<section class="stats-section">

    <div class="container">

        <div class="row g-4">

            <div class="col-md-3">

                <div class="stat-box">

                    <i class="bi bi-globe-americas"></i>

                    <h2>195</h2>

                    <p>Countries</p>

                </div>

            </div>

            <div class="col-md-3">

                <div class="stat-box">

                    <i class="bi bi-graph-up-arrow"></i>

                    <h2>172</h2>

                    <p>Safe Trade</p>

                </div>

            </div>

            <div class="col-md-3">

                <div class="stat-box">

                    <i class="bi bi-currency-exchange"></i>

                    <h2>180</h2>

                    <p>Exchange Rates</p>

                </div>

            </div>

            <div class="col-md-3">

                <div class="stat-box">

                    <i class="bi bi-newspaper"></i>

                    <h2>2000+</h2>

                    <p>Daily News</p>

                </div>

            </div>

        </div>

    </div>

</section>

{{-- ================= COUNTRY EXPLORER ================= --}}
<section class="country-section py-5">

    <div class="container">

        <div class="text-center mb-5">

            <h2 class="fw-bold">
                Explore Countries
            </h2>

            <p class="text-secondary">
                Choose a country to monitor economy,
                weather, exchange rate,
                and international trade.
            </p>

        </div>

        @php

        $countries = [

        [
        'name'=>'Indonesia',
        'code'=>'id',
        'capital'=>'Jakarta',
        'currency'=>'IDR',
        'population'=>'281 M'
        ],

        [
        'name'=>'China',
        'code'=>'cn',
        'capital'=>'Beijing',
        'currency'=>'CNY',
        'population'=>'1.41 B'
        ],

        [
        'name'=>'Japan',
        'code'=>'jp',
        'capital'=>'Tokyo',
        'currency'=>'JPY',
        'population'=>'124 M'
        ],

        [
        'name'=>'Singapore',
        'code'=>'sg',
        'capital'=>'Singapore',
        'currency'=>'SGD',
        'population'=>'6 M'
        ],

        [
        'name'=>'Malaysia',
        'code'=>'my',
        'capital'=>'Kuala Lumpur',
        'currency'=>'MYR',
        'population'=>'34 M'
        ],

        [
        'name'=>'Australia',
        'code'=>'au',
        'capital'=>'Canberra',
        'currency'=>'AUD',
        'population'=>'27 M'
        ],

        [
        'name'=>'Germany',
        'code'=>'de',
        'capital'=>'Berlin',
        'currency'=>'EUR',
        'population'=>'84 M'
        ],

        [
        'name'=>'United States',
        'code'=>'us',
        'capital'=>'Washington',
        'currency'=>'USD',
        'population'=>'340 M'
        ]

        ];

        @endphp

        <div class="row g-4">

            @foreach($countries as $country)

                <div class="col-lg-3 col-md-4 col-6">

                    <div class="country-item">

    <div class="country-flag">

    <img
    src="https://flagcdn.com/w160/{{ $country['code'] }}.png"
    alt="{{ $country['name'] }}"
    class="country-image">

    </div>

    <h5 class="fw-bold mt-3">

        {{ $country['name'] }}

    </h5>

    <hr>

    <p class="mb-1">

        <strong>Capital</strong><br>

        {{ $country['capital'] }}

    </p>

    <p class="mb-1">

        <strong>Currency</strong><br>

        {{ $country['currency'] }}

    </p>

    <p>

        <strong>Population</strong><br>

        {{ $country['population'] }}

    </p>

    <button

class="btn btn-primary rounded-pill px-4 mt-3"

onclick="showCountry(

'{{ $country['name'] }}',

'https://flagcdn.com/w320/{{ $country['code'] }}.png',

'{{ $country['capital'] }}',

'{{ $country['currency'] }}',

'{{ $country['population'] }}'

)">

Explore Country

</button>

</div>
                </div>

            @endforeach

        </div>

    </div>

</section>

{{-- ================= FEATURES ================= --}}
<section class="container py-5">

    <div class="text-center mb-5">

        <h2 class="fw-bold">
            What Can TradeGuardian Do?
        </h2>

        <p class="text-secondary">
            Monitor global trade from one platform.
        </p>

    </div>

    <div class="row g-4">

        <div class="col-md-3">

            <div class="feature-card text-center">

                <i class="bi bi-graph-up-arrow feature-icon"></i>

                <h4 class="mt-3">
                    Economy
                </h4>

            </div>

        </div>

        <div class="col-md-3">

            <div class="feature-card text-center">

                <i class="bi bi-cloud-sun feature-icon"></i>

                <h4 class="mt-3">
                    Weather
                </h4>

            </div>

        </div>

        <div class="col-md-3">

            <div class="feature-card text-center">

                <i class="bi bi-currency-exchange feature-icon"></i>

                <h4 class="mt-3">
                    Exchange Rate
                </h4>

            </div>

        </div>

        <div class="col-md-3">

            <div class="feature-card text-center">

                <i class="bi bi-newspaper feature-icon"></i>

                <h4 class="mt-3">
                    News
                </h4>

            </div>

        </div>

        <div class="col-md-3">

            <div class="feature-card text-center">

                <i class="bi bi-shield-exclamation feature-icon"></i>

                <h4 class="mt-3">
                    Risk Analysis
                </h4>

            </div>

        </div>

        <div class="col-md-3">

            <div class="feature-card text-center">

                <i class="bi bi-truck feature-icon"></i>

                <h4 class="mt-3">
                    Logistics
                </h4>

            </div>

        </div>

        <div class="col-md-3">

            <div class="feature-card text-center">

                <i class="bi bi-globe feature-icon"></i>

                <h4 class="mt-3">
                    Global Map
                </h4>

            </div>

        </div>

        <div class="col-md-3">

            <div class="feature-card text-center">

                <i class="bi bi-bar-chart feature-icon"></i>

                <h4 class="mt-3">
                    Analytics
                </h4>

            </div>

        </div>

    </div>

</section>

<!-- Country Modal -->

<div class="modal fade" id="countryModal" tabindex="-1">

    <div class="modal-dialog modal-lg modal-dialog-centered">

        <div class="modal-content rounded-4 border-0 shadow-lg">

            <div class="modal-header">

                <h4 id="modalCountryName" class="fw-bold mb-0">

                    Country

                </h4>

                <button
                    class="btn-close"
                    data-bs-dismiss="modal">

                </button>

            </div>

            <div class="modal-body">

                <div class="row">

                    <div class="col-md-4 text-center">

                        <img
                            id="modalFlag"
                            class="img-fluid rounded shadow"
                            style="max-width:180px;">

                    </div>

                    <div class="col-md-8">

                        <table class="table">

                            <tr>

                                <th>Capital</th>

                                <td id="modalCapital"></td>

                            </tr>

                            <tr>

                                <th>Currency</th>

                                <td id="modalCurrency"></td>

                            </tr>

                            <tr>

                                <th>Population</th>

                                <td id="modalPopulation"></td>

                            </tr>

                        </table>

                    </div>

                </div>

            </div>

        </div>

    </div>

</div>

<script>

function showCountry(

name,

flag,

capital,

currency,

population

){

document.getElementById("modalCountryName").innerHTML=name;

document.getElementById("modalFlag").src=flag;

document.getElementById("modalCapital").innerHTML=capital;

document.getElementById("modalCurrency").innerHTML=currency;

document.getElementById("modalPopulation").innerHTML=population;

new bootstrap.Modal(

document.getElementById("countryModal")

).show();

}

</script>

@endsection