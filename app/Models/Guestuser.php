<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Guestuser extends Model
{
    protected $fillable = [
        'name', 'email', 'password',
      ];
}
