<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Services\DashboardService;

class DashboardController extends Controller
{
    public function show(

        string $country,

        DashboardService $dashboard

    )
    {

        return response()->json(

            $dashboard->getDashboard(

                $country

            )

        );

    }
}