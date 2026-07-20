// ======================================================
// TradeGuardian Dashboard
// ======================================================

import "./bootstrap";
import "../css/app.css";

import Chart from "chart.js/auto";
import Globe from "globe.gl";
import jsPDF from "jspdf";
import * as THREE from "three";

import { countries } from "./countryData";
const countryCache = {};

// ======================================================
// COUNTRY COMPARISON
// ======================================================

function loadCompareCountries(){

    const select = document.getElementById("compareCountry");

    if(!select) return;

    select.innerHTML = `
        <option value="">
            Select Country...
        </option>
    `;

    countries.forEach(country=>{

        select.innerHTML += `
            <option value="${country.name}">
                ${country.name}
            </option>
        `;

    });

}

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

function updateRisk(level){

    const risk=document.getElementById("riskLevel");

    if(!risk) return;

    risk.innerText=level;

    risk.className="";

    if(level==="LOW"){

        risk.classList.add("low");

    }else if(level==="MEDIUM"){

        risk.classList.add("medium");

    }else{

        risk.classList.add("high");

    }

}

// ======================================================
// WEATHER
// ======================================================

function calculateRisk(economy, weather, exchange, news){

    let weatherScore = 100;

    if(weather.weather.includes("Rain"))
        weatherScore = 70;

    if(weather.weather.includes("Storm"))
        weatherScore = 40;


    let inflationScore = 100;

    const inflation = Number(economy.inflation);

    if(inflation >= 8)
        inflationScore = 30;
    else if(inflation >= 5)
        inflationScore = 60;


    let newsScore = 100;

    if(news.length >= 8)
        newsScore = 40;
    else if(news.length >= 5)
        newsScore = 65;
    else if(news.length >= 3)
        newsScore = 80;

    const safety =

    weatherScore * 0.30 +

    inflationScore * 0.30 +

    newsScore * 0.40;

    return Math.round(100 - safety);

}

function updateSupplyChainRisk(country,economy,weather,exchange,news){

    //------------------------------------------------
    // WEATHER (30)
    //------------------------------------------------

    let weatherScore = 100;

    if(weather.weather.includes("Rain"))
        weatherScore = 70;

    if(weather.weather.includes("Storm"))
        weatherScore = 40;

    //------------------------------------------------
    // INFLATION (30)
    //------------------------------------------------

    let inflationScore = 100;

    const inflation = Number(economy.inflation);

    if(inflation >= 8)
        inflationScore = 30;
    else if(inflation >=5)
        inflationScore = 60;

    //------------------------------------------------
    // NEWS (40)
    //------------------------------------------------

    let newsScore = 100;

    if(news.length>=8)
        newsScore = 40;
    else if(news.length>=5)
        newsScore = 65;
    else if(news.length>=3)
        newsScore = 80;

    //------------------------------------------------
    // FINAL SCORE
    //------------------------------------------------

    const risk = calculateRisk(
    economy,
    weather,
    exchange,
    news
);

document.getElementById("riskScore").innerText = risk;

    document.getElementById("weatherRisk").innerText =
    Math.round((100-weatherScore)*0.30);

    document.getElementById("inflationRisk").innerText =
        Math.round((100-inflationScore)*0.30);

    document.getElementById("newsRisk").innerText =
        Math.round((100-newsScore)*0.40);

    const badge = document.getElementById("riskBadge");
    const circle = document.querySelector(".tg-risk-circle");

    let level;

    if(risk >= 70){

        level="HIGH";

        badge.innerText="HIGH RISK";
        badge.style.background="#ef4444";

        circle.style.setProperty("--riskColor","#ef4444");

    }
    else if(risk >= 40){

        level="MEDIUM";

        badge.innerText="MEDIUM RISK";
        badge.style.background="#f59e0b";

        circle.style.setProperty("--riskColor","#f59e0b");

    }
    else{

        level="LOW";

        badge.innerText="LOW RISK";
        badge.style.background="#22c55e";

        circle.style.setProperty("--riskColor","#22c55e");

    }

    circle.style.setProperty("--progress",risk);

    updateRisk(level);

}

// ======================================================
// WEATHER CARD
// ======================================================

function updateWeather(weather){

    const card=document.getElementById("weatherCard");

    if(!card) return;

    card.innerHTML=`

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

// ======================================================
// WEATHER ICON
// ======================================================

function weatherIcon(weather){

    switch(weather){

        case "Clear Sky":
            return "☀️";

        case "Partly Cloudy":
            return "⛅";

        case "Cloudy":
        case "Overcast":
            return "☁️";

        case "Rain":
        case "Moderate Rain":
        case "Light Rain":
        case "Slight Rain":
            return "🌧️";

        case "Thunderstorm":
            return "⛈️";

        default:
            return "🌤️";

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

function updateAI(country, economy, weather, exchange){

    const ai=document.getElementById("recommendation");

    if(!ai) return;

    const trade=parseInt(country.tradeScore);
    const inflation=Number(economy.inflation);

    let recommendation="";
    let color="#22c55e";
    let icon="✅";

    if(trade>=90){

        recommendation=
        "This country has an excellent trade score. Export opportunities are very promising and logistics conditions are generally stable.";

    }
    else if(trade>=75){

        recommendation=
        "Trade conditions are stable. Expansion is recommended while monitoring market developments.";

        color="#f59e0b";
        icon="⚠️";

    }
    else{

        recommendation=
        "Trade confidence is relatively low. Consider evaluating operational risks before entering this market.";

        color="#ef4444";
        icon="❌";

    }

    let inflationText;

    if(inflation>=6){

        inflationText=
        "Inflation is relatively high, which may reduce purchasing power.";

    }else{

        inflationText=
        "Inflation remains under control and supports business stability.";

    }

    let weatherText;

    if(
        weather.weather.includes("Rain") ||
        weather.weather.includes("Storm")
    ){

        weatherText=
        "Current weather may affect shipping schedules.";

    }else{

        weatherText=
        "Weather conditions support smooth logistics operations.";

    }

    ai.innerHTML=`

        <div class="ai-summary-card">

            <h3>${icon} AI Trade Recommendation</h3>

            <p>${recommendation}</p>

            <hr>

            <p>
                📈 <b>Trade Score :</b>
                ${country.tradeScore}
            </p>

            <p>
                💹 <b>Inflation :</b>
                ${inflation}%<br>
                ${inflationText}
            </p>

            <p>
                🌦 <b>Weather :</b>
                ${weather.weather}<br>
                ${weatherText}
            </p>

            <p>
                💱 <b>Exchange :</b>
                1 ${exchange.base} = ${exchange.rate} ${exchange.target}
            </p>

        </div>

    `;

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

// ======================================
// FAVORITE MONITORING
// ======================================

let currentCountry = null;

function getFavorites(){

    return JSON.parse(
        localStorage.getItem("tg-favorites") || "[]"
    );

}

function saveFavorites(data){

    localStorage.setItem(
        "tg-favorites",
        JSON.stringify(data)
    );

}

function getRecent(){

    return JSON.parse(
        localStorage.getItem("tg-recent") || "[]"
    );

}

function saveRecent(data){

    localStorage.setItem(
        "tg-recent",
        JSON.stringify(data)
    );

}

function renderFavorites(){

    const list=document.getElementById("favoriteList");

    if(!list) return;

    const favorites=getFavorites();

    const badge = document.getElementById("favoriteCount");

    if (badge) {
        badge.innerText = favorites.length;
    }

    if(favorites.length===0){

    list.innerHTML=`
        <div class="favorite-empty">

            ⭐

            <p>No favorite countries</p>

            <small>
                Click the star next to a country to save it.
            </small>

        </div>
    `;

    return;

}

    list.innerHTML="";

    favorites.forEach(name=>{

        const item=document.createElement("div");

        item.className="favorite-item";

        item.innerHTML = `
            <span>⭐ ${name}</span>
            <button class="favorite-remove">✕</button>
        `;

        item.querySelector("span").onclick = () => {

            const country = countries.find(c => c.name === name);

            if(country){
                showCountry(country);
            }

        };

        item.querySelector(".favorite-remove").onclick = (e) => {

            e.stopPropagation();

            let favorites = getFavorites().filter(item => item !== name);

            saveFavorites(favorites);

            renderFavorites();

            updateFavoriteButton();

            showToast(
                "Favorites",
                `${name} removed.`,
                "🗑️"
            );

        };

        list.appendChild(item);

    });

}

function updateFavoriteButton(){

    const btn=document.getElementById("favoriteBtn");

    if(!btn || !currentCountry) return;

    const favorites=getFavorites();

    const isFavorite =
    favorites.includes(currentCountry.name);

    btn.innerHTML = isFavorite ? "★" : "☆";

    btn.classList.toggle(
        "active",
        isFavorite
    );

}

function updateRecent(country){

    let recent = getRecent();

    recent = recent.filter(
        item => item !== country.name
    );

    recent.unshift(country.name);

    recent = recent.slice(0,5);

    saveRecent(recent);

    renderRecent();

}

function renderRecent(){

    const list =
    document.getElementById("recentList");

    if(!list) return;

    const recent = getRecent();

    if(recent.length===0){

        list.innerHTML=`
            <div class="favorite-empty">
                No recent country
            </div>
        `;

        return;

    }

    list.innerHTML="";

    recent.forEach(name=>{

        const item=document.createElement("div");

        item.className="favorite-item";

        item.innerHTML=`🕒 ${name}`;

        item.onclick=()=>{

            const country =
            countries.find(c=>c.name===name);

            if(country){

                showCountry(country);

            }

        };

        list.appendChild(item);

    });

}


document
.getElementById("favoriteBtn")
?.addEventListener("click",()=>{

    if(!currentCountry) return;

    let favorites=getFavorites();

    if(favorites.includes(currentCountry.name)){

        favorites=favorites.filter(

            item=>item!==currentCountry.name

        );

        showToast(
            "Favorites",
            "Removed from favorites.",
            "⭐"
        );

    }else{

        favorites.push(currentCountry.name);

        showToast(
            "Favorites",
            "Added to favorites.",
            "⭐"
        );

    }

    saveFavorites(favorites);

    renderFavorites();

    updateFavoriteButton();

});

// ======================================================
// COUNTRY PANEL
// ======================================================

async function showCountry(country) {

    autoRotate = false;

    currentCountry = country;

    updateRecent(country);

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
                news,

                risk: calculateRisk(
                    economy,
                    weather,
                    exchange,
                    news
                )

            };

        }

        // ==========================================
        // COUNTRY INFORMATION
        // ==========================================

        const title=document.getElementById("countryTitle");

        title.style.opacity="0";

        setTimeout(()=>{

            title.innerText=country.name;

            const currentCompare =
            document.getElementById("currentCountryCompare");

        if(currentCompare){

            currentCompare.innerText = country.name;

        }

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

updateWeather(weather);

updateNews(news);

updateAI(
    country,
    economy,
    weather,
    exchange
);

updateChart(country, economy);

updateSupplyChainRisk(
    country,
    economy,
    weather,
    exchange,
    news
);

// ⭐ FAVORITE
renderFavorites();
updateFavoriteButton();

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

//==================================================
// COMPARE COUNTRY
//==================================================

async function compareCountry(){

    const select = document.getElementById("compareCountry");
    const result = document.getElementById("compareResult");

    if(!select || !result) return;

    const compareName = select.value;

    if(compareName===""){

        showToast(
            "Country Comparison",
            "Please select a country first.",
            "🌍"
        );

        return;

    }

    const currentName =
        document.getElementById("countryTitle").textContent.trim();

    if(currentName===compareName){

        showToast(
            "Country Comparison",
            "Please choose another country.",
            "⚠️"
        );

        return;

    }

    const current =
        countries.find(c=>c.name===currentName);

    const compare =
        countries.find(c=>c.name===compareName);

    if(!current || !compare){

        result.innerHTML=`
            <div class="compare-placeholder">
                Country data not found.
            </div>
        `;

        return;

    }

    result.innerHTML=`
        <div class="compare-placeholder">
            Loading comparison...
        </div>
    `;

    try{

        const currentData = await loadCountryData(current);

        const compareData = await loadCountryData(compare);

        

        renderComparison(
            current,
            compare,
            currentData,
            compareData
        );

    }

    catch(e){

        console.error(e);

        result.innerHTML=`
            <div class="compare-placeholder">
                Failed to compare countries.
            </div>
        `;

    }

}

async function loadCountryData(country){

    if(countryCache[country.name]){

        return countryCache[country.name];

    }

    const
    [
        countryInfo,
        economy,
        weather,
        exchange,
        news,
    ] = await Promise.all([

        getCountryInfo(country.name),

        getEconomy(country.name),

        getWeather(
            country.lat,
            country.lng
        ),

        getExchange(
            country.currency
        ),

        getNews(
            country.code
        )

    ]);

    const data = {

    countryInfo,

    economy,

    weather,

    exchange,

    news,

    risk: calculateRisk(
        economy,
        weather,
        exchange,
        news
    )

};

countryCache[country.name] = data;

return data;

}

function compareValue(a,b){

    if(Number(a)>Number(b)){
        return ["winner",""];
    }

    if(Number(a)<Number(b)){
        return ["","winner"];
    }

    return ["draw","draw"];

}

function renderComparison(

    current,
    compare,
    currentData,
    compareData

){

    const result=document.getElementById("compareResult");

    if(!result) return;

// =============================
// COMPOSITE SCORE
// =============================

const currentGDP =
    Number(String(currentData.economy.gdp).replace(/,/g, "")) || 0;

const compareGDP =
    Number(String(compareData.economy.gdp).replace(/,/g, "")) || 0;

const maxGDP = Math.max(currentGDP, compareGDP, 1);

// GDP (semakin besar semakin baik)
const currentGDPScore =
    (currentGDP / maxGDP) * 100;

const compareGDPScore =
    (compareGDP / maxGDP) * 100;


// Inflation (semakin kecil semakin baik)
const currentInflation =
    Number(currentData.economy.inflation) || 100;

const compareInflation =
    Number(compareData.economy.inflation) || 100;

const maxInflation =
    Math.max(currentInflation, compareInflation, 1);

const currentInflationScore =
    100 - (currentInflation / maxInflation * 100);

const compareInflationScore =
    100 - (compareInflation / maxInflation * 100);


// Risk (semakin kecil semakin baik)
const currentRisk = currentData.risk;

const compareRisk = compareData.risk;

const currentRiskScore =
    100 - currentRisk;

const compareRiskScore =
    100 - compareRisk;


// FINAL SCORE

const currentTrade =
    parseFloat(String(current.tradeScore).replace("%", ""));

const compareTrade =
    parseFloat(String(compare.tradeScore).replace("%", ""));

const currentFinal =
    currentTrade * 0.40 +
    currentGDPScore * 0.30 +
    currentInflationScore * 0.15 +
    currentRiskScore * 0.15;

const compareFinal =
    compareTrade * 0.40 +
    compareGDPScore * 0.30 +
    compareInflationScore * 0.15 +
    compareRiskScore * 0.15;

    const winner =
    currentFinal > compareFinal
        ? current.name
        : compareFinal > currentFinal
        ? compare.name
        : "Draw";

result.innerHTML = `

<div class="tg-compare-card">

    <div class="tg-compare-header">

    <div class="country-card">

        <img
            src="https://flagcdn.com/w160/${current.code.toLowerCase()}.png"
            class="compare-flag">

        <h2>${current.name}</h2>

    </div>

    <div class="vs-circle">

        VS

    </div>

    <div class="country-card">

        <img
            src="https://flagcdn.com/w160/${compare.code.toLowerCase()}.png"
            class="compare-flag">

        <h2>${compare.name}</h2>

    </div>

</div>

    <div class="compare-grid">

        <div class="compare-item">

            <h4>Trade Score</h4>

            <div class="compare-values">

                <span>${current.tradeScore}</span>

                <span>${compare.tradeScore}</span>

            </div>

        </div>

        <div class="compare-item">

            <h4>GDP</h4>

            <div class="compare-values">

                <span>${formatGDP(currentData.economy.gdp)}</span>

                <span>${formatGDP(compareData.economy.gdp)}</span>

            </div>

        </div>

        <div class="compare-item">

            <h4>Inflation</h4>

            <div class="compare-values">

                <span>${currentData.economy.inflation}%</span>

                <span>${compareData.economy.inflation}%</span>

            </div>

        </div>

        <div class="compare-item">

            <h4>Weather</h4>

            <div class="compare-values">

                <span>${currentData.weather.weather}</span>

                <span>${compareData.weather.weather}</span>

            </div>

        </div>

        <div class="compare-item">

            <h4>Currency</h4>

            <div class="compare-values">

                <span>${current.currency}</span>

                <span>${compare.currency}</span>

            </div>

        </div>

        <div class="compare-item">

            <h4>Exchange</h4>

            <div class="compare-values">

                <span>${currentData.exchange.rate}</span>

                <span>${compareData.exchange.rate}</span>

            </div>

        </div>

    </div>

    <div class="winner-box">

    🏆 Winner

    <h2>${winner}</h2>

    <p style="margin-top:10px;font-size:15px;">
        ${current.name} :
        <b>${currentFinal.toFixed(2)}</b>
        <br>

        ${compare.name} :
        <b>${compareFinal.toFixed(2)}</b>

    </p>

</div>

    <div class="ai-summary">

        <h3>🤖 AI Recommendation</h3>

        <p>

            ${
                winner==="Draw"
                ? "Both countries have similar trade potential."
                :`${winner} is recommended because it achieved the highest Composite Score based on Trade Score, GDP, Inflation, and Supply Chain Risk.`
            }

        </p>

    </div>

</div>

`;

}

// ======================================================
// DEFAULT COUNTRY
// ======================================================

showCountry(countries[0]);

loadCompareCountries();

renderFavorites();

renderRecent();

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

document.getElementById("btnExport")
?.addEventListener("click",()=>{

    if(!currentCountry) return;

    const pdf=new jsPDF();

    pdf.setFontSize(20);

    pdf.text(
        "TradeGuardian Dashboard Report",
        20,
        20
    );

    pdf.setFontSize(12);

    pdf.text(
        `Country : ${currentCountry.name}`,
        20,
        40
    );

    pdf.text(
        `Capital : ${document.getElementById("capital").innerText}`,
        20,
        50
    );

    pdf.text(
        `Population : ${document.getElementById("population").innerText}`,
        20,
        60
    );

    pdf.text(
        `GDP : ${document.getElementById("gdp").innerText}`,
        20,
        70
    );

    pdf.text(
        `Inflation : ${document.getElementById("inflation").innerText}`,
        20,
        80
    );

    pdf.text(
        `Exchange : ${document.getElementById("countryExchangeRate").innerText}`,
        20,
        90
    );

    pdf.text(
        `Risk : ${document.getElementById("riskBadge").innerText}`,
        20,
        100
    );

    pdf.text(
        `Trade Score : ${currentCountry.tradeScore}`,
        20,
        110
    );

    pdf.save(
        `${currentCountry.name}-TradeGuardian.pdf`
    );

    showToast(
        "Export",
        "PDF report generated.",
        "📄"
    );

});

// ======================================================
// LOGO CLICK = SHOW TOUR
// ======================================================

document.querySelector(".tg-logo")
?.addEventListener("click",()=>{

    localStorage.removeItem("tg-tour-complete");

    location.reload();

});

// SETTINGS

const modal=document.getElementById("settingsModal");

document.querySelector(".tg-setting-btn")
?.addEventListener("click",()=>{

    modal.classList.add("show");

});

document.getElementById("closeSettings")
?.addEventListener("click",()=>{

    modal.classList.remove("show");

});

modal?.addEventListener("click",(e)=>{

    if(e.target===modal){

        modal.classList.remove("show");

    }

});

// REPLAY TOUR

document.getElementById("replayTour")
?.addEventListener("click",()=>{

    localStorage.removeItem("tg-tour-complete");

    location.reload();

});

// THEME

const themeBtn=document.getElementById("toggleTheme");

themeBtn?.addEventListener("click",()=>{

    document.body.classList.toggle("light-theme");

    localStorage.setItem(
        "tg-theme",
        document.body.classList.contains("light-theme")
            ? "light"
            : "dark"
    );

    showToast(
        "Theme Changed",
        document.body.classList.contains("light-theme")
            ? "Light mode enabled."
            : "Dark mode enabled.",
        "🌙"
    );

    modal.classList.remove("show");

});

if(localStorage.getItem("tg-theme")==="light"){

    document.body.classList.add("light-theme");

}

// GLOBE SETTINGS

let rotationEnabled = true;

document.getElementById("toggleRotation")
?.addEventListener("click",()=>{

    rotationEnabled=!rotationEnabled;

    autoRotate=rotationEnabled;

    showToast(
        "Globe Rotation",
        rotationEnabled
            ? "Rotation enabled."
            : "Rotation disabled.",
        "🌍"
    );

    modal.classList.remove("show");

});

document.getElementById("resetCamera")
?.addEventListener("click",()=>{

    if(window.resetGlobe){

        window.resetGlobe();

    }

    showToast(
        "Camera Reset",
        "Globe camera restored.",
        "🎯"
    );

    modal.classList.remove("show");

});

// ======================================
// TOAST
// ======================================

const toast=document.getElementById("tgToast");

const toastTitle=document.getElementById("tgToastTitle");

const toastText=document.getElementById("tgToastText");

function showToast(title,message,icon="✅"){

    if(!toast) return;

    toast.querySelector(".tg-toast-icon").innerHTML=icon;

    toastTitle.innerHTML=title;

    toastText.innerHTML=message;

    toast.classList.add("show");

    clearTimeout(window.toastTimer);

    window.toastTimer=setTimeout(()=>{

        toast.classList.remove("show");

    },2500);

}


// ======================================================
// GLOBAL EXPORT
// ======================================================

window.showCountry = showCountry;

// ======================================================
// ACTIVE SIDEBAR
// ======================================================

const sections = document.querySelectorAll("[id$='Section']");

sections.forEach(section=>{

    section.classList.add("tg-reveal");

});

const navLinks = document.querySelectorAll(".tg-sidebar-menu a");

const observer = new IntersectionObserver(

(entries)=>{

    entries.forEach(entry=>{

        if(!entry.isIntersecting) return;

        sections.forEach(section=>{

            section.classList.remove("tg-active-section");

        });

        entry.target.classList.add("tg-active-section");

        navLinks.forEach(link=>{

            link.classList.remove("active");

        });

        const id = "#" + entry.target.id;

        const active = document.querySelector(
            `.tg-sidebar-menu a[href="${id}"]`
        );

        if(active){

            active.classList.add("active");

        }

        entry.target.classList.add("show");

    });

},

{

    threshold:.45

}

);

sections.forEach(section=>observer.observe(section));

// ======================================================
// DASHBOARD TOUR
// ======================================================

const tour=document.getElementById("tgTour");

if(localStorage.getItem("tg-tour-complete")){

    tour.classList.add("hidden");

}

if(tour){

const steps=[

"🌍 Click the interactive globe to choose a country.",

"📈 Monitor live economy and trade statistics.",

"☀️ Check weather and exchange rate instantly.",

"🤖 Read AI recommendations before making trade decisions.",

"📰 Stay updated with the latest trade news."

];

let current=0;

const text=document.getElementById("tourText");

const next=document.getElementById("tourNext");

const skip=document.getElementById("tourSkip");

text.innerText=steps[current];

next.onclick=()=>{

    current++;

    if(current>=steps.length){

        localStorage.setItem("tg-tour-complete","true");

        tour.classList.add("hidden");

        return;

    }

    text.innerText=steps[current];

};

skip.onclick=()=>{

    localStorage.setItem("tg-tour-complete","true");

    tour.classList.add("hidden");

};

}

document.getElementById("btnCompare")
?.addEventListener("click", compareCountry);

// ======================================================
// READY
// ======================================================

console.log("==================================");
console.log("TradeGuardian Dashboard Ready");
console.log("==================================");

} 