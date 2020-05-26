<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    use Notifiable;

    
    protected $fillable = [
        'name',  
        'email',
        'password',
        'avatar',
        'twitter_id',
        'twitter_name',
    ];


    protected $hidden = [
        'password', 'remember_token',
    ];

 
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];
}