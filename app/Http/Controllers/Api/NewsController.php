<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Services\NewsService;

class NewsController extends Controller
{
    public function show(
        $countryCode,
        NewsService $newsService
    )
    {
        try{

            return response()->json(

                $newsService->getNews(

                    $countryCode

                )

            );

        }catch(\Throwable $e){

            return response()->json([

                'exception'=>$e->getMessage(),

                'line'=>$e->getLine(),

                'file'=>$e->getFile()

            ],500);

        }

    }
}