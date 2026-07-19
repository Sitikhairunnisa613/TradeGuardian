// ======================================================
// TradeGuardian Dashboard
// ======================================================

import "./bootstrap";
import "../css/app.css";

import Chart from "chart.js/auto";
import Globe from "globe.gl";
import * as THREE from "three";

import { countries } from "./countryData";
const countryCache = {};

async function getCountryInfo(countryName) {

    const response = await fetch(`/api/country/${countryName}`);

    if (!response.ok) {
        throw new Error("Failed to load country");
    }

    return await response.json();
}

async function getEconomy(countryName) {

    const response = await fetch(`/api/economy/${countryName}`);

    if (!response.ok) {
        throw new Error("Failed to load economy");
    }

    return await response.json();
}

async function getWeather(lat, lng) {

    const response = await fetch(`/api/weather/${lat}/${lng}`);

    if (!response.ok) {
        throw new Error("Failed to load weather");
    }

    return await response.json();
}

async function getExchange(currency){

    const response = await fetch(`/api/exchange/${currency}`);

    if(!response.ok){
        throw new Error("Failed to load exchange");
    }

    return await response.json();
}

async function getNews(country){

    const response = await fetch(`/api/news/${country}`);

    if(!response.ok){

        console.log("NEWS STATUS:", response.status);

        console.log(await response.text());

        throw new Error("Failed to load news");

    }

    return await response.json();

}

// ======================================================
// CHECK DASHBOARD
// ======================================================

const dashboardGlobe = document.getElementById("globeDashboard");

if (!dashboardGlobe) {
    console.log("TradeGuardian Dashboard not found.");
} else {

console.log("TradeGuardian Dashboard Loaded");

// ======================================================
// GLOBAL VARIABLES
// ======================================================

let economyChart = null;

let autoRotate = true;

let rotateAngle = 110;

let globe;

// ======================================================
// TRADE ROUTES
// ======================================================

const tradeRoutes = [

    {
        startLat: -6.2,
        startLng: 106.8,
        endLat: 35.68,
        endLng: 139.69
    },

    {
        startLat: -6.2,
        startLng: 106.8,
        endLat: 39.90,
        endLng: 116.40
    },

    {
        startLat: -6.2,
        startLng: 106.8,
        endLat: 52.52,
        endLng: 13.40
    },

    {
        startLat: -6.2,
        startLng: 106.8,
        endLat: 38.89,
        endLng: -77.03
    },

    {
        startLat: -6.2,
        startLng: 106.8,
        endLat: -35.28,
        endLng: 149.13
    },

    {
        startLat: -6.2,
        startLng: 106.8,
        endLat: -15.79,
        endLng: -47.88
    },

    {
        startLat: 35.68,
        startLng: 139.69,
        endLat: 38.89,
        endLng: -77.03
    },

    {
        startLat: 39.90,
        startLng: 116.40,
        endLat: 52.52,
        endLng: 13.40
    }

];

// ======================================================
// CREATE GLOBE
// ======================================================

globe = Globe()(dashboardGlobe);

globe

.width(dashboardGlobe.clientWidth)

.height(600)

.backgroundColor("rgba(0,0,0,0)")

.globeImageUrl(
    "https://unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
)

.bumpImageUrl(
    "https://unpkg.com/three-globe/example/img/earth-topology.png"
)

.showAtmosphere(true)

.atmosphereColor("#38bdf8")

.atmosphereAltitude(0.22);

console.log("Globe Created");

// ======================================================
// LIGHTING
// ======================================================

const ambientLight = new THREE.AmbientLight(
    0xffffff,
    1.3
);

globe.scene().add(ambientLight);

const directionalLight = new THREE.DirectionalLight(
    0xffffff,
    2.4
);

directionalLight.position.set(
    250,
    120,
    250
);

globe.scene().add(directionalLight);

// ======================================================
// COUNTRY POINTS
// ======================================================

globe

.pointsData(countries)

.pointLat(d => d.lat)

.pointLng(d => d.lng)

.pointAltitude(0.09)

.pointRadius(1.25)

.pointColor(() => "#60a5fa");

// ======================================================
// COUNTRY RINGS
// ======================================================

globe

.ringsData(countries)

.ringLat(d => d.lat)

.ringLng(d => d.lng)

.ringColor(() => ["#38bdf8"])

.ringMaxRadius(5)

.ringPropagationSpeed(2)

.ringRepeatPeriod(700);

// ======================================================
// TRADE ROUTES
// ======================================================

globe

.arcsData(tradeRoutes)

.arcColor(() => [
    "#38bdf8",
    "#2563eb"
])

.arcAltitude(0.23)

.arcStroke(1.2)

.arcCurveResolution(80)

.arcDashLength(0.10)

.arcDashGap(0.90)

.arcDashInitialGap(() => Math.random())

.arcDashAnimateTime(2200);

// ======================================================
// INITIAL CAMERA
// ======================================================

globe.pointOfView({

    lat: 10,

    lng: 110,

    altitude: 2.6

});

// ======================================================
// AUTO ROTATE
// ======================================================

setInterval(() => {

    if (!autoRotate) return;

    globe.pointOfView({

        lat: 10,

        lng: rotateAngle++,

        altitude: 2.6

    });

}, 120);

// ======================================================
// MOUSE EVENT
// ======================================================

dashboardGlobe.addEventListener("mouseenter", () => {

    autoRotate = false;

});

dashboardGlobe.addEventListener("mouseleave", () => {

    autoRotate = true;

});

// ======================================================
// RESET CAMERA
// ======================================================

function resetCamera() {

    globe.pointOfView({

        lat: 10,

        lng: 110,

        altitude: 2.6

    }, 2200);

}

window.resetGlobe = resetCamera;

dashboardGlobe.addEventListener("dblclick", () => {

    resetCamera();

});

const planes = [];

// ======================================================
// CREATE AIRPLANE
// ======================================================

function createPlane() {

    const plane = new THREE.Group();

    // BODY
    const body = new THREE.Mesh(
        new THREE.CylinderGeometry(0.03, 0.03, 0.38, 16),
        new THREE.MeshPhongMaterial({
            color: "#ffffff",
            shininess: 120
        })
    );

    body.rotation.z = Math.PI / 2;
    plane.add(body);

    // WING
    const wing = new THREE.Mesh(
        new THREE.BoxGeometry(0.02, 0.32, 0.08),
        new THREE.MeshPhongMaterial({
            color: "#38bdf8"
        })
    );

    plane.add(wing);

    // TAIL
    const tail = new THREE.Mesh(
        new THREE.BoxGeometry(0.02, 0.12, 0.05),
        new THREE.MeshPhongMaterial({
            color: "#38bdf8"
        })
    );

    tail.position.x = -0.16;
    plane.add(tail);

    // NOSE
    const nose = new THREE.Mesh(
        new THREE.SphereGeometry(0.035, 16, 16),
        new THREE.MeshPhongMaterial({
            color: "#ffffff"
        })
    );

    nose.position.x = 0.19;
    plane.add(nose);

    // ENGINE LIGHT
    const engineGlow = new THREE.PointLight(
        "#38bdf8",
        1.8,
        1.5
    );

    engineGlow.position.set(-0.15, 0, 0);
    plane.add(engineGlow);

    // NAVIGATION LIGHT
    const navLight = new THREE.PointLight(
        "#ffffff",
        2,
        2
    );

    navLight.position.set(0.18, 0, 0);
    plane.add(navLight);

    return plane;
}

// ======================================================
// CREATE PLANES
// ======================================================

tradeRoutes.forEach(route => {

    const mesh = createPlane();

    globe.scene().add(mesh);

    planes.push({

        mesh,
        route,
        progress: Math.random()

    });

});

// ======================================================
// LERP
// ======================================================

function lerp(a, b, t) {

    return a + (b - a) * t;

}

// ======================================================
// UPDATE PLANE POSITION
// ======================================================

function updatePlanes() {

    planes.forEach(item => {

        item.progress += 0.0018;

        if (item.progress > 1) {

            item.progress = 0;

        }

        const lat = lerp(
            item.route.startLat,
            item.route.endLat,
            item.progress
        );

        const lng = lerp(
            item.route.startLng,
            item.route.endLng,
            item.progress
        );

        const current = globe.getCoords(
            lat,
            lng,
            0.24
        );

        item.mesh.position.set(
            current.x,
            current.y,
            current.z
        );

        const nextLat = lerp(
            item.route.startLat,
            item.route.endLat,
            Math.min(item.progress + 0.01, 1)
        );

        const nextLng = lerp(
            item.route.startLng,
            item.route.endLng,
            Math.min(item.progress + 0.01, 1)
        );

        const next = globe.getCoords(
            nextLat,
            nextLng,
            0.24
        );

        item.mesh.lookAt(next);

    });

    requestAnimationFrame(updatePlanes);

}

updatePlanes();

// ======================================================
// BLINKING LIGHT
// ======================================================

setInterval(() => {

    planes.forEach(item => {

        item.mesh.children.forEach(child => {

            if (child.type === "PointLight") {

                child.visible = !child.visible;

            }

        });

    });

}, 450);

// ======================================================
// SCALE FOLLOW CAMERA
// ======================================================

function updatePlaneScale() {

    const altitude = globe.pointOfView().altitude;

    const scale = Math.max(
        0.8,
        2.8 - altitude
    );

    planes.forEach(item => {

        item.mesh.scale.set(
            scale,
            scale,
            scale
        );

    });

}

setInterval(updatePlaneScale, 100);

// ======================================================
// SUN LIGHT
// ======================================================

const sun = new THREE.DirectionalLight(
    0xffffff,
    3
);

sun.position.set(
    250,
    120,
    250
);

globe.scene().add(sun);

// ======================================================
// SUN ANIMATION
// ======================================================

let sunAngle = 0;

function animateSun() {

    sunAngle += 0.002;

    sun.position.x = Math.cos(sunAngle) * 250;

    sun.position.z = Math.sin(sunAngle) * 250;

    requestAnimationFrame(animateSun);

}

animateSun();

console.log("Airplane Engine Loaded");

// ======================================================
// UPDATE CHART
// ======================================================

Chart.register({

    id:"lineGlow",

    beforeDatasetsDraw(chart){

        const {ctx}=chart;

        ctx.save();

        ctx.shadowColor="#3B82F6";

        ctx.shadowBlur=18;

    },

    afterDatasetsDraw(chart){

        chart.ctx.restore();

    }

});

function updateChart(country, economy){

    const canvas = document.getElementById("economyChart");

    if(!canvas) return;

    if(economyChart){
        economyChart.destroy();
    }

    const ctx = canvas.getContext("2d");

    // ==========================
    // Gradient
    // ==========================

    const gradient = ctx.createLinearGradient(0,0,0,300);

    gradient.addColorStop(0,"rgba(59,130,246,.45)");
    gradient.addColorStop(.5,"rgba(59,130,246,.18)");
    gradient.addColorStop(1,"rgba(59,130,246,0)");

    economyChart = new Chart(ctx,{

        type:"line",

        data:{

            labels:economy.labels,

            datasets:[{

                data:economy.chart,

                borderColor:"#3B82F6",

                backgroundColor:gradient,

                fill:true,

                borderWidth:4,

                tension:.55,

                pointRadius:2,

                pointHoverRadius:6,

                pointBackgroundColor:"#60A5FA",

                pointBorderColor:"#ffffff",

                pointBorderWidth:2,

            }]

        },

        options:{

            responsive:true,

            maintainAspectRatio:false,

            interaction:{
                intersect:false,
                mode:"index"
            },

            plugins:{

                legend:{
                    display:false
                },

                tooltip:{

                    backgroundColor:"#1E40AF",

                    titleColor:"#fff",

                    bodyColor:"#fff",

                    borderColor:"#3B82F6",

                    borderWidth:1,

                    cornerRadius:12,

                    padding:12,

                    displayColors:false,

                    callbacks:{

                        label:function(context){

                            return context.raw + " Trillion USD";

                        }

                    }

                }

            },

            scales:{

                x:{

                    ticks:{
                        color:"#94A3B8",
                        font:{
                            size:11
                        }
                    },

                    grid:{
                        color:"rgba(255,255,255,.05)",
                        drawBorder:false
                    }

                },

                y:{

                    ticks:{
                        color:"#94A3B8",
                        font:{
                            size:11
                        }
                    },

                    grid:{
                        color:"rgba(255,255,255,.05)",
                        drawBorder:false
                    }

                }

            },

            animation:{

                duration:1400,

                easing:"easeOutQuart"

            }

        }

    });

}

// ======================================================
// TRADE SCORE
// ======================================================

function updateTradeProgress(country) {

    const progress = document.getElementById("tradeProgress");

    if (!progress) return;

    const value = parseInt(country.tradeScore);

    progress.style.width = value + "%";

    progress.innerText = country.tradeScore;

    if (value >= 90) {

        progress.style.background = "#22c55e";

    } else if (value >= 75) {

        progress.style.background = "#f59e0b";

    } else {

        progress.style.background = "#ef4444";

    }

}

// ======================================================
// RISK
// ======================================================

function updateRisk(country) {

    const risk = document.getElementById("riskLevel");

    if (!risk) return;

    risk.innerText = country.risk;

    risk.className = "risk";

    if (country.risk === "Low") {

        risk.classList.add("low");

    }

    if (country.risk === "Medium") {

        risk.classList.add("medium");

    }

    if (country.risk === "High") {

        risk.classList.add("high");

    }

}

// ======================================================
// WEATHER
// ======================================================

function updateWeather(weather) {

    const card = document.getElementById("weatherCard");

    if (!card) return;

    card.innerHTML = `
        <div class="weather-icon">
            ${weatherIcon(weather.weather)}
        </div>

        <h2>${weather.temperature}°C</h2>

        <p>${weather.weather}</p>

        <div class="weather-grid">

            <div class="weather-box">
                <span>Humidity</span>
                <h4>${weather.humidity}%</h4>
            </div>

            <div class="weather-box">
                <span>Wind</span>
                <h4>${weather.wind} km/h</h4>
            </div>

        </div>
    `;
}

function weatherIcon(weather){

    switch(weather){

        case "Clear Sky":
            return "☀";

        case "Partly Cloudy":
            return "⛅";

        case "Overcast":
            return "☁";

        case "Rain":
        case "Moderate Rain":
        case "Slight Rain":
            return "🌧";

        case "Thunderstorm":
            return "⛈";

        default:
            return "🌤";

    }

}

// ======================================================
// NEWS
// ======================================================

function updateNews(news) {

    const list = document.getElementById("newsList");

    if (!list) return;

    if (!news || news.length === 0) {

        list.innerHTML = `
            <div class="news-empty">

                <h4>No News Available</h4>

                <p>There are currently no news articles for this country.</p>

            </div>
        `;

        return;
    }

    list.innerHTML = news.map(item => `

        <div class="news-card">

            <div class="news-header">

                <span class="news-source">

                    📰 ${item.source}

                </span>

                <span class="news-date">

                    ${formatNewsDate(item.date)}

                </span>

            </div>

            <h4 class="news-title">

                ${item.title}

            </h4>

            <a
                href="${item.url}"
                target="_blank"
                rel="noopener noreferrer"
                class="news-button">

                Read More →

            </a>

        </div>

    `).join("");

}

function formatNewsDate(date) {

    if (!date) return "";

    const d = new Date(date);

    return d.toLocaleDateString("en-US", {

        day: "numeric",

        month: "short",

        year: "numeric"

    });

}

// ======================================================
// AI RECOMMENDATION
// ======================================================

function updateAI(country, economy, weather, exchange) {

    const ai = document.getElementById("recommendation");

    if (!ai) return;

    const recommendations = [];

    // Trade Score
    const tradeScore = parseInt(country.tradeScore);

    if (tradeScore >= 90) {

        recommendations.push({
            icon: "📈",
            color: "#22c55e",
            text: "Trade confidence is very high. This market is favorable for export expansion."
        });

    } else if (tradeScore >= 75) {

        recommendations.push({
            icon: "⚖️",
            color: "#f59e0b",
            text: "Trade conditions remain stable. Expand carefully while monitoring market trends."
        });

    } else {

        recommendations.push({
            icon: "⚠️",
            color: "#ef4444",
            text: "Trade confidence is relatively low. Consider evaluating risks before exporting."
        });

    }

    // Inflation
    if (economy.inflation !== "-" && Number(economy.inflation) > 6) {

        recommendations.push({
            icon: "💹",
            color: "#f97316",
            text: "High inflation may reduce purchasing power in this market."
        });

    } else {

        recommendations.push({
            icon: "💰",
            color: "#22c55e",
            text: "Inflation remains under control and supports stable business conditions."
        });

    }

    // Weather
    if (
        weather.weather.includes("Rain") ||
        weather.weather.includes("Storm")
    ) {

        recommendations.push({
            icon: "🌧️",
            color: "#3b82f6",
            text: "Weather conditions may affect shipping schedules. Monitor logistics closely."
        });

    } else {

        recommendations.push({
            icon: "☀️",
            color: "#eab308",
            text: "Weather conditions are favorable for transportation and shipping."
        });

    }

    // Exchange
    recommendations.push({

        icon: "💱",

        color: "#8b5cf6",

        text:
            `Current exchange base is ${exchange.base}. Monitor currency fluctuations before large transactions.`

    });

    ai.innerHTML = recommendations.map(item => `

        <div class="ai-item">

            <div
                class="ai-icon"
                style="background:${item.color}">

                ${item.icon}

            </div>

            <div class="ai-text">

                ${item.text}

            </div>

        </div>

    `).join("");

}

// ======================================================
// NUMBER FORMAT
// ======================================================

function formatPopulation(value){

    if(!value) return "-";

    const num = Number(value);

    if(num >= 1_000_000_000){

        return (num / 1_000_000_000).toFixed(2) + " B";

    }

    if(num >= 1_000_000){

        return (num / 1_000_000).toFixed(1) + " M";

    }

    if(num >= 1_000){

        return (num / 1_000).toFixed(1) + " K";

    }

    return num.toLocaleString();

}

function formatGDP(value){

    if(!value || value === "-") return "-";

    const num = Number(String(value).replace(/,/g,""));

    if(isNaN(num)) return value;

    if(num >= 1_000_000_000_000){

        return "$" + (num / 1_000_000_000_000).toFixed(2) + " T";

    }

    if(num >= 1_000_000_000){

        return "$" + (num / 1_000_000_000).toFixed(2) + " B";

    }

    if(num >= 1_000_000){

        return "$" + (num / 1_000_000).toFixed(2) + " M";

    }

    return "$" + num.toLocaleString();

}

// ======================================================
// COUNTRY PANEL
// ======================================================

async function showCountry(country) {

    autoRotate = false;

    document.body.classList.add("loading");

    document.getElementById("countryTitle").innerText = "Loading...";

    try {

        let apiCountry,
            economy,
            weather,
            exchange,
            news;

        // ==========================================
        // CACHE
        // ==========================================

        if (countryCache[country.name]) {

            ({
                apiCountry,
                economy,
                weather,
                exchange,
                news
            } = countryCache[country.name]);

        } else {

            [
                apiCountry,
                economy,
                weather,
                exchange,
                news
            ] = await Promise.all([

                getCountryInfo(country.name),

                getEconomy(country.name),

                getWeather(country.lat, country.lng),

                getExchange(country.currency),

                getNews(country.code)

            ]);

            countryCache[country.name] = {

                apiCountry,
                economy,
                weather,
                exchange,
                news

            };

        }

        // ==========================================
        // COUNTRY INFORMATION
        // ==========================================

        const title=document.getElementById("countryTitle");

        title.style.opacity="0";

        setTimeout(()=>{

            title.innerText=country.name;

            title.style.opacity="1";

        },150);

        document.getElementById("capital").innerText =
            apiCountry.capital ?? "-";

        document.getElementById("currency").innerText =
            apiCountry.currency ?? "-";

        document.getElementById("population").innerText =
        formatPopulation(apiCountry.population);

        document.getElementById("region").innerText =
            apiCountry.region ?? "-";

        console.log(economy.gdp);
        document.getElementById("gdp").innerText =
        formatGDP(economy.gdp);

        document.getElementById("inflation").innerText =
            economy.inflation ?? "-";

        const exchangeText =
        `${exchange.base}/${exchange.target} (${exchange.rate})`;

        document.getElementById("exchangeRate").innerText =
        exchangeText;

        document.getElementById("countryExchangeRate").innerText =
        exchangeText;

        document.getElementById("tradeScoreKPI").innerText =
            country.tradeScore;

        // ==========================================
        // FLAG
        // ==========================================

        const flag = document.getElementById("countryFlag");

        if (flag) {

            flag.src = apiCountry.flag;

            flag.hidden = false;

        }

        // ==========================================
        // UPDATE UI
        // ==========================================

        updateTradeProgress(country);

        updateRisk(country);

        updateWeather(weather);

        updateNews(news);

        updateAI(
            country,
            economy,
            weather,
            exchange
        );

        updateChart(country, economy);

        // ==========================================
        // GLOBE
        // ==========================================

        globe.ringsData([country]);

        globe.pointOfView({

            lat: country.lat,

            lng: country.lng,

            altitude: 2.5

        }, 1300);

    } catch (error) {

        console.error(error);

        document.getElementById("countryTitle").innerText =
            "Failed to load";

    } finally {

        setTimeout(()=>{

        document.body.classList.remove("loading");

    },250);

    }

}

// ======================================================
// DEFAULT COUNTRY
// ======================================================

showCountry(countries[0]);

console.log("Dashboard Logic Loaded");

// ======================================================
// TOOLTIP
// ======================================================

const tooltip = document.getElementById("countryTooltip");

if (tooltip) {

    tooltip.style.position = "absolute";
    tooltip.style.display = "none";
    tooltip.style.pointerEvents = "none";

}

// ======================================================
// HOVER COUNTRY
// ======================================================

globe.onPointHover(country => {

    dashboardGlobe.style.cursor =
        country ? "pointer" : "grab";

    if (!tooltip) return;

    if (country) {

        tooltip.style.display = "block";

        tooltip.innerHTML = `

            <strong>${country.name}</strong><br>

            Capital : ${country.capital}<br>

            Trade Score : ${country.tradeScore}<br>

            GDP : ${country.gdp}

        `;

    } else {

        tooltip.style.display = "none";

    }

});

// ======================================================
// TOOLTIP MOVE
// ======================================================

dashboardGlobe.addEventListener("mousemove", e => {

    if (!tooltip) return;

    tooltip.style.left = (e.pageX + 15) + "px";

    tooltip.style.top = (e.pageY - 25) + "px";

});

// ======================================================
// CLICK COUNTRY
// ======================================================

globe.onPointClick(country => {

    console.log("CLICK BERHASIL");
    console.log(country);

    showCountry(country);

});

// ======================================================
// SEARCH COUNTRY
// ======================================================

const search = document.getElementById("searchCountry");

if (search) {

    let searchTimer;

    search.addEventListener("input", e => {

        clearTimeout(searchTimer);

        searchTimer = setTimeout(() => {

            const keyword = e.target.value
                .trim()
                .toLowerCase();

            if (!keyword) return;

            const found = countries.find(c =>
                c.name.toLowerCase().includes(keyword)
            );

            if (found) {
                showCountry(found);
            }

        }, 400);

    });

}

// ======================================================
// RESET GLOBE
// ======================================================

dashboardGlobe.addEventListener("dblclick", () => {

    globe

    .arcsData(tradeRoutes)

    .arcColor(() => [

        "#38bdf8",

        "#2563eb"

    ])

    .arcStroke(1.2)

    .arcDashAnimateTime(2200);

    globe.ringsData(countries);

    resetCamera();

    autoRotate = true;

});

// ======================================================
// COUNTRY COUNT
// ======================================================

const countryCount = document.getElementById("countryCount");

if (countryCount) {

    countryCount.innerText = countries.length;

}

console.log("Search & Tooltip Loaded");

// ======================================================
// KPI ANIMATION
// ======================================================

function animateValue(id, start, end, duration) {

    const el = document.getElementById(id);

    if (!el) return;

    let startTime = null;

    function frame(currentTime) {

        if (!startTime) {

            startTime = currentTime;

        }

        const progress = Math.min(
            (currentTime - startTime) / duration,
            1
        );

        const value = Math.floor(
            start + (end - start) * progress
        );

        el.innerText = value;

        if (progress < 1) {

            requestAnimationFrame(frame);

        }

    }

    requestAnimationFrame(frame);

}

// ======================================================
// LIVE CLOCK
// ======================================================

function updateClock() {

    const now = new Date();

    const time = now.toLocaleTimeString("en-GB");

    const date = now.toLocaleDateString("en-US", {

        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric"

    });

    document.getElementById("liveTime") &&
        (document.getElementById("liveTime").innerText = time);

    document.getElementById("liveDate") &&
        (document.getElementById("liveDate").innerText = date);

}

updateClock();

setInterval(updateClock, 1000);


// ======================================================
// AUTO COUNTRY ROTATION
// ======================================================

let countryIndex = 0;

setInterval(() => {

    if (!autoRotate) return;

    countryIndex++;

    if (countryIndex >= countries.length) {

        countryIndex = 0;

    }

    showCountry(countries[countryIndex]);

}, 18000);

// ======================================================
// STARTUP
// ======================================================

window.addEventListener("load", () => {

    animateValue(
        "countryCount",
        0,
        countries.length,
        1200
    );

});

// ======================================================
// WINDOW RESIZE
// ======================================================

window.addEventListener("resize", () => {

    globe.width(dashboardGlobe.clientWidth);

    globe.height(600);

});

// ======================================================
// QUICK ACTION BUTTONS
// ======================================================

document.getElementById("btnResetGlobe")
?.addEventListener("click", () => {

    resetCamera();

});

document.getElementById("btnAutoRotate")
?.addEventListener("click", () => {

    autoRotate = !autoRotate;

});

document.getElementById("btnRefreshData")
?.addEventListener("click",()=>{

    delete countryCache[
        document.getElementById("countryTitle").innerText
    ];

    const current=countries.find(c=>

        c.name===document.getElementById("countryTitle").innerText

    );

    if(current){

        showCountry(current);

    }

});

document.getElementById("btnFullscreen")
?.addEventListener("click", () => {

    if (!document.fullscreenElement) {

        document.documentElement.requestFullscreen();

    } else {

        document.exitFullscreen();

    }

});

// ======================================================
// GLOBAL EXPORT
// ======================================================

window.showCountry = showCountry;

window.resetGlobe = resetCamera;

// ======================================================
// READY
// ======================================================

console.log("==================================");
console.log("TradeGuardian Dashboard Ready");
console.log("==================================");

} 