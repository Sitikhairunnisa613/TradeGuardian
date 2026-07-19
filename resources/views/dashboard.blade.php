@extends('layouts.app')

@section('title','TradeGuardian Dashboard')

@section('content')

<div class="tg-app">

    <!-- ========================================================= -->
    <!-- SIDEBAR -->
    <!-- ========================================================= -->

    <aside class="tg-sidebar">

        <div class="tg-logo">

            <div class="tg-logo-icon">
                🌍
            </div>

            <div class="tg-logo-text">

                <h2>TradeGuardian</h2>

                <span>Global Trade Intelligence</span>

            </div>

        </div>

        <nav class="tg-sidebar-menu">

            <a href="#" class="active">

                <i class="bi bi-grid-fill"></i>

                <span>Dashboard</span>

            </a>

            <a href="#">

                <i class="bi bi-globe2"></i>

                <span>Countries</span>

            </a>

            <a href="#">

                <i class="bi bi-bar-chart-fill"></i>

                <span>Economy</span>

            </a>

            <a href="#">

                <i class="bi bi-currency-exchange"></i>

                <span>Exchange Rate</span>

            </a>

            <a href="#">

                <i class="bi bi-cloud-sun-fill"></i>

                <span>Weather</span>

            </a>

            <a href="#">

                <i class="bi bi-newspaper"></i>

                <span>Trade News</span>

            </a>

            <a href="#">

                <i class="bi bi-robot"></i>

                <span>AI Recommendation</span>

            </a>

        </nav>

        <div class="tg-sidebar-footer">

            <button class="tg-setting-btn">

                <i class="bi bi-gear-fill"></i>

                Settings

            </button>

            <form action="{{ route('logout') }}" method="POST">

                @csrf

                <button
                    class="tg-logout-btn"
                    type="submit">

                    <i class="bi bi-box-arrow-right"></i>

                    Logout

                </button>

            </form>

        </div>

    </aside>

    <!-- ========================================================= -->
    <!-- MAIN -->
    <!-- ========================================================= -->

    <main class="tg-main">

        <!-- ===================================================== -->
        <!-- HEADER -->
        <!-- ===================================================== -->

        <header class="tg-header">

            <div class="tg-header-left">

                <h1>

                    Global Trade Intelligence Dashboard

                </h1>

                <p>

                    Monitor world economy,
                    shipping activity,
                    weather,
                    exchange rate,
                    trade routes,
                    and AI recommendation
                    in one dashboard.

                </p>

            </div>

            <div class="tg-header-right">

                <div class="tg-search-box">

                    <i class="bi bi-search"></i>

                    <input

                        id="searchCountry"

                        type="text"

                        placeholder="Search country..."

                    >

                </div>

                <div class="tg-clock">

                    <h3 id="liveTime">

                        00:00:00

                    </h3>

                    <small id="liveDate">

                        Loading...

                    </small>

                </div>

                <div class="tg-profile">

                    <div class="tg-avatar">

                        {{ strtoupper(substr(Auth::user()->name,0,1)) }}

                    </div>

                    <div>

                        <strong>

                            {{ Auth::user()->name }}

                        </strong>

                        <span>

                            Trade Analyst

                        </span>

                    </div>

                </div>

            </div>

        </header>

        <!-- ===================================================== -->
        <!-- KPI -->
        <!-- ===================================================== -->

        <section class="tg-kpi-grid">

            <article class="tg-kpi-card">

                <div class="tg-kpi-icon">

                    🌍

                </div>

                <div>

                    <small>

                        Countries

                    </small>

                    <h2 id="countryCount">

                        0

                    </h2>

                    <span>

                        Global Coverage

                    </span>

                </div>

            </article>

            <article class="tg-kpi-card">

                <div class="tg-kpi-icon">

                    📈

                </div>

                <div>

                    <small>

                        Trade Score

                    </small>

                    <h2 id="tradeScoreKPI">

                        94%

                    </h2>

                    <span>

                        Trade Confidence

                    </span>

                </div>

            </article>

            <article class="tg-kpi-card">

                <div class="tg-kpi-icon">

                    💱

                </div>

                <div>

                    <small>

                        Exchange Rate

                    </small>

                    <h2 id="exchangeRate">

                        --

                    </h2>

                    <span>

                        Currency Market

                    </span>

                </div>

            </article>

            <article class="tg-kpi-card">

                <div class="tg-kpi-icon">

                    ⚠️

                </div>

                <div>

                    <small>

                        Risk Status

                    </small>

                    <h2 id="riskLevel">

                        -

                    </h2>

                    <span>

                        Updated Live

                    </span>

                </div>

            </article>

        </section>

        <!-- ===================================================== -->
        <!-- MAIN GRID -->
        <!-- ===================================================== -->

        <section class="tg-main-grid">

            <!-- ================================================= -->
            <!-- LEFT -->
            <!-- ================================================= -->

            <div class="tg-left-column">

                <section class="tg-globe-card">

                    <div class="tg-card-header">

                <div>

                    <div class="tg-title-group">

                        <h2>🌍 Interactive Globe</h2>

                        <span class="tg-live">

                            <span></span>

                            LIVE

                        </span>

                    </div>

                    <p>
                        Click any country to display detailed trade information and live economic data.
                    </p>

                </div>

                        <div class="tg-card-actions">

                            <button
                                id="btnResetGlobe"
                                class="tg-tool-btn">

                                <i class="bi bi-arrow-clockwise"></i>

                            </button>

                            <button
                                id="btnAutoRotate"
                                class="tg-tool-btn">

                                <i class="bi bi-globe2"></i>

                            </button>

                        </div>

                    </div>

                    <div
                        id="globeDashboard"
                        class="tg-globe-wrapper">
                    </div>

                </section>

                <div class="tg-chart-card">

                    <div class="tg-card-header">

                        <div class="tg-title-group">

                            <h3>📈 Economy Trend</h3>

                            <span class="tg-chart-live">
                                LIVE GDP
                            </span>

                        </div>

                    </div>

                    <div class="tg-chart-body">

                        <canvas id="economyChart"></canvas>

                    </div>

                </div>
<!-- ================================================= -->
<!-- BOTTOM GRID -->
<!-- ================================================= -->

        <section class="tg-bottom-grid">


<!-- ================================================= -->
<!-- TRADE STATISTICS -->
<!-- ================================================= -->

<div class="tg-stat-card">

    <div class="tg-card-header">

        <h3>

            📊 Trade Statistics

        </h3>

    </div>

    <div class="tg-stat-grid">

        <div class="tg-stat-box">

            <span>

                Export

            </span>

            <strong>

                $248B

            </strong>

        </div>

        <div class="tg-stat-box">

            <span>

                Import

            </span>

            <strong>

                $214B

            </strong>

        </div>

        <div class="tg-stat-box">

            <span>

                Trade Balance

            </span>

            <strong>

                +$34B

            </strong>

        </div>

        <div class="tg-stat-box">

            <span>

                Shipping

            </span>

            <strong>

                Stable

            </strong>

        </div>

    </div>

</div>

<!-- ================================================= -->
<!-- TOP PARTNER -->
<!-- ================================================= -->

<div class="tg-partner-card">

    <div class="tg-card-header">

        <h3>

            🌎 Top Trade Partners

        </h3>

    </div>

    <div class="tg-partner-list">

        <div class="tg-partner-item">

            <span>🇯🇵 Japan</span>

            <strong>95%</strong>

        </div>

        <div class="tg-partner-item">

            <span>🇨🇳 China</span>

            <strong>92%</strong>

        </div>

        <div class="tg-partner-item">

            <span>🇺🇸 United States</span>

            <strong>97%</strong>

        </div>

        <div class="tg-partner-item">

            <span>🇩🇪 Germany</span>

            <strong>93%</strong>

        </div>

        <div class="tg-partner-item">

            <span>🇦🇺 Australia</span>

            <strong>90%</strong>

        </div>

    </div>

</div>

</section>

<section class="tg-quick-card">

    <div class="tg-card-header">

        <h3>

            ⚡ Quick Actions

        </h3>

    </div>

    <div class="tg-quick-grid">

        <button
            id="btnRefreshData"
            class="tg-action-btn">

            <i class="bi bi-arrow-repeat"></i>

            <span>

                Refresh Data

            </span>

        </button>

        <button
            id="btnFullscreen"
            class="tg-action-btn">

            <i class="bi bi-arrows-fullscreen"></i>

            <span>

                Fullscreen

            </span>

        </button>

    </div>

</section>

            </div>

            <!-- ================================================= -->
            <!-- RIGHT COLUMN -->
            <!-- ================================================= -->

            <aside class="tg-right-column">

                <!-- ============================================== -->
                <!-- COUNTRY INFORMATION -->
                <!-- ============================================== -->

                <section class="tg-country-card">

                <div class="tg-card-header">

                    <h3>🌎 Country Information</h3>

                </div>

                <div class="tg-country-header">

                    <img 
                        id="countryFlag"
                        src=""
                        alt="Country Flag"
                        hidden>

                    <div>

                        <div class="tg-country-title">

                            <h2 id="countryTitle">
                                Select Country
                            </h2>

                            <span class="tg-country-chip">

                                Trade Profile

                            </span>

                        </div>

                        <span id="region">-</span>

                    </div>

                </div>

                    <div class="tg-country-grid">

                        <div class="tg-info-box">

                            <span>

                                Capital

                            </span>

                            <strong id="capital">

                                -

                            </strong>

                        </div>

                        <div class="tg-info-box">

                            <span>

                                Population

                            </span>

                            <strong id="population">

                                -

                            </strong>

                        </div>

                        <div class="tg-info-box">

                            <span>

                                Currency

                            </span>

                            <strong id="currency">

                                -

                            </strong>

                        </div>

                        <div class="tg-info-box">

                            <span>

                                GDP

                            </span>

                            <strong id="gdp">

                                -

                            </strong>

                        </div>

                        <div class="tg-info-box">

                            <span>

                                Inflation

                            </span>

                            <strong id="inflation">

                                -

                            </strong>

                        </div>

                        <div class="tg-info-box">

                            <span>

                                Exchange

                            </span>

                            <strong id="countryExchangeRate">

                                --

                            </strong>

                        </div>

                    </div>

                    <div class="tg-progress-section">

                        <div class="tg-progress-title">

                            <span>

                                Trade Score

                            </span>

                        </div>

                        <div class="tg-progress">

                            <div
                                id="tradeProgress"
                                class="tg-progress-bar">

                                0%

                            </div>

                        </div>

                    </div>

                    <div class="tg-weather-section">

                        <h4>

                            Weather

                        </h4>

                        <div
                            id="weatherCard"
                            class="tg-weather-card">

                            Select Country

                        </div>

                    </div>

                </section>

<!-- ============================================== -->
<!-- AI -->
<!-- ============================================== -->

<section class="tg-ai-card">

    <div class="tg-card-header">

        <div class="tg-title-group">

            <h3>
                🤖 AI Trade Insights
            </h3>

            <span class="tg-ai-badge">
                GPT Powered
            </span>

        </div>

    </div>

    <div
        id="recommendation"
        class="tg-ai-content">

        Select a country to receive AI recommendation.

    </div>

</section>

<!-- ============================================== -->
<!-- NEWS -->
<!-- ============================================== -->

<section class="tg-news-card">

    <div class="tg-card-header">

        <div class="tg-title-group">

            <h3>
                📰 Latest Trade News
            </h3>

            <span class="tg-update">
                Updated Live
            </span>

        </div>

    </div>

    <div
        id="newsList"
        class="tg-news-list">
    </div>

</section>

<footer class="tg-footer">

    TradeGuardian Dashboard

    •

    Version 2.0

</footer>

</main>

</div>

<div
    id="countryTooltip"
    class="tg-tooltip">

</div>

@endsection