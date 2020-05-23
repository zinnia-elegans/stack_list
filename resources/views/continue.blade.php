@extends('layouts.app')

@section('content')
    <body>
        <div class="card mx-auto" style="width: 37.5rem">
            <div class="card-body">
                <h3>現在の継続日数を確認する</h3>
                    <form id="test1" action="{{ url('/continue') }} " method="post" name="from">
                        <div class="form-group">
                            <input id="year" type="text" name="y" size="6" maxlength="4" value="2020"/> 年 
                            <input id="month" type="text" name="m" size="4" maxlength="2" placeholder="yy"/> 月 
                            <input id="date" type="text" name="d" size="4" maxlength="2" placeholder="dd"/> 日
                            <input id="calcButton" class="btn-primary" type="submit" name="regist" value="登録" />
                            <input id="resetButton" class="btn-primary" type="reset" name="reset" value="リセット" />
                        </div>
                    </form>
                <p>あなたの継続日数は、<p id="returnDate"></p> です。</p>
            </div>
            <div class="card-body">
                <p>過去の積み上げを確認する</p>
            </div>
        </div>
    </body>
@endsection