<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Follower extends Model
{
    protected $primaryKey = [
        'following_id',
        'followed_id'
    ];
    protected $fillable = [
        'following_id',
        'followed_id'
    ];
    public $timestamps = false;
    public $incrementing = false;

    // ログインしているIDを引数で渡してフォローしているIDを取得
    public function followingIds(Int $user_id)
    {
        return $this->where('following_id', $user_id)->get('followed_id');
    }
}
