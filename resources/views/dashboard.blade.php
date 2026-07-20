@extends('layouts.app')

@section('title','TradeGuardian Dashboard')

@section('content')

<div class="tg-app">

    <!-- ========================================================= -->
    <!-- SIDEBAR -->
    <!-- ========================================================= -->

    <aside class="tg-sidebar">

        <div class="tg-logo" title="Click to replay dashboard tour">

            <div class="tg-logo-icon">
                🌍
            </div>

            <div class="tg-logo-text">

                <h2>TradeGuardian</h2>

                <span>Global Trade Intelligence</span>

            </div>

        </div>

        <nav class="tg-sidebar-menu">

            <a href="#dashboardSection" class="active">

            <i class="bi bi-grid-fill"></i>

            <span>Dashboard</span>

        </a>

            <a href="#countrySection">

            <i class="bi bi-globe2"></i>

            <span>Countries</span>

        </a>

            <a href="#economySection">

            <i class="bi bi-bar-chart-fill"></i>

            <span>Economy</span>

        </a>

            <a href="#exchangeSection">

            <i class="bi bi-currency-exchange"></i>

            <span>Exchange Rate</span>

        </a>

            <a href="#weatherSection">

            <i class="bi bi-cloud-sun-fill"></i>

            <span>Weather</span>

        </a>

            <a href="#newsSection">

            <i class="bi bi-newspaper"></i>

            <span>Trade News</span>

        </a>

            <a href="#aiSection">

            <i class="bi bi-robot"></i>

            <span>AI Recommendation</span>

        </a>

        </nav>

        <div class="tg-favorite-sidebar">

    <h4>
        ⭐ Favorite Countries
        <span id="favoriteCount">0</span>
    </h4>

    <div id="favoriteList">

        <div class="favorite-empty">
            No favorites yet
        </div>

    </div>

    <div class="tg-recent-sidebar">

    <h4>
        🕒 Recent Viewed
    </h4>

    <div id="recentList">

        <div class="favorite-empty">
            No recent country
        </div>

    </div>

</div>

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

                    Monitor global trade performance, economic indicators,
                    weather conditions, exchange rates,
                    and AI-driven recommendations in one dashboard.

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

                <section
                    id="dashboardSection"
                    class="tg-globe-card">

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

                <div
                    id="economySection"
                    class="tg-chart-card">

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
<!-- COUNTRY COMPARISON -->
<!-- ================================================= -->

<section class="tg-compare-card">

    <div class="tg-card-header">

        <div class="tg-title-group">

            <h3>🌍 Country Comparison</h3>

            <span class="tg-chart-live">
                LIVE ANALYSIS
            </span>

        </div>

    </div>

    <div class="tg-compare-content">

        <div class="tg-current-country">

            <span>Current Country</span>

            <h2 id="currentCountryCompare">
                Indonesia
            </h2>

        </div>

        <div class="tg-vs">
            VS
        </div>

        <div class="tg-select-country">

            <span>Compare With</span>

            <select id="compareCountry">

                <option value="">
                    Select Country...
                </option>

            </select>

        </div>

        <button
            id="btnCompare"
            class="tg-compare-btn">

            <i class="bi bi-bar-chart-fill"></i>

            Compare Now

        </button>

        <!-- HASIL PERBANDINGAN -->
        <div id="compareResult" class="tg-compare-result">

            <div class="compare-placeholder">

                Select a country and click
                <strong>Compare Now</strong>

            </div>

        </div>

    </div>

</section>

<!-- ================================================= -->
<!-- QUICK ACTION -->
<!-- ================================================= -->

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

        <button
            id="btnExport"
            class="tg-action-btn">

            <i class="bi bi-file-earmark-pdf-fill"></i>

            <span>
                Export Report
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

<section
    id="countrySection"
    class="tg-country-card">

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

    <div class="tg-country-top">

        <h2 id="countryTitle">

            Select Country

        </h2>

        <button
            id="favoriteBtn"
            class="favorite-btn">

            ☆

        </button>

    </div>

    <span class="tg-country-chip">

        Trade Profile

    </span>

</div>

            <span id="region">-</span>

        </div>

    </div>

    <div class="tg-country-grid">

        <div class="tg-info-box">
            <span>Capital</span>
            <strong id="capital">-</strong>
        </div>

        <div class="tg-info-box">
            <span>Population</span>
            <strong id="population">-</strong>
        </div>

        <div class="tg-info-box">
            <span>Currency</span>
            <strong id="currency">-</strong>
        </div>

        <div class="tg-info-box">
            <span>GDP</span>
            <strong id="gdp">-</strong>
        </div>

        <div class="tg-info-box">
            <span>Inflation</span>
            <strong id="inflation">-</strong>
        </div>

        <div
            id="exchangeSection"
            class="tg-info-box">

            <span>Exchange</span>

            <strong id="countryExchangeRate">
                --
            </strong>

        </div>

    </div>

    <!-- ===================== -->
    <!-- TRADE SCORE -->
    <!-- ===================== -->

    <div class="tg-progress-section">

        <div class="tg-progress-title">

            <span>Trade Score</span>

        </div>

        <div class="tg-progress">

            <div
                id="tradeProgress"
                class="tg-progress-bar">

                0%

            </div>

        </div>

    </div>

    <!-- ===================== -->
    <!-- SUPPLY CHAIN RISK -->
    <!-- ===================== -->

    <section class="tg-risk-card">

        <div class="tg-card-header">
            <h3>🛡 Supply Chain Risk Engine</h3>
        </div>

        <div class="tg-risk-circle">

            <h1 id="riskScore">0</h1>

            <span>/100</span>

        </div>

        <div
            id="riskBadge"
            class="risk-badge">

            LOW RISK

        </div>

        <div class="tg-risk-breakdown">

            <div>
                Weather
                <strong id="weatherRisk">0</strong>
            </div>

            <div>
                Inflation
                <strong id="inflationRisk">0</strong>
            </div>

            <div>
                News
                <strong id="newsRisk">0</strong>
            </div>

        </div>

    </section>

    <!-- ===================== -->
    <!-- WEATHER -->
    <!-- ===================== -->

    <div
        id="weatherSection"
        class="tg-weather-section">

        <h4>Weather</h4>

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

<section
    id="aiSection"
    class="tg-ai-card">

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

<section
    id="newsSection"
    class="tg-news-card">

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

<div id="tgTour" class="tg-tour">

    <div class="tg-tour-box">

        <h2>👋 Welcome to TradeGuardian</h2>

        <p id="tourText">
            Explore global trade information interactively.
        </p>

        <div class="tg-tour-buttons">

            <button id="tourSkip">
                Skip
            </button>

            <button id="tourNext">
                Next →
            </button>

        </div>

    </div>

</div>

<div
    id="countryTooltip"
    class="tg-tooltip">

</div>

<!-- SETTINGS MODAL -->

<div id="settingsModal" class="tg-modal">

    <div class="tg-modal-content">

        <div class="tg-modal-header">

            <h2>⚙️ Dashboard Settings</h2>

            <button id="closeSettings">&times;</button>

        </div>

        <div class="tg-setting-list">

            <button id="toggleTheme" class="tg-setting-item">
                🌙 Toggle Theme
            </button>

            <button id="toggleRotation" class="tg-setting-item">
                🌍 Toggle Globe Rotation
            </button>

            <button id="resetCamera" class="tg-setting-item">
                🎯 Reset Globe Camera
            </button>

            <button id="replayTour" class="tg-setting-item">
                👋 Replay Dashboard Tour
            </button>

            <button class="tg-setting-item" disabled>
                ℹ️ TradeGuardian v2.0
            </button>

        </div>

    </div>

</div>

<div id="tgToast" class="tg-toast">

    <div class="tg-toast-icon">✅</div>

    <div>

        <div id="tgToastTitle" class="tg-toast-title">
            Success
        </div>

        <div id="tgToastText" class="tg-toast-text">
            Action completed.
        </div>

    </div>

</div>

@endsection