<!DOCTYPE html>
<html lang="en">

<head>

<meta charset="UTF-8">

<meta name="viewport" content="width=device-width, initial-scale=1.0">

<title>
TradeGuardian
</title>


@vite([
'resources/css/app.css',
'resources/js/app.js'
])


<style>

body{
    background:
    linear-gradient(
        135deg,
        #06111f,
        #0f2740
    );

    min-height:100vh;

    display:flex;

    align-items:center;

    justify-content:center;

    font-family: Arial, sans-serif;
}


.auth-card{

    width:420px;

    padding:40px;

    background:
    rgba(255,255,255,.08);

    backdrop-filter:blur(20px);

    border-radius:20px;

    color:white;

    box-shadow:
    0 20px 50px rgba(0,0,0,.4);

}


</style>

</head>


<body>


<div class="auth-card">

    {{ $slot }}

</div>


</body>

</html>