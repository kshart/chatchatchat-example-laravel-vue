<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * @property string $id
 * @property int $user_id
 * @property string $ip_address
 * @property string $user_agent
 * @property string $payload
 * @property string $last_activity
 */
class Session extends Model
{
    protected $hidden = [
        'payload',
    ];

    protected $casts = [
        'last_activity' => 'datetime',
        'id' => 'string',
    ];
}
