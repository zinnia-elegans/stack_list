<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class TweetsController extends Controller
{

    //  検索ツイート取得
     public function tweet(){
        $tweets = \Twitter::get('search/tweets', array("q" => "#今日の積み上げ","count" => 10, "result_type" => "mixed"));
        // $secondtweets = \Twitter::get('search/tweets', array("q" => "#今日の積み上げ","count" => 5, "result_type" => "recent"));
        // $thirdtweets = \Twitter::get('search/tweets', array("q" => "#今日の積み上げ","count" => 5, "result_type" => "mixed"));
        
        return view('index',[
            'statuses' => $tweets,
            // 'secondtweets' => $secondtweets,
            // 'thirdtweets' => $thirdtweets
            ]);
    }
    
    // ツイート投稿
    public function index(Request $request){
        $tweet = $request->tweet;
        $text = \Twitter::post('statuses/update', array("status" => $tweet));
    
        return view('tweets', [
            'text' => $text,
        ]);
    }

    // ユーザーのタイムラインを取得
    public function stack() {
        $statuses = \Twitter::get('statuses/user_timeline',["count" => 30]);
        
        return view('yourstack', [
            'statuses' => $statuses,
            ]);
    }


}