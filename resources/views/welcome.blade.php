@extends('layouts.app')

@section('title','TradeGuardian')

@section('content')

<!-- HERO -->

<section class="hero">

    <div class="container">

        <div class="row align-items-center">

            <div class="col-lg-6 hero-left">

                <h1 class="hero-title">

                    🌍 TradeGuardian

                </h1>

                <h2>

                    Global Trade Intelligence Platform

                </h2>

                <p class="hero-subtitle">

                    Analyze countries before importing or exporting products.
                    Monitor economy, exchange rate, weather,
                    political stability and international trade
                    in one modern dashboard.

                </p>

                <div class="hero-buttons">

                    <a href="{{ route('login') }}" class="btn-login">

                        Login

                    </a>

                    <a href="{{ route('register') }}" class="btn-register">

                        Register

                    </a>

                </div>

            </div>

            <div class="col-lg-6 hero-right">

                <div class="globe-box">

                    <i class="bi bi-globe2"></i>

                </div>

            </div>

        </div>

    </div>

</section>

<!-- FEATURES -->

<section class="py-5">

    <div class="container">

        <div class="text-center mb-5">

            <h2 class="section-title">

                Everything You Need

            </h2>

            <p class="section-subtitle">

                Monitor global trade in one platform.

            </p>

        </div>

        <div class="row g-4">

            <div class="col-md-3">

                <div class="feature-card">

                    <i class="bi bi-graph-up-arrow"></i>

                    <h4>Economy</h4>

                    <p>

                        GDP, Inflation, Economic Growth

                    </p>

                </div>

            </div>

            <div class="col-md-3">

                <div class="feature-card">

                    <i class="bi bi-cloud-sun"></i>

                    <h4>Weather</h4>

                    <p>

                        Current weather and climate

                    </p>

                </div>

            </div>

            <div class="col-md-3">

                <div class="feature-card">

                    <i class="bi bi-currency-exchange"></i>

                    <h4>Exchange Rate</h4>

                    <p>

                        Live currency conversion

                    </p>

                </div>

            </div>

            <div class="col-md-3">

                <div class="feature-card">

                    <i class="bi bi-newspaper"></i>

                    <h4>Latest News</h4>

                    <p>

                        International Trade News

                    </p>

                </div>

            </div>

        </div>

    </div>

</section>

<!-- POPULAR COUNTRIES -->

<section class="py-5">

    <div class="container">

        <div class="text-center mb-5">

            <h2 class="section-title">

                Popular Countries

            </h2>

            <p class="section-subtitle">

                Select a country to preview its information.

            </p>

        </div>

        <div class="row g-4">

            @php

            $countries=[

            ['🇮🇩','Indonesia','id'],

            ['🇯🇵','Japan','jp'],

            ['🇨🇳','China','cn'],

            ['🇺🇸','United States','us'],

            ['🇩🇪','Germany','de'],

            ['🇸🇬','Singapore','sg'],

            ['🇰🇷','South Korea','kr']

            ];

            @endphp

            @foreach($countries as $country)

            <div class="col-lg-3 col-md-4 col-6">

                <div class="country-card">

                    <div class="flag">

                        {{ $country[0] }}

                    </div>

                    <h5>

                        {{ $country[1] }}

                    </h5>

                    <a

                    href="#"

                    class="btn btn-outline-primary mt-3 explore-country"

                    data-code="{{ $country[2] }}">

                        Explore

                    </a>

                </div>

            </div>

            @endforeach

        </div>

    </div>

</section>

<!-- GLOBAL STATS -->

<section class="py-5 bg-light">

    <div class="container">

        <div class="row text-center">

            <div class="col-md-3">

                <div class="stat-card">

                    <h2>195+</h2>

                    <p>Countries</p>

                </div>

            </div>

            <div class="col-md-3">

                <div class="stat-card">

                    <h2>180+</h2>

                    <p>Currencies</p>

                </div>

            </div>

            <div class="col-md-3">

                <div class="stat-card">

                    <h2>24/7</h2>

                    <p>Trade Monitoring</p>

                </div>

            </div>

            <div class="col-md-3">

                <div class="stat-card">

                    <h2>100%</h2>

                    <p>REST API</p>

                </div>

            </div>

        </div>

    </div>

</section>

<!-- COUNTRY MODAL -->

<div class="modal fade" id="countryModal" tabindex="-1">

    <div class="modal-dialog modal-lg">

        <div class="modal-content">

            <div class="modal-header">

                <h4 id="countryName">

                    Country

                </h4>

                <button class="btn-close"
                        data-bs-dismiss="modal">

                </button>

            </div>

            <div class="modal-body">

                <div class="row">

                    <div class="col-md-4 text-center">

                        <img

                        id="countryFlag"

                        class="img-fluid rounded shadow">

                    </div>

                    <div class="col-md-8">

                        <table class="table">

                            <tr>

                                <th>Capital</th>

                                <td id="countryCapital"></td>

                            </tr>

                            <tr>

                                <th>Region</th>

                                <td id="countryRegion"></td>

                            </tr>

                            <tr>

                                <th>Population</th>

                                <td id="countryPopulation"></td>

                            </tr>

                            <tr>

                                <th>Currency</th>

                                <td id="countryCurrency"></td>

                            </tr>

                        </table>

                    </div>

                </div>

            </div>

        </div>

    </div>

</div>

@endsection