@extends('layouts.front')

@section('content')
        <body>
            <div class="container">
                <div class="mx-auto text-center" style="width: 50.5rem;">
                    <img src="https://bahn-csgroup.com/wp-content/uploads/2017/06/tusmiageru.jpg" class="rounded-circle img-fluid mx-auto d-block m-5" width="60%"  alt="積木" >
                    <h1 class="site-name"><strong>積み上げリスト</strong></h1>
                        <div class="mx-auto" style="width: 20rem">
                            <a href="{{ url('auth/twitter') }}" type="button" class="btn btn-primary m-3 p-2 d-block"><i class="fab fa-twitter"></i> Twitterアカウントでログインする</a>
                        @guest
                            <a href="{{ url('login') }}" class="btn btn-primary m-3 p-2 d-block">一般ユーザーでログイン</a>
                        @else
                            <a href="{{ url('guest/guestuser') }}" class="btn btn-primary m-3 p-2 d-block">ログイン</a>
                        @endguest
                            <p class="m-3"><a href="{{ url('register') }}" role="button">新規登録</a></p>
                            <p class="m-3"><a href="#" role="button">テストユーザー</a></p>
                    </div>
                </div>
            </div>
        </body>
    </html>
@endsection