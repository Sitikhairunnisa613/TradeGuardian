import "./bootstrap";

import Chart from "chart.js/auto";
import Globe from "globe.gl";
import * as THREE from "three";

import { countries } from "./countryData";



/* =====================================================
   CHECK DASHBOARD PAGE
===================================================== */


const dashboardGlobe =
document.getElementById("globeDashboard");


if(!dashboardGlobe){

    console.log(
        "TradeGuardian Dashboard inactive"
    );

}else{



/* =====================================================
   GLOBAL VARIABLE
===================================================== */


let economyChart = null;


let autoRotate = true;


let rotateAngle = 110;


let countryIndex = 0;



/* =====================================================
   TRADE ROUTES
===================================================== */


const tradeRoutes = [


{
    startLat:-6.2,
    startLng:106.8,

    endLat:35.68,
    endLng:139.69
},


{
    startLat:-6.2,
    startLng:106.8,

    endLat:39.90,
    endLng:116.40
},


{
    startLat:-6.2,
    startLng:106.8,

    endLat:52.52,
    endLng:13.40
},


{
    startLat:-6.2,
    startLng:106.8,

    endLat:38.89,
    endLng:-77.03
},


{
    startLat:-6.2,
    startLng:106.8,

    endLat:-35.28,
    endLng:149.13
},


{
    startLat:-6.2,
    startLng:106.8,

    endLat:-15.79,
    endLng:-47.88
},


{
    startLat:35.68,
    startLng:139.69,

    endLat:38.89,
    endLng:-77.03
},


{
    startLat:39.90,
    startLng:116.40,

    endLat:52.52,
    endLng:13.40
}


];



/* =====================================================
   CREATE GLOBE
===================================================== */


const globe = Globe()(dashboardGlobe)



.width(
    dashboardGlobe.clientWidth
)



.height(600)



.backgroundColor(
    "rgba(0,0,0,0)"
)



.globeImageUrl(

"https://unpkg.com/three-globe/example/img/earth-blue-marble.jpg"

)



.bumpImageUrl(

"https://unpkg.com/three-globe/example/img/earth-topology.png"

)



.backgroundImageUrl(

"https://unpkg.com/three-globe/example/img/night-sky.png"

)



.showAtmosphere(true)



.atmosphereColor(
    "#38bdf8"
)



.atmosphereAltitude(
    0.22
);




/* =====================================================
   LIGHTING
===================================================== */


const ambientLight =
new THREE.AmbientLight(
    0xffffff,
    1.5
);


globe.scene()
.add(
    ambientLight
);



const directionalLight =
new THREE.DirectionalLight(
    0xffffff,
    2.5
);


directionalLight.position.set(
    250,
    120,
    250
);


globe.scene()
.add(
    directionalLight
);



/* =====================================================
   COUNTRY POINTS
===================================================== */


globe


.pointsData(
    countries
)


.pointLat(
    d=>d.lat
)


.pointLng(
    d=>d.lng
)


.pointAltitude(
    0.09
)


.pointRadius(
    1.25
)


.pointColor(
    ()=>"#60a5fa"
);




/* =====================================================
   COUNTRY RINGS
===================================================== */


globe


.ringsData(
    countries
)


.ringLat(
    d=>d.lat
)


.ringLng(
    d=>d.lng
)


.ringColor(
    ()=>[
        "#38bdf8"
    ]
)


.ringMaxRadius(
    5
)


.ringPropagationSpeed(
    2
)


.ringRepeatPeriod(
    700
);




/* =====================================================
   TRADE ROUTE ARC
===================================================== */


globe


.arcsData(
    tradeRoutes
)


.arcColor(
()=>[
    "#38bdf8",
    "#2563eb"
]
)



.arcAltitude(
    0.23
)



.arcStroke(
    1.2
)



.arcCurveResolution(
    80
)



.arcDashLength(
    0.1
)



.arcDashGap(
    0.9
)



.arcDashInitialGap(
()=>Math.random()
)



.arcDashAnimateTime(
    2200
);




/* =====================================================
   INITIAL CAMERA
===================================================== */


globe.pointOfView(

{

    lat:10,

    lng:110,

    altitude:2.6

}

);




/* =====================================================
   AUTO ROTATE
===================================================== */


setInterval(()=>{


    if(!autoRotate)
    return;



    globe.pointOfView(

    {

        lat:10,

        lng:rotateAngle++,

        altitude:2.6

    }


    );


},120);




/* =====================================================
   MOUSE CONTROL
===================================================== */


dashboardGlobe.addEventListener(

"mouseenter",

()=>{

    autoRotate=false;

}

);



dashboardGlobe.addEventListener(

"mouseleave",

()=>{

    autoRotate=true;

}

);




/* =====================================================
   RESET CAMERA
===================================================== */


function resetCamera(){


    globe.pointOfView(

    {

        lat:10,

        lng:110,

        altitude:2.6

    },

    2000

    );


}



window.resetGlobe =
resetCamera;

dashboardGlobe.addEventListener(

"dblclick",

()=>{

    resetCamera();

}

);



/* =====================================================
   PLANE STORAGE
===================================================== */


const planes = [];




/* =====================================================
   CREATE AIRPLANE MODEL
===================================================== */


function createPlane(){


    const plane =
    new THREE.Group();



    // BODY

    const body =
    new THREE.Mesh(

        new THREE.CylinderGeometry(
            0.03,
            0.03,
            0.38,
            16
        ),

        new THREE.MeshPhongMaterial({

            color:"#ffffff",

            shininess:120

        })

    );


    body.rotation.z =
    Math.PI / 2;


    plane.add(body);




    // WING


    const wing =
    new THREE.Mesh(

        new THREE.BoxGeometry(
            0.02,
            0.32,
            0.08
        ),

        new THREE.MeshPhongMaterial({

            color:"#38bdf8"

        })

    );


    plane.add(wing);




    // TAIL


    const tail =
    new THREE.Mesh(

        new THREE.BoxGeometry(
            0.02,
            0.12,
            0.05
        ),

        new THREE.MeshPhongMaterial({

            color:"#38bdf8"

        })

    );


    tail.position.x=-0.16;


    plane.add(tail);




    // NOSE LIGHT


    const nose =
    new THREE.Mesh(

        new THREE.SphereGeometry(
            0.035,
            16,
            16
        ),

        new THREE.MeshPhongMaterial({

            color:"#ffffff"

        })

    );


    nose.position.x=0.19;


    plane.add(nose);




    // ENGINE LIGHT


    const engineGlow =
    new THREE.PointLight(

        "#38bdf8",

        2,

        1.5

    );


    engineGlow.position.set(

        -0.15,
        0,
        0

    );


    plane.add(engineGlow);




    // FRONT LIGHT


    const frontLight =
    new THREE.PointLight(

        "#ffffff",

        2,

        2

    );


    frontLight.position.set(

        0.18,
        0,
        0

    );


    plane.add(frontLight);



    return plane;


}





/* =====================================================
   CREATE PLANES FROM ROUTES
===================================================== */


tradeRoutes.forEach(route=>{


    const mesh =
    createPlane();



    globe.scene()
    .add(mesh);



    planes.push({

        mesh,

        route,

        progress:
        Math.random()

    });


});






/* =====================================================
   LINEAR MOVEMENT
===================================================== */


function lerp(a,b,t){

    return a+(b-a)*t;

}





/* =====================================================
   UPDATE PLANE POSITION
===================================================== */


function updatePlanes(){


    planes.forEach(item=>{


        item.progress +=0.0018;



        if(item.progress>1){

            item.progress=0;

        }



        const lat =
        lerp(

            item.route.startLat,

            item.route.endLat,

            item.progress

        );



        const lng =
        lerp(

            item.route.startLng,

            item.route.endLng,

            item.progress

        );





        const position =
        globe.getCoords(

            lat,

            lng,

            0.24

        );



        item.mesh.position.set(

            position.x,

            position.y,

            position.z

        );






        // direction

        const next =
        globe.getCoords(

            lerp(
                item.route.startLat,
                item.route.endLat,
                Math.min(
                    item.progress+0.01,
                    1
                )
            ),


            lerp(
                item.route.startLng,
                item.route.endLng,
                Math.min(
                    item.progress+0.01,
                    1
                )
            ),

            0.24

        );



        item.mesh.lookAt(next);



    });



    requestAnimationFrame(
        updatePlanes
    );


}



updatePlanes();






/* =====================================================
   BLINK AIRPLANE LIGHT
===================================================== */


setInterval(()=>{


    planes.forEach(item=>{


        item.mesh.children.forEach(child=>{


            if(
                child.type==="PointLight"
            ){


                child.visible =
                !child.visible;


            }


        });



    });



},450);







/* =====================================================
   PLANE SCALE FOLLOW ZOOM
===================================================== */


function updatePlaneScale(){


    const altitude =
    globe.pointOfView()
    .altitude;



    const scale =
    Math.max(

        0.8,

        2.8-altitude

    );



    planes.forEach(item=>{


        item.mesh.scale.set(

            scale,

            scale,

            scale

        );


    });


}



setInterval(

    updatePlaneScale,

    100

);






/* =====================================================
   SUN LIGHT ANIMATION
===================================================== */


const sun =
new THREE.DirectionalLight(

    0xffffff,

    3

);



sun.position.set(

250,

120,

250

);



globe.scene()
.add(sun);




let sunAngle=0;



function animateSun(){


    sunAngle +=0.002;



    sun.position.x =
    Math.cos(sunAngle)*250;



    sun.position.z =
    Math.sin(sunAngle)*250;



    requestAnimationFrame(
        animateSun
    );


}



animateSun();


}


