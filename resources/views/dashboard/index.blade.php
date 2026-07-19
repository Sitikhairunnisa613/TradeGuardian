@extends('layouts.app')

@section('title','TradeGuardian Dashboard')

@section('content')

<div class="dashboard-layout">

    {{-- ========================= SIDEBAR ========================= --}}

    <aside class="sidebar glass">

        <div class="logo">

            <div class="logo-icon">
                🌍
            </div>

            <div class="logo-text">

                <h4>TradeGuardian</h4>
                <small>Global Intelligence</small>

            </div>

        </div>

        <ul class="menu">

            <li class="active">
                <i class="bi bi-grid-fill"></i>
                <span>Dashboard</span>
            </li>

            <li>
                <i class="bi bi-globe2"></i>
                <span>Countries</span>
            </li>

            <li>
                <i class="bi bi-graph-up-arrow"></i>
                <span>Economy</span>
            </li>

            <li>
                <i class="bi bi-currency-exchange"></i>
                <span>Exchange</span>
            </li>

            <li>
                <i class="bi bi-cloud-sun-fill"></i>
                <span>Weather</span>
            </li>

            <li>
                <i class="bi bi-newspaper"></i>
                <span>Trade News</span>
            </li>

            <li>
                <i class="bi bi-robot"></i>
                <span>AI Advisor</span>
            </li>

        </ul>

    </aside>

    {{-- ========================= MAIN ========================= --}}

    <main class="tg-dashboard">

        {{-- ================= HEADER ================= --}}

        <header class="tg-header">

            <div class="header-left">

                <h2>Global Trade Intelligence</h2>

                <p>
                    Real-time monitoring of international trade, economy, weather, and AI recommendations.
                </p>

            </div>

            <div class="header-right">

                <div class="system-status glass">

                    <span class="status-dot"></span>

                    <span>System Online</span>

                </div>

                <div class="header-clock glass">

                    <div id="liveTime">00:00:00</div>

                    <small id="liveDate">Loading...</small>

                </div>

                <div class="notification-btn glass">

                    🔔

                    <span class="notification-badge">3</span>

                </div>

                <div class="header-search">

                    <i class="bi bi-search"></i>

                    <input
                        id="searchCountry"
                        type="text"
                        placeholder="Search country...">

                </div>

                <div class="user-box glass">

                    <div class="avatar">

                        {{ strtoupper(substr(Auth::user()->name,0,1)) }}

                    </div>

                    <div>

                        <strong>{{ Auth::user()->name }}</strong>

                        <small>Trade Analyst</small>

                    </div>

                </div>

            </div>

        </header>

        {{-- ================= KPI ================= --}}

        <section class="kpi-grid">

            <div class="kpi-card glass">

                <div class="kpi-icon">
                    🌍
                </div>

                <div>

                    <span>Countries</span>

                    <h2 id="countryCount">
                        195
                    </h2>

                    <small>
                        Global Coverage
                    </small>

                </div>

            </div>

            <div class="kpi-card glass">

                <div class="kpi-icon">
                    📈
                </div>

                <div>

                    <span>Trade Score</span>

                    <h2 id="tradeScoreKPI">
                        94%
                    </h2>

                    <small class="text-success">
                        ▲ +2.3%
                    </small>

                </div>

            </div>

            <div class="kpi-card glass">

                <div class="kpi-icon">
                    💱
                </div>

                <div>

                    <span>USD / IDR</span>

                    <h2>
                        16,250
                    </h2>

                    <small>
                        Live Exchange
                    </small>

                </div>

            </div>

            <div class="kpi-card glass">

                <div class="kpi-icon">
                    ☀️
                </div>

                <div>

                    <span>Weather</span>

                    <h2 id="weatherKPI">
                        31°C
                    </h2>

                    <small>
                        Sunny
                    </small>

                </div>

            </div>

        </section>

        {{-- ================= CONTENT START ================= --}}

        <section class="dashboard-grid">
        
        {{-- ================= LEFT COLUMN ================= --}}

<div class="left-column">

    {{-- Globe Panel --}}
    <div class="globe-panel glass">

        <div class="panel-header">

            <h3 class="panel-title">
                🌍 Interactive World Globe
            </h3>

            <span class="badge bg-primary">
                LIVE
            </span>

        </div>

        <div id="globeDashboard"></div>

    </div>

    {{-- Economy Chart --}}
    <div class="chart-panel glass">

        <div class="panel-header">

            <h3 class="panel-title">
                📈 Economic Trend
            </h3>

        </div>

        <canvas id="economyChart"></canvas>

    </div>

    {{-- Trade Statistics --}}
    <div class="trade-panel glass">

        <div class="panel-header">

            <h3 class="panel-title">
                📊 Trade Statistics
            </h3>

        </div>

        <div class="trade-grid">

            <div class="trade-box">

                <span>GDP</span>

                <h3 id="gdp">
                    -
                </h3>

            </div>

            <div class="trade-box">

                <span>Inflation</span>

                <h3 id="inflation">
                    -
                </h3>

            </div>

            <div class="trade-box">

                <span>Trade Score</span>

                <h3 id="tradeScore">
                    -
                </h3>

            </div>

            <div class="trade-box">

                <span>Currency</span>

                <h3 id="currencyCode">
                    -
                </h3>

            </div>

        </div>

    </div>

</div>


{{-- ================= RIGHT COLUMN ================= --}}

<div class="right-column">

{{-- ================= ANALYTICS PANEL ================= --}}

<div class="analytics-panel glass">

    <div class="panel-header">

        <h3 class="panel-title">
            📊 Live Analytics
        </h3>

    </div>

    <div class="analytics-grid">

        <div class="analytics-card">

            <h5>FPS</h5>

            <h2 id="fps">
                60 FPS
            </h2>

        </div>

        <div class="analytics-card">

            <h5>Routes</h5>

            <h2 id="routeCount">
                8
            </h2>

        </div>

        <div class="analytics-card">

            <h5>Active Planes</h5>

            <h2 id="planeCount">
                8
            </h2>

        </div>

        <div class="analytics-card">

            <h5>Status</h5>

            <h2 class="text-success">
                ONLINE
            </h2>

        </div>

    </div>

</div>

{{-- ================= QUICK ACTIONS ================= --}}

<div class="quick-action-panel glass">

    <div class="panel-header">

        <h3 class="panel-title">
            ⚡ Quick Actions
        </h3>

    </div>

{{-- ================= LIVE TRADE FEED ================= --}}

<div class="trade-feed-panel glass">

    <div class="panel-header">

        <h3 class="panel-title">
            📡 Live Trade Activity
        </h3>

    </div>

    <div id="tradeFeed">

    </div>

</div>

    <div class="quick-action-grid">

        <button id="btnResetGlobe" class="quick-btn">

            🌍
            <span>Reset Globe</span>

        </button>

        <button id="btnAutoRotate" class="quick-btn">

            🔄
            <span>Auto Rotate</span>

        </button>

        <button id="btnRefreshData" class="quick-btn">

            📡
            <span>Refresh Data</span>

        </button>

        <button id="btnFullscreen" class="quick-btn">

            ⛶
            <span>Fullscreen</span>

        </button>

    </div>

</div>

{{-- ================= COUNTRY PANEL ================= --}}

<div class="country-panel glass">

    <div class="panel-header">

        <h3 class="panel-title">
            🌍 Country Information
        </h3>

    </div>

    <div class="country-header">

        <img
            id="countryFlag"
            src=""
            alt="Country Flag">

        <div>

            <h2 id="countryTitle">
                Select Country
            </h2>

            <small id="region">
                -
            </small>

        </div>

    </div>

    <div class="country-info">

        <div class="info-card">

            <span>Capital</span>

            <h4 id="capital">
                -
            </h4>

        </div>

        <div class="trade-score-card">

    <h5>Trade Score</h5>

    <div class="progress">

        <div
            id="tradeProgress"
            class="progress-bar">

            0%

        </div>

    </div>

    <div class="trade-status">

        <span>
            Risk Level
        </span>

        <span
            id="riskLevel"
            class="risk low">

            LOW

        </span>

    </div>

</div>

    <div class="exchange-card glass">

    <h5>Exchange Rate</h5>

    <h2 id="exchangeRate">

        --

    </h2>

    <small>

        USD →

        <span id="exchangeCurrency">

            --

        </span>

    </small>

</div>

        <div class="info-card">

            <span>Currency</span>

            <h4 id="currency">
                -
            </h4>

        </div>

        <div class="info-card">

            <span>Population</span>

            <h4 id="population">
                -
            </h4>

        </div>

    </div>

</div>

{{-- ================= WEATHER ================= --}}

<div class="weather-panel glass">

    <div class="panel-header">

        <h3 class="panel-title">

            🌤 Current Weather

        </h3>

    </div>

    <div id="weatherCard">

        <div
            id="weatherIcon"
            class="weather-icon">

            🌍

        </div>

        <h2 id="weatherTemp">

            --

        </h2>

        <p id="weatherDesc">

            Select Country

        </p>

        <div class="weather-grid">

            <div class="weather-box">

                <span>Humidity</span>

                <h4 id="weatherHumidity">

                    --

                </h4>

            </div>

            <div class="weather-box">

                <span>Wind</span>

                <h4 id="weatherWind">

                    --

                </h4>

            </div>

        </div>

    </div>

</div>

{{-- ================= AI ================= --}}

<div class="ai-panel glass">

    <div class="panel-header">

        <h3 class="panel-title">

            🤖 AI Recommendation

        </h3>

    </div>

    <div id="recommendation">

        Click a country on the globe to receive AI trade recommendations.

    </div>

</div>

{{-- ================= NEWS ================= --}}

<div class="news-panel glass">

    <div class="panel-header">

        <h3 class="panel-title">

            📰 Latest Trade News

        </h3>

    </div>

    <ul id="newsList">

        <li>

            Waiting for selected country...

        </li>

    </ul>

</div>

</div> {{-- END RIGHT COLUMN --}}

</section> {{-- END DASHBOARD GRID --}}

    </main>

</div>

@endsection